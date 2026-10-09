const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const vue = require('vue');

const root = path.join(__dirname, '..');
function load(file, globals = {}, modules = {}) {
    const source = fs.readFileSync(path.join(root, file), 'utf8').replace(/import\.meta\.hot/g, 'false');
    const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
    const context = { exports: {}, URL, ...vue, defineStore: (_name, setup) => setup,
        titleCase: value => value, useAppConfig: () => ({ storeName: 'Test' }),
        useWebstoreStore: () => ({ webstore: { platform_type: 'FiveM' } }),
        window: { location: { origin: 'https://store.example', replace() {} } },
        require: id => { if (modules[id]) return modules[id]; throw new Error(`Unexpected import ${id}`); }, ...globals };
    vm.runInNewContext(js, context, { filename: file });
    return context.exports;
}
const callbacks = load('utils/authCallback.ts');
const storage = { StorageSerializers: { object: {} }, useStorage: (_key, initial) => vue.ref(initial) };
const authModules = { '@vueuse/core': storage, pinia: { skipHydrate: value => value }, '~/utils/authCallback': callbacks };
function makeAuth(basket, globals = {}) {
    return load('stores/auth.ts', { useBasketStore: () => basket, ...globals }, authModules).useAuthStore();
}

test('Tebex callback accepts success=1 and duplicate success flags, without accepting failure', () => {
    for (const success of ['1', 'true', ['true', 'true'], ['true', '1']]) {
        assert.equal(callbacks.isLoginCallback({ success }), true);
    }
    assert.equal(callbacks.isLoginCallback({ auth_callback: '1' }), true);
    for (const success of [undefined, null, 'false', '0', ['false', '0']]) {
        assert.equal(callbacks.isLoginCallback({ success }), false);
    }
});

test('callback redirects preserve product queries and reject external paths', () => {
    assert.equal(callbacks.getAuthRedirect('/script/42?tab=details&x=1'), '/script/42?tab=details&x=1');
    for (const value of ['https://external.example', '//external.example', '/\\external.example', '/\n/external.example', ['/', '//evil']]) {
        assert.equal(callbacks.getAuthRedirect(value), '/');
    }
});

test('login return marker cannot collide with the success field appended by Tebex', async () => {
    let request;
    const basket = { basket: { ident: 'basket', complete: false }, basketId: null };
    const auth = makeAuth(basket, { getBasketAuthMethods: async (id, url) => { request = { id, url }; return []; } });
    await auth.getAuthMethods('/script/42?tab=details&x=1');
    const callback = new URL(request.url);
    assert.equal(callback.searchParams.get('auth_callback'), '1');
    assert.equal(callback.searchParams.has('success'), false);
    assert.equal(callback.searchParams.get('redirect'), '/script/42?tab=details&x=1');
    assert.equal(basket.basketId, 'basket');
    callback.searchParams.append('success', '1');
    assert.equal(callbacks.isLoginCallback(Object.fromEntries(callback.searchParams)), true);
});

test('completed baskets are replaced before beginning a new login', async () => {
    let usedId;
    const basket = { basket: { ident: 'complete', complete: true }, async createBasket() { this.basket = { ident: 'fresh', complete: false }; } };
    const auth = makeAuth(basket, { getBasketAuthMethods: async id => { usedId = id; return []; } });
    await auth.getAuthMethods();
    assert.equal(usedId, 'fresh');
});

test('external navigation waits for local persistence watchers', async () => {
    let flush, navigated = false;
    const auth = makeAuth({}, { nextTick: () => new Promise(resolve => { flush = resolve; }),
        window: { location: { replace: () => { navigated = true; } } } });
    const pending = auth.loginRedirect({ name: 'FiveM', url: 'https://ident.tebex.io/fivem' });
    assert.equal(navigated, false);
    flush(); await pending;
    assert.equal(navigated, true);
});

test('callback only authenticates identities confirmed by the basket API', async () => {
    let returned = undefined;
    const auth = makeAuth({ getBasket: async () => returned });
    for (const value of [undefined, vue.ref(null), vue.ref({ username: 'User', username_id: null })]) {
        returned = value;
        await assert.rejects(auth.loginCompleted(), /Failed to login/);
        assert.equal(auth.isAuthenticated.value, false);
    }
    returned = vue.ref({ username: 'Confirmed', username_id: '12345' });
    await auth.loginCompleted();
    assert.equal(auth.isAuthenticated.value, true);
    assert.equal(auth.user.value.userId, '12345');
});

test('returning login can recover its persisted basket when the cookie is missing', async () => {
    let fetchedId;
    const cookie = vue.ref(null);
    const basketStorage = { ...storage, useStorage: (key, initial) => vue.ref(key.endsWith('/basket') ? { ident: 'saved-basket', packages: [] } : initial) };
    const basket = load('stores/basket.ts', {
        useCookie: name => name === 'basketId' ? cookie : vue.ref(null),
        useToastStore: () => ({ addToast() {} }), useAuthStore: () => ({ isAuthenticated: false }),
        useRouter: () => ({}), useI18n: () => ({ t: value => value }),
    }, { '@vueuse/core': basketStorage, pinia: { skipHydrate: value => value }, '~/services': {
        getBasket: async id => { fetchedId = id; return { ident: id, username: 'Confirmed', username_id: '12345' }; },
    } }).useBasketStore();
    const result = await basket.getBasket();
    assert.equal(fetchedId, 'saved-basket');
    assert.equal(cookie.value, 'saved-basket');
    assert.equal(result.value.username, 'Confirmed');
});

test('app confirms login before cleaning callback URL and preserves it on a retryable failure', async () => {
    const source = fs.readFileSync(path.join(root, 'app.vue'), 'utf8');
    const callbackBlock = source.slice(source.indexOf('const authStore = useAuthStore();'), source.lastIndexOf('</script>'));
    const js = ts.transpileModule(callbackBlock, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
    for (const fails of [false, true]) {
        let mounted;
        const events = [];
        vm.runInNewContext(js, { ...callbacks, onMounted: callback => { mounted = callback; },
            useAuthStore: () => ({ loginCompleted: async () => { events.push('verify'); if (fails) throw new Error('Temporary error'); } }),
            useToastStore: () => ({ addToast: (_message, options) => { events.push(options.type); } }),
            useRoute: () => ({ query: { success: ['true', '1'], redirect: '/script/42' } }),
            useRouter: () => ({ replace: async path => { assert.equal(path, '/script/42'); events.push('navigate'); } }),
        });
        await mounted();
        assert.deepEqual(events, fails ? ['verify', 'error'] : ['verify', 'navigate', 'success']);
    }
});

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const attr = 'data-zb-animation-visible';
const source = fs.readFileSync(path.join(__dirname, '../composables/useVisibleAnimations.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;

function harness({ hidden = false, supported = true } = {}) {
    const elements = [null, 'existing'].map(previous => {
        const attributes = new Map(previous === null ? [] : [[attr, previous]]);
        return { attributes, getAttribute: key => attributes.get(key) ?? null, setAttribute: (key, value) => attributes.set(key, value), removeAttribute: key => attributes.delete(key) };
    });
    let mount, unmount, callback, options, disconnected = false;
    const listeners = new Map(), observed = [];
    const document = {
        hidden,
        querySelectorAll: selector => { assert.equal(selector, '.scene'); return elements; },
        addEventListener: (type, handler) => listeners.set(type, handler),
        removeEventListener: (type, handler) => { assert.equal(listeners.get(type), handler); listeners.delete(type); },
    };
    const context = {
        exports: {}, document,
        onMounted: fn => { mount = fn; },
        onUnmounted: fn => { unmount = fn; },
        IntersectionObserver: supported ? class {
            constructor(fn, opts) { callback = fn; options = opts; }
            observe(node) { observed.push(node); }
            disconnect() { disconnected = true; }
        } : undefined,
    };
    vm.runInNewContext(js, context);
    context.exports.useVisibleAnimations('.scene');
    return {
        elements, listeners, observed, document,
        mount: () => mount(), unmount: () => unmount(),
        intersect: states => callback(states.map((isIntersecting, index) => ({ target: elements[index], isIntersecting }))),
        hide: hidden => { document.hidden = hidden; listeners.get('visibilitychange')(); },
        values: () => elements.map(element => element.getAttribute(attr)),
        options: () => options, disconnected: () => disconnected,
    };
}

test('keeps near-viewport scenes active and pauses only distant scenes', () => {
    const h = harness();
    assert.deepEqual(h.values(), [null, 'existing'], 'setup does not touch DOM during SSR');
    h.mount();
    assert.equal(h.options().rootMargin, '150px');
    assert.equal(h.options().threshold, 0);
    assert.equal(h.observed.length, 2);
    h.intersect([true, false]);
    assert.deepEqual(h.values(), ['true', 'false']);
    h.intersect([false, true]);
    assert.deepEqual(h.values(), ['false', 'true']);
});

test('returning to a tab does not restart scenes still outside the viewport', () => {
    const h = harness();
    h.mount(); h.intersect([true, false]); h.hide(true);
    assert.deepEqual(h.values(), ['false', 'false']);
    h.intersect([false, true]);
    assert.deepEqual(h.values(), ['false', 'false'], 'intersection callbacks cannot resume a hidden tab');
    h.hide(false);
    assert.deepEqual(h.values(), ['false', 'true']);
});

test('a page mounted in a hidden tab stays paused until the tab is shown', () => {
    const h = harness({ hidden: true });
    h.mount();
    assert.deepEqual(h.values(), ['false', 'false']);
    h.intersect([true, false]); h.hide(false);
    assert.deepEqual(h.values(), ['true', 'false']);
});

test('unmount disconnects listeners and restores prior DOM attributes', () => {
    const h = harness();
    h.mount(); h.intersect([false, false]); h.unmount();
    assert.equal(h.disconnected(), true);
    assert.equal(h.listeners.size, 0);
    assert.deepEqual(h.values(), [null, 'existing']);
    h.intersect([true, true]);
    assert.deepEqual(h.values(), [null, 'existing'], 'late observer callbacks cannot modify the old route');
});

test('without IntersectionObserver, visible tabs retain every effect', () => {
    const h = harness({ supported: false });
    h.mount();
    assert.deepEqual(h.values(), ['true', 'true']);
    h.hide(true);
    assert.deepEqual(h.values(), ['false', 'false']);
    h.hide(false);
    assert.deepEqual(h.values(), ['true', 'true']);
    h.unmount();
});

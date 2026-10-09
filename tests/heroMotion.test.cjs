const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

test('scroll keeps the original visual motion, batches events and stops writes below the hero', () => {
    const source = fs.readFileSync(path.join(__dirname, '../pages/index.vue'), 'utf8');
    const functions = source.slice(source.indexOf('function setHeroProgress('), source.indexOf('function moveCard('));
    let top = -500, reads = 0, writes = 0, sequence = 0;
    const tasks = new Map(), styles = {};
    const context = {
        progress: -1, motionEnabled: { value: true },
        hero: { value: { getBoundingClientRect() { reads++; return { top, height: 1000 }; } } },
        heroContent: { value: { style: new Proxy(styles, { set(target, key, value) { writes++; target[key] = value; return true; } }) } },
        requestAnimationFrame: fn => { tasks.set(++sequence, fn); return sequence; },
    };
    vm.runInNewContext(ts.transpileModule(functions, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
    function flush() { for (const [id, fn] of tasks) { tasks.delete(id); fn(); } }
    for (let i = 0; i < 100; i++) context.scheduleScene();
    assert.equal(tasks.size, 1);
    flush();
    assert.equal(reads, 1); assert.equal(writes, 2);
    assert.equal(styles.transform, 'translateY(35px) scale(0.96)');
    assert.equal(styles.opacity, '0.6');
    top = -1500; context.scheduleScene(); flush();
    assert.equal(styles.transform, 'translateY(70px) scale(0.92)');
    const completedWrites = writes;
    for (let i = 0; i < 10; i++) { top -= 100; context.scheduleScene(); flush(); }
    assert.equal(writes, completedWrites);
    context.setHeroProgress(0);
    assert.equal(styles.transform, 'translateY(0px) scale(1)');
    assert.equal(styles.opacity, '1');
    context.motionEnabled.value = false;
    context.scheduleScene(); flush();
    assert.equal(styles.opacity, '1');
});

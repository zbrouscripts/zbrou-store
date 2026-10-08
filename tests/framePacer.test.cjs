const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../utils/framePacer.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {} };
vm.runInNewContext(js, context);
const { createFramePacer } = context.exports;

for (const hz of [60, 75, 90, 120, 144, 165]) {
    test(`keeps 30 FPS and real movement at ${hz} Hz with timing jitter`, () => {
        const pacer = createFramePacer();
        const rendered = [];
        let elapsed = 0;
        for (let i = 0; i < hz * 20; i++) {
            const timestamp = 1000 + i * 1000 / hz + 0.2 * Math.sin(i * 1.7);
            const dt = pacer.sample(timestamp);
            if (dt !== null) { rendered.push(timestamp); elapsed += dt; }
        }
        assert.ok(Math.abs(rendered.length / 20 - 30) < 0.1, 'must not drift down to 20–25 FPS');
        assert.ok(Math.abs(elapsed - (rendered.at(-1) - rendered[0]) / 1000) < 0.00001, 'fractional frame time must not accelerate movement');
        assert.ok(rendered.slice(1).every((time, i) => time - rendered[i] >= 1000 / 30 - 1000 / hz - 0.5), 'must spread draws across refreshes');
    });
}

test('a stalled tab renders once, bounds movement and never bursts to catch up', () => {
    const pacer = createFramePacer();
    assert.equal(pacer.sample(0), 0);
    assert.equal(pacer.sample(16), null);
    assert.equal(pacer.sample(1000), 0.08);
    assert.equal(pacer.sample(1000), null);
    assert.equal(pacer.sample(1016), null);
    assert.notEqual(pacer.sample(1034), null);
});

test('pause and resume starts a fresh clock without a jump', () => {
    const pacer = createFramePacer();
    pacer.sample(1000); pacer.sample(1034);
    pacer.reset();
    assert.equal(pacer.sample(60000), 0);
    assert.equal(pacer.sample(60016), null);
    assert.ok(Math.abs(pacer.sample(60034) - 0.034) < 0.00001);
});

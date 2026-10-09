const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../utils/pointerMotion.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const scope = { exports: {} };
vm.runInNewContext(js, scope);
const { createProductMotion, followPointer } = scope.exports;

function setup() {
    const tasks = new Map();
    let sequence = 0, timestamp = 0, enabled = true, scroll = { x: 0, y: 600 };
    const motion = createProductMotion(() => enabled, {
        requestFrame(fn) { tasks.set(++sequence, fn); return sequence; },
        cancelFrame(id) { tasks.delete(id); }, scroll: () => scroll,
    });
    function node() {
        let reads = 0;
        const classes = new Set();
        const shine = { style: { removeProperty(key) { delete this[key]; } } };
        return {
            style: { removeProperty(key) { delete this[key]; } }, shine, classes,
            classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
            getBoundingClientRect() { reads++; return { left: 100, top: 200, width: 300, height: 450 }; },
            querySelector() { return shine; }, reads: () => reads,
        };
    }
    return { motion, tasks, node,
        move(node, x, y, type = 'mouse') { motion.move({ currentTarget: node, clientX: x, clientY: y, pointerType: type }); },
        flush(seconds = 1 / 60) { timestamp += seconds * 1000; for (const [id, fn] of [...tasks]) { tasks.delete(id); fn(timestamp); } },
        settle() { for (let i = 0; i < 60 && tasks.size; i++) this.flush(); assert.equal(tasks.size, 0, 'no idle animation loop'); },
        disable() { enabled = false; }, scroll(value) { scroll = value; },
    };
}

test('reflection follows the newest position immediately while tilt eases briefly without a catch-up queue', () => {
    const h = setup(), node = h.node();
    for (let i = 0; i < 100; i++) h.move(node, 120 + i, 240 + i);
    assert.equal(h.tasks.size, 1);
    assert.equal(node.reads(), 0);
    assert.equal(node.style.transform, undefined);
    h.flush();
    assert.equal(node.reads(), 1);
    assert.equal(node.shine.style.transform, 'translate3d(-131px,-111px,0)');
    const targetX = (139 / 450 - .5) * -4, targetY = (119 / 300 - .5) * 5;
    assert.equal(node.style.transform, `perspective(850px) rotateX(${followPointer(0, targetX, 1 / 60)}deg) rotateY(${followPointer(0, targetY, 1 / 60)}deg)`);
    assert.equal(node.classes.has('zb-product--tracking'), true);
    assert.equal(h.tasks.size, 1);
    h.move(node, 370, 590); h.flush();
    assert.equal(node.reads(), 1);
    assert.equal(node.shine.style.transform, 'translate3d(20px,140px,0)');
    h.settle();
    assert.equal(node.style.transform, `perspective(850px) rotateX(${(390 / 450 - .5) * -4}deg) rotateY(${(270 / 300 - .5) * 5}deg)`);
    assert.equal(node.reads(), 1);
});

test('scroll moves the pointer origin without measuring already tilted geometry again', () => {
    const h = setup(), node = h.node();
    h.move(node, 250, 350); h.flush();
    assert.equal(node.shine.style.transform, 'translate3d(-100px,-100px,0)');
    h.scroll({ x: 0, y: 680 });
    h.move(node, 250, 270); h.flush();
    assert.equal(node.shine.style.transform, 'translate3d(-100px,-100px,0)');
    assert.equal(node.reads(), 1);
});

test('leaving cancels pending input and restores the original CSS return animation', () => {
    const h = setup(), node = h.node();
    h.move(node, 250, 350); h.flush();
    h.move(node, 350, 550); h.motion.reset(); h.flush();
    assert.equal(h.tasks.size, 0);
    assert.equal(node.style.transform, undefined);
    assert.equal(node.shine.style.transform, undefined);
    assert.equal(node.classes.size, 0);
    h.move(node, 200, 300); h.flush();
    assert.equal(node.reads(), 2);
});

test('switching cards releases the old layer and uses only the last card in a frame', () => {
    const h = setup(), first = h.node(), second = h.node();
    h.move(first, 250, 350); h.flush();
    h.move(first, 200, 300); h.move(second, 300, 400); h.flush();
    assert.equal(first.style.transform, undefined);
    assert.equal(first.shine.style.transform, undefined);
    assert.equal(first.classes.size, 0);
    assert.equal(second.classes.has('zb-product--tracking'), true);
    assert.equal(second.reads(), 1);
});

test('pause drops queued work and touch input does not start pointer animations', () => {
    const h = setup(), node = h.node();
    h.move(node, 250, 350, 'touch'); assert.equal(h.tasks.size, 0);
    h.move(node, 250, 350); h.flush();
    h.move(node, 350, 550); h.disable(); h.flush();
    assert.equal(node.style.transform, undefined);
    assert.equal(node.classes.size, 0);
    h.move(node, 250, 350); assert.equal(h.tasks.size, 0);
});

test('pointer positions near projected edges cannot tilt a card beyond its original range', () => {
    const h = setup(), node = h.node();
    h.move(node, 80, 180); h.settle();
    assert.equal(node.style.transform, 'perspective(850px) rotateX(2deg) rotateY(-2.5deg)');
    h.move(node, 420, 680); h.settle();
    assert.equal(node.style.transform, 'perspective(850px) rotateX(-2deg) rotateY(2.5deg)');
});

test('card tilt easing has the same brief response across refresh rates and never overshoots', () => {
    for (const hz of [30, 60, 90, 120, 144, 165]) {
        let value = 0, elapsed = 0;
        while (elapsed < .1) { const dt = Math.min(1 / hz, .1 - elapsed); value = followPointer(value, 45, dt); elapsed += dt; }
        assert.ok(Math.abs(value - 45 * (1 - Math.exp(-.1 / .035))) < 1e-10);
        assert.ok(value / 45 > .94);
    }
    assert.equal(followPointer(0, 45, 0), 0);
    assert.equal(followPointer(0, 45, -1), 0);
    assert.ok(followPointer(0, 45, 2) <= 45);
    assert.ok(followPointer(45, -45, .1) >= -45);
});

test('sustained input and reversal keep a single bounded loop that stops after settling', () => {
    const h = setup(), node = h.node();
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 20; j++) h.move(node, i % 2 ? 370 : 130, 425);
        assert.equal(h.tasks.size, 1);
        h.flush();
        assert.ok(h.tasks.size <= 1);
    }
    assert.equal(node.reads(), 1);
    h.move(node, 130, 425); h.settle();
    assert.equal(node.shine.style.transform, 'translate3d(-220px,-25px,0)');
    assert.equal(node.style.transform, 'perspective(850px) rotateX(0deg) rotateY(-2deg)');
});

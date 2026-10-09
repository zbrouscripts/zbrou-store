const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const source=fs.readFileSync(path.join(__dirname,'../utils/auroraTexture.ts'),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function setup(supported=true){
 const commands=[],stops=[];let draws=0,created=0;
 const paint={setTransform:(...v)=>commands.push(['resolution',...v]),translate:(...v)=>commands.push(['center',...v]),scale:(...v)=>commands.push(['ellipse',...v]),createRadialGradient:()=>({addColorStop:(...v)=>stops.push(v)}),fillRect(){}};
 const context=supported?{filter:'none',drawImage(){draws++;}}:{drawImage(){throw new Error('unsupported context must use CSS fallback')}};
 const canvas={getContext:()=>context};
 const globals={exports:{},document:{createElement:()=>{created++;return{getContext:()=>paint};}}};
 vm.runInNewContext(js,globals);return{canvas,commands,stops,render:globals.exports.renderAuroraTexture,draws:()=>draws,created:()=>created};
}
test('aurora cache preserves CSS ellipse, colors and halo while filtering just once per size',()=>{
 const h=setup();assert.equal(h.render(h.canvas,1440,702,'#416ee5'),true);
 assert.equal(h.canvas.width,975);assert.equal(h.canvas.height,606);
 assert.deepEqual(h.commands[0],['resolution',.5,0,0,.5,0,0]);
 assert.deepEqual(h.commands[1],['center',975,606]);
 assert.deepEqual(h.commands[2],['ellipse',1440/Math.SQRT2,702/Math.SQRT2]);
 assert.deepEqual(h.stops,[[0,'#416ee5'],[.68,'transparent']]);
 assert.equal(h.render(h.canvas,1440,702,'#416ee5'),true);assert.equal(h.draws(),1);assert.equal(h.created(),1);
 assert.equal(h.render(h.canvas,960,600,'#416ee5'),true);assert.equal(h.draws(),2);
});
test('an unsupported canvas filter retains the existing CSS blur fallback',()=>{
 const h=setup(false);assert.equal(h.render(h.canvas,580,500,'#277d98'),false);assert.equal(h.created(),0);
});

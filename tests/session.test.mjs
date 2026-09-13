import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {MusicBrain} from '../core.js';
const graph=JSON.parse(fs.readFileSync(new URL('../data/connectome.json',import.meta.url)));
const settings={bpm:128,root:0,scale:'Minor',length:16,density:68,mutation:42,accent:75,slide:33};
const brain=new MusicBrain(graph);
const pattern={settings,steps:brain.generate(settings,303),seed:303};
const fixture=()=>({version:1,graphVersion:graph.version,pattern,slots:[pattern,null,null,null],brain:brain.export(),frozen:true,learned:2,tone:{cutoff:2400,resonance:9.2,volume:.13,decay:.4,delayTime:.3,feedback:.35,wet:.2,delaySync:.75,kickLevel:.5,kickOn:1}});
test('session round trip preserves tone, slots and learned readout',async()=>{
 const {validateSession}=await import('../session.js');
 const input=JSON.parse(JSON.stringify(fixture())),result=validateSession(input,graph);
 assert.deepEqual(result,input);result.pattern.steps[0].gate=!result.pattern.steps[0].gate;
 assert.notDeepEqual(result.pattern,input.pattern);
});
test('legacy sessions receive default tone; invalid tone and seed are rejected',async()=>{
 const {validateSession}=await import('../session.js');
 const old=fixture();delete old.tone;
 assert.deepEqual(validateSession(old,graph).tone,{cutoff:1100,resonance:7,volume:.22,decay:.24,delayTime:.3,feedback:.35,wet:.2,delaySync:.75,kickLevel:.5,kickOn:1});
 for(const tone of [null,{cutoff:0,resonance:7,volume:.2},{cutoff:1100,resonance:Infinity,volume:.2},{cutoff:1100,resonance:7,volume:2}])assert.throws(()=>validateSession({...fixture(),tone},graph));
 assert.throws(()=>validateSession({...fixture(),pattern:{...pattern,seed:'oops'}},graph));
 assert.throws(()=>validateSession({...fixture(),slots:[null]},graph));
});

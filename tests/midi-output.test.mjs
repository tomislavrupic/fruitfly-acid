import test from 'node:test';
import assert from 'node:assert/strict';
test('port refresh preserves the selected output and never switches to an unrelated device',async()=>{
 const {retainedOutput}=await import('../midi-output.js');
 const chosen={id:'a',state:'connected'},other={id:'b',state:'connected'};
 assert.equal(retainedOutput(new Map([['a',chosen],['b',other]]),chosen),chosen);
 assert.equal(retainedOutput(new Map([['b',other]]),chosen),null);
 assert.equal(retainedOutput(new Map([['a',{...chosen,state:'disconnected'}]]),chosen),null);
 assert.equal(retainedOutput(new Map([['b',other]]),null),null);
});

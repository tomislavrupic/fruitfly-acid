import test from 'node:test';import assert from 'node:assert/strict';
class Control extends EventTarget{constructor(value=50){super();this.value=String(value);this.min='0';this.max='100';this.step='1';this.attrs={};this.style={setProperty(){}};}setAttribute(k,v){this.attrs[k]=String(v);}setPointerCapture(){}focus(){}}
function send(el,type,props){const e=new Event(type,{cancelable:true});Object.assign(e,props);el.dispatchEvent(e);}
test('dial drag updates its range, commits once and supports keyboard limits',async()=>{
 const {bindDial}=await import('../knob.js');const dial=new Control(),input=new Control();let updates=0,commits=0;input.addEventListener('input',()=>updates++);input.addEventListener('change',()=>commits++);bindDial(dial,input,'Density');
 send(dial,'pointerdown',{button:0,pointerId:1,clientY:100});send(dial,'pointermove',{pointerId:1,clientY:40});send(dial,'pointerup',{pointerId:1});assert.equal(Number(input.value),100);assert.equal(commits,1);assert.ok(updates>0);assert.equal(dial.attrs['aria-valuenow'],'100');
 send(dial,'keydown',{key:'Home'});assert.equal(Number(input.value),0);send(dial,'keydown',{key:'ArrowUp'});assert.equal(Number(input.value),1);assert.equal(commits,3);
});

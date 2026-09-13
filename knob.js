export function bindDial(dial,input,label){
 const min=Number(input.min),max=Number(input.max),step=Number(input.step)||1;
 dial.tabIndex=0;dial.setAttribute('role','slider');dial.setAttribute('aria-label',label);dial.setAttribute('aria-valuemin',min);dial.setAttribute('aria-valuemax',max);dial.setAttribute('aria-orientation','vertical');dial.title='Drag up/down · arrow keys · Shift for fine adjustment';
 const sync=()=>{const value=Number(input.value),fraction=(value-min)/(max-min);dial.setAttribute('aria-valuenow',value);dial.style.setProperty('--arc',fraction*270+'deg');dial.style.setProperty('--angle',fraction*270-135+'deg');};
 const set=value=>{const next=Math.min(max,Math.max(min,min+Math.round((value-min)/step)*step));if(Number(input.value)===next)return;input.value=String(Number(next.toFixed(6)));input.dispatchEvent(new Event('input',{bubbles:true}));sync();};
 let drag=null;
 dial.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();dial.focus();dial.setPointerCapture(e.pointerId);drag={id:e.pointerId,y:e.clientY,value:Number(input.value),initial:input.value};});
 dial.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const delta=(drag.y-e.clientY)*(max-min)/120*(e.shiftKey?.1:1);drag.value=Math.min(max,Math.max(min,drag.value+delta));set(drag.value);drag.y=e.clientY;});
 const finish=e=>{if(!drag||e.pointerId!==drag.id)return;const changed=input.value!==drag.initial;drag=null;if(changed)input.dispatchEvent(new Event('change',{bubbles:true}));};
 for(const event of ['pointerup','pointercancel','lostpointercapture'])dial.addEventListener(event,finish);
 dial.addEventListener('keydown',e=>{const value=Number(input.value),increment=step*(e.shiftKey?10:1);let next;if(e.key==='Home')next=min;else if(e.key==='End')next=max;else if(['ArrowUp','ArrowRight'].includes(e.key))next=value+increment;else if(['ArrowDown','ArrowLeft'].includes(e.key))next=value-increment;else return;e.preventDefault();set(next);if(Number(input.value)!==value)input.dispatchEvent(new Event('change',{bubbles:true}));});
 input.addEventListener('input',sync);sync();return sync;
}

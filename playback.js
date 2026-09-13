export function chainFrame(patterns,loop,step){
 const slot=loop%4===3?1:0,pattern=patterns[slot];
 if(!pattern?.steps.length)throw Error('Save A1 and A2 before using AAAB');
 return {slot,pattern,next:step+1===pattern.steps.length?{loop:loop+1,step:0}:{loop,step:step+1}};
}
export function splitPattern(pattern){
 const half=pattern.steps.length/2;
 return [0,half].map(start=>({...structuredClone(pattern),settings:{...pattern.settings,length:half},steps:structuredClone(pattern.steps.slice(start,start+half))}));
}

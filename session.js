import {MusicBrain,SCALES} from './core.js';
export const DEFAULT_TONE=Object.freeze({cutoff:1100,resonance:7,volume:.22,decay:.24,delayTime:.3,feedback:.35,wet:.2,delaySync:.75,kickLevel:.5,kickOn:1});
export function validatePattern(p,graph){if(!p||!Number.isInteger(p.seed)||p.seed<0||p.seed>4294967295||!p.settings||![16,32].includes(p.settings.length)||!SCALES[p.settings.scale]||!Number.isInteger(p.settings.root)||p.settings.root<0||p.settings.root>11||!Array.isArray(p.steps)||p.steps.length!==p.settings.length)throw Error('Invalid pattern');for(const [k,a,b] of [['bpm',40,240],['density',0,100],['mutation',0,100],['accent',0,100],['slide',0,100]])if(!Number.isFinite(p.settings[k])||p.settings[k]<a||p.settings[k]>b)throw Error('Invalid pattern controls');for(const s of p.steps){if(!Number.isInteger(s.degree)||s.degree<0||s.degree>6||['gate','accent','slide','locked'].some(k=>typeof s[k]!=='boolean')||!Array.isArray(s.features)||s.features.length!==21||s.features.some(x=>!Number.isFinite(x)||Math.abs(x)>5)||!Array.isArray(s.activity)||s.activity.length!==graph.nodes.length||s.activity.some(x=>!Number.isFinite(x)||Math.abs(x)>1.01))throw Error('Invalid step data');}return structuredClone(p);}
export function validateSession(d,graph){
 if(!d||d.version!==1||d.graphVersion!==graph.version||!Array.isArray(d.slots)||d.slots.length!==4)throw Error('Incompatible session');
 if(d.tone?.delaySync!==undefined&&![0,.25,.5,.75,1].includes(d.tone.delaySync))throw Error('Invalid delay sync');
 const pattern=validatePattern(d.pattern,graph),slots=d.slots.map(s=>s===null?null:validatePattern(s,graph));
 const brain=new MusicBrain(graph,d.brain).export();
 const tone=d.tone===undefined?{...DEFAULT_TONE}:d.tone===null?null:{decay:DEFAULT_TONE.decay,delayTime:.3,feedback:.35,wet:.2,delaySync:.75,kickLevel:.5,kickOn:1,...d.tone};
 for(const [key,min,max] of [['cutoff',100,5000],['resonance',0,15],['volume',0,.65],['decay',.05,1.5],['delayTime',.02,1.5],['feedback',0,.85],['wet',0,1],['kickLevel',0,1],['kickOn',0,1]]){
  if(!tone||!Number.isFinite(tone[key])||tone[key]<min||tone[key]>max)throw Error('Invalid synth tone');
 }
 return {version:1,graphVersion:graph.version,pattern,slots,brain,tone:structuredClone(tone),frozen:d.frozen===true,learned:Number.isSafeInteger(d.learned)?Math.max(0,d.learned):0};
}

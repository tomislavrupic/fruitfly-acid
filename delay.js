export class DelayFX{
 constructor(context,source,output){this.context=context;this.source=source;this.output=output;this.dry=context.createGain();this.wet=context.createGain();this.delay=context.createDelay(1.5);this.feedback=context.createGain();source.connect(this.dry).connect(output);source.connect(this.delay).connect(this.wet).connect(output);this.delay.connect(this.feedback).connect(this.delay);this.set(.3,.35,.2);}
 set(time,feedback,mix){const t=this.context.currentTime;for(const [param,value] of [[this.delay.delayTime,Math.max(.02,Math.min(1.5,time))],[this.feedback.gain,Math.max(0,Math.min(.85,feedback))],[this.dry.gain,1-Math.max(0,Math.min(1,mix))],[this.wet.gain,Math.max(0,Math.min(1,mix))]])param.setTargetAtTime(value,t,.025);}
 stop(){const t=this.context.currentTime;this.feedback.gain.setTargetAtTime(0,t,.01);this.wet.gain.setTargetAtTime(0,t,.01);}
 dispose(){this.source.disconnect(this.dry);this.source.disconnect(this.delay);for(const n of [this.dry,this.delay,this.feedback,this.wet])n.disconnect();}
}
export function delaySeconds(bpm,division,manual){return division===0?manual:60/bpm*division;}

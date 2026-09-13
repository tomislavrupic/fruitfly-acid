export class Kick{
 constructor(context,output){this.context=context;this.output=output;this.voices=new Set();}
 hit(time,level){if(level<=0)return;const c=this.context,osc=c.createOscillator(),amp=c.createGain(),voice={osc,amp};osc.type='sine';osc.frequency.setValueAtTime(155,time);osc.frequency.exponentialRampToValueAtTime(48,time+.055);osc.frequency.exponentialRampToValueAtTime(42,time+.3);amp.gain.setValueAtTime(.0001,time);amp.gain.exponentialRampToValueAtTime(level*.7,time+.003);amp.gain.exponentialRampToValueAtTime(.0001,time+.38);osc.connect(amp);amp.connect(this.output);this.voices.add(voice);osc.onended=()=>{osc.disconnect();amp.disconnect();this.voices.delete(voice);};osc.start(time);osc.stop(time+.4);}
 stop(){for(const {osc,amp} of this.voices){try{osc.stop(this.context.currentTime);}catch{}osc.disconnect();amp.disconnect();}this.voices.clear();}
}

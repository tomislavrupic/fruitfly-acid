// A port-list refresh must never silently change the user's destination.
export function retainedOutput(outputs,previous){
 const output=previous?outputs.get(previous.id):null;
 return output?.state==='connected'?output:null;
}

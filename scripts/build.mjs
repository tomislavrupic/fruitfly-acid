import {mkdir,rm,copyFile,cp,writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','audio.js','core.js','delay.js','kick.js','knob.js','midi-output.js','playback.js','session.js'])await copyFile(file,`dist/${file}`);
await mkdir('dist/assets');await copyFile('assets/fly-concept-v1.png','dist/assets/fly-concept-v1.png');await copyFile('assets/social-card-v1.png','dist/assets/social-card-v1.png');await cp('data','dist/data',{recursive:true});await writeFile('dist/.nojekyll','');
console.log('Built static site in dist/');

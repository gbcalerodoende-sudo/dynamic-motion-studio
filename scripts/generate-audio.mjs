import fs from "node:fs";
import path from "node:path";

const rate=44100,seconds=24,frames=rate*seconds,channels=2;
const bytes=Buffer.alloc(44+frames*channels*2);
function chunk(s,n){bytes.write(s,n,"ascii")}
chunk("RIFF",0);bytes.writeUInt32LE(bytes.length-8,4);chunk("WAVE",8);
chunk("fmt ",12);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);
bytes.writeUInt16LE(channels,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*channels*2,28);
bytes.writeUInt16LE(channels*2,32);bytes.writeUInt16LE(16,34);
chunk("data",36);bytes.writeUInt32LE(frames*channels*2,40);

const tau=Math.PI*2;
const bpm=120,quarter=60/bpm;
const note=(n)=>440*Math.pow(2,(n-69)/12);
const padChords=[
 [57,60,64],[53,57,60],[48,52,55],[55,59,62],
 [57,60,64],[53,57,60]
];
const freq=padChords.map(c=>c.map(note));
const bass=[45,41,36,43,45,41].map(note);
const hash=x=>{const q=Math.sin(x*127.1+19.35)*43758.5453;return (q-Math.floor(q))*2-1};
const smooth=x=>x*x*(3-2*x);
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));

for(let i=0;i<frames;i++){
 const t=i/rate;
 const beat=t/quarter,bt=Math.floor(beat),bp=(beat-bt)*quarter;
 const bar=Math.min(5,Math.floor(t/4));
 const c=freq[bar],bassFreq=bass[bar];
 const intro=clamp((t-.15)/3.3,0,1),fade=clamp((seconds-t)/1.4,0,1);
 let pad=0;
 for(let k=0;k<3;k++){
  const f=c[k]||220;
  const wobble=Math.sin(t*(.28+k*.13)*tau)*.007;
  pad+=Math.sin((t*f*(1+wobble))*tau)*.12+Math.sin((t*f*.503)*tau)*.035;
 }
 pad*=.52+Math.sin(t*.3)*.1;
 const eighth=t/(quarter/2),eh=Math.floor(eighth),eph=(eighth-eh)*(quarter/2);
 const noise=hash(i*1.2);
 const kick=bp<.28?Math.sin(tau*(75*bp-43*bp*bp))*Math.exp(-bp*22)*.65:0;
 const clap=(bt%4===1||bt%4===3)&&bp<.16?(noise*.24+Math.sin(tau*180*bp)*.08)*Math.exp(-bp*28):0;
 const hat=eph<.085?hash(i*7+eh*13)*.11*Math.exp(-eph*45):0;
 const bassBeat=t%quarter;
 const sub=Math.sin(tau*bassFreq*t)*Math.exp(-bassBeat*2.3)*.20;
 const synth=(Math.sin(tau*note(81)*t)+Math.sin(tau*note(84)*t))*.045*(.5+.5*Math.sin(tau*t*.5));
 let transition=0;
 for(const cut of [4,8.5,13.5,18.5]){
  const dt=t-cut;
  if(dt>-.3&&dt<.4){
   const x=dt+.3,amp=dt<0?x/.3:(.4-dt)/.4;
   transition+=hash(Math.floor(t*rate/9))*.19*amp+Math.sin(tau*(220+x*300)*x)*.08*amp;
  }
 }
 const drive=intro*(kick+clap+hat+sub),mix=pad*(.45+intro*.2)+drive+synth*.8+transition;
 const limiter=Math.tanh(mix*.95)*fade;
 const l=clamp(limiter*(.96+.04*Math.sin(t*.63)), -1,1);
 const r=clamp(limiter*(.96-.04*Math.sin(t*.63)), -1,1);
 bytes.writeInt16LE(Math.round(l*32760),44+i*4);
 bytes.writeInt16LE(Math.round(r*32760),46+i*4);
}
const dir=path.resolve("public");fs.mkdirSync(dir,{recursive:true});
const file=path.join(dir,"original-score.wav");
fs.writeFileSync(file,bytes);
console.log("Generated original 24s soundtrack:",file,(bytes.length/1024/1024).toFixed(2)+" MB");

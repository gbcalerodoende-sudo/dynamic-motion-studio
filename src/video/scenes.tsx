import type {CSSProperties,ReactNode} from "react";
import {AbsoluteFill,interpolate,Easing,spring,useCurrentFrame} from "remotion";
import type {MotionProps,Palette} from "./config";
import {AccentLine,BottomIndex,EdgeIcon,OrbitRing,SceneFade,SectionTag,TextReveal,Texture,TinyHeader,bound,enter,mono,sans,seeded,springIn,textGrad,textStroke} from "./art";

type SceneProps={data:MotionProps;palette:Palette;duration:number};
const baseTitle:CSSProperties={fontFamily:sans,fontWeight:950,lineHeight:.92,letterSpacing:-9,textTransform:"uppercase",margin:0,overflowWrap:"anywhere"};
const smallCopy:CSSProperties={fontFamily:mono,fontSize:27,letterSpacing:3.5,fontWeight:700,lineHeight:1.65};
const safeWords=(value:string)=>{const words=value.split(/\s+/),split=Math.ceil(words.length/2);return [words.slice(0,split).join(" "),words.slice(split).join(" ")||"EM MOVIMENTO"]};
const staged=(frame:number,duration:number)=>({opacity:enter(frame,0,15)* (1-enter(frame,duration-20,20))});
const SignalBar=({palette,frame}:{palette:Palette,frame:number})=><div style={{display:"flex",alignItems:"center",gap:7,height:45}}>
  {Array.from({length:18},(_,i)=><span key={i} style={{width:5,height:8+Math.abs(Math.sin(i*2.31+frame*.15))*38,background:i%3===0?palette.secondary:palette.primary,boxShadow:"0 0 8px "+palette.primary+"55"}}/>)}
</div>;

export const SceneIntro=({data,palette,duration}:SceneProps)=>{
 const frame=useCurrentFrame(),[first,second]=safeWords(data.headline);
 const pulse=1+Math.sin(frame*.054)*.018;
 return <SceneFade duration={duration}><Texture palette={palette} frame={frame} density={84}/>
  <TinyHeader palette={palette} label="DYNAMIC MOTION STUDIO" chapter="01"/>
  <div style={{position:"absolute",left:-440,top:200,width:1860,height:1460,opacity:.5,transform:"scale("+pulse+")"}}>
   <OrbitRing palette={palette} diameter={1400} frame={frame} top={80} left={-15} opacity={.28}/>
   <OrbitRing palette={palette} diameter={900} frame={-frame*2} top={320} left={240} opacity={.42} dashed/>
  </div>
  <div style={{position:"absolute",width:790,height:790,top:330,left:128,opacity:enter(frame,2,70)*.65,filter:"blur(1px)",transform:"rotate("+(frame*.11)+"deg)"}}>
   <svg viewBox="0 0 800 800" width="100%" height="100%"><defs><linearGradient id="intro-grad"><stop stopColor={palette.primary}/><stop offset="1" stopColor={palette.secondary}/></linearGradient></defs>
    <polygon points="400,55 725,400 400,745 75,400" fill="none" stroke="url(#intro-grad)" strokeWidth="3"/>
    <polygon points="400,190 605,400 400,610 190,400" fill={palette.background+"cc"} stroke="url(#intro-grad)" strokeWidth="2"/>
    <circle cx="400" cy="400" r="240" fill="none" stroke={palette.primary} strokeWidth="1" strokeDasharray="4 17"/>
    <circle cx="400" cy="400" r="120" fill={palette.primary+"18"} stroke={palette.secondary} strokeWidth="2"/>
   </svg>
  </div>
  <div style={{position:"absolute",left:85,top:490,right:85}}>
   <TextReveal frame={frame} delay={8}><SectionTag palette={palette}>{data.kicker}</SectionTag></TextReveal>
   <div style={{marginTop:65,position:"relative"}}>
    <TextReveal frame={frame} delay={25}><div style={{...baseTitle,color:palette.light,fontSize:141,textShadow:"0 4px 30px #020309a8",maxWidth:910}}>{first}</div></TextReveal>
    <TextReveal frame={frame} delay={39}><div style={{...baseTitle,...textGrad("linear-gradient(110deg,"+palette.primary+" 7%,"+palette.secondary+" 95%)"),fontSize:146,marginTop:12,maxWidth:940,filter:"drop-shadow(0 0 35px "+palette.primary+"5c)"}}>{second}</div></TextReveal>
   </div>
   <div style={{marginTop:54}}><AccentLine palette={palette} width={690} progress={enter(frame,48,40)}/></div>
   <TextReveal frame={frame} delay={67}><div style={{fontFamily:mono,fontSize:26,color:palette.muted,letterSpacing:5.1,marginTop:38,lineHeight:1.8}}>{data.subhead}</div></TextReveal>
  </div>
  <div style={{position:"absolute",left:91,right:91,top:1460,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
   <div style={{fontFamily:mono,color:palette.secondary,fontSize:17,letterSpacing:3}}>DESIGN · MOVIMENTO · EMOÇÃO</div>
   <SignalBar frame={frame} palette={palette}/>
  </div>
  <div style={{position:"absolute",bottom:310,right:65,fontSize:330,fontWeight:950,fontFamily:sans,lineHeight:1,...textStroke(palette.primary+"28"),transform:"rotate(-90deg) translateX(195px)",opacity:.38}}>01</div>
  <BottomIndex palette={palette} index="01" frame={frame}/>
 </SceneFade>;
};

const GlassCard=({palette,frame}:{palette:Palette,frame:number})=>{
 const tiltY=-11+Math.sin(frame*.023)*8,tiltX=5+Math.sin(frame*.015)*5;
 const bob=Math.sin(frame*.038)*23;
 const style:CSSProperties={background:"linear-gradient(150deg,"+palette.primary+"33,#121326ee 43%,#070816)",boxShadow:"0 50px 135px #000b,inset 0 1px 1px #ffffff35,0 0 120px "+palette.primary+"42",border:"2px solid "+palette.primary+"90"};
 return <div style={{position:"absolute",left:225,top:575,width:650,height:850,transform:"perspective(1500px) rotateY("+tiltY+"deg) rotateX("+tiltX+"deg) translateY("+bob+"px)",transformStyle:"preserve-3d"}}>
  <div style={{position:"absolute",inset:0,borderRadius:36,...style,overflow:"hidden",padding:29}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid "+palette.primary+"44",paddingBottom:24}}>
    <span style={{fontFamily:mono,fontSize:19,letterSpacing:3,color:palette.light}}>LIVE / COMPOSITION</span>
    <div style={{display:"flex",gap:8}}>{[1,2,3].map(i=><span key={i} style={{width:13,height:13,borderRadius:"50%",background:i===1?palette.hot:i===2?palette.primary:palette.secondary}}/>)}</div>
   </div>
   <div style={{position:"relative",height:466,marginTop:28,borderRadius:16,background:"radial-gradient(circle at 50% 47%,"+palette.primary+"67,#100f24 53%,#080a16)",border:"1px solid "+palette.primary+"66",overflow:"hidden"}}>
    {Array.from({length:5},(_,i)=><div key={i} style={{position:"absolute",top:55+i*33,left:89+i*21,right:89+i*21,bottom:55+i*33,border:"2px solid "+(i%2?palette.secondary:palette.primary),transform:"rotate("+(frame*.26+i*17)+"deg)",opacity:.42,borderRadius:12,boxShadow:"0 0 22px "+palette.primary+"66"}}/>)}
    <div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",textAlign:"center",filter:"drop-shadow(0 0 15px "+palette.primary+"77)"}}>
      <div><div style={{fontFamily:sans,fontSize:105,lineHeight:.9,color:palette.light,fontWeight:900,letterSpacing:-6}}>WOW.</div><div style={{fontFamily:mono,fontSize:19,letterSpacing:8,marginTop:20,color:palette.secondary}}>FRAME BY FRAME</div></div>
    </div>
    <span style={{position:"absolute",top:16,left:17,padding:"7px 9px",background:palette.secondary,color:palette.background,fontFamily:mono,fontSize:14,fontWeight:900}}>● REC</span>
   </div>
   <div style={{marginTop:26,display:"flex",justifyContent:"space-between",fontFamily:mono,color:palette.muted,fontSize:17,letterSpacing:2.5}}><span>ANIMATION TIMELINE</span><span>60 FPS</span></div>
   <div style={{marginTop:18,display:"flex",alignItems:"end",gap:8,height:105}}>
    {Array.from({length:30},(_,i)=><div key={i} style={{flex:1,height:21+Math.abs(Math.sin(i*.79+frame*.094))*70,background:i%5===0?palette.secondary:palette.primary,opacity:i%4===0?1:.56,borderRadius:4}}/>)}
   </div>
   <div style={{marginTop:10,height:7,background:palette.primary+"22",borderRadius:8,overflow:"hidden"}}><div style={{background:palette.secondary,height:"100%",width:((frame%90)/90*100)+"%",boxShadow:"0 0 15px "+palette.secondary}}/></div>
  </div>
 </div>;
};

export const SceneWorld=({data,palette,duration}:SceneProps)=>{
 const frame=useCurrentFrame();
 return <SceneFade duration={duration}><Texture palette={palette} frame={frame+240} density={95}/>
  <TinyHeader palette={palette} label="MOTION ENGINE / REAL-TIME" chapter="02"/>
  <div style={{position:"absolute",top:282,left:90,right:70}}>
   <TextReveal frame={frame} delay={6}><SectionTag palette={palette}>02 / POSSIBILIDADES</SectionTag></TextReveal>
   <TextReveal frame={frame} delay={20}><div style={{...baseTitle,color:palette.light,fontSize:116,marginTop:45}}>DO ZERO AO</div></TextReveal>
   <TextReveal frame={frame} delay={36}><div style={{...baseTitle,...textGrad("linear-gradient(95deg,"+palette.secondary+","+palette.primary+")"),fontSize:170,marginTop:4}}>WOW!</div></TextReveal>
  </div>
  <div style={{opacity:enter(frame,30,45),transform:"translateY("+(1-enter(frame,30,45))*110+"px)"}}><GlassCard palette={palette} frame={frame}/></div>
  <div style={{position:"absolute",top:930,left:53,transform:"rotate(-7deg) translateY("+Math.sin(frame*.035)*22+"px)",opacity:enter(frame,53,30),padding:"25px 30px",background:"#090b1ff0",border:"2px solid "+palette.secondary,boxShadow:"0 20px 45px #0009,0 0 42px "+palette.secondary+"55"}}>
   <div style={{fontFamily:mono,fontSize:18,color:palette.muted,letterSpacing:2}}>COMPOSIÇÃO</div><div style={{fontFamily:sans,color:palette.light,fontSize:37,fontWeight:900,marginTop:9}}>100% ORIGINAL</div><div style={{marginTop:14,width:248,height:6,background:palette.secondary}}/>
  </div>
  <div style={{position:"absolute",top:1120,right:29,transform:"rotate(7deg) translateY("+Math.cos(frame*.028)*18+"px)",opacity:enter(frame,66,30),padding:"24px 30px",background:"#0d1127f0",border:"2px solid "+palette.hot,boxShadow:"0 20px 45px #0009,0 0 44px "+palette.hot+"50"}}>
   <div style={{fontSize:25,color:palette.hot,fontFamily:mono,letterSpacing:2}}>✦ VISUAL EFFECTS</div><div style={{fontSize:62,fontFamily:sans,fontWeight:900,color:palette.light}}>ACTIVE</div>
  </div>
  <TextReveal frame={frame} delay={100} style={{position:"absolute",bottom:257,left:91,right:91}}><div style={{...smallCopy,color:palette.muted,fontSize:25}}>{data.subhead}<span style={{color:palette.secondary}}> ↗</span></div></TextReveal>
  <BottomIndex palette={palette} index="02" frame={frame+240}/>
 </SceneFade>;
};

const Chart=({palette,frame}:{palette:Palette,frame:number})=>{
 const p=bound((frame-90)/110);
 const path="M 60 500 C 130 480 180 550 260 430 S 400 400 455 310 S 600 280 666 200 S 770 172 850 65";
 return <svg width="890" height="620" viewBox="0 0 890 620" style={{overflow:"visible"}}>
  <defs>
   <linearGradient id="chart-line" x1="0" y1="1" x2="1" y2="0"><stop stopColor={palette.primary}/><stop offset=".65" stopColor={palette.secondary}/><stop offset="1" stopColor={palette.light}/></linearGradient>
   <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor={palette.secondary} stopOpacity=".26"/><stop offset="1" stopColor={palette.secondary} stopOpacity="0"/></linearGradient>
  </defs>
  {Array.from({length:5},(_,i)=><g key={i}><line x1="50" y1={60+i*125} x2="870" y2={60+i*125} stroke={palette.primary} strokeOpacity=".18" strokeWidth="2"/><text x="10" y={67+i*125} fontFamily={mono} fontSize="16" fill={palette.muted}>{(4-i)*25}</text></g>)}
  {Array.from({length:8},(_,i)=><text key={i} x={48+i*113} y="580" fill={palette.muted} fontFamily={mono} fontSize="16">0{i+1}</text>)}
  <path d={path+" L 850 560 L 60 560 Z"} fill="url(#chart-fill)" opacity={p}/>
  <path d={path} fill="none" stroke="url(#chart-line)" strokeWidth="13" strokeLinecap="round" strokeDasharray="1500" strokeDashoffset={1500*(1-p)} style={{filter:"drop-shadow(0 0 14px "+palette.secondary+"99)"}}/>
  <circle cx="850" cy="65" r={12+Math.sin(frame*.12)*3} fill={palette.light} opacity={p}/>
  <circle cx="850" cy="65" r="30" stroke={palette.secondary} strokeWidth="3" fill="none" opacity={p*.67}/>
 </svg>;
};
export const SceneNumbers=({data,palette,duration}:SceneProps)=>{
 const frame=useCurrentFrame();
 const count=Math.round(data.statValue*enter(frame,33,132));
 return <SceneFade duration={duration}><Texture palette={palette} frame={frame+510} density={80}/>
  <TinyHeader palette={palette} label="DATA / DESIGN / IMPACT" chapter="03"/>
  <div style={{position:"absolute",top:271,left:91,right:70}}>
    <TextReveal frame={frame} delay={8}><SectionTag palette={palette}>03 / VÍDEOS QUE PRENDEM</SectionTag></TextReveal>
    <TextReveal frame={frame} delay={23}><div style={{...baseTitle,color:palette.light,fontSize:113,marginTop:43}}>MOVIMENTO</div></TextReveal>
    <TextReveal frame={frame} delay={37}><div style={{...baseTitle,...textGrad("linear-gradient(95deg,"+palette.secondary+","+palette.primary+")"),fontSize:119,marginTop:5}}>QUE IMPACTA.</div></TextReveal>
  </div>
  <div style={{position:"absolute",top:665,left:91,right:91,display:"flex",alignItems:"baseline",gap:20}}>
   <span style={{fontFamily:sans,fontWeight:1000,letterSpacing:-15,fontSize:350,lineHeight:1,...textGrad("linear-gradient(105deg,"+palette.light+","+palette.secondary+")"),filter:"drop-shadow(0 0 30px "+palette.secondary+"53)"}}>{count}</span>
   <span style={{fontFamily:sans,fontSize:100,color:palette.hot,fontWeight:900}}>%</span>
  </div>
  <div style={{position:"absolute",top:1070,left:91,fontSize:28,fontFamily:mono,fontWeight:700,color:palette.muted,letterSpacing:3.5}}>{data.statLabel}</div>
  <div style={{position:"absolute",left:72,top:1200,opacity:enter(frame,76,35)}}><Chart palette={palette} frame={frame}/></div>
  <div style={{position:"absolute",top:1536,right:90,background:"#131b2bef",border:"1px solid "+palette.primary+"88",padding:"18px 23px",transform:"translateY("+Math.sin(frame*.027)*17+"px)",fontFamily:mono}}>
   <div style={{color:palette.muted,fontSize:16,letterSpacing:2}}>PROJEÇÃO VISUAL</div>
   <div style={{display:"flex",gap:15,alignItems:"center",marginTop:10}}><span style={{fontSize:42,fontWeight:900,color:palette.secondary}}>↗</span><b style={{fontSize:28,color:palette.light}}>CRESCIMENTO</b></div>
  </div>
  <BottomIndex palette={palette} index="03" frame={frame+510}/>
 </SceneFade>;
};

export const SceneKinetic=({data,palette,duration}:SceneProps)=>{
 const frame=useCurrentFrame();
 const section=Math.min(2,Math.floor(frame/100));
 return <SceneFade duration={duration}><Texture palette={palette} frame={frame+810} density={115}/>
  <TinyHeader palette={palette} label="KINETIC TYPOGRAPHY / 60FPS" chapter="04"/>
  <div style={{position:"absolute",left:91,right:91,top:300}}><SectionTag palette={palette}>04 / CADA FRAME CONTA</SectionTag></div>
  {[0,1,2].map((i)=>{
    const local=frame-i*100;
    const v=enter(local,0,20)*(1-enter(local,73,23));
    const scale=.7+.3*enter(local,0,21)+.22*enter(local,52,32);
    return <div key={i} style={{position:"absolute",left:30,top:560+i*63,right:30,height:480,
      opacity:v,transform:"rotate("+(i===1?-7:i===2?5:-3)+"deg) scale("+scale+") translateX("+(1-enter(local,0,19))*(i%2?200:-200)+"px)",transformOrigin:"50% 50%",filter:"drop-shadow(0 0 55px "+palette.primary+"73)",
      display:"grid",placeItems:"center",textAlign:"center"}}>
       <div style={{...baseTitle,fontSize:i===2?194:225,...(i===1?textStroke(palette.light):i===2?textGrad("linear-gradient(110deg,"+palette.secondary+","+palette.primary+")"):{color:palette.light}),lineHeight:1}}>{data.words[i]}</div>
     </div>
  })}
  <div style={{position:"absolute",left:-250,top:680,width:1540,height:720,pointerEvents:"none"}}>
    {Array.from({length:5},(_,i)=><div key={i} style={{position:"absolute",left:160+i*55,top:20+i*55,width:1180-i*110,height:680-i*95,border:"2px solid "+(i%2===0?palette.primary:palette.secondary),borderRadius:"50%",transform:"rotateX(70deg) rotateZ("+(frame*(i%2?-1:1)*.44)+"deg)",opacity:.2+Math.sin(frame*.03+i)*.08}}/>)}
  </div>
  <div style={{position:"absolute",bottom:350,left:91,right:91}}>
   <div style={{display:"flex",alignItems:"center",gap:15,color:palette.muted,fontFamily:mono,letterSpacing:3,fontSize:19,marginBottom:21}}><span style={{width:10,height:10,background:palette.hot,borderRadius:"50%",boxShadow:"0 0 18px "+palette.hot}}/> BEAT SYNC / KEYFRAMES</div>
   <div style={{display:"flex",alignItems:"center",height:130,gap:7,overflow:"hidden"}}>
     {Array.from({length:54},(_,i)=>{
       const phase=frame*.17+i*.68;
       const height=12+Math.abs(Math.sin(phase)*Math.cos(phase*.28))*(78+seeded(i,15)*54);
       return <div key={i} style={{width:10,flex:1,height,background:i%5===0?palette.secondary:palette.primary,boxShadow:i%5===0?"0 0 16px "+palette.secondary:"none",borderRadius:3,opacity:.53+seeded(i,7)*.47}}/>;
     })}
   </div>
   <div style={{fontFamily:mono,fontSize:19,color:palette.light,letterSpacing:2,marginTop:25}}>00:13:30:00 — 00:18:30:00</div>
  </div>
  <BottomIndex palette={palette} index="04" frame={frame+810}/>
 </SceneFade>;
};

export const SceneOutro=({data,palette,duration}:SceneProps)=>{
 const frame=useCurrentFrame();
 const [first,second]=safeWords(data.cta);
 return <SceneFade duration={duration}><Texture palette={palette} frame={frame+1110} density={125}/>
  <TinyHeader palette={palette} label="NEXT GENERATION / MADE WITH CODE" chapter="05"/>
  <div style={{position:"absolute",left:90,right:90,top:265,textAlign:"center"}}>
   <div style={{fontFamily:mono,fontSize:24,letterSpacing:5,color:palette.secondary,opacity:enter(frame,15,30)}}>O PRÓXIMO CAPÍTULO COMEÇA AGORA</div>
   <div style={{height:390,display:"grid",placeItems:"center",marginTop:105,opacity:enter(frame,22,60)}}>
    <div style={{position:"relative",width:390,height:390}}>
      <div style={{position:"absolute",inset:-95,border:"2px dashed "+palette.primary+"70",borderRadius:"50%",transform:"rotate("+(frame*.21)+"deg)"}}/>
      <div style={{position:"absolute",inset:-52,border:"2px solid "+palette.secondary+"66",borderRadius:"50%",transform:"rotate("+(-frame*.34)+"deg)",boxShadow:"0 0 65px "+palette.secondary+"36"}}/>
      <EdgeIcon palette={palette} frame={frame}/>
    </div>
   </div>
  </div>
  <div style={{position:"absolute",left:64,right:64,top:1040,textAlign:"center"}}>
   <TextReveal frame={frame} delay={55}><div style={{...baseTitle,fontSize:111,color:palette.light,lineHeight:.98}}>{first}</div></TextReveal>
   <TextReveal frame={frame} delay={73}><div style={{...baseTitle,fontSize:106,marginTop:8,...textGrad("linear-gradient(90deg,"+palette.primary+","+palette.secondary+")")}}>{second}</div></TextReveal>
   <TextReveal frame={frame} delay={106}><div style={{margin:"74px auto 0",width:645,minHeight:108,background:"linear-gradient(90deg,"+palette.primary+","+palette.secondary+")",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 75px "+palette.primary+"75",transform:"skewX(-6deg)"}}>
     <div style={{fontFamily:sans,fontSize:36,fontWeight:1000,letterSpacing:3,color:"#08101b",transform:"skewX(6deg)"}}>CRIE. ANIME. IMPACTE. ↗</div>
   </div></TextReveal>
   <TextReveal frame={frame} delay={134}><div style={{marginTop:68,fontFamily:mono,letterSpacing:7,color:palette.muted,fontSize:23}}>FEITO COM CÓDIGO · SEM LIMITES</div></TextReveal>
  </div>
  <div style={{position:"absolute",bottom:240,left:91,right:91,textAlign:"center",fontFamily:sans,fontWeight:900,letterSpacing:5,color:palette.light,fontSize:29,opacity:enter(frame,130,30)}}>
    {data.brand}
  </div>
  <BottomIndex palette={palette} index="05" frame={frame+1110}/>
 </SceneFade>;
};

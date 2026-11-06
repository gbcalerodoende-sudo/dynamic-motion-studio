import type {CSSProperties,ReactNode} from "react";
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from "remotion";
import type {Palette} from "./config";

export const sans="'Arial Black','DejaVu Sans',Arial,sans-serif";
export const mono="'Courier New',monospace";
const ease=Easing.bezier(.22,1,.36,1);
export const bound=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,v));
export const enter=(frame:number,offset=0,duration=32)=>interpolate(frame,[offset,offset+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:ease});
export const between=(frame:number,from:number,to:number)=>bound((frame-from)/(to-from));
export const seeded=(i:number,seed=1)=>((Math.sin(i*127.1+seed*311.7)*43758.5453)%1+1)%1;
export const springIn=(frame:number,delay=0)=>spring({frame:frame-delay,fps:60,config:{damping:17,stiffness:85,mass:.8}});
export const textStroke=(color:string):CSSProperties=>({WebkitTextStroke:"1px "+color,color:"transparent"});
export const textGrad=(colors:string):CSSProperties=>({background:colors,backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent"});
export const geoTransform=(a:number,b:number,c:number)=>"perspective(1200px) rotateY("+a+"deg) rotateX("+b+"deg) rotateZ("+c+"deg)";

export const Texture=({palette,frame,density=72}:{palette:Palette,frame:number,density?:number})=><AbsoluteFill style={{pointerEvents:"none"}}>
  <AbsoluteFill style={{backgroundColor:palette.background,backgroundImage:"radial-gradient(ellipse at 42% 18%,"+palette.primary+"3f 0%,transparent 51%), radial-gradient(ellipse at 95% 78%,"+palette.secondary+"23 0%,transparent 45%), linear-gradient(155deg,#0000001c,transparent 40%,#00000062)"}}/>
  <AbsoluteFill style={{backgroundImage:"linear-gradient("+palette.primary+"14 1px,transparent 1px),linear-gradient(90deg,"+palette.primary+"14 1px,transparent 1px)",backgroundSize:"96px 96px",opacity:.45,transform:"translateY("+((frame*.28)%96)+"px)"}}/>
  <div style={{position:"absolute",width:900,height:900,borderRadius:"50%",left:-320,top:-250,background:"radial-gradient(circle,"+palette.primary+"55,transparent 68%)",filter:"blur(140px)",transform:"translate("+Math.sin(frame/80)*85+"px,"+Math.cos(frame/90)*80+"px)"}}/>
  <div style={{position:"absolute",width:770,height:850,right:-400,bottom:-270,borderRadius:"50%",background:"radial-gradient(circle,"+palette.secondary+"53,transparent 68%)",filter:"blur(115px)",transform:"translate("+Math.cos(frame/75)*50+"px,"+Math.sin(frame/90)*60+"px)"}}/>
  {Array.from({length:density},(_,i)=><div key={i} style={{position:"absolute",left:(seeded(i,4)*100)+"%",top:((seeded(i,8)*100+frame*(seeded(i,3)*.002+.001))%100)+"%",width:seeded(i,19)>.86?4:2,height:seeded(i,19)>.86?4:2,borderRadius:"50%",background:i%5===0?palette.secondary:palette.light,opacity:.08+seeded(i,17)*.55,boxShadow:i%7===0?"0 0 18px "+palette.secondary:"none"}}/>)}
  <AbsoluteFill style={{opacity:.065,backgroundImage:"repeating-linear-gradient(0deg,transparent 0px,transparent 3px,#fefefe 4px,transparent 5px)",backgroundSize:"100% 9px",mixBlendMode:"screen"}}/>
  <div style={{position:"absolute",inset:52,border:"1px solid "+palette.primary+"1e",pointerEvents:"none"}}/>
  <div style={{position:"absolute",left:52,top:52,width:90,height:4,background:palette.secondary}}/>
  <div style={{position:"absolute",right:52,bottom:52,width:90,height:4,background:palette.primary}}/>
</AbsoluteFill>;

export const TinyHeader=({palette,label,chapter}:{palette:Palette,label:string,chapter:string})=><div style={{position:"absolute",left:91,right:91,top:113,display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:mono,fontSize:21,fontWeight:700,letterSpacing:3.5,color:palette.muted}}>
 <span style={{display:"flex",alignItems:"center",gap:18}}><span style={{display:"inline-block",width:16,height:16,background:palette.secondary,transform:"rotate(45deg)",boxShadow:"0 0 22px "+palette.secondary}}/>{label}</span><span>{chapter} / 05</span></div>;

export const BottomIndex=({palette,index,frame}:{palette:Palette,index:string,frame:number})=><div style={{position:"absolute",bottom:107,left:91,right:91,display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:mono,fontSize:20,color:palette.muted,letterSpacing:2.3}}>
  <span>{index} / DYNAMIC MOTION</span>
  <span style={{display:"flex",alignItems:"center",gap:14}}><span style={{height:2,width:103,display:"inline-block",background:palette.primary+"44"}}><span style={{display:"block",background:palette.secondary,height:2,width:Math.round(frame/60*8)%100+"%"}}/></span> 60 FPS</span>
</div>;

export const SectionTag=({children,palette,style}:{children:ReactNode,palette:Palette,style?:CSSProperties})=><div style={{display:"inline-flex",alignItems:"center",gap:11,border:"1px solid "+palette.primary+"66",padding:"14px 20px",color:palette.secondary,fontFamily:mono,fontWeight:700,letterSpacing:3.3,fontSize:20,background:palette.background+"bb",...style}}><span style={{width:8,height:8,borderRadius:"50%",background:palette.secondary,boxShadow:"0 0 14px "+palette.secondary}}/>{children}</div>;

export const SceneFade=({duration,children}:{duration:number,children:ReactNode})=>{
 const frame=useCurrentFrame();
 const opacity=interpolate(frame,[0,16,duration-20,duration],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const AccentLine=({palette,width=740,progress=1}:{palette:Palette,width?:number,progress?:number})=><div style={{height:3,width,background:"linear-gradient(90deg,"+palette.primary+","+palette.secondary+",transparent)",transformOrigin:"left center",transform:"scaleX("+bound(progress)+")",boxShadow:"0 0 22px "+palette.primary+"70"}}/>;

export const OrbitRing=({palette,diameter,frame,angle=0,top=0,left=0,opacity=.7,dashed=false}:{palette:Palette,diameter:number,frame:number,angle?:number,top?:number,left?:number,opacity?:number,dashed?:boolean})=><div style={{position:"absolute",top,left,width:diameter,height:diameter,borderRadius:"50%",border:"2px "+(dashed?"dashed ":"solid ")+palette.primary,opacity,transform:"rotateX(66deg) rotateZ("+(angle+frame*.22)+"deg)",boxShadow:"inset 0 0 75px "+palette.primary+"18,0 0 45px "+palette.primary+"1e"}}/>;

export const TextReveal=({children,frame,delay,style}:{children:ReactNode,frame:number,delay:number,style?:CSSProperties})=>{
 const p=enter(frame,delay,37);
 return <div style={{opacity:p,transform:"translateY("+(1-p)*120+"px) skewY("+(-1+p)*5+"deg)",filter:"blur("+(1-p)*7+"px)",...style}}>{children}</div>;
};

export const EdgeIcon=({palette,frame}:{palette:Palette,frame:number})=><svg width="340" height="340" viewBox="0 0 340 340" style={{filter:"drop-shadow(0 0 35px "+palette.primary+"80)",transform:"rotate("+(frame*.12)+"deg)"}}>
 <defs><linearGradient id="edge-hero" x1="0" y1="0" x2="1" y2="1"><stop stopColor={palette.primary}/><stop offset="1" stopColor={palette.secondary}/></linearGradient></defs>
 <circle cx="170" cy="170" r="133" fill="none" stroke="url(#edge-hero)" strokeWidth="4" strokeDasharray="14 16"/>
 <circle cx="170" cy="170" r="112" fill="none" stroke={palette.primary} strokeWidth="2" opacity=".42"/>
 <path d="M170 48 L288 170 L170 292 L52 170Z" fill="none" stroke="url(#edge-hero)" strokeWidth="9"/>
 <path d="M170 92 L248 170 L170 248 L92 170Z" fill={palette.primary+"16"} stroke={palette.secondary} strokeWidth="3"/>
 <path d="M170 126 L214 170 L170 214 L126 170Z" fill="url(#edge-hero)"/>
</svg>;

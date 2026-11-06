export const FPS=60;
export const VIDEO_WIDTH=1080;
export const VIDEO_HEIGHT=1920;
export const VIDEO_FRAMES=1440;
export type ThemeId="neon"|"gold"|"arctic"|"ember";
export type MotionProps={
 headline:string;
 subhead:string;
 brand:string;
 kicker:string;
 cta:string;
 statValue:number;
 statLabel:string;
 theme:ThemeId;
 words:[string,string,string];
};
export type Palette={id:ThemeId;name:string;primary:string;secondary:string;hot:string;background:string;light:string;muted:string;};
export const PALETTES:Record<ThemeId,Palette>={
 neon:{id:"neon",name:"Ultraviolet",primary:"#8F8AFF",secondary:"#42FAD4",hot:"#FF72C5",background:"#070817",light:"#FAFAFF",muted:"#A7A8C9"},
 gold:{id:"gold",name:"Golden Hour",primary:"#F2B963",secondary:"#FCE0B1",hot:"#F68A5C",background:"#0F0B12",light:"#FFF8EB",muted:"#BEAFA8"},
 arctic:{id:"arctic",name:"Electric Ice",primary:"#5EB9FF",secondary:"#86FFF2",hot:"#A69CFF",background:"#06131C",light:"#F6FCFF",muted:"#9DBACB"},
 ember:{id:"ember",name:"Hot Ember",primary:"#FF685E",secondary:"#FFBF66",hot:"#F67EAB",background:"#16090E",light:"#FFF8F1",muted:"#C8A7AC"}
};
export const SCENES=[
 {id:"intro",title:"01 · IMPACTO",kind:"Abertura",start:0,duration:240},
 {id:"world",title:"02 · IMERSÃO",kind:"Motion 3D",start:240,duration:270},
 {id:"numbers",title:"03 · NÚMEROS",kind:"Gráficos",start:510,duration:300},
 {id:"kinetic",title:"04 · RITMO",kind:"Tipografia",start:810,duration:300},
 {id:"outro",title:"05 · ASSINATURA",kind:"Final",start:1110,duration:330}
] as const;
export const DEFAULT_MOTION_PROPS:MotionProps={
 headline:"IDEIAS QUE IMPACTAM",subhead:"O FUTURO NÃO ESPERA",brand:"MOTION STUDIO",
 kicker:"EDIÇÃO DINÂMICA · 2026",cta:"TRANSFORME SUA HISTÓRIA",statValue:300,statLabel:"MAIS IMPACTO VISUAL",
 theme:"neon",words:["CORTE.","RITMO.","IMPACTO."]
};
const str=(value:unknown,fallback:string,max:number)=>typeof value==="string"?value.trim().slice(0,max)||fallback:fallback;
export const normalizeProps=(data:unknown):MotionProps=>{
 const d=data&&typeof data==="object"?data as Record<string,unknown>:{};
 const words=Array.isArray(d.words)?d.words:DEFAULT_MOTION_PROPS.words;
 return {
   headline:str(d.headline,DEFAULT_MOTION_PROPS.headline,42),
   subhead:str(d.subhead,DEFAULT_MOTION_PROPS.subhead,42),
   brand:str(d.brand,DEFAULT_MOTION_PROPS.brand,24),
   kicker:str(d.kicker,DEFAULT_MOTION_PROPS.kicker,50),
   cta:str(d.cta,DEFAULT_MOTION_PROPS.cta,45),
   statValue:typeof d.statValue==="number"&&Number.isFinite(d.statValue)?Math.max(1,Math.min(9999,Math.round(d.statValue))):DEFAULT_MOTION_PROPS.statValue,
   statLabel:str(d.statLabel,DEFAULT_MOTION_PROPS.statLabel,38),
   theme:typeof d.theme==="string"&&Object.prototype.hasOwnProperty.call(PALETTES,d.theme)?d.theme as ThemeId:"neon",
   words:[str(words[0],"CORTE.",16),str(words[1],"RITMO.",16),str(words[2],"IMPACTO.",16)]
 };
};

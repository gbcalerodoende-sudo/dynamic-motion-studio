import fs from "node:fs";

const defaults=JSON.parse(fs.readFileSync("video.config.json","utf8"));
const raw=process.env.RENDER_PROPS_JSON||"";
let data=defaults;
if(raw.trim()){
  try{
    const incoming=JSON.parse(raw);
    if(!incoming||Array.isArray(incoming)||typeof incoming!=="object")throw new Error("Input must be an object");
    data={...defaults,...incoming};
  }catch(err){
    console.error("Invalid JSON supplied:",String(err));
    process.exit(1);
  }
}
const cut=(v,def,n)=>typeof v==="string"&&v.trim()?v.trim().slice(0,n):def;
const themes=new Set(["neon","gold","arctic","ember"]);
const props={
 headline:cut(data.headline,defaults.headline,42),
 subhead:cut(data.subhead,defaults.subhead,42),
 brand:cut(data.brand,defaults.brand,24),
 kicker:cut(data.kicker,defaults.kicker,50),
 cta:cut(data.cta,defaults.cta,45),
 statLabel:cut(data.statLabel,defaults.statLabel,38),
 statValue:Number.isFinite(Number(data.statValue))?Math.max(1,Math.min(9999,Math.round(Number(data.statValue)))):300,
 theme:themes.has(data.theme)?data.theme:"neon",
 words:[0,1,2].map(i=>cut(Array.isArray(data.words)?data.words[i]:null,defaults.words[i],16))
};
fs.writeFileSync(".render-props.json",JSON.stringify(props,null,2));
console.log("Render theme:",props.theme,"title:",props.headline);

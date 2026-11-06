import {useCallback,useEffect,useMemo,useRef,useState,type ChangeEvent,type ReactNode} from "react";
import {Player,type PlayerRef} from "@remotion/player";
import {
 ArrowDownToLine,ArrowRight,BookOpen,Check,CheckCircle2,ChevronRight,Clapperboard,Clock3,Code2,
 Copy,Download,ExternalLink,Film,FolderOpen,Gauge,Github,Headphones,Layers3,MonitorPlay,
 Music2,Pause,Play,RotateCcw,Settings2,SlidersHorizontal,Smartphone,Sparkles,Type,Volume2,VolumeX,
 WandSparkles,Zap
} from "lucide-react";
import {MotionFilm} from "../video/MotionFilm";
import {
 DEFAULT_MOTION_PROPS,FPS,PALETTES,SCENES,VIDEO_FRAMES,VIDEO_HEIGHT,VIDEO_WIDTH,
 normalizeProps,type MotionProps,type ThemeId
} from "../video/config";

const REPO_URL="https://github.com/gbcalerodoende-sudo/dynamic-motion-studio";
const WORKFLOW_URL=REPO_URL+"/actions/workflows/render.yml";
const DOC_URL=REPO_URL+"#como-renderizar-um-mp4";
const CACHE_KEY="dynamic-motion-studio-draft-v1";
const iconSize=17;
const pad=(v:number)=>Math.floor(v).toString().padStart(2,"0");
const timeString=(f:number)=>pad(f/FPS)+":"+pad(f%FPS);
const fullTime=(f:number)=>"00:"+pad(f/FPS);
const clip=(s:string,n:number)=>s.slice(0,n);
const readDraft=():MotionProps=>{
 try{const raw=localStorage.getItem(CACHE_KEY);return raw?normalizeProps(JSON.parse(raw)):DEFAULT_MOTION_PROPS}
 catch{return DEFAULT_MOTION_PROPS}
};
type TabId="texto"|"cores"|"audio"|"export";
const formatTitle:Record<TabId,string>={texto:"Roteiro & Tipografia",cores:"Identidade Visual",audio:"Áudio & Ritmo",export:"Exportar seu vídeo"};
function SectionTitle({label,subtitle}:{label:string,subtitle:string}){
 return <div className="st-section-title"><div className="st-section-id">PAINEL DE CRIAÇÃO / 01—05</div><h2>{label}</h2><p>{subtitle}</p></div>
}
function InputField({label,value,onChange,limit,helper,rows=1}:{label:string,value:string,onChange:(s:string)=>void,limit:number,helper?:string,rows?:number}){
 return <label className="st-input-label"><span className="st-label-title">{label}<span>{value.length}/{limit}</span></span>
 {rows>1?<textarea rows={rows} maxLength={limit} value={value} onChange={e=>onChange(e.target.value)} spellCheck={false}/>:<input type="text" maxLength={limit} value={value} onChange={e=>onChange(e.target.value)} spellCheck={false}/>}
 {helper&&<small>{helper}</small>}</label>;
}
function QualityPill({children}:{children:ReactNode}){return <span className="st-quality">{children}</span>}
const iconFor=(index:number)=>[Sparkles,WandSparkles,Gauge,Type,Clapperboard][index]||Film;
export function StudioApp(){
 const playerRef=useRef<PlayerRef>(null);
 const [draft,setDraft]=useState<MotionProps>(readDraft);
 const [tab,setTab]=useState<TabId>("texto");
 const [frame,setFrame]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [muted,setMuted]=useState(false);
 const [toast,setToast]=useState("");
 const [showGuide,setShowGuide]=useState(false);
 const activeScene=useMemo(()=>SCENES.find(s=>frame>=s.start&&frame<s.start+s.duration)||SCENES[0], [frame]);
 useEffect(()=>{try{localStorage.setItem(CACHE_KEY,JSON.stringify(draft))}catch{/* private browsing */}},[draft]);
 useEffect(()=>{
  const ref=playerRef.current;if(!ref)return;
  const onTime=(e:{detail:{frame:number}})=>setFrame(e.detail.frame);
  const onPlay=()=>setPlaying(true),onPause=()=>setPlaying(false);
  ref.addEventListener("timeupdate",onTime);
  ref.addEventListener("seeked",onTime);
  ref.addEventListener("play",onPlay);
  ref.addEventListener("pause",onPause);
  return ()=>{ref.removeEventListener("timeupdate",onTime);ref.removeEventListener("seeked",onTime);ref.removeEventListener("play",onPlay);ref.removeEventListener("pause",onPause)}
 },[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),3100);return ()=>clearTimeout(t)},[toast]);
 const setField=<K extends keyof MotionProps>(key:K,value:MotionProps[K])=>setDraft(d=>({...d,[key]:value}));
 const setWord=(index:number,value:string)=>setDraft(d=>{
   const words:[string,string,string]=[...d.words];words[index]=clip(value,16);return {...d,words};
 });
 const seek=(n:number)=>{const f=Math.max(0,Math.min(VIDEO_FRAMES-1,Math.round(n)));playerRef.current?.seekTo(f);setFrame(f)};
 const toggle=()=>{playerRef.current?.toggle()};
 const toggleMute=()=>{const next=!muted;if(next)playerRef.current?.mute();else playerRef.current?.unmute();setMuted(next)};
 const reset=()=>{setDraft(DEFAULT_MOTION_PROPS);seek(0);setToast("Roteiro de demonstração restaurado.")};
 const copyJSON=async()=>{
  try{await navigator.clipboard.writeText(JSON.stringify(draft));setToast("JSON copiado! Cole em 'props_json' no GitHub Actions.")}
  catch{downloadJSON();setToast("Copiar não foi permitido. Baixei o arquivo JSON.")}
 };
 const downloadJSON=()=>{
  const object=new Blob([JSON.stringify(draft,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(object),a=document.createElement("a");a.href=url;a.download="motion-props.json";
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
 };
 const openGithub=()=>window.open(WORKFLOW_URL,"_blank","noopener,noreferrer");
 const changeWords=["Palavra 1","Palavra 2","Palavra 3"];
 return <div className="st-root">
  <header className="st-header">
   <a className="st-logo" href={REPO_URL} target="_blank" rel="noopener noreferrer" title="Ver projeto no GitHub">
    <div className="st-logo-mark"><span>M</span><div className="st-logo-corner"/></div>
    <div><strong>DYNAMIC<span>MOTION</span></strong><small>STUDIO / MOTION DESIGN LAB</small></div>
   </a>
   <div className="st-header-middle"><span className="st-live"/> <span>PROJETO ATIVO</span><span className="st-header-line"/><span>UNTITLED PROJECT / 001</span></div>
   <div className="st-header-actions"><span className="st-version">BETA 01</span><button className="st-header-help" onClick={()=>setShowGuide(true)}><BookOpen size={17}/> Como usar</button><button className="st-btn st-btn-primary" onClick={()=>setTab("export")}><ArrowDownToLine size={17}/> EXPORTAR MP4</button></div>
  </header>
  <div className="st-workspace">
   <nav className="st-sidebar" aria-label="Ferramentas de edição">
    <div className="st-tools">
     {([{id:"texto",name:"Textos",icon:Type},{id:"cores",name:"Temas",icon:Sparkles},{id:"audio",name:"Áudio",icon:Music2},{id:"export",name:"Exportar",icon:Download}] as const).map(({id,name,icon:Icon})=>
      <button key={id} title={name} className={"st-tool "+(tab===id?"active":"")} onClick={()=>setTab(id)}><Icon size={22}/><span>{name}</span></button>)}
    </div>
    <div className="st-bottom-tool"><a href={REPO_URL} target="_blank" rel="noopener noreferrer" title="Código no GitHub"><Github size={22}/></a></div>
   </nav>
   <aside className="st-inspector">
    <div className="st-inspector-head"><div className="st-inspector-overline"><span className="st-diamond"/> STUDIO CONTROLS <span>01 / 04</span></div><h1>{formatTitle[tab]}</h1><p>Personalize seu vídeo em tempo real.</p></div>
    <div className="st-inspector-scroll">
     {tab==="texto"&&<div className="st-stack">
      <SectionTitle label="Sua história, seu impacto." subtitle="O visual reage automaticamente às mudanças. Evite textos muito longos."/>
      <div className="st-group"><div className="st-group-name"><span>01</span> ABERTURA <span className="st-group-line"/></div>
        <InputField label="Título principal" value={draft.headline} onChange={x=>setField("headline",x)} limit={42} rows={2} helper="Cena 01 · Entrada cinematográfica"/>
        <InputField label="Subtítulo" value={draft.subhead} onChange={x=>setField("subhead",x)} limit={42}/>
        <InputField label="Linha de apoio" value={draft.kicker} onChange={x=>setField("kicker",x)} limit={50}/>
      </div>
      <div className="st-group"><div className="st-group-name"><span>02</span> NÚMEROS & DADOS <span className="st-group-line"/></div>
       <label className="st-input-label"><span className="st-label-title">Número em destaque</span><div className="st-num-wrap"><input type="number" min={1} max={9999} value={draft.statValue} onChange={e=>setField("statValue",Math.max(1,Math.min(9999,Number(e.target.value)||1)))}/><b>%</b></div></label>
       <InputField label="Legenda do indicador" value={draft.statLabel} onChange={x=>setField("statLabel",x)} limit={38}/>
       <p className="st-disclaimer">O número é um recurso visual demonstrativo. Substitua por dados verificáveis antes de publicar como informação factual.</p>
      </div>
      <div className="st-group"><div className="st-group-name"><span>03</span> TIPOGRAFIA CINÉTICA <span className="st-group-line"/></div>
       {changeWords.map((label,index)=><InputField key={index} label={label} value={draft.words[index]||""} onChange={x=>setWord(index,x)} limit={16}/>)}
      </div>
      <div className="st-group"><div className="st-group-name"><span>04</span> ENCERRAMENTO <span className="st-group-line"/></div>
       <InputField label="Frase final" value={draft.cta} onChange={x=>setField("cta",x)} limit={45} rows={2}/>
       <InputField label="Assinatura / Marca" value={draft.brand} onChange={x=>setField("brand",x)} limit={24}/>
      </div>
      <button className="st-reset" onClick={reset}><RotateCcw size={16}/> Restaurar roteiro original</button>
     </div>}
     {tab==="cores"&&<div className="st-stack">
       <SectionTitle label="Uma identidade memorável." subtitle="Quatro paletas de cor com iluminação e efeitos adaptados."/>
       <div className="st-palette-grid">{Object.values(PALETTES).map(p=><button key={p.id} onClick={()=>setField("theme",p.id)} className={"st-palette "+(p.id===draft.theme?"active":"")}>
        <div className="st-palette-preview" style={{background:"linear-gradient(135deg,"+p.background+","+p.primary+"4f)"}}>
         <div style={{background:"linear-gradient(115deg,"+p.primary+","+p.secondary+")"}}/>
         <span style={{color:p.primary}}>Aa</span>
         <div className="st-palette-dots"><i style={{background:p.primary}}/><i style={{background:p.secondary}}/><i style={{background:p.hot}}/></div>
        </div>
        <div className="st-palette-footer"><span>{p.name}</span>{p.id===draft.theme?<CheckCircle2 size={16}/>:<span className="st-palette-id">{p.id.toUpperCase()}</span>}</div>
       </button>)}</div>
       <div className="st-preview-palette"><div className="st-group-name"><span>TONS</span> ATUAIS</div>
         <div className="st-colors-row">{[PALETTES[draft.theme].primary,PALETTES[draft.theme].secondary,PALETTES[draft.theme].hot,PALETTES[draft.theme].background].map((c,i)=><div key={i}><div style={{background:c}}/><small>{c}</small></div>)}</div>
       </div>
       <div className="st-hint"><Sparkles size={19}/><span>Gradientes, reflexos, partículas, gráficos e vinhetas se adaptam automaticamente à paleta escolhida.</span></div>
     </div>}
     {tab==="audio"&&<div className="st-stack">
       <SectionTitle label="O ritmo faz a diferença." subtitle="Trilha eletrônica original, criada matematicamente para acompanhar as cenas."/>
       <div className="st-audio-panel"><div className="st-album"><Headphones size={39}/><span>ORIGINAL SCORE<br/>24 SECONDS</span></div><div><div className="st-tag">ORIGINAL / SEM ROYALTIES DE TERCEIROS</div><h3>Neon Momentum</h3><p>Sintetizadores, batidas, graves, claps e efeitos de transição gerados pelo próprio projeto.</p><span>120 BPM · STEREO · 44.1 KHZ</span></div></div>
       <div className="st-audio-visual">{Array.from({length:41},(_,i)=><i key={i} style={{height:10+Math.abs(Math.sin(i*.68)*Math.cos(i*.25))*80+"%"}}/>)}</div>
       <button className="st-audio-toggle" onClick={toggleMute}>{muted?<VolumeX size={19}/>:<Volume2 size={19}/>} {muted?"Ativar som da prévia":"Silenciar prévia"}</button>
       <div className="st-hint"><Headphones size={18}/><span>Para acrescentar sua narração, o próximo passo é importar arquivos de áudio e usar uma trilha de voz no Remotion. Esta primeira versão tem trilha original, mas não gera vozes por IA.</span></div>
     </div>}
     {tab==="export"&&<div className="st-stack">
       <SectionTitle label="Seu vídeo, em MP4." subtitle="Sem pagamento, sem chave de API e sem serviços de geração de vídeo externos."/>
       <div className="st-export-summary"><div><Smartphone size={22}/><span>FORMATO</span><b>1080 × 1920</b></div><div><Gauge size={22}/><span>FRAMES</span><b>60 FPS</b></div><div><Clock3 size={22}/><span>DURAÇÃO</span><b>24 segundos</b></div><div><Film size={22}/><span>ARQUIVO</span><b>MP4 / H.264</b></div></div>
       <div className="st-export-steps"><div className="st-steps-title">COMO EXPORTAR PELO GITHUB</div>
        <div><span>01</span><p>Clique em <b>Copiar JSON</b> para copiar os textos e a paleta do seu vídeo.</p></div>
        <div><span>02</span><p>Clique em <b>Abrir Renderização</b>, selecione <b>Run workflow</b> e cole em <code>props_json</code>.</p></div>
        <div><span>03</span><p>Escolha <b>full</b> e execute. Quando terminar, baixe o MP4 em <b>Artifacts</b> da execução.</p></div>
       </div>
       <button className="st-btn st-btn-copy" onClick={copyJSON}><Copy size={18}/> 1 · COPIAR JSON DA EDIÇÃO</button>
       <button className="st-btn st-btn-primary st-btn-block" onClick={openGithub}><Github size={18}/> 2 · ABRIR RENDERIZAÇÃO <ExternalLink size={15}/></button>
       <button className="st-btn st-btn-ghost st-btn-block" onClick={downloadJSON}><Download size={17}/> BAIXAR ARQUIVO JSON</button>
       <div className="st-hint"><Code2 size={18}/><span>O MP4 é renderizado nos servidores do GitHub Actions, dentro da cota gratuita do seu plano. A prévia no navegador não exporta MP4 diretamente.</span></div>
     </div>}
    </div>
    <div className="st-inspector-footer"><span className="st-save-indicator"><Check size={14}/> Salvo neste navegador</span><span>V 1.0.0</span></div>
   </aside>
   <main className="st-main">
    <div className="st-main-toolbar"><div><div className="st-breadcrumb">PROJECT <ChevronRight size={13}/> EDITOR <ChevronRight size={13}/> <strong>SHOWREEL CINEMATIC</strong></div><h2>Pré-visualização <span>ao vivo</span></h2></div><div className="st-main-meta"><QualityPill><span className="st-green-dot"/> LIVE PREVIEW</QualityPill><QualityPill>9:16 · VERTICAL</QualityPill><QualityPill>60 FPS</QualityPill></div></div>
    <div className="st-stage">
      <div className="st-stage-watermark st-stage-left">DMS / LIVE RENDER ENGINE</div>
      <div className="st-stage-watermark st-stage-right">1080 × 1920 ORIGINAL</div>
      <div className="st-player-frame">
       <div className="st-player-top"><span><span className="st-rec-dot"/> COMPOSITION PREVIEW</span><span>{fullTime(frame)} / 00:24</span></div>
       <div className="st-player-body"><Player ref={playerRef} component={MotionFilm} inputProps={draft}
        durationInFrames={VIDEO_FRAMES} compositionWidth={VIDEO_WIDTH} compositionHeight={VIDEO_HEIGHT}
        fps={FPS} controls={false} autoPlay={false} loop={true} initiallyMuted={false}
        style={{width:"100%",aspectRatio:"9 / 16",background:"#070817"}}/></div>
       <div className="st-player-controls"><div className="st-controls-left"><button title="Voltar ao início" onClick={()=>seek(0)}><RotateCcw size={16}/></button><button className="st-play" title={playing?"Pausar":"Reproduzir"} onClick={toggle}>{playing?<Pause size={19} fill="currentColor"/>:<Play size={19} fill="currentColor"/>}</button><button title="Alternar som" onClick={toggleMute}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button></div>
        <span className="st-time-current">{fullTime(frame)} <i>/</i> 00:24</span>
        <span className="st-controls-right"><span className="st-small-glow"/> 60 FPS <span className="st-split"/> ORIGINAL</span>
       </div>
      </div>
      <div className="st-stage-hint"><Sparkles size={17}/> Altere os textos ou as cores para ver as animações se adaptarem instantaneamente.</div>
    </div>
    <section className="st-timeline" aria-label="Timeline de edição"><div className="st-timeline-head"><div><Layers3 size={17}/><strong>TIMELINE</strong><span>5 CENAS · 24 SEGUNDOS</span></div><div><span className="st-frame-count">{timeString(frame)}</span><span className="st-timeline-suffix">/ 00:24:00</span></div></div>
      <div className="st-time-ruler">{[0,4,8,12,16,20,24].map(t=><span key={t}>{pad(t)}s</span>)}</div>
      <div className="st-scene-track">
       {SCENES.map((scene,i)=>{
        const Icon=iconFor(i);
        return <button key={scene.id} className={"st-scene "+(activeScene.id===scene.id?"active":"")} style={{width:scene.duration/VIDEO_FRAMES*100+"%"}} onClick={()=>seek(scene.start+Math.min(20,scene.duration-1))} title={"Ir para "+scene.title}><Icon size={18}/><span>{scene.title}</span><small>{scene.kind}</small></button>;
       })}
       <div className="st-playhead" style={{left:(frame/(VIDEO_FRAMES-1))*100+"%"}}/>
      </div>
      <input className="st-scrub" type="range" min={0} max={VIDEO_FRAMES-1} value={frame} onChange={e=>seek(Number(e.target.value))} aria-label="Navegar por quadros"/>
      <div className="st-track-legend"><div><span className="st-legend-square"/> VIDEO TRACK 01</div><div><Music2 size={12}/> ORIGINAL SCORE · 120 BPM</div></div>
    </section>
   </main>
  </div>
  <footer className="st-footer"><div><span className="st-green-dot"/> RENDER ENGINE READY <span className="st-footer-divider"/> DESENVOLVIDO COM REMOTION + REACT</div><div><span>SEM API PAGA</span><a href={REPO_URL} target="_blank" rel="noopener noreferrer">CÓDIGO ABERTO <ExternalLink size={12}/></a></div></footer>
  {showGuide&&<div className="st-dialog-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)setShowGuide(false)}}><section className="st-dialog" role="dialog" aria-modal="true" aria-label="Como usar"><div className="st-dialog-head"><div><span className="st-section-id">DYNAMIC MOTION STUDIO</span><h2>Como funciona?</h2></div><button onClick={()=>setShowGuide(false)}>✕</button></div><div className="st-dialog-body">
   <div><span>01</span><div><strong>Escolha um tema visual</strong><p>Quatro paletas foram criadas para transformar a identidade das cinco cenas.</p></div></div>
   <div><span>02</span><div><strong>Personalize o roteiro</strong><p>Edite as frases, dados e palavras diretamente no painel de criação.</p></div></div>
   <div><span>03</span><div><strong>Assista à prévia</strong><p>Use Play, pausa, a timeline e os controles de som para avaliar cada detalhe.</p></div></div>
   <div><span>04</span><div><strong>Renderize o MP4</strong><p>Copie o JSON, abra o GitHub Actions e execute o workflow em modo full. O arquivo aparecerá em Artifacts.</p></div></div>
   <div className="st-dialog-note">Esta versão oferece templates premium programados. Não é uma IA que cria cenas novas automaticamente nem sincroniza narração importada ainda.</div>
   <button className="st-btn st-btn-primary st-btn-block" onClick={()=>setShowGuide(false)}>ENTENDI, VAMOS CRIAR <ArrowRight size={17}/></button>
  </div></section></div>}
  {toast&&<div className="st-toast"><CheckCircle2 size={17}/>{toast}</div>}
 </div>;
}

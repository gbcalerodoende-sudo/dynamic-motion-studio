import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {DEFAULT_MOTION_PROPS,FPS,PALETTES,SCENES,VIDEO_FRAMES,normalizeProps,type MotionProps} from "./config";
import {SceneIntro,SceneKinetic,SceneNumbers,SceneOutro,SceneWorld} from "./scenes";

const implementation=[SceneIntro,SceneWorld,SceneNumbers,SceneKinetic,SceneOutro] as const;
export const MotionFilm:React.FC<MotionProps>=(incoming)=>{
 const data=normalizeProps(incoming),palette=PALETTES[data.theme];
 // Remotion's asset root differs from the path under GitHub Pages.
 const soundtrack=typeof window!=="undefined"&&window.location.pathname.startsWith("/dynamic-motion-studio/")
   ? "/dynamic-motion-studio/original-score.wav"
   : staticFile("original-score.wav");
 return <AbsoluteFill style={{backgroundColor:palette.background,overflow:"hidden"}}>
   <Audio src={soundtrack} volume={.28}/>
   {SCENES.map((scene,index)=>{
     const Component=implementation[index]!;
     return <Sequence key={scene.id} from={scene.start} durationInFrames={scene.duration}>
       <Component data={data} palette={palette} duration={scene.duration}/>
     </Sequence>;
   })}
 </AbsoluteFill>;
};
export const DEFAULTS:MotionProps=DEFAULT_MOTION_PROPS;

import {Composition} from "remotion";
import {MotionFilm} from "./MotionFilm";
import {DEFAULT_MOTION_PROPS,FPS,VIDEO_FRAMES,VIDEO_HEIGHT,VIDEO_WIDTH} from "./config";
export const RemotionRoot=()=>{
 return <Composition id="MotionShowreel" component={MotionFilm} width={VIDEO_WIDTH} height={VIDEO_HEIGHT}
   fps={FPS} durationInFrames={VIDEO_FRAMES} defaultProps={DEFAULT_MOTION_PROPS}/>;
};

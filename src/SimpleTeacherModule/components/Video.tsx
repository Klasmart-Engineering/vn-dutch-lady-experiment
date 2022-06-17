import React from "react";

const Video = React.forwardRef<HTMLVideoElement, IVideoPlayerProps>((props, ref) => {
  return <video ref={ref} controls={false} autoPlay={true} poster={props.poster} src={`https://cdn.kidsloop.vn/${props.source}`} />;
});

export default Video;

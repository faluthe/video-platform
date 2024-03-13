import ReactPlayer from "react-player";
import "./VideoPlayer.css";

interface VideoPlayerProps {
  src: string;
}

function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div className="video-player">
      <ReactPlayer url={src} controls={true} />
    </div>
  );
}

export default VideoPlayer;

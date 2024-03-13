import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import "./VideoPage.css";
import { getVideoData } from "../utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Video from "../Video";

function VideoPage() {
  let { server } = useParams<{ server: string }>();
  // id relative to the server
  let { id } = useParams<{ id: string }>();

  if (id === undefined) {
    id = "-1";
  }

  const videoId = parseInt(id);
  const [videoData, setVideoData] = useState<Video | undefined>(undefined);

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideo = await getVideoData(server || "", videoId);
      setVideoData(fetchedVideo);
    };
    fetchVideo();
  }, []);

  if (videoData === undefined) {
    return (
      <>
        <h1 className="text-center mt-5">Video Not Found</h1>
        <Footer />
      </>
    );
  }

  return (
    <>
      <h1 className="text-center mt-5">{videoData.title}</h1>
      <VideoPlayer src={`${videoData.endpoint}/${videoData.filename}`} />
      <h3 className="text-center">
        Uploaded by: {videoData.uploader} on{" "}
        <Link to={`/${server || ""}`}>{server || ""}</Link>
      </h3>
      <p className="text-center">{videoData.description}</p>
      <Footer />
    </>
  );
}

export default VideoPage;

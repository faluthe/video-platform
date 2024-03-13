import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import Video from "../Video";
import { fetchVideosFrom, getThumbnailFromEndpoint } from "../utils";
import VideoCard from "../components/VideoCard/VideoCard";

function ServerPage() {
  let { server } = useParams<{ server: string }>();

  const [videos, setVideos] = useState<Video[] | undefined>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos = await fetchVideosFrom(server || "");
      setVideos(fetchedVideos);
    };
    fetchVideos();
  }, []);

  if (videos === undefined) {
    return (
      <>
        <h1 className="text-center mt-5">Server not found</h1>
        <Footer />
      </>
    );
  }
  if (videos.length === 0) {
    return (
      <>
        <h1 className="text-center mt-5">No videos found</h1>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container text-center">
        <div className="row">
          {videos.map((video, index) => (
            <div className="col-sm-3 mb-3" key={index}>
              <VideoCard
                thumbnail={getThumbnailFromEndpoint(video.endpoint)}
                title={video.title}
                description={video.description}
                url={`video/${video.id}`}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServerPage;

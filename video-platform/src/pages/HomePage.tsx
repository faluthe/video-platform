import Footer from "../components/Footer/Footer";
import "./HomePage.css";
import VideoCard from "../components/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import Video from "../Video";
import { fetchHomeVideos, getThumbnailFromEndpoint } from "../utils";

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos: Video[] = await fetchHomeVideos();
      setVideos(fetchedVideos);
    };
    fetchVideos();
  }, []);

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
                url={`${video.distributorAlias}/video/${video.id}`}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;

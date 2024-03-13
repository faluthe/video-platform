import { Link } from "react-router-dom";
import "./VideoCard.css";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

function VideoCard({ title, description, thumbnail, url }: VideoCardProps) {
  return (
    <div className="card video-card" style={{ width: "20em" }}>
      <Link to={url} className="btn btn-dark btn-sm">
        <img src={thumbnail} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;

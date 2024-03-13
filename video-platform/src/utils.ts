import Video from "./Video";
import { aliasDict } from "./aliases";

function getPlaceholderVideos() {
  const videos: Video[] = [
    {
      title: "Funny Guy",
      description: "My favorite scene from the 1994 film Goodfellas.",
      uploader: "pat",
      endpoint: "/goodfellas",
      filename: "goodfellas.mp4",
    },
    {
      title: "How to Make an Ally",
      description:
        "How a German officer was able to notice an undercover allied soldier.",
      uploader: "pat",
      endpoint: "/bastards",
      filename: "bastards.mp4",
    },
    {
      title: "Jojo Rabbit",
      description: "A scene from the 2019 film Jojo Rabbit.",
      uploader: "pat",
      endpoint: "/jojorabbit",
      filename: "jojorabbit.mp4",
    },
    {
      title: "The Sopranos",
      description: "A scene from the 1999 TV show The Sopranos.",
      uploader: "pat",
      endpoint: "/sopranos",
      filename: "sopranos.mp4",
    },
  ].map((video, index) => ({
    id: index,
    distributorAlias: "placeholder",
    ...video,
  }));

  return videos;
}

export function getThumbnailFromEndpoint(endpoint: string) {
  return `${endpoint}/thumbnail.jpg`;
}

export async function getVideoData(
  serverAlias: string,
  id: number
): Promise<Video | undefined> {
  if (id === -1) {
    return undefined;
  }

  if (serverAlias === "placeholder") {
    const videos = getPlaceholderVideos();
    return videos[id];
  }

  const endpoint = parseServerAlias(serverAlias);
  if (endpoint) {
    try {
      const response = await fetch(`${endpoint}/video/${id}`);
      if (response.ok) {
        let video: Video = await response.json();
        video.distributorAlias = serverAlias;
        video.id = id;
        return video;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return undefined;
}

export async function fetchHomeVideos(): Promise<Video[]> {
  const videosFromLocal = await fetchVideosFrom("localhost");
  return [...(videosFromLocal || []), ...getPlaceholderVideos()];
}

export async function fetchVideosFrom(
  distributorAlias: string
): Promise<Video[] | undefined> {
  if (distributorAlias === "placeholder") {
    return getPlaceholderVideos();
  }

  const endpoint = parseServerAlias(distributorAlias);
  if (endpoint) {
    try {
      const response = await fetch(`${endpoint}/videos`);
      if (response.ok) {
        const videos: Video[] = await response.json();
        return videos.map((video) => ({
          ...video,
          distributorAlias: distributorAlias,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return undefined;
}

function parseServerAlias(distributorAlias: string): string | undefined {
  return aliasDict[distributorAlias];
}

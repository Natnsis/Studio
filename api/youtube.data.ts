import axios from "axios";

type Link = {
  id: string;
  created_at: string;
  url: string;
  user_id: string;
};

type YTVideo = {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
};

export const fetchYTData = async (links: Link[]): Promise<YTVideo[]> => {
  try {
    if (!links || links.length === 0) return [];

    const extractVideoId = (url: string) => {
      const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
      return match ? match[1] : null;
    };

    const videoIds = [
      ...new Set(
        links
          .map(link => extractVideoId(link.url))
          .filter(Boolean)
      ),
    ] as string[];

    if (videoIds.length === 0) return [];

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoIds.join(","),
          key: process.env.YT_KEY,
        },
      }
    );

    const videos: YTVideo[] = response.data.items.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    return videos;
  } catch (error) {
    console.log("YT Fetch Error:", error);
    return [];
  }
};

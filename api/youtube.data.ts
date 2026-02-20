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
  console.log("YT API Key Loaded:", process.env.EXPO_PUBLIC_YT_KEY);
  try {
    if (!links || links.length === 0) return [];

    const extractVideoId = (url: string) => {
      const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([0-9A-Za-z_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    // Extract unique, valid video IDs
    const videoIds = Array.from(
      new Set(
        links
          .map(link => extractVideoId(link.url))
          .filter(Boolean)
      )
    ) as string[];

    console.log("Extracted video IDs:", videoIds);

    if (!videoIds.length) return [];

    // Limit to 50 IDs per YouTube API request
    const limitedVideoIds = videoIds.slice(0, 50);

    if (!process.env.EXPO_PUBLIC_YT_KEY) {
      console.error("YouTube API key is missing!");
      return [];
    }

    console.log("Making YT API request with IDs:", limitedVideoIds);

    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        id: limitedVideoIds.join(","),
        key: process.env.EXPO_PUBLIC_YT_KEY,
      },
    });

    console.log("YT API Response items:", response.data.items);

    const videos: YTVideo[] = response.data.items.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    console.log("Mapped videos:", videos);

    return videos;
  } catch (error: any) {
    console.log("YT Fetch Error:", error.response?.data || error.message || error);
    return [];
  }
};

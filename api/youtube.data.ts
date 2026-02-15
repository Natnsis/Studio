import axios from 'axios';

type links = {
  id: string,
  created_at: Date,
  url: string,
}

export const fetchData = async (collection: links) => {
  try {
    const { url } = collection;
    const extractVideoId = (url: string) => {
      const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
      return match ? match[1] : null;
    };

    const videoIds = collection
      .map(extractVideoId)
      .filter(Boolean);

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
  } catch (error) {
    console.log(error)
  }

}

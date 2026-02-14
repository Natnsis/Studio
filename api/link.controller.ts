import { supabase } from "@/lib/supabase"
import axios from 'axios'

type LinkData = {
  url: string,
  userId: string
}

export const searchLink = async (data: LinkData) => {
  try {
    const { url, userId } = data;

    const { error: addingError } = await supabase
      .from("links")
      .insert({
        url,
        user_id: userId
      });

    if (addingError) {
      throw addingError;
    }

    const response = await axios.post(
      process.env.EXPO_PUBLIC_AUDIO_API!,
      { url }
    );
    console.log(response);

    return response.data;

  } catch (error) {
    throw error;
  }
};

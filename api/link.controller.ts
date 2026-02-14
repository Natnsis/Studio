import { supabase } from "@/lib/supabase"
import axios from 'axios'

type LinkData = {
  url: string,
  userId: string
}

export const searchLink = async (data: LinkData) => {
  try {
    const { url, userId } = data;
    const { error: addingError } = await supabase.from('links')
      .insert({
        url,
        user_id: userId
      });
    if (!addingError) {
      const response = await axios.post(process.env.EXPO_PUBLIC_AUDIO_API!);
      return response
    }
  } catch (error) {
    throw error
  }
}

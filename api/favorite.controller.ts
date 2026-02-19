import { supabase } from "@/lib/supabase"
import { toast } from "sonner-native"

type favoritesData = {
  url: string,
  title: string,
  thumbnail: string,
  user_id: string
}

export const addToFavorites = async (data: favoritesData) => {
  try {
    const { url, title, thumbnail, user_id } = data
    const { error } = await supabase.from('favorites')
      .insert({
        url,
        title,
        thumbnail,
        user_id
      });
    if (error) {
      throw error
    }
    toast.success('added to favorites')
  } catch (error) {
    throw error
  }
}

export const fetchFavoritesById = async (id: string) => {
  try {
    const { data: favorites, error: favoritesError } = await supabase.from('favorites')
      .select('*')
      .eq('user_id', id)
    if (favoritesError) {
      throw favoritesError
    }
    return favorites
  } catch (error) {
    throw error
  }
}

export const deleteFavorites = async (id: string) => {
  try {
    const { error: deleteError } = await supabase.from('favorites')
      .delete()
      .eq('id', id)
    if (deleteError) {
      throw deleteError
    }
    toast.info('deleted successfully')
  } catch (error) {
    throw error
  }
}

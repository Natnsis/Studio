import { supabase } from "@/lib/supabase"

export const getLinks = async (userId: string) => {
  try {
    const links = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
    return links;
  } catch (error) {
    throw error
  }
}

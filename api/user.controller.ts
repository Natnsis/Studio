import { supabase } from 'lib/supabase'

export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user
  } catch (error) {
    console.log(error)
  }
}

import { supabase } from "@/lib/supabase";
import { AuthTypes } from "@/schemas/auth.schema"

export const loginWithPassword = async (data: AuthTypes) => {
  try {
    const { email, password } = data;
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (loginError) throw loginError;
  } catch (error) {
    throw error
  }
}





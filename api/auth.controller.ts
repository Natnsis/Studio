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

export const registerWithPassword = async (data: AuthTypes) => {
  try {
    const { email, password } = data;
    const { error: registerError } = await supabase.auth.signUp({
      email,
      password
    });
    if (registerError) throw registerError;
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const { error: logoutError } = await supabase.auth.signOut()
    if (logoutError) throw logoutError;
  } catch (error) {
    throw error
  }
}

export const googelOAuthLogin = async () => {
  try {
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  } catch (error) {
    throw error
  }
}

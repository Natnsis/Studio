import { supabase } from "@/lib/supabase";
import * as AuthSession from 'expo-auth-session';
import { AuthTypes } from "@/schemas/auth.schema"
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

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

export const googleOAuthLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google login error:', error.message);
    }
  } catch (err) {
    console.error('Login failed:', err);
  }
};

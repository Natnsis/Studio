import { supabase } from "@/lib/supabase";
import { AuthTypes } from "@/schemas/auth.schema"
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

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
    const redirectTo = Linking.createURL('/tabs/home');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) throw error;

    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    }
  } catch (err) {
    console.error('Google login failed:', err);
  }
};

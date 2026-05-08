// Supabase integration disabled for local-only playback
// This file is kept to avoid import errors but will not initialize if environment variables are missing

export const supabase = {
  auth: {
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => ({ data: null, error: null }),
        order: () => ({ data: [], error: null }),
      }),
    }),
  }),
};

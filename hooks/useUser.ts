import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;

      return data.user;
    },
    staleTime: Infinity,
  });
};

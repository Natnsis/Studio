import { colors } from '@/assets/colors'
import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { deleteFavorites, fetchFavoritesById } from '@/api/favorite.controller';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { searchLink } from '@/api/link.controller';
import { toast } from 'sonner-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useQueryClient } from '@tanstack/react-query';

type Favorite = {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string;
};

const Favorites = () => {
  const { data: user, isLoading } = useUser();
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data: favorites } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => fetchFavoritesById(user!.id),
    enabled: !!user?.id
  });

  const queryClient = useQueryClient();

  const truncateByChars = (text?: string, maxChars = 50) => {
    if (!text) return "";
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars) + "...";
  };



  const handlePlayFavorite = async (item: Favorite) => {
    if (!user?.id) return;
    toast.success("streaming audio...");

    try {
      setLoadingId(item.id);

      const res = await searchLink({
        url: item.url,
        userId: user.id,
      });

      if (res?.audioUrl) {
        router.replace({
          pathname: "/inner/player",
          params: {
            audioUrl: res.audioUrl,
            title: res.title ?? item.title,
            thumbnail: res.thumbnail ?? item.thumbnail,
            youtubeUrl: item.url,
          },
        });
      }
    } catch (error) {
      console.error("Error playing favorite:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteAFavorite = async (id: string) => {
    try {
      await deleteFavorites(id);
      queryClient.invalidateQueries({
        queryKey: ['favorites', user?.id],
      });
    } catch (error) {
      toast.error('unable to delete!')
      console.log(error)
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%'
      }}
      className='p-3'
    >
      <View className='flex-row items-center'>
        <Feather name='target' size={25} />
        <Text
          style={{
            fontFamily: "readexBold",
            fontSize: 20
          }}
          className='pl-2'
        >Your favorites</Text>
      </View>

      <View className='w-[100%]'>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <Pressable
              className="flex-1 border p-2 rounded-lg"
              onPress={() => handlePlayFavorite(item)}
            >
              <View >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{
                    width: '100%',
                    height: 150
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'readexBold'
                  }}
                  className="mt-2 capitalize w-full"
                >
                  {truncateByChars(item.title, 25)}
                </Text>
                <View
                  className='flex-row justify-between items-center'>
                  <Text
                    style={{
                      fontFamily: "readexExtraLight",
                      fontSize: 15
                    }}
                    className="mt-2 w-[60%]">
                    {truncateByChars(item.url, 50)}
                  </Text>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <View className="p-2 rounded-gull">
                        <Feather name='trash-2' size={20} />
                      </View>
                    </AlertDialogTrigger>
                    <AlertDialogContent style={{
                      backgroundColor: colors.background
                    }}>
                      <AlertDialogHeader>
                        <AlertDialogDescription style={{
                          fontFamily: 'readexLight'
                        }}>
                          are you sure you want to remove?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-row justify-center">
                        <AlertDialogCancel style={{
                          backgroundColor: colors.secondary
                        }}
                        >
                          <Text
                            style={{
                              color: "#FFF",
                              fontFamily: 'readexRegular'
                            }}
                          >
                            Cancel
                          </Text>
                        </AlertDialogCancel>
                        <AlertDialogAction style={{
                          backgroundColor: colors.primary,
                        }}
                          onPress={() => deleteAFavorite(item?.id)}
                        >
                          <Text
                            style={{
                              color: "#FFF",
                              fontFamily: 'readexRegular'
                            }}
                          >
                            Remove
                          </Text>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Favorites 

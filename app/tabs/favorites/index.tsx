import { colors } from '@/assets/colors'
import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoritesById } from '@/api/favorite.controller';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { searchLink } from '@/api/link.controller';

const Favorites = () => {
  const { data: user, isLoading } = useUser();
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { data: favorites } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => fetchFavoritesById(user!.id),
    enabled: !!user?.id
  });


  const truncateByChars = (text?: string, maxChars = 50) => {
    if (!text) return "";
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars) + "...";
  };



  const handlePlayFavorite = async (item: typeof favorites[0]) => {
    if (!user?.id) return;

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
                  <Button
                    size="icon"
                    variant="ghost"
                  >
                    <Feather name='trash-2' size={20} />
                  </Button>
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

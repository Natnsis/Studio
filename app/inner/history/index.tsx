import { colors } from "@/assets/colors"
import { Button } from "@/components/ui/button"
import { View, Text, FlatList, Image } from "react-native"
import { Input } from "@/components/ui/input";
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getLinks, searchLink } from "@/api/link.controller";
import { fetchYTData } from "@/api/youtube.data";
import { useUser } from "@/hooks/useUser";
import { useState, useMemo } from "react";

interface YTVideo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
}

const HistoryScreen = () => {
  const router = useRouter()
  const { data: user } = useUser();
  const [historying, setHistorying] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [ascending, setAscending] = useState<boolean>(true)

  const { data: linksResponse } = useQuery({
    queryKey: ['links', user?.id],
    queryFn: () => getLinks(user!.id),
    enabled: !!user?.id,
  });

  const { data: ytVideos } = useQuery({
    queryKey: ['ytVideos', linksResponse?.data],
    queryFn: () => fetchYTData(linksResponse?.data ?? []),
    enabled: !!linksResponse?.data?.length,
  });

  // Filtered & sorted list
  const filteredVideos = useMemo(() => {
    if (!ytVideos) return []

    let filtered = ytVideos.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchText.toLowerCase())
    )

    if (!ascending) filtered = filtered.reverse()

    return filtered
  }, [ytVideos, searchText, ascending])

  const handlePlayHistory = async (item: YTVideo) => {
    if (!user?.id) return;

    try {
      setHistorying(true);
      const ytUrl = `https://youtu.be/${item.videoId}`;
      const res = await searchLink({ url: ytUrl, userId: user.id });

      if (res && res.audioUrl) {
        router.replace({
          pathname: '/inner/player',
          params: {
            audioUrl: res.audioUrl,
            title: res.title ?? '',
            thumbnail: res.thumbnail ?? '',
            youtubeUrl: ytUrl,
          },
        });
      }
    } catch (error) {
      console.error('Error playing history item:', error);
    } finally {
      setHistorying(false);
    }
  };

  return (
    <SafeAreaView
      style={{ height: '100%', backgroundColor: colors.background }}
      className="px-3 py-1"
    >
      {/* header */}
      <View className="flex-row items-center">
        <Button
          size="icon"
          variant="ghost"
          onPress={() => router.replace("/tabs/home")}
        >
          <Feather name="chevron-left" size={24} color={colors.secondary} />
        </Button>
        <View className="w-[90%] flex justify-center">
          <Text
            className="text-center"
            style={{ fontFamily: "readexBold", fontSize: 20 }}
          >
            Recently played
          </Text>
        </View>
      </View>

      {/* search */}
      <View className="px-3 mt-3">
        <Input
          style={{ fontFamily: "readexExtraLight", fontSize: 13 }}
          placeholder="search for your recent plays..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* analysis */}
      <View className="mt-5 flex-row justify-between px-1">
        <Text style={{ fontFamily: "readexBold", fontSize: 15 }} className="mb-1">
          {filteredVideos.length} Items
        </Text>
        <Button variant="ghost" onPress={() => setAscending(prev => !prev)}>
          <Text style={{ fontFamily: "readexLight", fontSize: 13 }} className="mb-1">
            {ascending ? "Ascending" : "Descending"}
          </Text>
          <Feather name="filter" size={20} />
        </Button>
      </View>

      {/* separator */}
      <View style={{ height: 1, backgroundColor: colors.typo, marginVertical: 5 }} />

      {/* flatlist */}
      <View className='flex-1 mt-2'>
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item?.videoId.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className='flex-row justify-between mb-3'>
              <View className='flex-row w-[60%]'>
                <Image
                  source={{ uri: item?.thumbnail }}
                  style={{ width: 70, height: 70 }}
                  className='rounded-sm border'
                />
                <View className='ml-2 flex-col justify-center'>
                  <Text style={{ fontFamily: "readexBold", fontSize: 14 }} className='capitalize'>
                    {item.title.length > 15 ? item.title.slice(0, 15) + "..." : item.title}
                  </Text>
                  <Text style={{ fontFamily: "readexExtraLight", fontSize: 12 }} className='capitalize'>
                    {item.channel}
                  </Text>
                </View>
              </View>

              <View className="flex-row">
                <View className='flex-col justify-center'>
                  <Button
                    style={{ backgroundColor: colors.primary }}
                    className="rounded-full justify-center items-center"
                    onPress={() => handlePlayHistory(item)}
                    disabled={historying}
                  >
                    <Image
                      source={require('@/assets/images/play.png')}
                      style={{ width: 15, height: 15, tintColor: 'white' }}
                      resizeMode="contain"
                    />
                  </Button>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default HistoryScreen

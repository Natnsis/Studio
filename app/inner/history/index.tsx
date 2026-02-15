import { colors } from "@/assets/colors"
import { Button } from "@/components/ui/button"
import { View, Text, FlatList, Image } from "react-native"
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { history, History } from '@/contants/history';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "@/api/link.controller";
import { fetchYTData } from "@/api/youtube.data";
import { useUser } from "@/hooks/useUser";

const HistoryScreen = () => {
  const router = useRouter()
  const { data: user, isLoading } = useUser();

  const { data: linksResponse } = useQuery({
    queryKey: ['links', user?.id],
    queryFn: () => getLinks(user!.id),
    enabled: !!user?.id,
  });

  const { data: ytVideos, isLoading: fetchingYT } = useQuery({
    queryKey: ['ytVideos', linksResponse?.data],
    queryFn: () => fetchYTData(linksResponse!.data),
    enabled: !!linksResponse?.data?.length,
  });

  return (
    <SafeAreaView
      style={{ height: '100%', backgroundColor: colors.background }}
      className="px-3 py-1"
    >
      {/*header*/}
      <View className="flex-row items-center">
        <Button
          size="icon"
          variant="ghost"
          onPress={() => router.replace("/tabs/home")}
        >
          <Feather name="chevron-left" size={24} color={colors.secondary} />
        </Button>
        <View
          className="w-[90%] flex justify-center"
        >
          <Text
            className="text-center"
            style={{
              fontFamily: "readexBold", fontSize: 20
            }}
          >
            Recently played
          </Text>
        </View>
      </View>

      {/*search*/}
      <View className="px-3 mt-3">
        <Input
          placeholder="search for your recent plays"
          style={{
            fontFamily: "readexExtraLight",
            fontSize: 13,
            borderColor: colors.typo,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 8,

            elevation: 10,
          }}
          className="rounded-lg"
        />
      </View>

      {/*anlysis*/}
      <View className="mt-5 flex-row justify-between px-1">
        <Text
          style={{
            fontFamily: "readexBold",
            fontSize: 15,
          }}
          className="mb-1"
        >
          579 Items
        </Text>
        <Button
          variant="ghost"
        >
          <Text
            style={{
              fontFamily: "readexLight",
              fontSize: 13,
            }}
            className="mb-1"
          >
            Ascending
          </Text>
          <Feather name="filter" />
        </Button>
      </View>
      <Separator />

      {/*flatlist*/}
      <View className='flex-1 mt-2'>
        <FlatList<History>
          data={ytVideos}
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
                  <Text
                    style={{
                      fontFamily: "readexBold", fontSize: 14
                    }}
                    className='capitalize'>
                    {item.title.length > 15
                      ? item.title.slice(0, 15) + "..."
                      : item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "readexExtraLight", fontSize: 12
                    }}
                    className='capitalize'
                  >
                    {item.channel}
                  </Text>
                </View>
              </View>

              <View className="flex-row">
                <View className='flex-col justify-center'>
                  <Button
                    style={{ backgroundColor: colors.primary }}
                    className="rounded-full justify-center items-center"
                    onPress={() => router.replace("/inner/player")}
                  >
                    <Image
                      source={require('@/assets/images/play.png')}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: 'white',
                      }}
                      resizeMode="contain"
                    />
                  </Button>
                </View>
                <View className="flex-col justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Feather name="more-vertical" size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ backgroundColor: colors.background }}>
                      <DropdownMenuLabel>
                        <Button variant="outline" size="icon">
                          <Feather name="trash-2" size={20} color={colors.primary} />
                        </Button>
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

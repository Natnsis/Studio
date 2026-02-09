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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HistoryScreen = () => {
  const router = useRouter()
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
      <View className='flex-1'>
        <FlatList<History>
          data={history}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className='flex-row justify-between mb-3'>
              <View className='flex-row w-[60%]'>
                <Image
                  source={require("assets/images/history/history1.jpg")}
                  style={{ width: 70, height: 70 }}
                  className='rounded-sm border'
                />
                <View className='ml-2 flex-col justify-center'>
                  <Text
                    style={{
                      fontFamily: "readexBold", fontSize: 14
                    }}
                    className='capitalize'>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "readexExtraLight", fontSize: 12
                    }}
                    className='capitalize'
                  >{item.name}</Text>
                </View>
              </View>

              <View className="flex-row">
                <View className='flex-col justify-center'>
                  <Button
                    style={{ backgroundColor: colors.primary }}
                    className="rounded-full justify-center items-center"
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

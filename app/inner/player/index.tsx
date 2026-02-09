import { colors } from "@/assets/colors"
import { View, Text, Image, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/button"
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const Player = () => {
  const { height } = Dimensions.get('screen')
  const router = useRouter()
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%'
      }}
      className="p-3"
    >
      {/*header*/}
      <View className="flex-row justify-between items-center">
        <Button
          onPress={() => router.replace("/tabs/home")}
          size="icon"
          className="rounded-full"
        >
          <Feather name="chevron-left" color="#FFF" size={20} />
        </Button>

        <Text
          className="w-[50%] text-center"
          style={{
            fontFamily: "readexBold",
            fontSize: 16
          }}
        >
          Now Playing</Text>

        <Button size="icon" className="rounded-full">
          <Feather name="heart" color="#FFF" size={20} />
        </Button>
      </View>

      {/*image*/}
      <View className="mt-8 px-5">
        <Image
          style={{
            height: height * 0.40,
            width: '100%'
          }}
          className="rounded-xl"
          source={require("@/assets/images/history/history10.jpg")}
        />
      </View>

      {/*name*/}
      <View className="mt-5">
        <Text
          className="text-center"
          style={{
            fontFamily: "readexBold",
            fontSize: 20
          }}
        >
          Rolex Theme
        </Text>

        <Text
          className="text-center"
          style={{
            fontFamily: "readexLight",
            fontSize: 13
          }}
        >
          The Weekend
        </Text>
      </View>

      {/*playing line*/}
      <View className="h-[10%] border mt-5">

      </View>

      {/*player control*/}
      <View className="flex-row justify-between mt-8  h-[15%] items-center">
        <Button variant="ghost">
          <Feather name="repeat" size={25} />
        </Button>

        <View className="flex-row justify-between items-center">
          <Button variant="ghost">
            <Feather name="chevron-left" size={30} />
          </Button>

          <Button
            variant="ghost"
            className="h-full rounded-lg border">
            <Feather name="play" size={45} color={colors.primary} />
          </Button>

          <Button variant="ghost">
            <Feather name="chevron-right" size={30} />
          </Button>
        </View>

        <Button variant="ghost">
          <Feather name="more-horizontal" size={25} />
        </Button>

      </View>
    </SafeAreaView>
  )
}

export default Player

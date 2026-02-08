import { colors } from "@/assets/colors"
import { Dimensions, View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/button"
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router"

const index = () => {
  const { height, width } = Dimensions.get("window")
  const router = useRouter()
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%" }}>
      <View className="w-full h-full">
        <Image
          source={require("@/assets/images/overview.png")}
          style={{ height: height * 0.65, width: width }}
        />
        <View className="px-5">
          <Text
            style={{
              fontFamily: "readexSemiBold",
              fontSize: 35,
            }}
          >
            Songs make the journey of life worthwhile
          </Text>
        </View>
        <View className="px-5 pt-5">
          <Button
            style={{
              backgroundColor: colors.primary,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.7,
              shadowRadius: 4,
            }}
            className="border shadow-lg h-25"
            onPress={() => router.push("/register")}
          >
            <Text
              className="text-white"
              style={{
                fontFamily: "readexSemiBold",
              }}>
              SIGN UP
            </Text>

            <Feather name="arrow-right" size={28} color="#FFFFFF" />
          </Button>
        </View>
        <Text
          className="mt-5 text-center underline"
          style={{
            fontFamily: "readexSemiBold",
          }}>
          Terms of use</Text>
      </View>
    </SafeAreaView >
  )
}

export default index

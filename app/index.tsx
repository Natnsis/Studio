import { colors } from "@/assets/colors"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const index = () => {
  console.log(colors)
  return (
    <SafeAreaView>
      <Text style={{ color: colors.primary, fontSize: 20, fontFamily: "readexRegular" }}>hehe</Text>
    </SafeAreaView>
  )
}

export default index

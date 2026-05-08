import { colors } from "@/assets/colors"
import { Dimensions, View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/button"
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router"
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const { height, width } = Dimensions.get("window")
  const router = useRouter()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboarding_seen');
      if (value !== null) {
        router.replace("/tabs/home");
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_seen', 'true');
      router.replace("/tabs/home");
    } catch (e) {
      router.replace("/tabs/home");
    }
  };

  if (loading) return null;

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View className="flex-1">
        <Image
          source={require("@/assets/images/overview.png")}
          style={{ height: height * 0.6, width: width }}
          resizeMode="cover"
        />
        <View className="px-6 mt-8">
          <Text
            style={{
              fontFamily: "readexBold",
              fontSize: 32,
              lineHeight: 40,
              color: colors.typo
            }}
          >
            Your favorite YouTube tracks, now in audio
          </Text>
          <Text
            className="mt-4 text-gray-600"
            style={{
              fontFamily: "readexRegular",
              fontSize: 16,
            }}
          >
            Experience YouTube videos as audio. No ads, no tracking, just pure sound in the background.
          </Text>
        </View>
        <View className="px-6 mt-10">
          <Button
            style={{
              backgroundColor: colors.primary,
              height: 64,
              borderRadius: 32,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 10
            }}
            className="flex-row items-center justify-between px-8"
            onPress={handleGetStarted}
          >
            <Text
              className="text-white text-lg"
              style={{
                fontFamily: "readexBold",
              }}>
              GET STARTED
            </Text>

            <Feather name="arrow-right" size={24} color="#FFFFFF" />
          </Button>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default Index;

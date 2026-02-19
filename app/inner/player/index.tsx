import { colors } from "@/assets/colors";
import { View, Text, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Waveform from "@/components/WaveForm";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";

const Player = () => {
  const { data: user, isLoading } = useUser();
  const { height } = Dimensions.get("screen");
  const router = useRouter();
  const params = useLocalSearchParams();

  const audioUrl = (params?.audioUrl as string) || undefined;
  const titleParam = (params?.title as string) || "Unknown";
  const thumbnailParam = (params?.thumbnail as string) || undefined;

  const soundRef = useRef<Audio.Sound | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!audioUrl) return;

      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          (status) => {
            if (!mounted || !status || !status.isLoaded) return;

            setPosition((status.positionMillis ?? 0) / 1000);
            setDuration((status.durationMillis ?? 1000) / 1000);
            setIsPlaying(status.isPlaying ?? false);
          }
        );

        soundRef.current = sound;
      } catch (e) {
        console.log("Error loading audio:", e);
      }
    };

    load();

    return () => {
      mounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    try {
      if (!soundRef.current) return;

      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) return;

      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (e) {
      console.log("Play toggle error:", e);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1 }}
      className="p-3"
    >
      {/* Header */}
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
          style={{ fontFamily: "readexBold", fontSize: 16 }}
        >
          Now Playing
        </Text>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Feather name="heart" color={colors.secondary} size={20} />
        </Button>
      </View>

      {/* Image */}
      <View className="mt-8 px-5">
        <Image
          style={{ height: height * 0.4, width: "100%" }}
          className="rounded-xl"
          source={
            thumbnailParam
              ? { uri: thumbnailParam }
              : require("@/assets/images/history/history10.jpg")
          }
        />
      </View>

      {/* Title */}
      <View className="mt-5">
        <Text
          className="text-center"
          style={{ fontFamily: "readexBold", fontSize: 20 }}
        >
          {titleParam.length > 10
            ? titleParam.slice(0, 18) + "..."
            : titleParam}
        </Text>
      </View>

      {/* Waveform */}
      <View style={{ height: 80, marginTop: 20 }}>
        <Waveform
          width={320}
          height={60}
          progress={duration > 0 ? position / duration : 0}
        />
      </View>

      {/* Controls */}
      <View className="flex-row justify-between mt-8 items-center">
        <Button variant="ghost">
          <Feather name="repeat" size={25} />
        </Button>

        <View className="flex-row items-center">
          <Button
            variant="ghost"
            className="rounded-lg border h-30"
            onPress={togglePlay}
          >
            <Feather
              name={isPlaying ? "pause" : "play"}
              size={45}
              color={colors.primary}
            />
          </Button>
        </View>

        <Button variant="ghost">
          <Feather name="more-horizontal" size={25} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Player;

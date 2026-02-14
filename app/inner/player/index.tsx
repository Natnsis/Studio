import { colors } from "@/assets/colors";
import { View, Text, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useRouter, useSearchParams } from "expo-router";
import Waveform from "@/components/WaveForm";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const { height } = Dimensions.get("screen");
  const router = useRouter();
  const params = useSearchParams();
  const audioUrl = (params?.audioUrl as string) || undefined;
  const titleParam = (params?.title as string) || "Unknown";
  const thumbnailParam = (params?.thumbnail as string) || undefined;

  const soundRef = useRef<any>(null);
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
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          (status) => {
            if (!mounted || !status) return;
            if (status.isLoaded) {
              setPosition((status.positionMillis || 0) / 1000);
              setDuration((status.durationMillis || 1000) / 1000);
              setIsPlaying(!!status.isPlaying);
            }
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
      (async () => {
        try {
          if (soundRef.current) {
            await soundRef.current.unloadAsync();
            soundRef.current = null;
          }
        } catch (e) {
          console.log("Error unloading sound:", e);
        }
      })();
    };
  }, [audioUrl]);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, height: "100%" }}
      className="p-3"
    >
      {/* header */}
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

        <Button size="icon" className="rounded-full">
          <Feather name="heart" color="#FFF" size={20} />
        </Button>
      </View>

      {/* image */}
      <View className="mt-8 px-5">
        <Image
          style={{ height: height * 0.4, width: "100%" }}
          className="rounded-xl"
          source={thumbnailParam ? { uri: thumbnailParam } : require("@/assets/images/history/history10.jpg")}
        />
      </View>

      {/* title */}
      <View className="mt-5">
        <Text
          className="text-center"
          style={{ fontFamily: "readexBold", fontSize: 20 }}
        >
          {titleParam}
        </Text>

        <Text className="text-center" style={{ fontFamily: "readexLight", fontSize: 13 }}>
          {"Unknown Artist"}
        </Text>
      </View>

      {/* waveform */}
      <View style={{ height: 80, marginTop: 20, borderWidth: 0 }}>
        <Waveform width={320} height={60} progress={duration > 0 ? position / duration : 0} />
      </View>

      {/* controls */}
      <View className="flex-row justify-between mt-8  h-[15%] items-center">
        <Button variant="ghost">
          <Feather name="repeat" size={25} />
        </Button>

        <View className="flex-row justify-between items-center">
          <Button variant="ghost" className="h-full">
            <Feather name="skip-back" size={30} />
          </Button>

          <Button
            variant="ghost"
            className="h-full rounded-lg border"
            onPress={async () => {
              try {
                if (!soundRef.current) return;
                const status = await soundRef.current.getStatusAsync();
                if (status.isPlaying) {
                  await soundRef.current.pauseAsync();
                } else {
                  await soundRef.current.playAsync();
                }
              } catch (e) {
                console.log("play toggle error", e);
              }
            }}
          >
            <Feather name={isPlaying ? "pause" : "play"} size={45} color={colors.primary} />
          </Button>

          <Button variant="ghost" className="h-full">
            <Feather name="skip-forward" size={30} />
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
import { colors } from "@/assets/colors"
import { View, Text, Image, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/button"
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import Waveform from "@/components/WaveForm";

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
      import {useRouter, useSearchParams} from "expo-router";
      <Button
        import { Audio} from 'expo-av';
      import {useEffect, useRef, useState} from 'react';
      onPress={() => router.replace("/tabs/home")}
      size="icon"
      className="rounded-full"
      const params = useSearchParams();
      const audioUrl = params?.audioUrl as string | undefined;
      const titleParam = params?.title as string | undefined;
      const thumbnailParam = params?.thumbnail as string | undefined;

      const soundRef = useRef<any>(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [position, setPosition] = useState(0);
        const [duration, setDuration] = useState(1);
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

      {/*image*/ }
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

  {/*name*/ }
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
    source={thumbnailParam ? { uri: thumbnailParam } : require("@/assets/images/history/history10.jpg")}
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

  {/*playing line*/ }
  <View style={{ height: 80, marginTop: 20, borderWidth: 1 }}>
    <Waveform width={320} height={60} />
  </View>

  {/*player control*/ }
  <View className="flex-row justify-between mt-8  h-[15%] items-center">
    <Button variant="ghost">
      <Feather name="repeat" size={25} />
    </Button>

    <View className="flex-row justify-between items-center">
      <Button variant="ghost" className="h-full">
        <Feather name="skip-back" size={30} />
      </Button>

      <View style={{ height: 80, marginTop: 20, borderWidth: 0 }}>
        <Waveform width={320} height={60} progress={duration > 0 ? position / duration : 0} />
            className="h-full rounded-lg border">
        <Feather name="play" size={45} color={colors.primary} />
      </Button>

      <Button variant="ghost" className="h-full">
        <Feather name="skip-forward" size={30} />
      </Button>
    </View>

    <Button variant="ghost">
      <Feather name="more-horizontal" size={25} />
    </Button>

    <Button
      variant="ghost"
      className="h-full rounded-lg border"
      onPress={async () => {
        try {
          if (!soundRef.current) return;
          const status = await soundRef.current.getStatusAsync();
          if (status.isPlaying) {
            await soundRef.current.pauseAsync();
          } else {
            await soundRef.current.playAsync();
          }
        } catch (e) {
          console.log('play toggle error', e);
        }
      }}
    >
      <Feather name={isPlaying ? 'pause' : 'play'} size={45} color={colors.primary} />
      )
}

      export default Player

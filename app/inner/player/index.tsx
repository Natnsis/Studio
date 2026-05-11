import { colors } from "@/assets/colors";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Info } from 'lucide-react-native';
import { ActivityIndicator } from "react-native";

const getStringParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const getYoutubeId = (url?: string) => {
  if (!url) return null;

  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
};

const Player = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const youtubeUrl = getStringParam(params?.youtubeUrl);
  const videoId = getStringParam(params?.videoId) || getYoutubeId(youtubeUrl);
  const routeTitle = getStringParam(params?.title);
  const { height, width } = Dimensions.get('window');
  const lastPlayKeyRef = useRef<string | null>(null);
  
  const { videoId: currentVideoId, playing, loading, error, play, pause, resume, title } = usePlayer();

  const togglePlayback = () => {
    if (playing) {
      pause();
      return;
    }

    if (currentVideoId && !error) {
      resume();
      return;
    }

    play(currentVideoId || videoId, { youtubeUrl, title: routeTitle });
  };

  useEffect(() => {
    // If we navigate here with a new videoId, start playing it
    const playKey = videoId || null;

    if (videoId && playKey !== lastPlayKeyRef.current) {
      lastPlayKeyRef.current = playKey;
      play(videoId, { youtubeUrl, title: routeTitle });
    }
  }, [routeTitle, videoId, youtubeUrl]);

  const thumbnailUrl = currentVideoId 
    ? `https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg` 
    : null;

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1 }}
    >
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Button
          onPress={() => router.replace("/tabs/home")}
          size="icon"
          variant="ghost"
          className="rounded-full bg-white/5"
        >
          <Feather name="chevron-down" color={colors.typo} size={28} />
        </Button>

        <View className="items-center">
           <Text style={{ fontFamily: "readexBold", fontSize: 12, color: colors.typo, opacity: 0.5, letterSpacing: 1.5 }}>
             PLAYING FROM YOUTUBE
           </Text>
        </View>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full bg-white/5"
        >
          <Feather name="more-horizontal" color={colors.typo} size={24} />
        </Button>
      </View>

      <View className="flex-1 px-8 justify-center">
        {/* Cover Art Section */}
        <View 
          className="w-full aspect-square bg-[#1a1a1a] rounded-[40px] overflow-hidden shadow-2xl mb-10"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.4,
            shadowRadius: 30,
            elevation: 20
          }}
        >
          {thumbnailUrl ? (
            <Image 
              source={{ uri: thumbnailUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
             <View className="flex-1 items-center justify-center">
                <Feather name="music" size={80} color="rgba(255,255,255,0.1)" />
             </View>
          )}
        </View>

        {/* Visual Controls Section */}
        <View className="w-full">
          <View className="bg-[#121212] border-[1px] border-white/10 p-6 rounded-3xl shadow-2xl">
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-1 mr-4">
                <Text className="text-[10px] font-bold tracking-[2px] text-white/40 mb-1 uppercase">
                  {loading ? 'Loading Audio' : error ? 'Playback Error' : 'Now Streaming'}
                </Text>
                <Text className="text-xl font-bold text-white leading-7" numberOfLines={2}>
                  {error || title}
                </Text>
              </View>
              <View className="bg-white/5 p-2 rounded-full">
                 <Info size={16} color="rgba(255,255,255,0.4)" />
              </View>
            </View>

            <View className="flex-row items-center justify-center gap-10">
              <TouchableOpacity className="p-2 opacity-40">
                <SkipBack size={28} color="white" fill="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={togglePlayback}
                disabled={loading}
                className={`h-20 w-20 items-center justify-center rounded-full bg-white`}
                style={{ 
                  shadowColor: '#fff', 
                  shadowOffset: { width: 0, height: 0 }, 
                  shadowOpacity: 0.2, 
                  shadowRadius: 20,
                  elevation: 10
                }}
              >
                {loading ? (
                  <ActivityIndicator color="black" />
                ) : playing ? (
                  <Pause size={36} color="black" fill="black" />
                ) : (
                  <Play size={36} color="black" fill="black" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>

              <TouchableOpacity className="p-2 opacity-40">
                <SkipForward size={28} color="white" fill="white" />
              </TouchableOpacity>
            </View>

            <View className="mt-8 flex-row items-center justify-between border-t-[1px] border-white/5 pt-6">
              <View className="flex-row items-center">
                <Volume2 size={16} color="rgba(255,255,255,0.6)" />
                <Text className="ml-2 text-[10px] font-bold uppercase text-white/60 tracking-widest">
                   Signal: Locked
                </Text>
              </View>
              
              <View className="flex-row gap-[3px] items-end h-4">
                 {[0.4, 0.7, 1.0, 0.6, 0.8].map((val, i) => (
                   <View 
                     key={i} 
                     className="w-[3px] bg-white rounded-full" 
                     style={{ 
                       height: playing ? (10 + (i * 2)) : 4,
                       opacity: 0.3 + val * 0.7
                     }} 
                   />
                 ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="px-8 pb-12">
        <View className="flex-row items-center justify-between mb-8">
           <TouchableOpacity className="bg-white/5 p-4 rounded-2xl flex-1 mr-4">
              <Text style={{ fontFamily: 'readexBold', fontSize: 10, color: 'gray', marginBottom: 4 }}>SOURCE</Text>
              <Text style={{ fontFamily: 'readexMedium', fontSize: 12, color: colors.typo }} numberOfLines={1}>
                {youtubeUrl || `youtube.com/v/${videoId}`}
              </Text>
           </TouchableOpacity>
           
           <TouchableOpacity className="bg-primary/10 p-4 rounded-2xl">
              <Feather name="share-2" size={20} color={colors.primary} />
           </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="items-center py-2"
          onPress={() => router.replace("/tabs/home")}
        >
          <View className="h-1.5 w-12 bg-gray-200 rounded-full" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Player;

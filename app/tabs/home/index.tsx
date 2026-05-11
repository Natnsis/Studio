import { colors } from '@/assets/colors';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { SearchSchema, SearchType } from '@/schemas/search.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

interface HistoryItem {
  id: string;
  videoId: string;
  title: string;
  timestamp: number;
}

const Home = () => {
  const { height, width } = Dimensions.get('window');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const router = useRouter();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      url: '',
    },
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('@play_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load history');
    }
  };

  const saveToHistory = async (videoId: string, url: string) => {
    try {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        videoId,
        title: `Video ${videoId}`,
        timestamp: Date.now(),
      };
      
      const savedHistory = await AsyncStorage.getItem('@play_history');
      const currentHistory = savedHistory ? JSON.parse(savedHistory) : [];
      const updatedHistory = [newItem, ...currentHistory.filter((item: HistoryItem) => item.videoId !== videoId)].slice(0, 10);
      
      setHistory(updatedHistory);
      await AsyncStorage.setItem('@play_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to save history');
    }
  };

  const onSubmit = async (data: SearchType) => {
    const videoId = getYoutubeId(data.url);
    if (!videoId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    await saveToHistory(videoId, data.url);
    reset();
    
    router.push({
      pathname: '/inner/player',
      params: { videoId, youtubeUrl: data.url },
    });
  };

  const handlePlayHistory = (item: HistoryItem) => {
    router.push({
      pathname: '/inner/player',
      params: { videoId: item.videoId, youtubeUrl: `https://www.youtube.com/watch?v=${item.videoId}` },
    });
  };

  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) setGreeting("Good Morning!");
    else if (currentHour >= 12 && currentHour < 17) setGreeting("Good Afternoon!");
    else if (currentHour >= 17 && currentHour < 21) setGreeting("Good Evening!");
    else setGreeting("Good Night!");
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="p-5 flex-1">
        <View className="flex-row justify-between items-center">
          <View>
            <Text style={{ fontFamily: 'readexBold', fontSize: 28, color: colors.typo }}>
              {greeting}
            </Text>
            <Text style={{ fontFamily: 'readexRegular', fontSize: 14, color: 'gray' }}>
              Drop a link and let the music play ✨
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.secondary,
            borderColor: colors.typo,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 10,
          }}
          className="mt-8 rounded-2xl border-[1.5px] p-6">
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Paste YouTube Link here..."
                  style={{ fontFamily: 'readexRegular', fontSize: 14, height: 50 }}
                  className="bg-white rounded-xl px-4"
                />
                {errors.url && (
                  <Text className="text-red-500 mt-2 ml-1" style={{ fontFamily: 'readexRegular', fontSize: 12 }}>
                    {errors.url.message}
                  </Text>
                )}
              </>
            )}
          />

          <Button
            style={{
              backgroundColor: colors.primary,
              height: 50,
              borderRadius: 25,
            }}
            className="mt-4 flex-row items-center justify-center"
            onPress={handleSubmit(onSubmit)}>
            <Feather name="play" size={18} color="#FFF" />
            <Text style={{ fontFamily: 'readexBold', fontSize: 16 }} className="text-white ml-2">
              Play Now
            </Text>
          </Button>
        </View>

        <View className="mt-10 flex-row justify-between items-center">
          <Text style={{ fontFamily: 'readexBold', fontSize: 20, color: colors.typo }}>
            Recently Played
          </Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={async () => {
              await AsyncStorage.removeItem('@play_history');
              setHistory([]);
            }}>
              <Text style={{ fontFamily: 'readexRegular', fontSize: 12, color: 'red' }}>
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-1 mt-4">
          {history.length > 0 ? (
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handlePlayHistory(item)}
                  className="mb-4 flex-row items-center bg-white p-3 rounded-xl border-[1px] border-gray-100"
                >
                  <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
                    <Feather name="music" size={20} color={colors.primary} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text style={{ fontFamily: 'readexBold', fontSize: 14 }} numberOfLines={1}>
                      {item.videoId}
                    </Text>
                    <Text style={{ fontFamily: 'readexLight', fontSize: 12, color: 'gray' }}>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="lightgray" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View className="items-center mt-20">
              <Feather name="clock" size={48} color="lightgray" />
              <Text style={{ fontFamily: 'readexLight', fontSize: 14, color: 'gray' }} className="mt-4">
                No recent tracks yet
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

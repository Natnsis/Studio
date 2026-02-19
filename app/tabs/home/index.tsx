import { colors } from '@/assets/colors';
import { View, Text, Dimensions, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { SearchSchema, SearchType } from '@/schemas/search.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getLinks, searchLink } from '@/api/link.controller';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { fetchYTData } from '@/api/youtube.data';

const Home = () => {
  const { height, width } = Dimensions.get('window');
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, isLoading } = useUser();


  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (data: SearchType) => {
    try {
      setLoading(true);
      const userId = user?.id as string;
      const res = await searchLink({ ...data, userId });
      console.log(res);
      if (res && res.audioUrl) {
        const q = `?audioUrl=${encodeURIComponent(res.audioUrl)}&title=${encodeURIComponent(res.title ?? '')}&thumbnail=${encodeURIComponent(res.thumbnail ?? '')}`;
        router.replace({
          pathname: '/inner/player',
          params: {
            audioUrl: res.audioUrl,
            title: res.title ?? '',
            thumbnail: res.thumbnail ?? '',
          },
        });
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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

  const displayedItem = ytVideos?.slice(0, 6) || [];

  return (
    <SafeAreaView>
      <View className="p-5" style={{ backgroundColor: colors.background, height: height }}>
        {/*header*/}
        <View className="flex-row justify-between">
          <View>
            <Text style={{ fontFamily: 'readexBold', fontSize: 25 }}>Good Morning!</Text>
            <Text style={{ fontFamily: 'readexRegular', fontSize: 12 }}>
              Let's play some audio!
            </Text>
          </View>
        </View>

        {/*search*/}
        <View
          style={{
            height: height * 0.2,
            backgroundColor: colors.secondary,
            borderColor: colors.typo,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 8,

            elevation: 20,
          }}
          className="mt-5 rounded-xl border-2 p-5">
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="https://youtube/url-name/id-123?.."
                  style={{ fontFamily: 'readexLight', fontSize: 10 }}
                />
                {errors.url && (
                  <Text
                    style={{
                      fontFamily: 'readexRegular',
                      fontSize: 10,
                    }}
                    className="text-center">
                    {errors.url.message}
                  </Text>
                )}
              </>
            )}
          />

          <View className="mt-5 flex-row justify-center">
            <Button
              style={{
                backgroundColor: colors.primary,
                width: width * 0.4,
              }}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}>
              <Feather name="search" size={18} color="#FFF" />
              <Text style={{ fontFamily: 'readexRegular', fontSize: 15 }} className="text-white">
                {isLoading ? 'loading...' : 'Search'}
              </Text>
            </Button>
          </View>
        </View>

        {/*history*/}
        <View className="mt-8 flex-row justify-between">
          <Text
            style={{
              fontFamily: 'readexBold',
              fontSize: 18,
            }}>
            Recently Played
          </Text>
          <Link href="/inner/history">
            <Text
              style={{
                fontFamily: 'readexExtraLight',
                fontSize: 13,
              }}
              className="underline">
              View More
            </Text>
          </Link>
        </View>

        {/*flatlist*/}
        <View className="flex-1">
          {ytVideos ?
            <FlatList
              data={displayedItem}
              keyExtractor={(item) => item?.videoId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="mb-3 flex-row justify-between">
                  <View className="w-[60%] flex-row">
                    <Image
                      source={{ uri: item?.thumbnail }}
                      style={{ width: 70, height: 70 }}
                      className="rounded-sm border"
                    />
                    <View className="ml-2 flex-col justify-center">
                      <Text
                        style={{
                          fontFamily: 'readexBold',
                          fontSize: 14,
                        }}
                        className="capitalize">
                        {item.title.length > 15
                          ? item.title.slice(0, 15) + "..."
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'readexExtraLight',
                          fontSize: 12,
                        }}
                        className="capitalize">
                        {item.channel}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-col justify-center">
                    <Button
                      style={{ backgroundColor: colors.primary }}
                      className="items-center justify-center rounded-full"
                      onPress={() => router.replace('/inner/player')}>
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
                </View>
              )}
            /> :
            <Text
              style={{
                fontFamily: 'light',
                fontSize: 12
              }}
              className='text-center'
            >
              no history yet
            </Text>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

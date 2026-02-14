import { colors } from '@/assets/colors'
import { View, Text, Dimensions, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { history, History } from '@/contants/history';
import { Controller, useForm } from 'react-hook-form';
import { SearchSchema, SearchType } from '@/schemas/search.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { searchLink } from '@/api/link.controller';
import { useUser } from '@/hooks/useUser';

const Home = () => {
  const { height, width } = Dimensions.get("window")
  const [loading, setLoading] = useState<boolean>(false)
  const { data: user, isLoading } = useUser();

  const displayedItem = history.slice(0, 6)
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      url: ""
    }
  })

  const onSubmit = async (data: SearchType) => {
    try {
      setLoading(true);
      const userId = user?.id as string
      const res = await searchLink({ ...data, userId });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <View
        className='p-5'
        style={{ backgroundColor: colors.background, height: height }}>
        {/*header*/}
        <View className='flex-row justify-between'>
          <View>
            <Text style={{ fontFamily: "readexBold", fontSize: 25 }}>
              Good Morning!
            </Text>
            <Text style={{ fontFamily: "readexRegular", fontSize: 12 }}>
              Let's play some audio!
            </Text>
          </View>
        </View>

        {/*search*/}
        <View
          style={{
            height: height * 0.20,
            backgroundColor: colors.secondary,
            borderColor: colors.typo,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 8,

            elevation: 20,
          }}
          className='border-2 rounded-xl mt-5 p-5'
        >
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder='https://youtube/url-name/id-123?..'
                  style={{ fontFamily: "readexLight", fontSize: 10 }}
                />
                {errors.url && (
                  <Text style={{
                    fontFamily: "readexRegular",
                    fontSize: 10,
                  }}
                    className='text-center'
                  >
                    {errors.url.message}
                  </Text>
                )}
              </>
            )}
          />

          <View className='mt-5 flex-row justify-center'>
            <Button
              style={{
                backgroundColor: colors.primary,
                width: width * 0.4
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Feather
                name='search'
                size={18}
                color="#FFF"
              />
              <Text
                style={{ fontFamily: "readexRegular", fontSize: 15 }}
                className='text-white'
              >
                Search
              </Text>
            </Button>
          </View>
        </View>

        {/*history*/}
        <View
          className='mt-8 flex-row justify-between'>
          <Text style={{
            fontFamily: "readexBold", fontSize: 18
          }}>
            Recently Played
          </Text>
          <Link
            href="/inner/history"
          >
            <Text
              style={{
                fontFamily: "readexExtraLight", fontSize: 13
              }}
              className='underline'
            >
              View More
            </Text>
          </Link>
        </View>

        {/*flatlist*/}
        <View className='flex-1'>
          <FlatList<History>
            data={displayedItem}
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
                <View className='flex-col justify-center'>
                  <Button
                    style={{ backgroundColor: colors.primary }}
                    className="rounded-full justify-center items-center"
                    onPress={() => router.replace("/inner/player")}
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
              </View>
            )}
          />
        </View>

      </View>
    </SafeAreaView >
  )
}

export default Home 

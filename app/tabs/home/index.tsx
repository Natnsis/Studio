import { colors } from '@/assets/colors'
import { View, Text, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { history, History } from '@/contants/history';

const Home = () => {
  const { height, width } = Dimensions.get("window")
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
              Let's play some music!
            </Text>
          </View>

          <Avatar alt="Zach Nugent's Avatar">
            <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
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
          <Input
            placeholder='https://youtube/url-name/id-123?..'
            style={{ fontFamily: "readexLight", fontSize: 10 }}
          />
          <View className='mt-5 flex-row justify-center'>
            <Button
              style={{
                backgroundColor: colors.primary,
                width: width * 0.4
              }}>
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
            style={{
              fontFamily: "readexBold", fontSize: 18
            }}
            href="/"
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

        <View className='flex-1'>
          <FlatList<History>
            data={history}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity className='flex-row justify-between'>
                <View>
                  <Image
                    source={require("assets/images/history/history1.jpg")}
                    style={{ width: 60, height: 60 }}
                  />
                  <Text>{item.title}</Text>
                </View>
                <View>
                  <Button
                    size="icon"
                    style={{ backgroundColor: colors.primary }}
                    className='rounded-full flex-row jusitfy-center'>
                    <Image source={require("assets/images/play.svg")} />
                  </Button>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Home 

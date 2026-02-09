import { colors } from '@/assets/colors'
import { View, Text, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { width } = Dimensions.get("screen")
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%',
      }}
      className='p-3'
    >
      <View className="mt-5 items-center justify-center">
        <Image
          source={require("@/assets/images/history/history15.jpg")}
          style={{
            width: width * 0.3,
            height: width * 0.3,
          }}
          className="rounded-full"
          resizeMode="cover"
        />
      </View>

      <View className='mt-5'>
        <Text
          className='text-center'
          style={{
            fontFamily: "readexExtraLight"
          }}
        >
          nsisay49@gmail.com
        </Text>
        <Text
          className='text-center'
          style={{
            fontFamily: "readexBold"
          }}
        >
          Natnael Sisay
        </Text>
      </View>

      {/*social medias*/}
      <View className='flex-row gap-5 items-center justify-center mt-10'>
        <View className='flex-1 border p-2 rounded'>
          <View className='flex-row gap-1'>
            <Feather name="navigation" size={40} />
            <Text
              style={{
                fontFamily: 'readexExtraLight',
                fontSize: 14
              }}
              className='w-[70%]'
            >
              discuss on telegram
            </Text>
          </View>
        </View>

        <View className='flex-1 border p-2 rounded'>
          <View className='flex-row gap-1'>
            <Feather name="github" size={40} />
            <Text
              style={{
                fontFamily: 'readexExtraLight',
                fontSize: 14
              }}
              className='w-[80%]'
            >
              get git source code
            </Text>
          </View>
        </View>
      </View>

      <View className='mt-10'>
        <Button
          variant="ghost"
          style={{
            backgroundColor: colors.secondary,
            height: '30%'
          }}
        >
          <Feather name='log-out' color="#FFF" size={40} />
          <Text
            style={{
              fontFamily: 'readexBold',
              fontSize: 20,
              color: '#FFF'
            }}
          >Logout</Text>
        </Button>
      </View>

    </SafeAreaView >
  )
}

export default Profile 

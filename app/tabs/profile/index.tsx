import { colors } from '@/assets/colors'
import { View, Text, Image, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner-native';
import { logout } from '@/api/auth.controller';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking } from 'react-native';

const openGithub = async () => {
  const url = 'https://github.com/Natnsis/Studio';
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log("Can't open URL");
  }
};

const openTelegram = async () => {
  const url = 'tg://resolve?domain=bugpusher';
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    await Linking.openURL('https://t.me/bugpusher');
  }
};

const Profile = () => {
  const { width } = Dimensions.get("screen")
  const { data: user, isLoading } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
      toast.success('logged out successfully')
      router.replace('/login')
    } catch (err: any) {
      console.log(err)
      toast.error("error while logging out")
      setLoading(false);
    }
  }

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
          {isLoading ? "guest@gmail.com" : user?.email}
        </Text>
        <Text
          className='text-center'
          style={{
            fontFamily: "readexBold"
          }}
        >
          {isLoading ? "Guest" : user?.id}
        </Text>
      </View>

      {/*social medias*/}
      <View className='flex-row gap-5 items-center justify-center mt-10'>
        <View className='flex-1 border p-2 rounded'>
          <Pressable
            className='flex-row gap-1'
            onPress={openTelegram}
          >
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
          </Pressable>
        </View>

        <View className='flex-1 border p-2 rounded'>
          <Pressable
            className='flex-row gap-1'
            onPress={openGithub}
          >
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
          </Pressable>
        </View>
      </View>

      <View className='mt-10'>
        <Button
          variant="ghost"
          style={{
            backgroundColor: colors.secondary,
            height: '30%'
          }}
          onPress={onLogout}
          disabled={loading}
        >
          <Feather name='log-out' color="#FFF" size={40} />
          <Text
            style={{
              fontFamily: 'readexBold',
              fontSize: 20,
              color: '#FFF'
            }}
          >
            {loading ? "Logging out..." : "Logout"}
          </Text>
        </Button>
      </View>
    </SafeAreaView >
  )
}

export default Profile 

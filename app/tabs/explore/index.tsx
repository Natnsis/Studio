import { colors } from '@/assets/colors'
import { View, Text, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Explore = () => {
  const { width } = Dimensions.get('screen')
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%'
      }}
      className='flex-1 justify-center items-center'
    >
      <View>
        <Image
          source={require("@/assets/images/soon.png")}
          style={{
            height: '60%',
            width: width * 0.90
          }}
        />
        <Text
          style={{
            fontFamily: 'readexBold',
            fontSize: 30,
            color: colors.primary
          }}
          className='text-center'
        >
          On Construction!
        </Text>
        <Text
          style={{
            fontFamily: 'readexExtraLight'
          }}
          className='text-center'
        >
          I'll be updating the app after some studies
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Explore 

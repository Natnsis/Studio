import { colors } from '@/assets/colors'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';

const Favorites = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%'
      }}
      className='p-3'
    >
      <View className='flex-row items-center'>
        <Feather name='target' size={25} />
        <Text
          style={{
            fontFamily: "readexBold",
            fontSize: 20
          }}
          className='pl-2'
        >Your favorites</Text>
      </View>

      <View>
        <Text>hehe</Text>
      </View>
    </SafeAreaView>
  )
}

export default Favorites 

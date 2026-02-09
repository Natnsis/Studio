import { colors } from '@/assets/colors'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%'
      }}
    >
      <Text>hehe</Text>
    </SafeAreaView>
  )
}

export default Profile 

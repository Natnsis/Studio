import { colors } from '@/assets/colors';
import { Button } from '@/components/ui/button';
import { View, Text, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { terms } from '@/contants/terms';

const index = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: colors.background,
          height: '100%'
        }}
      >
        <View className='flex-row justify-start'>
          <Button
            variant='ghost'
            onPress={() => router.replace('/')}
          >
            <Feather name='arrow-left' size={20} />
          </Button>
        </View>

        <View className='p-5'>
          <Text
            style={{
              fontFamily: 'readexBold',
              fontSize: 20,
              lineHeight: 21
            }}
            className='underline'
          >
            Term of use
          </Text>
        </View>

        <ScrollView>
          <View className='flex-col gap-5 p-3'>
            {terms.map((term) => (
              <View
                key={term.id}
                style={{
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'readexBold',
                    fontSize: 14
                  }}
                >
                  {term.id}. {term.title}
                </Text>
                <Text
                  style={{
                    fontFamily: 'readexLight'
                  }}
                >
                  {term.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default index

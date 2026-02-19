import { colors } from '@/assets/colors'
import { View, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoritesById } from '@/api/favorite.controller';

const Favorites = () => {
  const { data: user, isLoading } = useUser();

  const { data: favorites } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => fetchFavoritesById(user!.id),
    enabled: !!user?.id
  });


  const truncateByChars = (text?: string, maxChars = 50) => {
    if (!text) return "";
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars) + "...";
  };

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

      <View className='w-[100%]'>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <View className="flex-1 border p-2 rounded-lg">
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: '100%',
                  height: 150
                }}
              />
              <Text
                style={{
                  fontFamily: 'readexBold'
                }}
                className="mt-2 capitalize w-full"
              >
                {truncateByChars(item.title, 25)}
              </Text>
              <View
                className='flex-row justify-between items-center'>
                <Text
                  style={{
                    fontFamily: "readexExtraLight",
                    fontSize: 15
                  }}
                  className="mt-2 w-[60%]">
                  {truncateByChars(item.url, 50)}
                </Text>
                <Button
                  size="icon"
                  variant="ghost"
                >
                  <Feather name='trash-2' size={20} />
                </Button>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Favorites 

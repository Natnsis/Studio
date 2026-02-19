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


  const truncateWords = (text: string, numWords = 3) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= numWords) return text;
    return words.slice(0, numWords).join(" ") + "...";
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

      {/*favorites flatlist*/}
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
                {item.title}
              </Text>
              <View
                className='flex-row justify-between items-center'>
                <Text
                  style={{
                    fontFamily: "readexExtraLight",
                    fontSize: 15
                  }}
                  className="mt-2 w-[60%]">
                  {truncateWords(item.name)}
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

import { Tabs } from "expo-router"
import { Feather } from '@expo/vector-icons';
import { colors } from "@/assets/colors";
import { View } from "react-native"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1.5,
          borderTopColor: colors.typo,
          height: 60,
          paddingBottom: 10,
        }
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? colors.primary : "transparent",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="home"
                size={20}
                color={focused ? "#FFFFFF" : colors.typo}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: 'readexMedium',
            fontSize: 10
          }
        }}
      />
      
      <Tabs.Screen name="favorites/index" options={{ href: null }} />
      <Tabs.Screen name="explore/index" options={{ href: null }} />
      <Tabs.Screen name="profile/index" options={{ href: null }} />
    </Tabs>
  )
}

export default TabLayout;

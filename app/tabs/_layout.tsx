import { Tabs } from "expo-router"
import { Feather } from '@expo/vector-icons';
import { colors } from "@/assets/colors";
import { View } from "react-native"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                backgroundColor: focused ? colors.primary : "transparent",
                width: focused ? 36 : size,
                height: focused ? 36 : size,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="home"
                size={focused ? 18 : size}
                color={focused ? "#FFFFFF" : "#9CA3AF"}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites/index"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                backgroundColor: focused ? colors.primary : "transparent",
                width: focused ? 36 : size,
                height: focused ? 36 : size,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="heart"
                size={focused ? 18 : size}
                color={focused ? "#FFFFFF" : "#9CA3AF"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                backgroundColor: focused ? colors.primary : "transparent",
                width: focused ? 36 : size,
                height: focused ? 36 : size,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="compass"
                size={focused ? 18 : size}
                color={focused ? "#FFFFFF" : "#9CA3AF"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                backgroundColor: focused ? colors.primary : "transparent",
                width: focused ? 36 : size,
                height: focused ? 36 : size,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name="user"
                size={focused ? 18 : size}
                color={focused ? "#FFFFFF" : "#9CA3AF"} />
            </View>
          ),
        }}
      />

    </Tabs>

  )
}

export default TabLayout

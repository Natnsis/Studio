import { Tabs } from "expo-router"
import { Feather } from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color="#FFFFFF" />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites/index"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color="#FFFFFF" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={28} color="#FFFFFF" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={28} color="#FFFFFF" />
          ),
        }}
      />

    </Tabs>

  )
}

export default TabLayout

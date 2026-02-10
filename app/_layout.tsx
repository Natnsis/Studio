import '@/global.css';
import { useFonts } from "expo-font";
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded] = useFonts({
    readexRegular: require("@/assets/fonts/ReadexPro-Regular.ttf"),
    readexSemiBold: require("@/assets/fonts/ReadexPro-SemiBold.ttf"),
    readexBold: require("@/assets/fonts/ReadexPro-Bold.ttf"),
    readexMedium: require("@/assets/fonts/ReadexPro-Medium.ttf"),
    readexLight: require("@/assets/fonts/ReadexPro-Light.ttf"),
    readexExtraLight: require("@/assets/fonts/ReadexPro-ExtraLight.ttf")
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
        <Stack screenOptions={{ headerShown: false }} />
        <PortalHost />
        <Toaster />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

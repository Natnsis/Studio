import '@/global.css';
import { useFonts } from 'expo-font';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { PlayerProvider } from '@/context/PlayerContext';
import GlobalPlayer from '@/components/GlobalPlayer';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded] = useFonts({
    readexRegular: require('@/assets/fonts/ReadexPro-Regular.ttf'),
    readexSemiBold: require('@/assets/fonts/ReadexPro-SemiBold.ttf'),
    readexBold: require('@/assets/fonts/ReadexPro-Bold.ttf'),
    readexMedium: require('@/assets/fonts/ReadexPro-Medium.ttf'),
    readexLight: require('@/assets/fonts/ReadexPro-Light.ttf'),
    readexExtraLight: require('@/assets/fonts/ReadexPro-ExtraLight.ttf'),
  });

  useEffect(() => {
    console.log('RootLayout: [SETTING UP AUDIO SESSION]');
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    })
      .then(() => {
        console.log('RootLayout: [AUDIO SESSION READY]');
      })
      .catch((e) => {
        console.error('RootLayout: [AUDIO SESSION ERROR]', e);
      });
  }, []);

  if (!loaded) return null;

  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlayerProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
          <PortalHost />
          <Toaster />
        </ThemeProvider>
        <GlobalPlayer />
      </PlayerProvider>
    </GestureHandlerRootView>
  );
}

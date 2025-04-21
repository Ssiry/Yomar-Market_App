import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    SegoeUi: require('@/assets/fonts/SegoeUI.ttf'),
    AlmaraiLight: require('@/assets/fonts/Almarai-Light.ttf'),
    Almarai: require('@/assets/fonts/Almarai-Regular.ttf'),
    AlmaraiBold: require('@/assets/fonts/Almarai-Bold.ttf'),
    AlmaraiMedium: require('@/assets/fonts/Almarai-ExtraBold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboarding/index" />
        <Stack.Screen name="(routes)/home/index" />
        <Stack.Screen name="(routes)/auth/" />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

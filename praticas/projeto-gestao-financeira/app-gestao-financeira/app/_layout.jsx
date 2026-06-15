import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import GlobalState from "../context/GlobalState.jsx";
import { ToastAndroid } from "react-native";
import AuthProvider from "../context/AuthContext.jsx";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GlobalState>
          <StatusBar backgroundColor={colors.primary} style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
      </GlobalState>
    </AuthProvider>
  );
}

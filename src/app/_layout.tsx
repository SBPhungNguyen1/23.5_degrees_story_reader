import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { initializeI18n } from "../i18n";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeI18n()
      .then(() => setReady(true))
      .catch((error) => {
        console.error("Failed to initialize i18n:", error);
      });
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="stories" />
    </Stack>
  );
}

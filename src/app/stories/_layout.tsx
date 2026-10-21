import { THEME_COLORS } from "@/utils/color-utils";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function StoriesLayout() {
  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="235degrees/index"
        options={{
          title: "Chi tiết truyện",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="235degrees/chapter"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

// app/_layout.tsx
import { Stack } from "expo-router";

export default function StoriesLayout() {
  return (
    <Stack>
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

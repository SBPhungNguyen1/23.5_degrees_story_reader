// app/_layout.tsx
import { Stack } from "expo-router";

export default function StoriesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Chi tiết truyện",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="[id]/[chapter]"
        options={{
          title: "Đọc truyện",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

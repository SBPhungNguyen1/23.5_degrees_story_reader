import { Stack } from "expo-router";

export default function ChapterLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Đọc truyện",
        headerShown: true,
      }}
    />
  );
}

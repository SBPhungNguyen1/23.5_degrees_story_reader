import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";

export default function StoriesDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ThemedView>
      <ThemedText>Text {id}</ThemedText>
      <Pressable onPress={() => router.push(`/stories/${id}/chapter1`)}>
        <ThemedText>Button</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

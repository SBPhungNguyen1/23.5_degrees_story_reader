import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function StoriesDetail235() {
  return (
    <ThemedView>
      <ThemedText>Text</ThemedText>
      <Pressable
        onPress={() => router.push("/stories/235degrees/chapter/prologue")}
      >
        <ThemedText>Button prologue</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

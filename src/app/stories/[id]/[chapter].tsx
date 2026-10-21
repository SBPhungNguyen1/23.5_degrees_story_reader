import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";

export default function StoryChapterDetail() {
  const { id, chapter } = useLocalSearchParams<{
    id: string;
    chapter: string;
  }>();
  return (
    <ThemedView>
      <ThemedText>
        Text: {id} - {chapter}
      </ThemedText>
    </ThemedView>
  );
}

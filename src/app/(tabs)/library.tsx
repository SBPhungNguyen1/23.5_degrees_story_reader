import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Story = {
  id: string;
  name: string;
  info: string;
  coverUrl?: string; // chưa có ảnh thì hiện placeholder
};

// Dữ liệu mẫu — thay bằng dữ liệu thật (API / store) của bạn.
const STORIES: Story[] = [
  { id: "235degrees", name: "Story name 1", info: "short about information" },
  { id: "2", name: "Story name 2", info: "short about information" },
  { id: "3", name: "Story name 3", info: "short about information" },
  { id: "4", name: "Story name 4", info: "short about information" },
];

export default function Library() {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  const onPressStory = (story: Story) => {
    //
    router.push(`/stories/${story.id}` as any);
    console.log("open story", story.id);
  };

  const renderItem = ({ item }: { item: Story }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      onPress={() => onPressStory(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.cover}>
        {item.coverUrl ? (
          <Image source={{ uri: item.coverUrl }} style={styles.coverImage} />
        ) : (
          <Ionicons name="book-outline" size={28} color={colors.primary} />
        )}
      </View>

      <View style={styles.cardCopy}>
        <Text style={styles.storyName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.storyInfo} numberOfLines={2}>
          {item.info}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.headingRow}>
          <View>
            <Text style={styles.eyebrow}>LET'S GET TO</Text>
            <Text style={styles.title}>{"Library"}</Text>
            <Text style={styles.subtitle}>Where the stories begin.</Text>
          </View>
        </View>

        <FlatList
          data={STORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          // ListHeaderComponent={
          //   <Text style={styles.title}>{t("library.title", "Library")}</Text>
          // }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="library-outline"
                size={36}
                color={colors.primary}
              />
              <Text style={styles.emptyText}>
                {t("library.empty", "Your library is empty")}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

type ThemeColors = typeof THEME_COLORS.light;

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: Spacing.four,
      paddingBottom: Spacing.one,
      paddingTop: 14,
    },
    headingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    eyebrow: {
      color: COLORS.primary,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1.8,
      marginBottom: 5,
    },
    listContent: {
      paddingTop: 14,
      paddingBottom: Spacing.three,
      gap: 14,
    },
    title: {
      color: COLORS.text,
      fontSize: 29,
      fontWeight: "800",
      letterSpacing: -0.7,
    },
    subtitle: {
      color: COLORS.muted,
      fontSize: 13,
      marginTop: 5,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
      shadowColor: "#16382B",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.045,
      shadowRadius: 12,
      elevation: 2,
    },
    cover: {
      width: 68,
      height: 86,
      borderRadius: 6,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    coverImage: {
      width: "100%",
      height: "100%",
    },
    cardCopy: {
      flex: 1,
      gap: 5,
    },
    storyName: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "700",
    },
    storyInfo: {
      color: COLORS.muted,
      fontSize: 12,
      lineHeight: 17,
    },
    empty: {
      alignItems: "center",
      gap: 10,
      paddingVertical: 60,
    },
    emptyText: {
      color: COLORS.muted,
      fontSize: 13,
    },
    pressed: {
      opacity: 0.7,
    },
  });

import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import {
  MAX_CONTENT_WIDTH,
  useResponsive,
  webPointer,
} from "@/hooks/use-responsive";
import { STORY_NAME, STORY_SLUG } from "@/utils/chapter-utils";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
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
  cover?: number;
};

const STORIES: Story[] = [
  {
    id: STORY_SLUG,
    name: STORY_NAME,
    info: "235_brief",
    cover: require("@/assets/images/hero/235_cover_hero.jpeg"),
  },
];

export default function Library() {
  const { t } = useTranslation();
  const r = useResponsive();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors, r);

  const onPressStory = (story: Story) => {
    router.push(`/stories/${story.id}` as Href);
  };

  const renderItem = ({ item }: { item: Story }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      onPress={() => onPressStory(item)}
      style={({ pressed }) => [
        styles.card,
        webPointer,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cover}>
        {item.cover ? (
          <Image
            source={item.cover}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name="book-outline"
            size={r.isTablet ? 32 : 28}
            color={colors.primary}
          />
        )}
      </View>

      <View style={styles.cardCopy}>
        <Text style={styles.storyName} numberOfLines={2}>
          {t(item.name)}
        </Text>

        <Text style={styles.storyInfo} numberOfLines={2}>
          {t(item.info)}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.column}>
          <View style={styles.headingRow}>
            <View style={styles.headingCopy}>
              <Text style={styles.eyebrow}>
                {t("library.eyebrow", "LET'S GET TO")}
              </Text>
              <Text style={styles.title}>{t("library.title", "Library")}</Text>

              <Text style={styles.subtitle}>
                {t("library.subtitle", "Where the stories begin.")}
              </Text>
            </View>
          </View>

          <FlatList
            style={styles.list}
            data={STORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
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
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

type ThemeColors = typeof THEME_COLORS.light;
type Responsive = ReturnType<typeof useResponsive>;

const createStyles = (COLORS: ThemeColors, r: Responsive) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      marginTop: r.isDesktop ? 20 : 0,
      paddingTop: r.isDesktop ? 28 : 0,
    },

    safeArea: {
      flex: 1,
      minHeight: 0,
      paddingHorizontal: Spacing.four,
      paddingTop: r.isDesktop ? 28 : r.isTablet ? 22 : 14,
      paddingBottom: Spacing.one,
    },

    // Mobile gần full width; tablet/web căn giữa, tối đa 720px.
    // Giữ một cột trên mọi kích thước màn hình.
    column: {
      flex: 1,
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      minHeight: 0,
    },

    headingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2,
    },

    headingCopy: {
      flex: 1,
      minWidth: 0,
    },

    eyebrow: {
      color: COLORS.primary,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1.8,
      marginBottom: 5,
    },

    title: {
      color: COLORS.text,
      fontSize: r.isDesktop ? 32 : r.isTablet ? 30 : 29,
      fontWeight: "800",
      letterSpacing: -0.7,
    },

    subtitle: {
      color: COLORS.muted,
      fontSize: r.isTablet ? 14 : 13,
      lineHeight: r.isTablet ? 21 : 19,
      marginTop: 5,
    },

    // FlatList chiếm không gian còn lại và tự cuộn.
    list: {
      flex: 1,
      minHeight: 0,
      width: "100%",
    },

    listContent: {
      flexGrow: 1,
      paddingTop: r.isTablet ? 20 : 14,
      paddingBottom: Spacing.three,
    },

    itemSeparator: {
      height: r.isTablet ? 16 : 12,
    },

    card: {
      width: "100%",
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: r.isTablet ? 16 : 12,
      padding: r.isTablet ? 14 : 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,

      ...(r.isWeb
        ? {
            boxShadow: "0px 5px 12px rgba(22, 56, 43, 0.045)",
          }
        : {
            shadowColor: "#16382B",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.045,
            shadowRadius: 12,
            elevation: 2,
          }),
    },

    cover: {
      width: r.isTablet ? 76 : 68,
      height: r.isTablet ? 96 : 86,
      flexShrink: 0,
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
      minWidth: 0,
      gap: 5,
    },

    storyName: {
      color: COLORS.text,
      fontSize: r.isTablet ? 17 : 16,
      lineHeight: r.isTablet ? 23 : 21,
      fontWeight: "700",
    },

    storyInfo: {
      color: COLORS.muted,
      fontSize: r.isTablet ? 13 : 12,
      lineHeight: r.isTablet ? 19 : 17,
    },

    empty: {
      alignItems: "center",
      gap: 10,
      paddingVertical: 60,
    },

    emptyText: {
      color: COLORS.muted,
      fontSize: 13,
      textAlign: "center",
    },

    pressed: {
      opacity: 0.7,
    },
  });

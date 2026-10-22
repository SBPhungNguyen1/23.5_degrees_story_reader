import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import {
  MAX_CONTENT_WIDTH,
  useResponsive,
  webPointer,
} from "@/hooks/use-responsive";
import { Chapter } from "@/types/chapter-type";
import { CHAPTERS_LIST } from "@/utils/chapter-utils";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabKey = "summary" | "chapters";

// Dữ liệu mẫu — thay bằng dữ liệu thật (API / store) của bạn.
const STORY = {
  name: "235 Degrees",
  coverUrl: undefined as string | undefined,
  year: "2024",
  status: "Đang cập nhật",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  genres: ["Phiêu lưu", "Giả tưởng"],
  tags: ["hành động", "bí ẩn", "tình bạn", "trưởng thành"],
};

const CHAPTERS: Chapter[] = CHAPTERS_LIST;

// Đổ bóng: boxShadow cho web, shadow*/elevation cho native.
const shadow = (
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number
) =>
  Platform.select({
    web: {
      boxShadow: `0px ${offsetY}px ${radius}px rgba(22, 56, 43, ${opacity})`,
    },
    default: {
      shadowColor: "#16382B",
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation,
    },
  }) as object;

export default function StoriesDetail235() {
  const { t } = useTranslation();
  const r = useResponsive();
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors, r);

  const openChapter = (slug: string) => {
    router.push(`/stories/235degrees/chapter/${slug}` as Href);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "summary", label: t("story.summary", "Tóm tắt") },
    { key: "chapters", label: t("story.chapters", "Chương") },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cột nội dung: full width trên mobile, tối đa 720 trên web/tablet */}
          <View style={styles.column}>
            {/* Thông tin truyện */}
            <View style={styles.hero}>
              <View style={styles.cover}>
                {STORY.coverUrl ? (
                  <Image
                    source={{ uri: STORY.coverUrl }}
                    style={styles.coverImage}
                  />
                ) : (
                  <Ionicons
                    name="book-outline"
                    size={r.isTablet ? 52 : 40}
                    color={colors.primary}
                  />
                )}
              </View>

              <View style={styles.heroCopy}>
                <Text style={styles.storyName} numberOfLines={3}>
                  {STORY.name}
                </Text>

                <View style={styles.metaList}>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>
                      {t("story.year", "Năm")}
                    </Text>
                    <Text style={styles.metaValue}>{STORY.year}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>
                      {t("story.chapterCount", "Số chương")}
                    </Text>
                    <Text style={styles.metaValue}>{CHAPTERS.length}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>
                      {t("story.status", "Trạng thái")}
                    </Text>
                    <Text style={styles.metaValue}>{STORY.status}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Nút đọc ngay (giống Wattpad) */}
            <Pressable
              accessibilityRole="button"
              onPress={() => openChapter(CHAPTERS[0].slug)}
              style={({ pressed }) => [
                styles.readButton,
                webPointer,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="book" size={18} color="#FFFFFF" />
              <Text style={styles.readButtonText}>
                {t("story.startReading", "Đọc ngay")}
              </Text>
            </Pressable>

            {/* Tab */}
            <View style={styles.tabBar} accessibilityRole="tablist">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <Pressable
                    key={tab.key}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => setActiveTab(tab.key)}
                    style={[styles.tabItem, webPointer]}
                  >
                    <Text
                      style={[styles.tabText, isActive && styles.tabTextActive]}
                    >
                      {tab.label}
                    </Text>
                    <View
                      style={[
                        styles.tabIndicator,
                        isActive && styles.tabIndicatorActive,
                      ]}
                    />
                  </Pressable>
                );
              })}
            </View>

            {/* Nội dung tab */}
            {activeTab === "summary" ? (
              <View style={styles.sectionCard}>
                <View style={styles.block}>
                  <Text style={styles.blockLabel}>
                    {t("story.about", "Giới thiệu")}
                  </Text>
                  <Text style={styles.aboutText}>{STORY.about}</Text>
                </View>

                <View style={styles.block}>
                  <Text style={styles.blockLabel}>
                    {t("story.genre", "Thể loại")}
                  </Text>
                  <View style={styles.chipRow}>
                    {STORY.genres.map((genre) => (
                      <View key={genre} style={styles.chipPrimary}>
                        <Text style={styles.chipPrimaryText}>{genre}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.block}>
                  <Text style={styles.blockLabel}>
                    {t("story.tags", "Thẻ")}
                  </Text>
                  <View style={styles.chipRow}>
                    {STORY.tags.map((tag) => (
                      <View key={tag} style={styles.chip}>
                        <Text style={styles.chipText}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.chapterList}>
                {CHAPTERS.map((chapter, index) => (
                  <Pressable
                    key={`${chapter.slug}-${index}`}
                    accessibilityRole="button"
                    onPress={() => openChapter(chapter.slug)}
                    style={({ pressed }) => [
                      styles.chapterItem,
                      webPointer,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={styles.chapterIndex}>
                      <Text style={styles.chapterIndexText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.chapterTitle} numberOfLines={1}>
                      {t(chapter.label.split(" ")[0])}{" "}
                      {chapter.label.split(" ")[1]}
                      {chapter.title ? ` · ${t(chapter.title)}` : ""}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.muted}
                    />
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

type ThemeColors = typeof THEME_COLORS.light;
type Responsive = ReturnType<typeof useResponsive>;

const createStyles = (COLORS: ThemeColors, r: Responsive) => {
  // Kích thước theo breakpoint (mobile giữ nguyên như cũ)
  const coverW = r.isDesktop ? 168 : r.isTablet ? 150 : 124;
  const coverH = Math.round(coverW * (176 / 124));

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    safeArea: {
      flex: 1,
      paddingBottom: Spacing.five,
      marginBottom: 10,
    },
    scrollContent: {
      paddingTop: r.isTablet ? 28 : 16,
      paddingBottom: Spacing.four,
    },
    // Cột căn giữa, padding ngang nằm trong cột để maxWidth tính cả padding
    column: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing.four,
      gap: 18,
    },
    hero: {
      flexDirection: "row",
      gap: r.isTablet ? 24 : 16,
    },
    cover: {
      width: coverW,
      height: coverH,
      borderRadius: 14,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      ...shadow(6, 0.12, 12, 4),
    },
    coverImage: {
      width: "100%",
      height: "100%",
    },
    heroCopy: {
      flex: 1,
      gap: r.isTablet ? 18 : 14,
    },
    storyName: {
      color: COLORS.text,
      fontSize: r.isDesktop ? 32 : r.isTablet ? 28 : 24,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    metaList: {
      gap: r.isTablet ? 12 : 9,
    },
    metaRow: {
      gap: 1,
    },
    metaLabel: {
      color: COLORS.muted,
      fontSize: r.isTablet ? 12 : 11,
      fontWeight: "600",
    },
    metaValue: {
      color: COLORS.text,
      fontSize: r.isTablet ? 15 : 14,
      fontWeight: "700",
    },
    readButton: {
      height: 48,
      borderRadius: 14,
      backgroundColor: COLORS.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    readButtonText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700",
    },
    tabBar: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    tabItem: {
      flex: 1,
      alignItems: "center",
      paddingTop: 6,
    },
    tabText: {
      color: COLORS.muted,
      fontSize: 15,
      fontWeight: "600",
      paddingBottom: 10,
    },
    tabTextActive: {
      color: COLORS.text,
      fontWeight: "800",
    },
    tabIndicator: {
      height: 3,
      alignSelf: "stretch",
      borderRadius: 3,
      backgroundColor: "transparent",
    },
    tabIndicatorActive: {
      backgroundColor: COLORS.primary,
    },
    sectionCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 20,
      padding: r.isTablet ? 24 : 17,
      borderWidth: 1,
      borderColor: COLORS.border,
      gap: 20,
      ...shadow(5, 0.045, 12, 2),
    },
    block: {
      gap: 8,
    },
    blockLabel: {
      color: COLORS.muted,
      fontSize: 12,
      fontWeight: "700",
    },
    aboutText: {
      color: COLORS.aboutText,
      fontSize: r.isTablet ? 15 : 14,
      lineHeight: r.isTablet ? 25 : 22,
    },
    chipRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    chipPrimary: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: COLORS.primarySoft,
    },
    chipPrimaryText: {
      color: COLORS.primary,
      fontSize: 12,
      fontWeight: "700",
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
    },
    chipText: {
      color: COLORS.muted,
      fontSize: 12,
      fontWeight: "600",
    },
    // Mobile: 1 cột. Web/tablet: 2 cột.
    chapterList: {
      flexDirection: "column",
      gap: 10,
    },
    chapterItem: {
      width: "100%",
      minHeight: 62,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
    },
    chapterIndex: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    chapterIndexText: {
      color: COLORS.primary,
      fontSize: 13,
      fontWeight: "800",
    },
    chapterTitle: {
      flex: 1,
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "700",
    },
    pressed: {
      opacity: 0.7,
    },
  });
};

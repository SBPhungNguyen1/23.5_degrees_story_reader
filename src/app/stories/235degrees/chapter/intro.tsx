import { AudioPlayer } from "@/components/audio-player";
import ButtonSwitchChapter from "@/components/button-switch-chapter";
import { RichParagraph } from "@/components/rich-paragraph";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { CHAPTERS_LIST } from "@/utils/chapter-utils";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Chapter = {
  slug: string;
  label: string; // "Prologue", "Chương 1", ...
  title?: string; // tên chương (nếu có)
};

type RichTextPart = {
  text: string;
  bold?: boolean;
};

type StoryContent = RichTextPart[][];

// Dữ liệu mẫu — thay bằng dữ liệu thật (API / store) của bạn.
const STORY_NAME = "Story";
const STORY_SLUG = "235degrees";
const CURRENT_SLUG = "intro";
const AUDIO_DURATION = 600; // giây

const CHAPTERS: Chapter[] = CHAPTERS_LIST;

export default function StoriesDetail235Intro() {
  const { t } = useTranslation();

  const content = t("235_intro_content", {
    returnObjects: true,
  }) as StoryContent;

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  const [menuOpen, setMenuOpen] = useState(false);
  // Vị trí đáy của thanh dropdown, dùng để đặt menu nổi ngay bên dưới nó.
  const [barBottom, setBarBottom] = useState(0);

  // Âm thanh: mới chỉ là giao diện, chưa gắn player thật.
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  const currentIndex = CHAPTERS.findIndex((c) => c.slug === CURRENT_SLUG);
  const current = CHAPTERS[currentIndex];
  const prev = CHAPTERS[currentIndex - 1];
  const next = CHAPTERS[currentIndex + 1];

  const goToChapter = (slug: string) => {
    setMenuOpen(false);
    if (slug === CURRENT_SLUG) return;
    router.replace(`/stories/${STORY_SLUG}/chapter/${slug}` as Href);
  };

  const skip = (delta: number) =>
    setPosition((p) => Math.min(AUDIO_DURATION, Math.max(0, p + delta)));

  const progress = position / AUDIO_DURATION;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        {/* View bọc ngoài để toạ độ của menu nổi tính từ cùng một gốc với thanh dropdown */}
        <View style={styles.content}>
          {/* Dropdown chọn chương */}
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: menuOpen }}
            onPress={() => setMenuOpen((open) => !open)}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setBarBottom(y + height);
            }}
            style={styles.storyBar}
          >
            <View style={styles.storyBarCopy}>
              <Text style={styles.storyBarName} numberOfLines={1}>
                {STORY_NAME}
              </Text>
              <Text style={styles.storyBarChapter} numberOfLines={1}>
                {current.label}
              </Text>
            </View>
            <Ionicons
              name={menuOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.primary}
            />
          </Pressable>

          {/* Nội dung chương */}
          <ScrollView
            style={styles.reader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.readerContent}
          >
            <View style={styles.chapterHeading}>
              <Text style={styles.chapterNumber}>
                {current.label.toUpperCase()}
              </Text>
              {current.title ? (
                <Text style={styles.chapterTitle}>{current.title}</Text>
              ) : null}
            </View>

            <View style={styles.body}>
              {content.map((parts, index) => (
                <RichParagraph
                  key={`paragraph-${index}`}
                  parts={parts}
                  style={styles.paragraph}
                />
              ))}
            </View>

            {/* Chương trước / sau */}
            <ButtonSwitchChapter
              prev={prev}
              next={next}
              goToChapter={goToChapter}
            />
          </ScrollView>

          {/* Thanh âm thanh */}
          <View style={styles.player}>
            <AudioPlayer
              source={require("../../../../../assets/audio/235degrees/prologue.mp3")}
              colors={colors}
            />
          </View>

          {/* Menu chương nổi lên trên nội dung — đặt cuối cùng để nằm trên cùng */}
          {menuOpen && (
            <>
              {/* Chạm ra ngoài để đóng menu */}
              <Pressable
                accessibilityLabel={t("common.close", "Đóng")}
                onPress={() => setMenuOpen(false)}
                style={styles.backdrop}
              />

              <View style={[styles.menu, { top: barBottom + 8 }]}>
                <ScrollView
                  style={styles.menuScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {CHAPTERS.map((chapter) => {
                    const isCurrent = chapter.slug === CURRENT_SLUG;
                    return (
                      <Pressable
                        key={chapter.slug}
                        accessibilityRole="button"
                        onPress={() => goToChapter(chapter.slug)}
                        style={({ pressed }) => [
                          styles.menuItem,
                          isCurrent && styles.menuItemCurrent,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.menuItemText,
                            isCurrent && styles.menuItemTextCurrent,
                          ]}
                          numberOfLines={1}
                        >
                          {chapter.title
                            ? `${chapter.label} · ${chapter.title}`
                            : chapter.label}
                        </Text>
                        {isCurrent && (
                          <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color={colors.primary}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          )}
        </View>
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
    },
    content: {
      flex: 1,
    },
    storyBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: Spacing.three,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: COLORS.primarySoft,
      marginTop: -16,
    },
    storyBarCopy: {
      flex: 1,
      gap: 2,
    },
    storyBarName: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "700",
    },
    storyBarChapter: {
      color: COLORS.muted,
      fontSize: 12,
    },
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0, 0, 0, 0.18)",
      marginTop: -28,
    },
    menu: {
      position: "absolute",
      left: Spacing.three,
      right: Spacing.three,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
      overflow: "hidden",
      shadowColor: "#16382B",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
    },
    menuScroll: {
      maxHeight: 280,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    menuItemCurrent: {
      backgroundColor: COLORS.surfaceSelected,
    },
    menuItemText: {
      flex: 1,
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "600",
    },
    menuItemTextCurrent: {
      color: COLORS.primary,
      fontWeight: "800",
    },
    reader: {
      flex: 1,
    },
    readerContent: {
      paddingHorizontal: Spacing.four,
      paddingTop: 26,
      paddingBottom: 24,
      gap: 24,
    },
    chapterHeading: {
      alignItems: "center",
      gap: 6,
    },
    chapterNumber: {
      color: COLORS.primary,
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: 0.5,
      textAlign: "center",
    },
    chapterTitle: {
      color: COLORS.text,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },
    body: {
      gap: 18,
    },
    paragraph: {
      color: COLORS.text,
      fontSize: 17,
      lineHeight: 29,
    },
    navRow: {
      flexDirection: "row",
      gap: 12,
    },
    navSpacer: {
      flex: 1,
    },
    navButton: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    navButtonPrimary: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary,
    },
    navText: {
      color: COLORS.primary,
      fontSize: 14,
      fontWeight: "700",
    },
    navTextPrimary: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
    },
    player: {
      paddingHorizontal: Spacing.four,
      paddingTop: 14,
      paddingBottom: 10,
      gap: 6,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      backgroundColor: COLORS.surface,
    },
    progressTrack: {
      height: 4,
      borderRadius: 2,
      backgroundColor: COLORS.border,
      justifyContent: "center",
    },
    progressFill: {
      height: 4,
      borderRadius: 2,
      backgroundColor: COLORS.primary,
    },
    progressDot: {
      position: "absolute",
      width: 12,
      height: 12,
      borderRadius: 6,
      marginLeft: -6,
      backgroundColor: COLORS.primary,
    },
    timeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timeText: {
      color: COLORS.muted,
      fontSize: 11,
      fontWeight: "600",
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      paddingTop: 2,
    },
    skipButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    skipLabel: {
      position: "absolute",
      color: COLORS.text,
      fontSize: 10,
      fontWeight: "800",
    },
    flipX: {
      transform: [{ scaleX: -1 }],
    },
    playButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: COLORS.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 4,
    },
    playOffset: {
      marginLeft: 3,
    },
    pressed: {
      opacity: 0.7,
    },
  });

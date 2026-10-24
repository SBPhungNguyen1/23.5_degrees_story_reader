import { AudioPlayer } from "@/components/audio-player";
import ButtonSwitchChapter from "@/components/button-switch-chapter";
import DropdownChapter from "@/components/dropdown-chapter";
import MenuChapter from "@/components/menu-chapter";
import { RichParagraph } from "@/components/rich-paragraph";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { MAX_CONTENT_WIDTH, useResponsive } from "@/hooks/use-responsive";
import { Chapter } from "@/types/chapter-type";
import { StoryContent } from "@/types/story-content-type";
import { CHAPTERS_LIST, STORY_NAME, STORY_SLUG } from "@/utils/chapter-utils";
import { THEME_COLORS } from "@/utils/color-utils";
import { router, type Href } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CURRENT_SLUG = "chapter-16";

const CHAPTERS: Chapter[] = CHAPTERS_LIST;

export default function StoriesDetail235Chapter16() {
  const { t } = useTranslation();
  const r = useResponsive();

  const content = t("235_chapter16_content", {
    returnObjects: true,
  }) as StoryContent;

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors, r);

  const [menuOpen, setMenuOpen] = useState(false);
  // Vị trí đáy của thanh dropdown, dùng để đặt menu nổi ngay bên dưới nó.
  const [barBottom, setBarBottom] = useState(0);

  const currentIndex = CHAPTERS.findIndex((c) => c.slug === CURRENT_SLUG);
  const current = CHAPTERS[currentIndex];
  const prev = CHAPTERS[currentIndex - 1];
  const next = CHAPTERS[currentIndex + 1];

  const goToChapter = (slug: string) => {
    setMenuOpen(false);
    if (slug === CURRENT_SLUG) return;
    router.replace(`/stories/${STORY_SLUG}/chapter/${slug}` as Href);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        {/* View bọc ngoài để toạ độ của menu nổi tính từ cùng một gốc với thanh dropdown */}
        <View style={styles.content}>
          {/* Cột nội dung: full width trên mobile, tối đa 720 trên web/tablet */}
          <View style={styles.column}>
            {/* Dropdown chọn chương */}
            <DropdownChapter
              menuOpen={menuOpen}
              STORY_NAME={STORY_NAME}
              current={current}
              setMenuOpen={setMenuOpen}
              setBarBottom={setBarBottom}
            />

            {/* Nội dung chương */}
            <ScrollView
              style={styles.reader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.readerContent}
            >
              <View style={styles.chapterHeading}>
                <Text style={styles.chapterNumber}>
                  {t(current.label.split(" ")[0]).toUpperCase()}{" "}
                  {t(current.label.split(" ")[1])}
                </Text>
                {current.title ? (
                  <Text style={styles.chapterTitle}>{t(current.title)}</Text>
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
          </View>

          {/* Thanh âm thanh */}
          <View style={styles.playerBar}>
            <View style={styles.playerInner}>
              <AudioPlayer
                source={require("../../../../../assets/audio/235degrees/chapter_16.mp3")}
                colors={colors}
              />
            </View>
          </View>

          {/* Menu chương nổi lên trên nội dung — đặt cuối cùng để nằm trên cùng */}
          {menuOpen && (
            <MenuChapter
              setMenuOpen={setMenuOpen}
              goToChapter={goToChapter}
              CHAPTERS={CHAPTERS_LIST}
              CURRENT_SLUG={CURRENT_SLUG}
              barBottom={barBottom}
            />
          )}
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
    },
    safeArea: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    column: {
      flex: 1,
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
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
      fontSize: r.chapterNumberSize,
      fontWeight: "800",
      letterSpacing: 0.5,
      textAlign: "center",
    },
    chapterTitle: {
      color: COLORS.text,
      fontSize: r.chapterTitleSize,
      fontWeight: "700",
      textAlign: "center",
    },
    body: {
      gap: 18,
    },
    paragraph: {
      color: COLORS.text,
      fontSize: r.bodySize,
      lineHeight: r.bodyLineHeight,
    },
    playerBar: {
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      backgroundColor: COLORS.surface,
    },
    playerInner: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing.four,
      paddingTop: 6,
      paddingBottom: r.isTablet ? 4 : 10,
      gap: 6,
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
    pressed: {
      opacity: 0.7,
    },
  });

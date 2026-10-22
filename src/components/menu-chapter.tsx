import { Spacing } from "@/constants/theme";
import { Chapter } from "@/types/chapter-type";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

interface MenuChapterProps {
  setMenuOpen: (state: boolean) => void;
  goToChapter: (chapter: string) => void;
  CHAPTERS: Chapter[];
  CURRENT_SLUG: string;
  barBottom: number;
}

export default function MenuChapter({
  setMenuOpen,
  goToChapter,
  CHAPTERS,
  CURRENT_SLUG,
  barBottom,
}: MenuChapterProps) {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  return (
    <>
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
                    ? `${t(chapter.label)} · ${t(chapter.title)}`
                    : `${t(chapter.label)}`}
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
  );
}

type ThemeColors = typeof THEME_COLORS.light;

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
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
    pressed: {
      opacity: 0.7,
    },
  });

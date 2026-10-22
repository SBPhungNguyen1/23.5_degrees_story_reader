import { Chapter } from "@/types/chapter-type";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

interface ButtonSwitchChapterProps {
  prev: Chapter;
  next: Chapter;
  goToChapter: (chapter: string) => void;
}

export default function ButtonSwitchChapter({
  prev,
  next,
  goToChapter,
}: ButtonSwitchChapterProps) {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  return (
    <View style={styles.navRow}>
      {prev ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => goToChapter(prev.slug)}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={18} color={colors.primary} />
          <Text style={styles.navText} numberOfLines={1}>
            {t("index.previous_chapter", "Chương trước")}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}

      {next ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => goToChapter(next.slug)}
          style={({ pressed }) => [
            styles.navButton,
            styles.navButtonPrimary,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.navTextPrimary} numberOfLines={1}>
            {t("index.next_chapter", "Chương sau")}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}
    </View>
  );
}

type ThemeColors = typeof THEME_COLORS.light;

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
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
    pressed: {
      opacity: 0.7,
    },
  });

import { Spacing } from "@/constants/theme";
import { webPointer } from "@/hooks/use-responsive";
import { Chapter } from "@/types/chapter-type";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

interface DropdownChapterProps {
  menuOpen: boolean;
  STORY_NAME: string;
  current: Chapter;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setBarBottom: (height: number) => void;
}
export default function DropdownChapter({
  menuOpen,
  STORY_NAME,
  current,
  setMenuOpen,
  setBarBottom,
}: DropdownChapterProps) {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: menuOpen }}
      onPress={() => setMenuOpen((open) => !open)}
      onLayout={(e) => {
        const { y, height } = e.nativeEvent.layout;
        setBarBottom(y + height);
      }}
      style={[styles.storyBar, webPointer]}
    >
      <View style={styles.storyBarCopy}>
        <Text style={styles.storyBarName} numberOfLines={1}>
          {STORY_NAME}
        </Text>
        <Text style={styles.storyBarChapter} numberOfLines={1}>
          {current.title
            ? `${t(current.label.split(" ")[0])} ${t(
                current.label.split(" ")[1]
              )} · ${t(current.title)}`
            : `${t(current.label.split(" ")[0])} ${t(
                current.label.split(" ")[1]
              )}`}
        </Text>
      </View>
      <Ionicons
        name={menuOpen ? "chevron-up" : "chevron-down"}
        size={20}
        color={colors.primary}
      />
    </Pressable>
  );
}

type ThemeColors = typeof THEME_COLORS.light;

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    storyBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: Spacing.three,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: COLORS.primarySoft,
      marginTop: Platform.select({ web: 12, default: -16 }),
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
  });

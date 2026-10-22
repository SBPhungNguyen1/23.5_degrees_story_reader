import { Spacing } from "@/constants/theme";
import {
  MAX_CONTENT_WIDTH,
  useResponsive,
  webPointer,
} from "@/hooks/use-responsive";
import { Chapter } from "@/types/chapter-type";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  Platform,
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
  const r = useResponsive();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors, r.menuMaxHeight, barBottom);

  // Hiệu ứng trượt xuống khi mở menu
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 160,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [anim]);

  const animatedStyle = {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Backdrop chỉ phủ phần bên dưới dropdown */}
      <Pressable
        accessibilityLabel={t("common.close", "Đóng")}
        onPress={() => setMenuOpen(false)}
        style={[styles.backdrop, webPointer]}
      />

      {/* Wrapper căn giữa theo cột nội dung, không chặn touch hai bên */}
      <View style={styles.menuWrap} pointerEvents="box-none">
        <Animated.View style={[styles.menu, animatedStyle]}>
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
                    webPointer,
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
                      ? `${t(chapter.label.split(" ")[0])} ${t(
                          chapter.label.split(" ")[1]
                        )} · ${t(chapter.title)}`
                      : `${t(chapter.label.split(" ")[0])} ${t(
                          chapter.label.split(" ")[1]
                        )}`}
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
        </Animated.View>
      </View>
    </View>
  );
}

type ThemeColors = typeof THEME_COLORS.light;

const createStyles = (
  COLORS: ThemeColors,
  menuMaxHeight: number,
  barBottom: number
) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      zIndex: 10,
    },
    backdrop: {
      position: "absolute",
      top: Platform.select({ web: 0, default: -16 }),
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.18)",
    },
    menuWrap: {
      position: "absolute",
      top: barBottom + 8,
      left: 0,
      right: 0,
      alignItems: "center",
      paddingHorizontal: Spacing.three,
    },
    menu: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH - Spacing.three * 2,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surface,
      overflow: "hidden",
      ...(Platform.select({
        web: { boxShadow: "0px 8px 16px rgba(22, 56, 43, 0.18)" },
        default: {
          shadowColor: "#16382B",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.18,
          shadowRadius: 16,
          elevation: 8,
        },
      }) as object),
    },
    menuScroll: {
      maxHeight: menuMaxHeight,
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

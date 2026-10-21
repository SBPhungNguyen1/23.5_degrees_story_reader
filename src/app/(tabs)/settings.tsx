import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Appearance,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { changeAppLanguage } from "../../i18n";

type ThemeOption = "light" | "dark" | "system";

type ThemeOptionItem = {
  value: ThemeOption;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
};

const themeOptions: ThemeOptionItem[] = [
  {
    value: "light",
    label: "Light",
    icon: "sunny-outline",
    description: "A bright, clean appearance",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "moon-outline",
    description: "Easy on the eyes in low light",
  },
  {
    value: "system",
    label: "System",
    icon: "phone-portrait-outline",
    description: "Follow your device settings",
  },
];

export default function Settings() {
  const { t, i18n } = useTranslation();
  // Bắt đầu với "system" để OS kiểm soát cho tới khi người dùng chọn.
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system");

  const selectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    // "unspecified" trả về việc theo giao diện hệ thống của thiết bị.
    Appearance.setColorScheme(theme === "system" ? "unspecified" : theme);
  };

  const colorScheme = useColorScheme();

  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

  const styles = createStyles(colors);

  const selectedLanguage = i18n.resolvedLanguage?.startsWith("vi")
    ? "vi"
    : "en";

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headingRow}>
            <View>
              <Text style={styles.eyebrow}>PREFERENCES</Text>
              <Text style={styles.title}>
                {t("settings.title", "Settings")}
              </Text>
              <Text style={styles.subtitle}>
                Make the app feel right for you.
              </Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="color-palette-outline"
                  size={19}
                  color={colors.primary}
                />
              </View>
              <View style={styles.sectionHeadingText}>
                <Text style={styles.sectionTitle}>Theme</Text>
                <Text style={styles.sectionDescription}>
                  Choose how the app looks
                </Text>
              </View>
            </View>

            <View style={styles.themeList}>
              {themeOptions.map((option) => {
                const isSelected = selectedTheme === option.value;

                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => selectTheme(option.value)}
                    style={({ pressed }) => [
                      styles.themeOption,
                      isSelected && styles.themeOptionSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.optionIcon,
                        isSelected && styles.optionIconSelected,
                      ]}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={isSelected ? colors.primary : colors.muted}
                      />
                    </View>
                    <View style={styles.optionCopy}>
                      <Text style={styles.optionTitle}>{option.label}</Text>
                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="language-outline"
                  size={19}
                  color={colors.primary}
                />
              </View>
              <View style={styles.sectionHeadingText}>
                <Text style={styles.sectionTitle}>
                  {t("common.language", "Language")}
                </Text>
                <Text style={styles.sectionDescription}>
                  Select your preferred language
                </Text>
              </View>
            </View>

            <View style={styles.languageRow}>
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selectedLanguage === "en" }}
                onPress={() => changeAppLanguage("en")}
                style={({ pressed }) => [
                  styles.languageOption,
                  selectedLanguage === "en" && styles.languageOptionSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.flag}>🇬🇧</Text>
                <View style={styles.languageCopy}>
                  <Text style={styles.languageName}>English</Text>
                  <Text style={styles.languageNative}>English</Text>
                </View>
                {selectedLanguage === "en" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={21}
                    color={colors.primary}
                  />
                )}
              </Pressable>

              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selectedLanguage === "vi" }}
                onPress={() => changeAppLanguage("vi")}
                style={({ pressed }) => [
                  styles.languageOption,
                  selectedLanguage === "vi" && styles.languageOptionSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.flag}>🇻🇳</Text>
                <View style={styles.languageCopy}>
                  <Text style={styles.languageName}>Tiếng Việt</Text>
                  <Text style={styles.languageNative}>Vietnamese</Text>
                </View>
                {selectedLanguage === "vi" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={21}
                    color={colors.primary}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={19}
                  color={colors.primary}
                />
              </View>
              <View style={styles.sectionHeadingText}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.sectionDescription}>
                  A little bit about this app
                </Text>
              </View>
            </View>

            <Text style={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={styles.versionRow}>
              <Text style={styles.versionLabel}>Version</Text>
              <Text style={styles.versionValue}>1.0.0</Text>
            </View>
          </View>

          <Text style={styles.bottomNote}>
            Made with care · Your preferences, your way
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

// const styles = StyleSheet.create({
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
      paddingBottom: +Spacing.one,
    },
    scrollContent: {
      paddingTop: 14,
      paddingBottom: 0,
      gap: 18,
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
    headingIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.primarySoft,
    },
    sectionCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 20,
      padding: 17,
      borderWidth: 1,
      borderColor: COLORS.border,
      gap: 16,
      shadowColor: "#16382B",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.045,
      shadowRadius: 12,
      elevation: 2,
    },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },
    sectionIcon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: COLORS.iconBg,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionHeadingText: {
      flex: 1,
      gap: 3,
    },
    sectionTitle: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "700", // đã sửa: "750" không hợp lệ
    },
    sectionDescription: {
      color: COLORS.muted,
      fontSize: 12,
    },
    themeList: {
      gap: 9,
    },
    themeOption: {
      minHeight: 67,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      backgroundColor: COLORS.surface,
    },
    themeOptionSelected: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.surfaceSelected,
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: COLORS.surfaceSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    optionIconSelected: {
      backgroundColor: COLORS.primarySoft,
    },
    optionCopy: {
      flex: 1,
      gap: 3,
    },
    optionTitle: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "700",
    },
    optionDescription: {
      color: COLORS.muted,
      fontSize: 11,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: COLORS.radioBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    radioOuterSelected: {
      borderColor: COLORS.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
    },
    languageRow: {
      gap: 9,
    },
    languageOption: {
      minHeight: 66,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 14,
      paddingHorizontal: 13,
      paddingVertical: 11,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: COLORS.surface,
    },
    languageOptionSelected: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.surfaceSelected,
    },
    flag: {
      fontSize: 25,
    },
    languageCopy: {
      flex: 1,
      gap: 3,
    },
    languageName: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "700",
    },
    languageNative: {
      color: COLORS.muted,
      fontSize: 11,
    },
    aboutText: {
      color: COLORS.aboutText,
      fontSize: 13,
      lineHeight: 21,
    },
    versionRow: {
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      paddingTop: 13,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    versionLabel: {
      color: COLORS.muted,
      fontSize: 12,
    },
    versionValue: {
      color: COLORS.primary,
      fontSize: 12,
      fontWeight: "700",
    },
    bottomNote: {
      color: COLORS.bottomNote,
      textAlign: "center",
      fontSize: 11,
      paddingTop: 1,
      paddingBottom: Spacing.three,
    },

    pressed: {
      opacity: 0.7,
    },
  });

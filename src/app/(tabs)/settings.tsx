import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import {
  MAX_CONTENT_WIDTH,
  useResponsive,
  webPointer,
} from "@/hooks/use-responsive";
import { THEME_COLORS } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Appearance,
  Platform,
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
  const r = useResponsive();

  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system");

  const selectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    Appearance.setColorScheme(theme === "system" ? "unspecified" : theme);
  };

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];
  const styles = createStyles(colors, r);

  const selectedLanguage = i18n.resolvedLanguage?.startsWith("vi")
    ? "vi"
    : "en";

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          style={styles.pageScroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.column}>
            {/* Page heading */}
            <View style={styles.headingRow}>
              <View style={styles.headingCopy}>
                <Text style={styles.eyebrow}>PREFERENCES</Text>

                <Text style={styles.title}>
                  {t("settings.title", "Settings")}
                </Text>

                <Text style={styles.subtitle}>
                  {t("settings.subtitle", "Make the app feel right for you.")}
                </Text>
              </View>
            </View>

            {/* Theme settings */}
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
                  <Text style={styles.sectionTitle}>
                    {t("settings.theme", "Theme")}
                  </Text>
                  <Text style={styles.sectionDescription}>
                    {t("settings.themeDescription", "Choose how the app looks")}
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
                      accessibilityState={{
                        checked: isSelected,
                      }}
                      onPress={() => selectTheme(option.value)}
                      style={({ pressed }) => [
                        styles.themeOption,
                        isSelected && styles.themeOptionSelected,
                        webPointer,
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
                        <Text style={styles.optionTitle}>
                          {t(
                            `settings.themeOptions.${option.value}`,
                            option.label
                          )}
                        </Text>

                        <Text style={styles.optionDescription}>
                          {t(
                            `settings.themeDescriptions.${option.value}`,
                            option.description
                          )}
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

            {/* Language settings */}
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
                    {t(
                      "settings.languageDescription",
                      "Select your preferred language"
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.languageList}>
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{
                    checked: selectedLanguage === "en",
                  }}
                  onPress={() => changeAppLanguage("en")}
                  style={({ pressed }) => [
                    styles.languageOption,
                    selectedLanguage === "en" && styles.languageOptionSelected,
                    webPointer,
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
                  accessibilityState={{
                    checked: selectedLanguage === "vi",
                  }}
                  onPress={() => changeAppLanguage("vi")}
                  style={({ pressed }) => [
                    styles.languageOption,
                    selectedLanguage === "vi" && styles.languageOptionSelected,
                    webPointer,
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

            {/* About */}
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
                  <Text style={styles.sectionTitle}>
                    {t("settings.about", "About")}
                  </Text>

                  <Text style={styles.sectionDescription}>
                    {t(
                      "settings.aboutDescription",
                      "A little bit about this app"
                    )}
                  </Text>
                </View>
              </View>

              <Text style={styles.aboutText}>
                {t(
                  "settings.aboutContent",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                )}
              </Text>

              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>
                  {t("settings.version", "Version")}
                </Text>

                <Text style={styles.versionValue}>1.0.0</Text>
              </View>
            </View>

            <Text style={styles.bottomNote}>
              ©{new Date().getFullYear()} ·{" "}
              {t("settings.allRightsReserved", "All rights reserved")} ·{" "}
              {t("settings.developedBy", "Developed by")} BonKP
            </Text>
          </View>
        </ScrollView>
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
      paddingBottom: Spacing.one,
    },

    pageScroll: {
      flex: 1,
      width: "100%",
    },

    scrollContent: {
      flexGrow: 1,
      paddingTop: r.isDesktop ? 28 : r.isTablet ? 22 : 14,
      paddingBottom: Spacing.three,
    },

    // Mobile gần full width; tablet/web căn giữa, tối đa 720px.
    column: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      gap: r.isDesktop ? 22 : 18,
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

    sectionCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 20,
      padding: r.isTablet ? 22 : 17,
      borderWidth: 1,
      borderColor: COLORS.border,
      gap: 16,

      ...(Platform.OS === "web"
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

    sectionHeading: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },

    sectionIcon: {
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: 13,
      backgroundColor: COLORS.iconBg,
      alignItems: "center",
      justifyContent: "center",
    },

    sectionHeadingText: {
      flex: 1,
      minWidth: 0,
      gap: 3,
    },

    sectionTitle: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "700",
    },

    sectionDescription: {
      color: COLORS.muted,
      fontSize: 12,
      lineHeight: 18,
    },

    themeList: {
      gap: 9,
    },

    themeOption: {
      width: "100%",
      minWidth: 0,
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
      flexShrink: 0,
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
      minWidth: 0,
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
      lineHeight: 16,
      flexShrink: 1,
    },

    radioOuter: {
      width: 20,
      height: 20,
      flexShrink: 0,
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

    languageList: {
      gap: 9,
    },

    languageOption: {
      width: "100%",
      minWidth: 0,
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
      flexShrink: 0,
    },

    languageCopy: {
      flex: 1,
      minWidth: 0,
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
      fontSize: r.isTablet ? 14 : 13,
      lineHeight: r.isTablet ? 23 : 21,
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
      lineHeight: 17,
      paddingTop: 1,
      paddingBottom: Spacing.three,
    },

    pressed: {
      opacity: 0.7,
    },
  });

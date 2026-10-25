import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/use-responsive";
import { THEME_COLORS } from "@/utils/color-utils";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { t } = useTranslation();
  const r = useResponsive();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

  const styles = createStyles(colors, r);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Nửa trên: Hero image */}
            <View style={styles.heroSection}>
              <Image
                source={require("@/assets/images/hero/index_hero.png")}
                style={styles.heroImage}
                contentFit="contain"
                accessibilityLabel="Welcome hero illustration"
              />
            </View>

            {/* Nửa dưới: Lời chúc và cảm ơn */}
            <View style={styles.messageSection}>
              <View style={styles.messageContent}>
                <Text style={styles.eyebrow}>
                  {t("home.welcomeEyebrow", "A LITTLE NOTE FOR YOU")}
                </Text>

                <Text style={styles.title}>
                  {t("home.welcomeTitle", "Chào mừng bạn!")}
                </Text>

                <Text style={styles.message}>
                  {t(
                    "home.welcomeMessage",
                    "Chúc bạn có những khoảng thời gian đọc và nghe truyện thật vui vẻ."
                  )}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.thankYou}>
                  {t(
                    "home.thankYou",
                    "Cảm ơn bạn đã luôn yêu thương và ủng hộ ứng dụng."
                  )}
                </Text>

                <Text style={styles.signature}>
                  {t(
                    "home.signature",
                    "Chúc bạn có những trải nghiệm thật đẹp ♡"
                  )}
                </Text>
              </View>
            </View>
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
    },

    scrollView: {
      flex: 1,
      width: "100%",
    },

    scrollContent: {
      flexGrow: 1,
    },

    content: {
      flex: 1,
      width: "100%",
      maxWidth: 960,
      minHeight: r.isDesktop ? 560 : 520,
      alignSelf: "center",
    },

    // Nửa trên: ảnh hero
    heroSection: {
      flex: 1,
      minHeight: 240,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: Spacing.two,
      paddingHorizontal: r.isTablet ? Spacing.six : Spacing.two,
    },

    heroImage: {
      width: "100%",
      height: "100%",
      maxWidth: r.isDesktop ? 620 : r.isTablet ? 540 : 420,
      maxHeight: r.isDesktop ? 440 : r.isTablet ? 380 : 320,
    },

    // Nửa dưới: nội dung lời chúc
    messageSection: {
      flex: 1,
      minHeight: 260,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: r.isTablet ? Spacing.six : Spacing.two,
      paddingTop: Spacing.three,
      paddingBottom: Spacing.four,
    },

    messageContent: {
      width: "100%",
      maxWidth: 580,
      alignItems: "center",
    },

    eyebrow: {
      color: COLORS.primary,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 2,
      textAlign: "center",
      marginBottom: Spacing.two,
    },

    title: {
      color: COLORS.text,
      fontSize: r.isDesktop ? 34 : r.isTablet ? 30 : 27,
      lineHeight: r.isDesktop ? 44 : r.isTablet ? 39 : 36,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: Spacing.three,
    },

    message: {
      color: COLORS.text,
      fontSize: r.isDesktop ? 19 : r.isTablet ? 18 : 16,
      lineHeight: r.isDesktop ? 31 : r.isTablet ? 29 : 26,
      textAlign: "center",
    },

    divider: {
      width: 48,
      height: 3,
      borderRadius: 2,
      backgroundColor: COLORS.primary,
      marginVertical: Spacing.four,
    },

    thankYou: {
      color: COLORS.muted,
      fontSize: r.isTablet ? 15 : 14,
      lineHeight: r.isTablet ? 24 : 22,
      textAlign: "center",
    },

    signature: {
      color: COLORS.primary,
      fontSize: r.isTablet ? 14 : 13,
      lineHeight: 21,
      fontWeight: "600",
      textAlign: "center",
      marginTop: Spacing.three,
    },
  });

import { Platform, useWindowDimensions, type ViewStyle } from "react-native";

export const MAX_CONTENT_WIDTH = 720;

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1100,
} as const;

export const PLAYER_MAX_WIDTH = 480;

export const webPointer = Platform.select({
  web: { cursor: "pointer" },
  default: {},
}) as unknown as ViewStyle;

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= BREAKPOINTS.tablet;
  const isDesktop = width >= BREAKPOINTS.desktop;

  return {
    width,
    height,
    isTablet,
    isDesktop,
    isWeb: Platform.OS === "web",
    chapterNumberSize: isDesktop ? 28 : isTablet ? 25 : 22,
    chapterTitleSize: isDesktop ? 24 : isTablet ? 22 : 20,
    bodySize: isDesktop ? 19 : isTablet ? 18 : 17,
    bodyLineHeight: isDesktop ? 33 : isTablet ? 31 : 29,
    menuMaxHeight: Math.min(420, Math.max(240, height * 0.5)),
  };
}

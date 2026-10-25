// import { THEME_COLORS } from "@/utils/color-utils";
// import { Stack } from "expo-router";
// import { useColorScheme } from "react-native";

// export default function ChapterLayout() {
//   const colorScheme = useColorScheme();
//   const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

//   return (
//     <Stack
//       screenOptions={{
//         title: "Đọc truyện",
//         headerShown: true,

//         headerStyle: {
//           backgroundColor: colors.background,
//         },
//         headerTintColor: colors.text,
//         headerTitleStyle: {
//           color: colors.text,
//         },
//         headerShadowVisible: false,
//         contentStyle: {
//           backgroundColor: colors.background,
//         },
//       }}
//     />
//   );
// }

import { THEME_COLORS } from "@/utils/color-utils";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

export default function ChapterLayout() {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Stack
      screenOptions={{
        title: t("stories.readChapterTitle", "Đọc truyện"),
        headerShown: true,

        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

const LANGUAGE_KEY = "app_language";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

export type AppLanguage = "vi" | "en";

export async function initializeI18n() {
  if (i18n.isInitialized) return;

  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  const deviceLanguage = getLocales()[0]?.languageCode;

  const initialLanguage: AppLanguage =
    savedLanguage === "vi" || savedLanguage === "en"
      ? savedLanguage
      : deviceLanguage === "vi"
      ? "vi"
      : "en";

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: ["vi", "en"],
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v4",
  });
}

export async function changeAppLanguage(language: AppLanguage) {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
}

export default i18n;

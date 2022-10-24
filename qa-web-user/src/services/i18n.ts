import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './translations/en.json'
import th from './translations/th.json'

export const defaultNS = "translation";
export const resources = {
  en,
  th
} as const;

i18n.use(initReactI18next).init({
  lng: "th",
  defaultNS,
  resources,
});

export default i18n;
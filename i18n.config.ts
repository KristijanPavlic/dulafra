export const i18n = {
  locales: ["hr", "en"],
  defaultLocale: "hr",
} as const;

export type Locale = (typeof i18n)["locales"][number];

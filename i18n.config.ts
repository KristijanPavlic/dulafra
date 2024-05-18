export const i18n = {
  defaultLocale: "hr",
  locales: ["hr", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

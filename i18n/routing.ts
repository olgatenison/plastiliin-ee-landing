import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  // locales: ["en", "de"],
  locales: ["en", "et", "uk", "ru"] as const,
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: {
    mode: "always",
    // prefixes: {
    //   en: "/en",
    //   "de-at": "/eu/at",
    // },
  },
  pathnames: {
    "/": {
      en: "/home-en",
      et: "/home-et",
      uk: "/home-uk",
      ru: "/home-ru",
    },
    "/policy": {
      en: "/PrivacyPolicyPage-en",
      et: "/PrivacyPolicyPage-de",
      uk: "/PrivacyPolicyPage-uk",
      ru: "/PrivacyPolicyPage-ru",
    },
  },
});
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

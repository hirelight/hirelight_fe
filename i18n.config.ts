export const i18n = {
    defaultLocale: "en",
    locales: ["en", "vi"],
} as const;
export const defaultNS = "common";
export const cookieName = "i18next";
export const fallbackLng = "en";
export const languages = [fallbackLng, "vi"];

export type Locale = (typeof i18n)["locales"][number];

export function getOptions(
    lng: Locale = fallbackLng,
    ns: string | string[] = defaultNS
) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng: fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}

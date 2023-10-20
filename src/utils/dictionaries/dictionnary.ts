import "server-only";
import { Locale } from "../../../i18n.config";

const dictionaries: any = {
    en: () =>
        import("@/utils/dictionaries/en.json").then(module => module.default),
    vi: () =>
        import("@/utils/dictionaries/vi.json").then(module => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

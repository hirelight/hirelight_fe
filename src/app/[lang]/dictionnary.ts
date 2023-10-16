import "server-only";
import { Locale } from "../../../i18n.config";

const dictionaries = {
    en: () =>
        import("@/utils/dictionaries/en.json").then(module => module.default),
    vn: () =>
        import("@/utils/dictionaries/vn.json").then(module => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

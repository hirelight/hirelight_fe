// import "server-only";
import { Locale } from "../../../i18n.config";

import enDic from "./en.json";
import viDic from "./vi.json";

// const dictionaries: any = {
//     en: () =>
//         import("@/utils/dictionaries/en.json").then(module => module.default),
//     vi: () =>
//         import("@/utils/dictionaries/vi.json").then(module => module.default),
// };

const dictionaries: {
    en: typeof enDic;
    vi: typeof viDic;
} = {
    en: enDic,
    vi: viDic,
};

export const getDictionary = async (locale: Locale) => dictionaries[locale];

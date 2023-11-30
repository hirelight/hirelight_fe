"use client";

import React from "react";
import { useParams } from "next/navigation";
import moment from "moment";

import defaultNs from "@/utils/dictionaries/en.json";

import { Locale } from "../../../i18n.config";

type InternationalizationState = {
    lang: any;
    contents: Record<string, any>;
};

export const InternationalizationContext =
    React.createContext<InternationalizationState | null>(null);

export const useTranslation = (lang: Locale, ns: string) => {
    const context = React.useContext(InternationalizationContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    if (ns === "") return context.contents;

    const keys = ns.split(".");
    let value = context.contents;
    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        }
    }

    return value;
};

moment.locale("en");

moment.locale("vi", {
    months: "Tháng Một_Tháng Hai_Tháng Ba_Tháng Tư_Tháng Năm_Tháng Sáu_Tháng Bảy_Tháng Tám_Tháng Chín_Tháng Mười_Tháng Mười Một_Tháng Mười Hai".split(
        "_"
    ),
    monthsShort:
        "Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12".split(
            "_"
        ),
    monthsParseExact: true,
    weekdays: "Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy_Chủ nhật".split(
        "_"
    ),
    weekdaysShort: "CN_Th2_Th3_Th4_Th5_Th6_Th7".split("_"),
    weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm LT",
    },
    calendar: {
        sameDay: "[Hôm nay lúc] LT",
        nextDay: "[Ngày mai lúc] LT",
        nextWeek: "dddd [lúc] LT",
        lastDay: "[Hôm qua lúc] LT",
        lastWeek: "dddd [tuần trước lúc] LT",
        sameElse: "L",
    },
    relativeTime: {
        future: "trong vài %s tới",
        past: "%s trước",
        ss: "vài giây trước",
        s: "một giây",
        m: "một phút",
        mm: "%d phút",
        h: "một giờ",
        hh: "%d giờ",
        d: "một ngày",
        dd: "%d ngày",
        M: "một tháng",
        MM: "%d tháng",
        y: "một năm",
        yy: "%d năm",
    },
    // dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    // ordinal: function (number) {
    //     return number + (number === 1 ? "er" : "e");
    // },
    meridiemParse: /SA|CH/,
    isPM: function (input) {
        return input === "CH";
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours, minutes, isLower) {
        if (hours >= 1 && hours < 11) {
            return "sáng";
        } else if (hours >= 11 && hours < 13) {
            return "trưa";
        } else if (hours >= 13 && hours < 18) {
            return "chiều";
        } else if (hours >= 18 && hours < 22) {
            return "tối";
        } else if (hours >= 22 && hours < 24) {
            return "đêm";
        } else return "đêm";
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // Used to determine first week of the year.
    },
});

const InternationalizationProvider = ({ children, ...props }: any) => {
    const { lang } = useParams();
    const [contents, setContents] = React.useState(defaultNs);

    React.useEffect(() => {
        const getTranslation = async () => {
            const htmlEl = document.documentElement;

            if (htmlEl) {
                htmlEl.lang = lang as string;
            }
            const data = await import(
                `@/utils/dictionaries/${lang ?? "en"}.json`
            ).then(module => module.default);

            setContents(data);
        };

        getTranslation();
    }, [lang]);

    return (
        <InternationalizationContext.Provider
            value={{ lang: lang as Locale, contents }}
            {...props}
        >
            {children}
        </InternationalizationContext.Provider>
    );
};

export default InternationalizationProvider;

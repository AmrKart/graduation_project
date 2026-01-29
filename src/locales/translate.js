import ar from "./ar/translation.json"
import en from "./eng/translation.json"
import i18n from "i18next";
import localization from "./localization";
export const translationHelper = (key) => {

    const lang = i18n.language;
    if (lang === "ar") {
        return ar[key] || key;
    } else {
        return en[key] || key;
    }
}
export const
    translate = (key) => {
        const lang = i18n.language;
        if (!localization[key])
            return key;
        return localization[key][lang];
    }
export const translateWithParams = (key, params) => {
    const lang = i18n.language;
    if (!localization[key])
        return key;
    return localization[key][lang].replace(/{(\w+)}/g, (match, p1) => params[p1]);
}

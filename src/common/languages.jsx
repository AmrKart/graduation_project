import usFlag from '../assets/images/flags/us.jpg';
import syria from '../assets/images/flags/syria.png';
import i18n from '@@/i18n';

export const languages = {
  ar: {
    label: 'عربي',
    flag: syria,
  },
  en: {
    label: 'English',
    flag: usFlag,
  },
};
export const languagesOptions = [
  { label: i18n.language === "ar" ? "انجليزي" : "English", value: 0 },
  { label: i18n.language === "ar" ? "عربي" : "Arabic", value: 1 },
]

export default async function langHeader() {
    try {
      const lang = localStorage.getItem("i18nextLng");
      
      if (lang) {
        return lang
      } else {
        return 'ar';
      }
    } catch (err) {
      return null;
    }
  }
  
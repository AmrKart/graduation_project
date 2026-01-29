import moment from 'moment';

export const buildFormData = (
  formData: FormData,
  data: any,
  parentKey?: string
) => {
  if (
    data && Array.isArray(data) && data.length === 0
  ) {
    // Append empty array as '[]'
    formData.append(parentKey!, JSON.stringify([]));
  }
  else if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey!, value);
  }
};
export const convertDateToFromat = (date?: string, format = 'yyyy-MM-DD') => {
  return date ? moment(date).format(format).toString() : undefined;
};
export const isNumericKey = (key?: string) => {
  if (key === null || key === undefined || key == "") return false;
  return !isNaN(Number(key));
};
export const generateGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Character validation regex patterns
export const REGEX_PATTERNS = {
  // Arabic patterns
  ARABIC_BASIC: /[\u0600-\u06FF]/,
  ARABIC_COMPLETE: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/,
  ARABIC_WITH_SPACES: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s.,!?;:()"'-]/,
  ARABIC_WITH_PUNCTUATION: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0660-\u0669\s.,!?;:()"'-]/,
  ARABIC_NUMBERS: /[\u0660-\u0669]/,

  // English patterns
  ENGLISH_BASIC: /[a-zA-Z]/,
  ENGLISH_WITH_SPACES: /[a-zA-Z\s]/,
  ENGLISH_WITH_PUNCTUATION: /[a-zA-Z\s.,!?;:()"'-]/,
  ENGLISH_COMPLETE: /[a-zA-Z0-9\s.,!?;:()"'-]/,
  ENGLISH_EXTENDED: /[a-zA-Z\u00C0-\u017F\s]/,

  // Combined patterns - FIXED: removed spaces between character ranges
  ARABIC_AND_ENGLISH: /[\u0600-\u06FF\u0750-\u077Fa-zA-Z\s]/,
  ARABIC_AND_ENGLISH_COMPLETE: /[\u0600-\u06FF\u0750-\u077F\u0660-\u0669a-zA-Z0-9\s.,!?;:()"'-]/,
  NUMBERS_ONLY: /[0-9]/,
  ALPHANUMERIC: /[a-zA-Z0-9]/,

  // Validation patterns (for full string validation)
  ARABIC_ONLY_FULL: /^[\u0600-\u06FF\u0750-\u077F\s]+$/,
  ENGLISH_ONLY_FULL: /^[a-zA-Z\s]+$/,
  ARABIC_OR_ENGLISH_FULL: /^([\u0600-\u06FF\u0750-\u077F\s]+|[a-zA-Z\s]+)$/
};
console.log(REGEX_PATTERNS.ARABIC_COMPLETE.test('ع٢بادة'));
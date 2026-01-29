import moment from 'moment-timezone';

export const toLocaleDate = (date: string) => {
  if (!date) return undefined;
  if (moment.utc(date).local().toISOString() === date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
  return moment.utc(date).local().toISOString();
};
export const formatDate = (date: string, specificFormat = 'YYYY-MM-DD') => {
  if (!date) return undefined;
  return moment(date).format(specificFormat).toString();
};
export const toUtc = (date: string) => {
  if (!date) return undefined;

  return moment.tz(date, moment.tz.guess()).utc().toISOString();
};
export const isDate = (date: string) => {
  if (!date) return false;
  const parsedDate = moment(
    date,
    'YYYY-MM-DDTHH:mm:ss.SSSSSSS',
    true
  ).isValid();
  const parsedDate2 = moment(date, 'YYYY-MM-DDTHH:mm:ss', true).isValid();
  const parsedDate5 = moment(date, 'YYYY-MM-DDTHH:mm', true).isValid();

  const parsedDate6 = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid();
  return parsedDate2 || parsedDate || parsedDate5 || parsedDate6;
};
export const overwriteResponse = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => overwriteResponse(item));
  } else if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        overwriteResponse(value),
      ])
    );
  } else {
    if (data && isDate(data) && typeof data == 'string') {
      return toLocaleDate(data);
    } else return data;
  }
};
export const overwriteRequest = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => overwriteRequest(item));
  } else if (data instanceof File) {
    return data;
  } else if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, overwriteRequest(value)])
    );
  } else {
    if (data && isDate(data) && typeof data == 'string') {
      return toUtc(data);
    } else return data;
  }
};

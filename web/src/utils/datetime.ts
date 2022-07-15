export const getTimezoneOffsetDate = (date: string | number | Date) => {
  const dt = new Date(date);
  const dtOffset = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
  return dtOffset;
};

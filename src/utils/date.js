export const addDaysToDate = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

export const addHoursToDate = (date, hours) => {
  date.setHours(date.getHours() + hours);
  return date;
};

export const minusHoursToDate = (date, hours) => {
  date.setHours(date.getHours() - hours);
  return date;
};

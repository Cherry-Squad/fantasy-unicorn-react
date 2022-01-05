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

const addZero = (e) => (e < 10 ? "0" + e : e);

export const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + ":" : "";
  const hDisplay = h > 0 ? addZero(h) + ":" : "";
  const mDisplay = addZero(m) + ":";
  const sDisplay = addZero(s);
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

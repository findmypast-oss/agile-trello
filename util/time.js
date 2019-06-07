export function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = date1.getTime() - date2.getTime();
  return Math.abs(Math.round(diff / oneDay));
}

export function daysSince(date) {
  return daysBetween(new Date(), date);
}

export function millisecondsBetween(date1, date2) {
  return Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
}

export function millisecondsSince(date) {
  return millisecondsBetween(new Date(), date);
}

export default {
  daysBetween: daysBetween,
  daysSince: daysSince,
  millisecondsBetween: millisecondsBetween,
  millisecondsSince: millisecondsSince
};

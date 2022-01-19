import moment from "moment";

const getStartOfDate = (date) => {
  return moment(date).startOf("day");
};
export const nasaAPIDateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const addDaysToDate = (date, days) => {
  const formattedDate = nasaAPIDateFormat(date);
  return moment(formattedDate, "YYYY-MM-DD").add(days, "d");
};

export const dateComparison = (date1, date2, comparisonType) => {
  let startOfDate1 = getStartOfDate(date1);
  let startOfDate2 = getStartOfDate(date2);
  switch (comparisonType) {
    case "equal":
      return moment(startOfDate1).isSame(startOfDate2);
    case "before":
      return moment(startOfDate1).isBefore(startOfDate2);
    case "after":
      return moment(startOfDate1).isAfter(startOfDate2);
    default:
      return false;
  }
};

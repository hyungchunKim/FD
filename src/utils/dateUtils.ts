import dayjs from "dayjs";

export const CardDateFormat = (date: string) => {
  try {
    return dayjs(date).format("YYYY-MM-DD");
  } catch (error) {
    return date;
  }
};

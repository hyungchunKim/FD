import dayjs from "dayjs";

export const CardDateFormat = (date: string) => {
  try {
    return dayjs(date).format("YYYY-MM-DD HH:mm");
  } catch (error) {
    return date;
  }
};

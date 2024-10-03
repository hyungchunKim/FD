import { format, differenceInDays, parse } from "date-fns";
import dayjs from "dayjs";

export const CardDateFormat = (date: string) => {
  try {
    // "yyyy년 MM월 dd일" 형식의 문자열을 Date 객체로 파싱
    const parsedDate = parse(date, "yyyy년 MM월 dd일", new Date());

    // 현재 시간과 파싱된 날짜 사이의 일 수 차이를 계산
    const difference = differenceInDays(new Date(), parsedDate);

    if (difference === 0) return "";
    // n일 전 형식의 문자열 반환
    return `${difference}일 전`;
  } catch (error) {
    return date;
  }
};

export const RepoCardDateFormat = (date: string) => {
  try {
    return dayjs(date).format("YYYY-MM-DD");
  } catch (error) {
    return date;
  }
};

export const CardDateDifference = (date: string) => {
  try {
    // "yyyy년 MM월 dd일" 형식의 문자열을 Date 객체로 파싱
    const parsedDate = parse(date, "yyyy년 MM월 dd일", new Date());

    // 현재 시간과 파싱된 날짜 사이의 일 수 차이를 계산
    const difference = differenceInDays(new Date(), parsedDate);

    if (difference === 0) return 0;
    // n일 전 형식의 문자열 반환
    return difference;
  } catch (error) {
    return date;
  }
};
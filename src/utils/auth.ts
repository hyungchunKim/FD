import { getCookie } from "./cookies";

export const isLoggedIn = (): boolean => {
  const token = getCookie();
  return !!token; // 토큰이 있으면 로그인된 것으로 간주
};

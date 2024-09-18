import Cookies from "js-cookie";

export const setCookie = (token: string) => {
  Cookies.set("token", token, {
    secure: true,
    expires: 7,
    path: "/",
    sameSite: "strict",
  }); // 쿠키 7일 설정
};

export const removeCookie = () => {
  Cookies.remove("token");
};

export const getCookie = () => {
  return Cookies.get("token");
};

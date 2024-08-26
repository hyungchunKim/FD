import { auth } from "@/auth";

export const getSession = async () => {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    return null;
  }
};

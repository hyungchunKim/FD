import { User } from "firebase/auth";

declare module "firebase/auth" {
  interface User {
    displayName: string;
    email: string;
    photoURL: string;
  }
}

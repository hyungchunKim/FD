"use client";
import { github } from "@/server/user.action";
import React from "react";

type PropTypes = {
  children: React.ReactNode;
};

const Login = ({ children }: PropTypes) => {
  return (
    <form action={github}>
      <button type="submit">{children}</button>
    </form>
  );
};
export default Login;

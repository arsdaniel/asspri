import React from "react";

import { Metadata } from "next";
import SignUpForm from "@/components/SignUp/SignUpForm";
export const metadata: Metadata = {
  title: "Signup Page | Next.js E-commerce Dashboard Template",
  description: "This is Signup page for TailAdmin Next.js",
  // other metadata
};

const SignUp: React.FC = () => {
  return (
    <>
      <div>
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;

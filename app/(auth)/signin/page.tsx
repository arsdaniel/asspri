import React from "react";
import { Metadata } from "next";
import SignInForm from "@/components/SignIn/SignInForm";
import { getServerSession } from "next-auth";
import { autOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Signin Page | Next.js E-commerce Dashboard Template",
  description: "This is Signin page for TailAdmin Next.js",
  // other metadata
};

const SignIn: React.FC = async () => {
  const session = await getServerSession(autOptions);
  if (session?.user) {
    console.log(session);
    return redirect("/dashboard");
  } else {
    return (
      <>
        <SignInForm />
      </>
    );
  }
};

export default SignIn;

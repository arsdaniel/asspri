import { autOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

const Home = async () => {
  const session = await getServerSession(autOptions);
  if (session?.user) {
    return redirect("/dashboard");
  } else {
    return redirect("/signin");
  }
};

export default Home;

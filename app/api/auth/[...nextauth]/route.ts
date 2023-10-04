import { autOptions } from "@/lib/auth";
import nextAuth from "next-auth";

const handler = nextAuth(autOptions);

export { handler as GET, handler as POST };

import ECommerce from "@/components/Dashboard/E-commerce";
import { autOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(autOptions);
  if (!session?.user) {
    return redirect("/signin");
  }
  return (
    <>
      <ECommerce />
    </>
  );
};
export default Dashboard;

import { redirect } from "next/navigation";

const page = () => {
  return redirect("/dashboard/overview");
};

export default page;

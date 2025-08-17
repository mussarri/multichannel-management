/* eslint-disable @typescript-eslint/no-unused-vars */
//export const dynamic = "force-dynamic"; // This disables SSG and ISR
import Hero from "./views/landing/hero";
import Section from "./views/landing/features-auto";
import Section1 from "./views/landing/entegrations";
import Section2 from "./views/landing/target";
import Footer from "./views/landing/footer";
import Header from "./Header";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/dashboard/overview");
  // return (
  //   <main
  //     className="flex-1"
  //     style={{ background: "linear-gradient(0deg,black,transparent)" }}
  //   >
  //     <Header />
  //     <Hero />
  //     <Section />
  //     <Section1 />
  //     <Section2 />
  //     <Section />
  //     <Footer />
  //   </main>
  // );
}

export const dynamic = "force-dynamic"; // This disables SSG and ISR
import Hero from "./components/landing/hero";
import Section from "./components/landing/features-auto";
import Section1 from "./components/landing/entegrations";
import Section2 from "./components/landing/target";
import Footer from "./components/landing/footer";

export default function Home() {
  return (
    <main
      className="flex-1"
      style={{ background: "linear-gradient(0deg,black,transparent)" }}
    >
      <Hero />
      <Section />
      <Section1 />
      <Section2 />
      <Section />
      <Footer />
    </main>
  );
}

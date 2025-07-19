import Header from "./Header";

export const dynamic = "force-dynamic"; // This disables SSG and ISR

export default async function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screenflex flex-col items-center py-24 px-8"></div>
    </>
  );
}

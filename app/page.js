import Contact from "@components/Contact/Contact";
import Hero from "@components/Hero/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero />
      <Contact/>
    </main>
  );
}

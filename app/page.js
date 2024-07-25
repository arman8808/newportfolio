import AboutUs from "@components/About/AboutUs";
import Contact from "@components/Contact/Contact";
import Hero from "@components/Hero/Hero";
import Projects from "@components/Projects/Projects";
export default function Home() {
  return (
    <main
      className="flex w-full min-h-screen flex-col items-center justify-between "
      style={{ backgroundImage: `url("../public/Asset/hero.svg")` }}
    >
      <Hero />
      <AboutUs />
      <Projects />
      <Contact />
    </main>
  );
}

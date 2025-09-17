import AboutUs from "@components/About/AboutUs";
import BlogSection from "@components/Blogs/BlogSection";
import Contact from "@components/Contact/Contact";
import Hero from "@components/Hero/Hero";
import Projects from "@components/Projects/Projects";
export default function Home() {
  return (
    <main
      className="flex w-full h-fit flex-col items-center justify-between "
      style={{ backgroundImage: `url("../public/Asset/hero.svg")` }}
    >
      <Hero />
      <AboutUs />
      <Projects />
      <BlogSection />
      <Contact />
    </main>
  );
}

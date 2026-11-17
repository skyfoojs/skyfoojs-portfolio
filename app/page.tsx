import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import WallOfFame from "@/components/WallOfFame";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Experience />
        <WallOfFame />
        <Projects />
        <TechStack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

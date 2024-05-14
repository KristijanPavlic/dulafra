import About from "./components/About";
import Albums from "./components/Albums";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Search from "./components/Search";

export default function Page() {
  return (
    <main>
      <div className="bg-orange-400 text-lg sticky top-0 p-1 font-bold text-center z-50">
        <span>Stranica je trenutno u izradi!</span>
      </div>
      <Hero />
      <Search />
      {/* <div className="w-full h-[1px] bg-black"></div>
      <Albums /> */}
      <div className="w-full h-[1px] bg-black"></div>
      <About />
      <div className="w-full h-[1px] bg-black"></div>
      <Contact />
      <div className="w-full h-[1px] bg-black"></div>
      <Footer />
    </main>
  );
}

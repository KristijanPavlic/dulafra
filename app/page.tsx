import About from "./components/About";
import Albums from "./components/Albums";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main>
      <h1>Dulafra foto corner</h1>
      <Albums />
      <div className="w-full h-[1px] bg-black"></div>
      <About />
      <div className="w-full h-[1px] bg-black"></div>
      <Contact />
      <div className="w-full h-[1px] bg-black"></div>
      <Footer />
    </main>
  );
}

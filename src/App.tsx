import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Subsidiaries from '@/components/Subsidiaries';
import News from '@/components/News';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-sand-50 font-arabic" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Subsidiaries />
        <News />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

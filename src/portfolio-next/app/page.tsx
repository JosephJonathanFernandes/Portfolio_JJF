import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-white relative">
      <div className="absolute inset-0 bg-background/90 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="bg-transparent border-t border-white/5 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-zinc-500 font-medium tracking-wide text-sm">
            &copy; {new Date().getFullYear()} JJF. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

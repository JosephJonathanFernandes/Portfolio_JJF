import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Cursor from '@/components/cursor';

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-white relative overflow-x-hidden">
      {/* Custom cursor — desktop only */}
      <Cursor />

      {/* Fixed ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="aurora-blob absolute top-[-15%] left-[-10%] w-[900px] h-[900px] rounded-full bg-indigo-600/[0.055] blur-[180px]" />
        <div className="aurora-blob-2 absolute top-[35%] right-[-15%] w-[700px] h-[700px] rounded-full bg-violet-600/[0.04] blur-[160px]" />
        <div className="aurora-blob absolute bottom-[-5%] left-[25%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.035] blur-[140px]" />
      </div>

      {/* Darkening overlay for readability */}
      <div className="fixed inset-0 bg-background/80 pointer-events-none z-0" />

      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} Joseph Jonathan Fernandes &mdash; Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}

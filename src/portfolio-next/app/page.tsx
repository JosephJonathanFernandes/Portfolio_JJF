import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-white relative overflow-x-hidden">
      {/* Fixed ambient orbs — never move, pure decoration */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-15%] w-[800px] h-[800px] rounded-full bg-indigo-600/[0.04] blur-[160px]" />
        <div className="absolute top-[30%] right-[-20%] w-[700px] h-[700px] rounded-full bg-violet-600/[0.03] blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[130px]" />
      </div>

      {/* Page overlay for depth */}
      <div className="fixed inset-0 bg-background/85 pointer-events-none z-0" />

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
            &copy; {new Date().getFullYear()} Joseph Jonathan Fernandes. Built with Next.js & ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

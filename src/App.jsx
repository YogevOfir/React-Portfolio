import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SectionWrapper from './components/SectionWrapper'
import TechnologySelector from './components/TechnologySelector'
import ExperienceQuestion from './components/ExperienceQuestion'
import ProjectSelector from './components/ProjectSelector'
import Congratulations from './components/Congratulations'
import { GameProvider } from './context/GameContext'

const App = () => {
  return (
    <GameProvider>
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 
          bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="container mx-auto px-8 pt-3">
          <Navbar />
          
          {/* Hero Section - Always unlocked */}
          <SectionWrapper sectionKey="hero" showLockOverlay={false}>
            <Hero />
          </SectionWrapper>

          {/* About Section - Always unlocked */}
          <SectionWrapper sectionKey="about" showLockOverlay={false}>
            <About />
          </SectionWrapper>

          {/* Technologies Section - Always unlocked, but has interactive selector */}
          <SectionWrapper sectionKey="technologies" showLockOverlay={false}>
            <Technologies />
            <TechnologySelector />
          </SectionWrapper>

          {/* Experience Section - Unlocked after selecting technologies */}
          <SectionWrapper sectionKey="experience">
            <Experience />
            <ExperienceQuestion />
          </SectionWrapper>

          {/* Projects Section - Unlocked after answering experience question */}
          <SectionWrapper sectionKey="projects">
            <Projects />
            <ProjectSelector />
          </SectionWrapper>

          {/* Congratulations Message - Shows when all sections are unlocked */}
          <Congratulations />

          {/* Contact Section - Unlocked after selecting favorite project */}
          <SectionWrapper sectionKey="contact">
            <Contact />
          </SectionWrapper>
        </div>
      </div>
    </GameProvider>
  )
}

export default App
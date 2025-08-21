import './App.css'
import Introduction from './Introduction.tsx'
import About from './About.tsx'
import Experience from './Experience.tsx'
import Contact from './Contact.tsx'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
import FallingObjects from './FallingObjects.tsx'
import CoffeeCup from './CoffeeCup.tsx'
import SectionCard from './SectionCard.tsx'
import Journey from './Journey.tsx'

function App() {

  return (
    <>
      <CoffeeCup />
      <FallingObjects />
      <Navbar />
      <Introduction />
      <Journey />
      <SectionCard
        color="bg-gradient-to-br from-white/10 to-purple-300"
      >
        <About />
      </SectionCard>
      <SectionCard
        color="bg-gradient-to-br from-white/10 to-pink-300"
      >
        <Experience />
      </SectionCard>
      <SectionCard
        color="bg-gradient-to-br from-white/10 to-orange-300"
      >
        <Contact />
      </SectionCard>
      <Footer />
    </>
  )
}

export default App
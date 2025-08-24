import './App.css'
import Introduction from './Introduction.tsx'
import About from './About.tsx'
import Experience from './Experience.tsx'
import Contact from './Contact.tsx'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
import FallingObjects from './components/FallingObjects.tsx'
import CoffeeCup from './components/CoffeeCup.tsx'

function App() {

  return (
    <>
      <CoffeeCup />
      <FallingObjects />
      <Navbar />
      <Introduction />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default App
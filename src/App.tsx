import './App.css'
import Introduction from './Introduction.tsx'
import About from './About.tsx'
import Experience from './Experience.tsx'
// import Work from './Work.tsx'
import Contact from './Contact.tsx'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
import CoffeeCup from './CoffeeCup.tsx'

function App() {
  return (
    <>
      <CoffeeCup/>
      <Navbar />
      <Introduction />
      <About />
      <Experience />
      {/* <Work /> */}
      <Contact />
      <Footer />
    </>
  )
}

export default App
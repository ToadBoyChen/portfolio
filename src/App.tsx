import './App.css'
import Introduction from './Introduction.tsx'
import About from './About.tsx'
import Experience from './Experience.tsx'
import Work from './Work.tsx'
import Contact from './Contact.tsx'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'
import FallingObjects from './FallingObjects.tsx'
import CoffeeCup from './CoffeeCup.tsx'
import SectionCard from './SectionCard.tsx'

const sections = [
  { id: "about", content: <About /> },
  { id: "experience", content: <Experience /> },
  { id: "work", content: <Work /> },
  { id: "contact", content: <Contact /> },
];

function App() {

  return (
    <>
      {/* <CoffeeCup /> */}
      <FallingObjects />
      <Navbar />
      <Introduction />
      {sections.map((section, index) => (
        <SectionCard key={section.id} index={index}>
          {section.content}
        </SectionCard>
      ))}
      <Footer />
    </>
  )
}

export default App
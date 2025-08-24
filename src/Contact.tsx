import AnimatedText from "./components/AnimatedText.tsx";
import Form from "./components/Form.tsx";
import SectionCard from "./components/SectionCard.tsx";

function Contact() {
  return (
      <div className="flex flex-col items-center text-center mt-54" id="contact">
      <AnimatedText 
        text="Contact" 
        className="text-5xl font-bold chango-regular text-background knewave-shadow" 
      />
      <div className="mt-8">
        <div className="flex flex-row items-center justify-center gap-4">
          <img
            src="src/assets/me/me.jpeg"
            alt="A photo of Toby Chen"
            className="w-52 h-52 object-cover p-2 rounded-full bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border"
          />
          <SectionCard>
            <p>
              Hi, I'm Toby Chen, a passionate software developer with a love for creating
              interactive and engaging web applications. I enjoy working with the latest
              technologies and constantly strive to improve my skills.
            </p>
          </SectionCard>
        </div>
        <Form />
      </div>
    </div>
  )
}

export default Contact
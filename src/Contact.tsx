import AnimatedText from "./animation/AnimatedText";
import Form from "./components/Form";
import SectionCard from "./components/SectionCard";
import mePhoto from "./assets/me/me.jpeg";

function Contact() {
  return (
    <div className="flex flex-col items-center text-center mt-54 px-4" id="contact">
      <AnimatedText 
        text="Get In Touch" 
        className="text-4xl sm:text-5xl font-bold chango-regular knewave-shadow" 
      />
      <div className="mt-8 w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
          <img
            src={mePhoto}
            alt="A photo of Toby Chen"
            className="w-40 h-40 sm:w-52 sm:h-52 object-cover p-2 rounded-full bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border"
          />
          <SectionCard>
            <p className="text-center text-lg">
              I'm always open to discuss and work on new things. If you like what you see, why not drop me a message below? BTW - this website is still a work in progress. If you spot anything fishy or off please let me know :)
            </p>
          </SectionCard>
        </div>
        <div className="mt-8">
          <SectionCard>
            <Form />
          </SectionCard>
        </div>
      </div> 
    </div>
  )
}

export default Contact;

function About() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center px-10">
        <img
          src="src/assets/me.jpeg"
          alt="A photo of Toby Chen"
          className="w-48 h-48 object-cover relative p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 gradient-border"
        />
        <p id="about" className="text-5xl font-bold left-1/2 translate-x-1/2">
          About me
        </p>
      </div>
      <div>
        <p className="text-lg mt-8">
          Hi, I'm Toby Chen, a passionate software developer with a love for creating
          interactive and engaging web applications. I enjoy working with the latest
          technologies and constantly strive to improve my skills.
        </p>
      </div>
    </div>
  );
}

export default About
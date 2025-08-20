

function About() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center px-10">
        <img
            src="src/assets/me.jpeg"
            alt="A photo of Toby Chen"
            className="w-50 h-50 rounded-full border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
        />
        <p id="about" className="text-5xl font-bold left-1/2 translate-x-1/2">About me</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default About
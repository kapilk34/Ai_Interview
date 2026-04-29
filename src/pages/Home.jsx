import NavBar from "../components/NavBar"
import { BsRobot } from "react-icons/bs"

function Home() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <NavBar/>
      
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">

          {/* Background Glow */}
          <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[150px] rounded-full top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg">
                <BsRobot size={40} />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Crack Interviews with{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Practice real interview scenarios with AI, get instant feedback,
              improve communication, and land your dream job faster.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Interview
              </button>

              <button className="px-8 py-3 rounded-xl border border-gray-500 hover:bg-white hover:text-black transition-all duration-300">
                Explore Features
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
              <div>
                <h3 className="text-2xl font-bold text-white">10K+</h3>
                <p>Interviews Taken</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">95%</h3>
                <p>Success Rate</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">AI Powered</h3>
                <p>Smart Feedback</p>
              </div>
            </div>
          </div>

          {/* Your existing SVG (unchanged) */}
          <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,170.7C672,160,768,160,864,165.3C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

        </div>
      </main>
    </div>
  )
}

export default Home
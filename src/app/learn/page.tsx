"use client"
import Link from "next/link"
import { motion } from 'framer-motion';

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #53505008 1px, transparent 1px), 
                          linear-gradient(to bottom, #53505008 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
      
      {/* Animated Gradient Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-80 right-40 w-72 h-72 bg-investa-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative z-10 px-4 md:px-6 py-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <Link href="/">
            <div className="font-bold text-3xl text-investa-primary transition-all hover:scale-105">Renvue</div>
          </Link>
          <Link href="/">
            <button className="h-10 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "4px" }}
              >
                <path 
                  d="M3 12h18M3 12l6-6M3 12l6 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>

        {/* Page Content */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-investa-dark leading-tight mb-6">
              About Renvue
            </h1>
            <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto">
              An AI-powered investment marketplace connecting investors with promising startups in seconds.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Section 1: Inspiration */}
            <motion.section 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 border border-investa-primary/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-6">Our Inspiration</h2>
              <p className="text-investa-gray leading-relaxed">
                We were inspired by the millions of innovators dreaming of building the next big thing but struggling to connect with the right investors, and the investors drowning in irrelevant pitches. The inefficiency of early-stage startup funding felt like a problem ripe for an AI solution. Platforms like Crunchbase and Product Hunt showed us the wealth of startup data out there, but nothing tied it together with natural language search for both sides of the equation—investors and founders. We wanted to create a two-sided marketplace that makes funding fast, smart, and accessible.
              </p>
            </motion.section>

            {/* Section 2: What it does */}
            <motion.section 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 border border-investa-primary/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-6">What Renvue Does</h2>
              <p className="text-investa-gray leading-relaxed mb-6">
                Renvue.ai is an AI-powered investment marketplace that connects investors with early-stage startups in seconds. Investors can search for startups by idea, category, or funding needs using natural language queries (e.g., "AI healthcare startups under $1M"), while founders can create profiles and get matched with investors based on their pitch and requirements. It's a seamless platform that simplifies discovery and funding, targeting investors hungry for opportunities and startups desperate for capital.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-investa-dark mb-4">For Investors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Search startups with natural language</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Filter by industry, stage, and funding needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Discover promising early-stage opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Connect directly with founders</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-investa-dark mb-4">For Startups</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Create detailed company profiles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Get matched with relevant investors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Simplify your fundraising process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-investa-primary font-bold">•</span>
                      <span>Focus on building, not endless pitching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3: How It Works */}
            <motion.section 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 border border-investa-primary/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-6 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary mx-auto mb-4">1</div>
                  <h3 className="text-xl font-semibold text-investa-dark mb-2 text-center">Create Your Profile</h3>
                  <p className="text-investa-gray text-center">Set up your investor or startup profile with your specific criteria and preferences.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary mx-auto mb-4">2</div>
                  <h3 className="text-xl font-semibold text-investa-dark mb-2 text-center">Get Matched</h3>
                  <p className="text-investa-gray text-center">Our AI algorithm connects you with the most relevant partners based on your profile.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary mx-auto mb-4">3</div>
                  <h3 className="text-xl font-semibold text-investa-dark mb-2 text-center">Connect & Grow</h3>
                  <p className="text-investa-gray text-center">Communicate directly with potential partners and build meaningful relationships.</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-investa-dark mb-6">Ready to Get Started?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/find-startups">
                <button className="py-3 px-8 bg-investa-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  I'm an Investor
                </button>
              </Link>
              <Link href="/find-investors">
                <button className="py-3 px-8 bg-investa-dark text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  I'm a Startup
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 
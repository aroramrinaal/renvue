"use client"
import { useState } from "react"
import Link from "next/link"
import GlobeComponent from "@/components/globe-component"
import SignupModal from "@/components/SignupModal";
import "./investor/style.css"

export default function Home() {
  const [mode, setMode] = useState<"investor" | "startup">("investor")
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
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

      <div className="relative z-10 px-4 pt-8 pb-0">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-8 max-w-8xl mx-auto -mt-4">
          <div className="font-bold text-4xl text-investa-primary">Renvue</div>
          <div className="flex items-center gap-4">
            {/* Mode Toggle - Elite Design */}
            <div className="relative flex items-center">
              <div
                className="absolute inset-0 bg-gradient-to-r from-investa-primary/20 to-investa-primary/10 rounded-full blur-sm"
                style={{
                  width: mode === "investor" ? "50%" : "100%",
                  left: mode === "investor" ? "0" : "50%",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: "0.8",
                  transform: `scale(${mode === "investor" ? "1.05" : "1.05"})`,
                }}
              ></div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-0.5 flex items-center shadow-lg border border-gray-100 relative overflow-hidden z-10">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-investa-primary to-investa-primary/90 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    width: "50%",
                    transform: `translateX(${mode === "investor" ? "0%" : "100%"})`,
                    boxShadow: "0 0 15px rgba(241, 53, 5, 0.3)",
                  }}
                ></div>
                <button
                  onClick={() => setMode("investor")}
                  className={`relative z-10 flex items-center min-w-[90px] justify-center py-2 px-4 md:px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                    mode === "investor" ? "text-white" : "text-investa-gray hover:text-investa-dark"
                  }`}
                  aria-pressed={mode === "investor"}
                  aria-label="Switch to investor mode"
                >
                  <svg
                    className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-1.5 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Investor</span>
                </button>
                <button
                  onClick={() => setMode("startup")}
                  className={`relative z-10 flex items-center min-w-[90px] justify-center py-2 px-4 md:px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                    mode === "startup" ? "text-white" : "text-investa-gray hover:text-investa-dark"
                  }`}
                  aria-pressed={mode === "startup"}
                  aria-label="Switch to startup mode"
                >
                  <svg
                    className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-1.5 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 16L10 11L13 14L19 8M19 8H14M19 8V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Startup</span>
                </button>
              </div>
            </div>
              <button className="h-10 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign In
              </button>
          </div>
        </nav>

        {/* Centered Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-investa-dark leading-tight mb-6">
            {mode === "investor"
              ? "Discover promising startups for your portfolio"
              : "Connect with investors ready to fund your vision"}
          </h1>
          <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto mb-10">
            {mode === "investor"
              ? "Renvue helps you find, evaluate, and connect with high-potential early-stage startups that match your investment criteria."
              : "Showcase your startup to a curated network of investors looking for the next big opportunity in your industry."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={mode === "investor" ? "/find-startups" : "/find-investors"}>
              <button className="py-3 px-8 bg-investa-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link href="/learn">
              <button className="py-3 px-8 border-2 border-investa-gray text-investa-gray rounded-full text-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Globe or Startup Section */}
        <div className="relative mx-auto">
          {mode === "investor" ? (
            <GlobeComponent />
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-investa-gray">Startup Profile</div>
                  <div className="w-12"></div>
                </div>
                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-1 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-investa-dark mb-1">Profile Completion</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-investa-primary h-2.5 rounded-full w-[85%]"></div>
                      </div>
                      <div className="mt-2 text-xs text-right text-investa-gray">85%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-investa-dark mb-1">Investor Interest</h3>
                      <div className="mt-3 space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 bg-gradient-to-br from-investa-primary/10 to-investa-primary/5 rounded-lg p-6">
                    <h3 className="font-semibold text-investa-dark mb-1">Investor Matches</h3>
                    <p className="text-sm text-investa-gray">Investors interested in your sector</p>
                    <div className="mt-4 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-3 rounded-md shadow-sm flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                          <div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                            <div className="h-2 w-24 bg-gray-100 rounded mt-2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </main>
  )
}


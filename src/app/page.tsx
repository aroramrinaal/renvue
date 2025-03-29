"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mode, setMode] = useState<"investor" | "startup">("investor");

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, #53505008 1px, transparent 1px), 
                          linear-gradient(to bottom, #53505008 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)'
      }} />
      
      <div className="relative z-10 px-6 py-8">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <div className="font-bold text-3xl text-investa-primary">
            Investa
          </div>
          <div className="flex items-center gap-4">
            {/* Mode Toggle - Refined Design */}
            <div className="bg-gray-100 rounded-full p-1 flex items-center shadow-sm">
              <button
                onClick={() => setMode("investor")}
                className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-300 ${
                  mode === "investor"
                    ? "bg-investa-primary text-white shadow-md transform scale-105"
                    : "text-investa-gray hover:bg-gray-200"
                }`}
              >
                Investor
              </button>
              <button
                onClick={() => setMode("startup")}
                className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-300 ${
                  mode === "startup"
                    ? "bg-investa-primary text-white shadow-md transform scale-105"
                    : "text-investa-gray hover:bg-gray-200"
                }`}
              >
                Startup
              </button>
            </div>
            <Link href="/get-started">
              <button className="py-2 px-6 bg-investa-primary text-white rounded-full hover:bg-opacity-90 transition-all shadow-sm">
                Sign In
              </button>
            </Link>
          </div>
        </nav>

        {/* Centered Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-investa-dark leading-tight mb-6">
            {mode === "investor" 
              ? "Discover promising startups for your portfolio" 
              : "Connect with investors ready to fund your vision"}
          </h1>
          <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto mb-10">
            {mode === "investor"
              ? "Investa helps you find, evaluate, and connect with high-potential early-stage startups that match your investment criteria."
              : "Showcase your startup to a curated network of investors looking for the next big opportunity in your industry."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started">
              <button className="py-3 px-8 bg-investa-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <button className="py-3 px-8 border-2 border-investa-gray text-investa-gray rounded-full text-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
          <div className="flex justify-center items-center space-x-4 text-investa-gray pt-6">
            <span className="flex items-center"><span className="text-investa-primary mr-1">✓</span> AI-powered matching</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center"><span className="text-investa-primary mr-1">✓</span> Smart recommendations</span>
          </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="max-w-6xl mx-auto">
          {mode === "investor" ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-investa-gray">Investor Dashboard</div>
                <div className="w-12"></div>
              </div>
              <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-gradient-to-br from-investa-primary/10 to-investa-primary/5 rounded-lg p-6">
                  <h3 className="font-semibold text-investa-dark mb-1">Recommended Startups</h3>
                  <p className="text-sm text-investa-gray">Based on your investment preferences</p>
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
                <div className="col-span-1 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-investa-dark mb-1">Analytics</h3>
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-investa-dark mb-1">Recent Activity</h3>
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </main>
  );
}

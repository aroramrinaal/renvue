"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mode, setMode] = useState<"investor" | "startup">("investor");

  return (
    <main className="min-h-screen bg-white p-6 relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-12">
        <div className="font-bold text-2xl text-investa-primary">
          Investa
        </div>
        <div className="flex items-center gap-4">
          {/* Mode Toggle */}
          <div className="bg-gray-100 rounded-full p-1 flex items-center">
            <button
              onClick={() => setMode("investor")}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                mode === "investor"
                  ? "bg-investa-primary text-white shadow-md"
                  : "text-investa-gray"
              }`}
            >
              Investor
            </button>
            <button
              onClick={() => setMode("startup")}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                mode === "startup"
                  ? "bg-investa-primary text-white shadow-md"
                  : "text-investa-gray"
              }`}
            >
              Startup
            </button>
          </div>
          <Link href="/get-started">
            <button className="py-2 px-6 bg-investa-primary text-white rounded-full hover:bg-opacity-90 transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Conditionally rendered based on mode */}
      <div className="flex flex-col md:flex-row gap-10 items-center max-w-6xl mx-auto">
        {/* Left Side - Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-investa-dark">
            {mode === "investor" 
              ? "Discover promising startups for your portfolio" 
              : "Connect with investors ready to fund your vision"}
          </h1>
          <p className="text-investa-gray text-lg">
            {mode === "investor"
              ? "Investa helps you find, evaluate, and connect with high-potential early-stage startups that match your investment criteria."
              : "Showcase your startup to a curated network of investors looking for the next big opportunity in your industry."}
          </p>
          <div className="pt-4">
            <Link href="/get-started">
              <button className="py-3 px-8 bg-investa-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </Link>
            <button className="py-3 px-8 ml-4 border border-investa-gray text-investa-gray rounded-full text-lg font-medium hover:bg-gray-50 transition-all">
              Learn More
            </button>
          </div>
          <div className="flex items-center space-x-2 text-investa-gray pt-2">
            <span>✓ No credit card required</span>
            <span>•</span>
            <span>✓ AI-powered matching</span>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          {mode === "investor" ? (
            <div className="relative h-[400px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-investa-primary/10 to-investa-primary/5 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-investa-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-investa-primary text-3xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-investa-dark">Investor Dashboard</h3>
                  <p className="text-investa-gray mt-2">Access your curated startup recommendations</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-[400px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-investa-primary/10 to-investa-primary/5 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-investa-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-investa-primary text-3xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-investa-dark">Startup Profile</h3>
                  <p className="text-investa-gray mt-2">Showcase your vision to potential investors</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

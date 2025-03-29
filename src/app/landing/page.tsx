"use client";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="h-screen bg-[#010208] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010208] via-[#030412] to-[#05081c] opacity-90" />
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-40 animate-twinkle" />

      {/* Animated blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Logo */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
        <img src="/logo.png" alt="ExistYet" className="w-24 md:w-28" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col min-h-screen">
        {/* Text content at the top */}
        <div className="text-center pt-32 px-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-1">
              Have an idea? Find out if it already exists.
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Find out how unique your idea is and identify gaps in existing
            products to refine your proposition.
          </p>
            
          {/* CTA Button */}
          <Link href="/get-started">
            <button 
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold 
            hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 
            shadow-lg hover:shadow-xl"
          >
            Get Started for Free
          </button>
          </Link>
        </div>

        {/* Image at the bottom */}
        <div className="mt-auto">
          <img
            src="/image.png"
            alt="Map Image"
            className="w-full object-cover max-h-[100vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;

"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface CompanyLogo {
  id: number
  name: string
  position: { x: number; y: number }
  size: number
  image: string
}

export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)
  const dotsContainerRef = useRef<HTMLDivElement>(null); // Ref for the dots' container

  // Company logos with positions - all positioned in top half of globe
  const companyLogos: CompanyLogo[] = [
    { id: 1, name: "Reddit", position: { x: 28, y: 20 }, size: 55, image: "/companies/reddit.png" },
    { id: 2, name: "Y Combinator", position: { x: 72, y: 15 }, size: 60, image: "/companies/yc.png" },
    { id: 3, name: "Google", position: { x: 50, y: 25 }, size: 65, image: "/companies/google.png" },
    { id: 4, name: "GitHub", position: { x: 65, y: 30 }, size: 55, image: "/companies/github.png" },
    { id: 5, name: "Crunchbase", position: { x: 35, y: 30 }, size: 55, image: "/companies/cb.jpeg" },
    { id: 6, name: "Product Hunt", position: { x: 50, y: 10 }, size: 55, image: "/companies/ph.png" },
    { id: 7, name: "Acquire", position: { x: 40, y: 40 }, size: 55, image: "/companies/acquire.jpg" },
  ]

  useEffect(() => {
    // Apply random animation delay to dots only on the client-side after mount
    if (dotsContainerRef.current) {
      const dots = dotsContainerRef.current.querySelectorAll('.glowing-dot');
      dots.forEach(dot => {
        (dot as HTMLElement).style.animationDelay = `${Math.random() * 2}s`;
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="relative w-full h-[450px] overflow-visible">
      {/* Globe Base */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
        {/* Main Globe - Static */}
        <div
          ref={globeRef}
          className="w-[1000px] h-[1000px] rounded-full relative"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(241, 53, 5, 0.03))",
            boxShadow: "inset 0 0 60px rgba(241, 53, 5, 0.15), 0 0 40px rgba(241, 53, 5, 0.1)",
            border: "1px solid rgba(241, 53, 5, 0.08)",
          }}
        >
          {/* Grid Lines */}
          <div
            className="absolute inset-0 rounded-full opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(241, 53, 5, 0.2) 1px, transparent 1px), 
                                linear-gradient(to bottom, rgba(241, 53, 5, 0.2) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: "rotate(15deg)",
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(241, 53, 5, 0.2) 1px, transparent 1px), 
                                linear-gradient(to bottom, rgba(241, 53, 5, 0.2) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: "rotate(-15deg)",
            }}
          ></div>

          {/* Company Logos */}
          {companyLogos.map((logo) => (
            <div
              key={logo.id}
              className="absolute flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-125 transition-all duration-300 group -mt-8 -ml-4"
              style={{
                left: `${logo.position.x}%`,
                top: `${logo.position.y}%`,
                width: `${logo.size}px`,
                height: `${logo.size}px`,
                zIndex: 10,
                border: "2px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)"
              }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-2">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={logo.size * 1.5}
                  height={logo.size * 1.5}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs rounded-md px-2 py-1 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {logo.name}
              </div>
            </div>
          ))}

          {/* Glowing Dots - Focused more in the top half */}
          <div ref={dotsContainerRef}>
            {[
              { left: "21%", top: "21%", width: "4.5px", height: "3.2px", opacity: 0.5 },
              { left: "81%", top: "27%", width: "3.2px", height: "6px", opacity: 0.6 },
              { left: "51%", top: "20%", width: "2.8px", height: "2.5px", opacity: 0.5 },
              { left: "80%", top: "23%", width: "5.3px", height: "3.8px", opacity: 0.5 },
              { left: "32%", top: "29%", width: "5.2px", height: "4.9px", opacity: 0.55 },
              { left: "12%", top: "25%", width: "3.8px", height: "3.5px", opacity: 0.45 },
              { left: "45%", top: "12%", width: "4.2px", height: "4.5px", opacity: 0.6 },
              { left: "67%", top: "30%", width: "3.9px", height: "3.6px", opacity: 0.5 },
              { left: "37%", top: "17%", width: "4.6px", height: "4.1px", opacity: 0.55 },
              { left: "75%", top: "17%", width: "4.1px", height: "3.7px", opacity: 0.5 },
              { left: "25%", top: "27%", width: "3.5px", height: "3.9px", opacity: 0.45 },
              { left: "58%", top: "22%", width: "4.3px", height: "4.8px", opacity: 0.55 },
              { left: "19%", top: "14%", width: "3.4px", height: "3.3px", opacity: 0.45 },
              { left: "84%", top: "12%", width: "4.7px", height: "4.3px", opacity: 0.5 },
              { left: "42%", top: "32%", width: "3.6px", height: "3.8px", opacity: 0.45 },
              { left: "62%", top: "22%", width: "4.4px", height: "4.2px", opacity: 0.55 },
              { left: "29%", top: "14%", width: "4.0px", height: "4.0px", opacity: 0.45 },
              { left: "70%", top: "19%", width: "3.7px", height: "4.6px", opacity: 0.55 },
              { left: "15%", top: "21%", width: "4.5px", height: "4.4px", opacity: 0.5 },
              { left: "90%", top: "26%", width: "3.3px", height: "3.1px", opacity: 0.45 }
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-investa-primary animate-twinkle glowing-dot" // Added 'glowing-dot' class
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.width,
                  height: dot.height,
                  opacity: dot.opacity, // Initial opacity
                  boxShadow: "0 0 8px rgba(241, 53, 5, 0.8)",
                  // animationDelay is now set in useEffect
                }}
              ></div>
            ))}
          </div>
          {/* End of Dots container */}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
            {companyLogos.map((logo, i) => {
              // Connect each logo to all other logos
              return companyLogos.filter((_,j) => j !== i).map((otherLogo, k) => { // Changed j to k to avoid conflict with outer scope
                const startX = logo.position.x;
                const startY = logo.position.y;
                const endX = otherLogo.position.x;
                const endY = otherLogo.position.y;
                
                return (
                  <line
                    key={`line-${i}-${k}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="rgba(241, 53, 5, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-dash"
                  />
                );
              });
            })}
          </svg>
        </div>
      </div>

      {/* Overlay gradient to create the "emerging from center" effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, white 85%)",
        }}
      ></div>
    </div>
  )
}

// It's good practice to define keyframes in a global CSS file or a style tag if not using Tailwind's JIT for arbitrary values easily.
// For this example, assuming Tailwind is set up for JIT or these are added to global CSS:
// In your global.css or a <style jsx global>{` ... `}</style> tag if preferred:
/*
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
.animate-twinkle {
  animation: twinkle 2s infinite ease-in-out;
}

@keyframes dash {
  to {
    stroke-dashoffset: -20; // Adjust this value to control speed and pattern repetition
  }
}
.animate-dash {
  animation: dash 1s linear infinite;
}
*/

// If you are using Tailwind CSS and have configured custom animations in tailwind.config.js, you can use them directly.
// For instance, if you added 'twinkle' and 'dash' to theme.extend.animation and theme.extend.keyframes in tailwind.config.js

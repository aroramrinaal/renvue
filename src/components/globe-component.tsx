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

  // Company logos with positions
  const companyLogos: CompanyLogo[] = [
    { id: 1, name: "Reddit", position: { x: 22, y: 25 }, size: 65, image: "/companies/reddit.png" },
    { id: 2, name: "Y Combinator", position: { x: 70, y: 18 }, size: 70, image: "/companies/yc.png" },
    { id: 3, name: "Google", position: { x: 45, y: 35 }, size: 75, image: "/companies/google.png" },
    { id: 4, name: "GitHub", position: { x: 78, y: 45 }, size: 60, image: "/companies/github.png" },
    { id: 5, name: "Crunchbase", position: { x: 30, y: 58 }, size: 68, image: "/companies/cb.jpeg" },
    { id: 6, name: "Product Hunt", position: { x: 60, y: 65 }, size: 64, image: "/companies/ph.png" },
  ]

  useEffect(() => {
    // Animation for the globe rotation
    const globe = globeRef.current
    if (!globe) return

    // Start with no rotation on initial render for hydration consistency
    globe.style.transform = 'rotateZ(0deg)'
    
    let rotation = 0
    let animationId: number
    
    // Delay starting the animation to avoid hydration issues
    const timerId = setTimeout(() => {
      const animate = () => {
        rotation += 0.02
        if (globe) {
          globe.style.transform = `rotateZ(${rotation}deg)`
        }
        animationId = requestAnimationFrame(animate)
      }
      
      animate()
    }, 100)

    return () => {
      clearTimeout(timerId)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-[600px] overflow-hidden mt-12">
      {/* Globe Base */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/3">
        {/* Main Globe */}
        <div
          ref={globeRef}
          className="w-[900px] h-[900px] rounded-full relative"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(241, 53, 5, 0.05))",
            boxShadow: "inset 0 0 60px rgba(241, 53, 5, 0.2), 0 0 40px rgba(241, 53, 5, 0.15)",
            border: "1px solid rgba(241, 53, 5, 0.1)",
          }}
        >
          {/* Grid Lines */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(241, 53, 5, 0.3) 1px, transparent 1px), 
                                linear-gradient(to bottom, rgba(241, 53, 5, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: "rotate(15deg)",
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(241, 53, 5, 0.3) 1px, transparent 1px), 
                                linear-gradient(to bottom, rgba(241, 53, 5, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: "rotate(-15deg)",
            }}
          ></div>

          {/* Company Logos */}
          {companyLogos.map((logo) => (
            <div
              key={logo.id}
              className="absolute flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
              style={{
                left: `${logo.position.x}%`,
                top: `${logo.position.y}%`,
                width: `${logo.size}px`,
                height: `${logo.size}px`,
                zIndex: 10,
                border: "2px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-2.5">
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

          {/* Glowing Dots */}
          {[
            { left: "21%", top: "26%", width: "4.5px", height: "3.2px", opacity: 0.43 },
            { left: "81%", top: "65%", width: "3.2px", height: "6px", opacity: 0.53 },
            { left: "51%", top: "65%", width: "2.8px", height: "2.5px", opacity: 0.49 },
            { left: "80%", top: "59%", width: "5.3px", height: "3.8px", opacity: 0.46 },
            { left: "32%", top: "77%", width: "5.2px", height: "4.9px", opacity: 0.5 },
            { left: "12%", top: "42%", width: "3.8px", height: "3.5px", opacity: 0.4 },
            { left: "45%", top: "15%", width: "4.2px", height: "4.5px", opacity: 0.55 },
            { left: "67%", top: "38%", width: "3.9px", height: "3.6px", opacity: 0.48 },
            { left: "37%", top: "52%", width: "4.6px", height: "4.1px", opacity: 0.52 },
            { left: "75%", top: "22%", width: "4.1px", height: "3.7px", opacity: 0.47 },
            { left: "25%", top: "35%", width: "3.5px", height: "3.9px", opacity: 0.42 },
            { left: "58%", top: "48%", width: "4.3px", height: "4.8px", opacity: 0.51 },
            { left: "19%", top: "68%", width: "3.4px", height: "3.3px", opacity: 0.44 },
            { left: "84%", top: "75%", width: "4.7px", height: "4.3px", opacity: 0.49 },
            { left: "42%", top: "82%", width: "3.6px", height: "3.8px", opacity: 0.45 },
            { left: "62%", top: "28%", width: "4.4px", height: "4.2px", opacity: 0.53 },
            { left: "29%", top: "17%", width: "4.0px", height: "4.0px", opacity: 0.41 },
            { left: "70%", top: "55%", width: "3.7px", height: "4.6px", opacity: 0.5 },
            { left: "15%", top: "47%", width: "4.5px", height: "4.4px", opacity: 0.46 },
            { left: "90%", top: "33%", width: "3.3px", height: "3.1px", opacity: 0.43 }
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-investa-primary"
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.width,
                height: dot.height,
                opacity: dot.opacity,
                boxShadow: "0 0 8px rgba(241, 53, 5, 0.8)"
              }}
            ></div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
            {companyLogos.map((logo, i) => {
              const nextLogo = companyLogos[(i + 1) % companyLogos.length]
              const startX = logo.position.x
              const startY = logo.position.y
              const endX = nextLogo.position.x
              const endY = nextLogo.position.y
              
              return (
                <line
                  key={`line-${i}`}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="rgba(241, 53, 5, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              )
            })}
          </svg>
        </div>
      </div>

      {/* Overlay gradient to create the "emerging from bottom" effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(to top, white 10%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
        }}
      ></div>
    </div>
  )
}


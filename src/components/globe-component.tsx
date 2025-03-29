"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface CompanyLogo {
  id: number
  name: string
  position: { x: number; y: number }
  size: number
}

export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)

  // Sample company logos with positions
  const companyLogos: CompanyLogo[] = [
    { id: 1, name: "Company A", position: { x: 15, y: 20 }, size: 40 },
    { id: 2, name: "Company B", position: { x: 65, y: 15 }, size: 50 },
    { id: 3, name: "Company C", position: { x: 40, y: 30 }, size: 45 },
    { id: 4, name: "Company D", position: { x: 75, y: 40 }, size: 35 },
    { id: 5, name: "Company E", position: { x: 25, y: 50 }, size: 42 },
    { id: 6, name: "Company F", position: { x: 55, y: 60 }, size: 38 },
  ]

  useEffect(() => {
    // Animation for the globe rotation
    const globe = globeRef.current
    if (!globe) return

    let rotation = 0
    const animate = () => {
      rotation += 0.05
      if (globe) {
        globe.style.transform = `rotateZ(${rotation}deg)`
      }
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative w-full h-[500px] overflow-hidden mt-16">
      {/* Globe Base */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
        {/* Main Globe */}
        <div
          ref={globeRef}
          className="w-[800px] h-[800px] rounded-full relative"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(241, 53, 5, 0.05))",
            boxShadow: "inset 0 0 50px rgba(241, 53, 5, 0.2), 0 0 30px rgba(241, 53, 5, 0.1)",
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
              className="absolute flex items-center justify-center bg-white rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
              style={{
                left: `${logo.position.x}%`,
                top: `${logo.position.y}%`,
                width: `${logo.size}px`,
                height: `${logo.size}px`,
                zIndex: 10,
              }}
            >
              <div className="w-3/4 h-3/4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=${logo.size}&width=${logo.size}`}
                  alt={logo.name}
                  width={logo.size}
                  height={logo.size}
                  className="object-cover"
                />
              </div>
            </div>
          ))}

          {/* Glowing Dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-investa-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                opacity: Math.random() * 0.5 + 0.2,
                boxShadow: "0 0 8px rgba(241, 53, 5, 0.8)",
              }}
            ></div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
            {companyLogos.map((logo, i) => {
              const nextLogo = companyLogos[(i + 1) % companyLogos.length]
              return (
                <line
                  key={`line-${i}`}
                  x1={`${logo.position.x}%`}
                  y1={`${logo.position.y}%`}
                  x2={`${nextLogo.position.x}%`}
                  y2={`${nextLogo.position.y}%`}
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


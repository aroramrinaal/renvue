"use client";

import Input from "@/components/Input";
import Link from "next/link";
import React, { useState, useRef } from "react";

interface GitHubResult {
  name: string;
  url: string;
  description: string;
  stars: number;
  language: string;
}

interface ChatResponse {
  content: string;
  citations?: string[];
  sheetUpdated?: boolean;
  error?: string;
  githubResults?: GitHubResult[];
}

interface Startup {
  name: string;
  description: string;
  features: string[];
  funding_stage: string;
  url: string;
}

interface InputProps {
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
  error?: boolean;
  placeholder?: string;
}

const Chatbot: React.FC = () => {
  const [productIdea, setProductIdea] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStartups, setExpandedStartups] = useState<Set<number>>(
    new Set()
  );
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "AI-powered healthcare solutions",
    "Sustainable energy technology",
    "Remote work collaboration tools",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setInputError(null);

    // Check for empty input
    if (!productIdea.trim()) {
      setInputError("Please enter your product idea");
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);

    // Improved progress simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) {
          return 85; // Cap at 85% until actual completion
        }
        return prev + (90 - prev) * 0.1; // Smoother progression
      });
    }, 100);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify({ productIdea }),
        cache: "no-store",
      });

      // Clear previous response before setting new one
      setResponse(null);

      const data = await res.json();
      console.log("Raw API Response:", data);
      console.log("Raw content:", data.content);
      console.log("Sheet updated:", data.sheetUpdated);

      if (data.error) {
        console.error("Error from API:", data.error);
        throw new Error(data.error);
      }

      const formattedContent = formatAnalysisContent(data.content);
      setResponse({
        ...data,
        content: formattedContent,
      });

      setLoadingProgress(100);

      // Scroll to results after a brief delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error analyzing product idea:", error);
      setResponse({
        content: `
          <div class="space-y-6">
            <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div class="flex items-center gap-3 text-red-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="font-semibold">Uh-oh! We hit a snag</h3>
              </div>
              <p class="mt-3 text-gray-300">We're having some trouble analyzing your idea right now. Our team has been notified and we're working on it. Please try again in a few moments.</p>
              <div class="mt-4 flex gap-4">
                <button 
                  onclick="window.location.reload()"
                  class="text-sm px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  Try Again
                </button>
                <a 
                  href="/"
                  class="text-sm px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        `,
        sheetUpdated: false,
      });
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const formatAnalysisContent = (content: string) => {
    try {
      console.log("Original content:", content);
      let cleanJson = content;

      if (content.includes("```")) {
        cleanJson = content.replace(/^```(?:json)?\n|\n```$/g, "").trim();
      }

      console.log("Cleaned JSON:", cleanJson);

      let analysisData;
      try {
        analysisData = JSON.parse(cleanJson);
        analysisData = analysisData.result ? analysisData.result : analysisData;
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Failed JSON string:", cleanJson);
        return `
          <div class="bg-red-500/10 border border-red-500 p-4 rounded-lg">
            <h3 class="text-red-400 font-semibold mb-2">Error Parsing Response</h3>
            <pre class="text-sm text-gray-300 whitespace-pre-wrap">${content}</pre>
          </div>
        `;
      }

      const formattedContent = `
        <div class="space-y-6">
          <!-- Main Content - Single Column -->
          <section class="transform hover:scale-[1.01] transition-transform duration-200">
            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-[1px]">
              <div class="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6">
                <h2 class="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Problem Statement
                </h2>
                <div class="text-gray-200 leading-relaxed">
                  ${analysisData.problem_statement}
                </div>
              </div>
            </div>
          </section>

          <section class="transform hover:scale-[1.01] transition-transform duration-200">
            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-[1px]">
              <div class="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6">
                <h2 class="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Active Startups
                </h2>
                <div class="space-y-4">
                  ${
                    analysisData.market_analysis.startups.length === 0
                      ? `
                      <div class="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
                        <div class="flex items-center gap-3 text-gray-300">
                          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>No active startups found in this space.</span>
                        </div>
                      </div>
                    `
                      : analysisData.market_analysis.startups
                          .map(
                            (startup: Startup, index: number) => `
                          <div class="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden" data-startup-index="${index}">
                            <button class="w-full p-4 text-left flex items-center justify-between cursor-pointer hover:bg-gray-700/30 transition-colors" 
                                    onclick="document.dispatchEvent(new CustomEvent('toggleStartup', { detail: ${index} }))">
                              <h4 class="font-semibold text-blue-300">${
                                startup.name
                              }</h4>
                              <div class="flex items-center gap-2">
                                <span class="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/20">
                                  ${startup.funding_stage}
                                </span>
                                <svg class="w-5 h-5 transition-transform startup-arrow text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>
                            <div class="startup-content hidden p-6 border-t border-gray-700/50 bg-gray-800/30">
                              <div class="space-y-4">
                                <div>
                                  <p class="text-sm text-blue-300 mb-2 font-semibold">Description:</p>
                                  <p class="text-gray-300">${
                                    startup.description
                                  }</p>
                                </div>
                                <div>
                                  <p class="text-sm text-blue-300 mb-2 font-semibold">Key Features:</p>
                                  <ul class="grid grid-cols-1 gap-2">
                                    ${startup.features
                                      .map(
                                        (feature) => `
                                      <li class="flex items-center gap-2 text-gray-300">
                                        <svg class="w-4 h-4 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                                        </svg>
                                        <span class="text-sm md:text-base">${feature}</span>
                                      </li>
                                    `
                                      )
                                      .join("")}
                                  </ul>
                                </div>
                                ${
                                  startup.url
                                    ? `
                                  <div class="border-t border-gray-700/50 pt-4">
                                    <p class="text-sm text-blue-300 font-semibold mb-2">Website:</p>
                                    <a href="${startup.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2">
                                      <span>${startup.url}</span>
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                `
                                    : ""
                                }
                              </div>
                            </div>
                          </div>
                        `
                          )
                          .join("")
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      `;

      return formattedContent;
    } catch (error) {
      console.error("Error formatting content:", error);
      return `<div class="prose prose-invert">${content}</div>`;
    }
  };

  // Add event listener for startup toggles
  React.useEffect(() => {
    const handleToggle = (event: CustomEvent<number>) => {
      toggleStartup(event.detail);
    };

    document.addEventListener(
      "toggleStartup",
      handleToggle as EventListener
    );
    return () => {
      document.removeEventListener(
        "toggleStartup",
        handleToggle as EventListener
      );
    };
  }, []);

  // Update startup visibility when expandedStartups changes
  React.useEffect(() => {
    if (!response) return;

    document.querySelectorAll("[data-startup-index]").forEach((el) => {
      const index = parseInt(el.getAttribute("data-startup-index") || "0");
      const content = el.querySelector(".startup-content");
      const arrow = el.querySelector(".startup-arrow");

      if (expandedStartups.has(index)) {
        content?.classList.remove("hidden");
        arrow?.classList.add("rotate-180");
      } else {
        content?.classList.add("hidden");
        arrow?.classList.remove("rotate-180");
      }
    });
  }, [expandedStartups, response]);

  const toggleStartup = (index: number) => {
    setExpandedStartups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Add this function to handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setProductIdea(suggestion);
  };

  // Add cleanup when component unmounts
  React.useEffect(() => {
    return () => {
      setResponse(null);
      setProductIdea("");
      setIsLoading(false);
      setLoadingProgress(0);
      setInputError(null);
      setExpandedStartups(new Set());
    };
  }, []);

  // Add cleanup when productIdea changes
  React.useEffect(() => {
    setResponse(null);
  }, [productIdea]);

  return (
    <div className="min-h-screen bg-[#010208] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#010208] via-[#030412] to-[#05081c] opacity-90" />
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-40 animate-twinkle" />

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
        {/* <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          ExistYet
        </span> */}
        <Link href="/">
          <img src="/logo.png" alt="ExistYet" className="w-24 md:w-28" />
        </Link>
      </div>

      <div className="max-w-6xl mt-20 md:mt-12 mx-auto px-4 mb-10 md:px-6 relative">
        <div className="text-center mb-8 md:mb-12 pt-6 sm:pt-12 px-4">
          <div className="mb-4">
            <img
              src="/image.png"
              alt="Investment Research"
              className="w-[480px] md:w-[480px] mx-auto object-contain animate-float"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-1">
              Find Investment Opportunities
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover promising startups and market opportunities in your area of interest.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 px-2 sm:px-4 md:px-0 max-w-3xl mx-auto -mt-2"
        >
          <div className="relative">
            <Input
              onChange={(e) => {
                setProductIdea(e.target.value);
                setInputError(null); // Clear error when user types
              }}
              value={productIdea}
            />
            {inputError && (
              <div className="absolute -bottom-6 left-0 w-full text-center">
                <span className="text-red-400 text-sm">{inputError}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm bg-gray-800/50 
                  border border-gray-700/50 text-blue-200 hover:text-blue-100
                  hover:bg-gray-700/50 hover:border-blue-500/30
                  transition-all backdrop-blur-sm
                  transform hover:scale-105 active:scale-95 duration-200
                  shadow-lg shadow-blue-500/5"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                px-10 md:px-14 py-3.5 md:py-4 rounded-full text-lg md:text-xl font-medium
                hover:from-blue-600 hover:to-purple-600 disabled:opacity-90 disabled:cursor-not-allowed
                transform transition-all duration-200 hover:scale-105 active:scale-95
                shadow-[0_0_20px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.6)]
                overflow-hidden"
            >
              {isLoading ? (
                <>
                  <div className="relative z-10">Researching...</div>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{
                      width: `${loadingProgress}%`,
                      transition: "width 0.5s ease-out",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(169, 199, 255, 0.8), transparent)",
                      transform: "translateX(-50%)",
                      animation: "shimmer 1.5s infinite",
                      width: "50%",
                      zIndex: 1,
                    }}
                  />
                </>
              ) : (
                "Research Opportunities"
              )}
            </button>
          </div>
        </form>

        {response && (
          <div
            ref={resultsRef}
            className="mt-12 sm:mt-16 animate-fadeIn px-2 sm:px-4 md:px-0"
          >
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl">
                <div className="p-6 sm:p-8 md:p-10">
                  <div
                    className="text-white prose prose-invert max-w-none prose-lg"
                    dangerouslySetInnerHTML={{ __html: response.content }}
                  />
                  {response.citations && (
                    <div className="mt-10 border-t border-gray-700/50 pt-8">
                      <h3 className="text-2xl font-semibold text-blue-400 mb-6">
                        Citations
                      </h3>
                      <ul className="space-y-3">
                        {response.citations.map((citation, index) => (
                          <li key={index} className="flex gap-4 text-gray-300">
                            <span className="text-blue-400 text-xl">•</span>
                            {citation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;

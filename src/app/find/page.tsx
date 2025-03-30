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
    "Platform to manage all your subscriptions",
    "AI-powered productivity tools",
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
            <div class="bg-investa-primary/10 border border-investa-primary/20 rounded-xl p-6 backdrop-blur-sm">
              <div class="flex items-center gap-3 text-investa-primary">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="font-semibold">Uh-oh! We hit a snag</h3>
              </div>
              <p class="mt-3 text-investa-gray">We're having some trouble analyzing your idea right now. Our team has been notified and we're working on it. Please try again in a few moments.</p>
              <div class="mt-4 flex gap-4">
                <button 
                  onclick="window.location.reload()"
                  class="text-sm px-4 py-2 rounded-lg bg-investa-primary/20 text-investa-primary hover:bg-investa-primary/30 transition-colors"
                >
                  Try Again
                </button>
                <a 
                  href="/"
                  class="text-sm px-4 py-2 rounded-lg bg-investa-gray/20 text-investa-gray hover:bg-investa-gray/30 transition-colors"
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
          <div class="bg-investa-primary/10 border border-investa-primary/20 p-4 rounded-lg">
            <h3 class="text-investa-primary font-semibold mb-2">Error Parsing Response</h3>
            <pre class="text-sm text-investa-gray whitespace-pre-wrap">${content}</pre>
          </div>
        `;
      }

      const formattedContent = `
        <div class="space-y-6">
          <!-- Main Content - Single Column -->
          <section class="transform hover:scale-[1.01] transition-transform duration-200">
            <div class="bg-gradient-to-r from-investa-primary/10 to-investa-primary/5 rounded-2xl p-[1px]">
              <div class="bg-white shadow-lg backdrop-blur-xl rounded-2xl p-6">
                <h2 class="text-2xl font-bold mb-4 text-investa-primary">
                  Problem Statement
                </h2>
                <div class="text-investa-gray leading-relaxed">
                  ${analysisData.problem_statement}
                </div>
              </div>
            </div>
          </section>

          <section class="transform hover:scale-[1.01] transition-transform duration-200">
            <div class="bg-gradient-to-r from-investa-primary/10 to-investa-primary/5 rounded-2xl p-[1px]">
              <div class="bg-white shadow-lg backdrop-blur-xl rounded-2xl p-6">
                <h2 class="text-2xl font-bold mb-4 text-investa-primary">
                  Active Startups
                </h2>
                <div class="space-y-4">
                  ${
                    analysisData.market_analysis.startups.length === 0
                      ? `
                      <div class="bg-gray-50 rounded-xl border border-gray-100 p-6">
                        <div class="flex items-center gap-3 text-investa-gray">
                          <svg class="w-5 h-5 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>No active startups found in this space.</span>
                        </div>
                      </div>
                    `
                      : analysisData.market_analysis.startups
                          .map(
                            (startup: Startup, index: number) => `
                          <div class="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden" data-startup-index="${index}">
                            <button class="w-full p-4 text-left flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors" 
                                    onclick="document.dispatchEvent(new CustomEvent('toggleStartup', { detail: ${index} }))">
                              <h4 class="font-semibold text-investa-dark">${
                                startup.name
                              }</h4>
                              <div class="flex items-center gap-2">
                                <span class="text-xs px-3 py-1 bg-investa-primary/10 text-investa-primary rounded-full border border-investa-primary/10">
                                  ${startup.funding_stage}
                                </span>
                                <svg class="w-5 h-5 transition-transform startup-arrow text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>
                            <div class="startup-content hidden p-6 border-t border-gray-100 bg-white">
                              <div class="space-y-4">
                                <div>
                                  <p class="text-sm text-investa-primary mb-2 font-semibold">Description:</p>
                                  <p class="text-investa-gray">${
                                    startup.description
                                  }</p>
                                </div>
                                <div>
                                  <p class="text-sm text-investa-primary mb-2 font-semibold">Key Features:</p>
                                  <ul class="grid grid-cols-1 gap-2">
                                    ${startup.features
                                      .map(
                                        (feature) => `
                                      <li class="flex items-center gap-2 text-investa-gray">
                                        <svg class="w-4 h-4 flex-shrink-0 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                  <div class="border-t border-gray-100 pt-4">
                                    <p class="text-sm text-investa-primary font-semibold mb-2">Website:</p>
                                    <a href="${startup.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="text-investa-primary hover:text-investa-primary/80 transition-colors inline-flex items-center gap-2">
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
    <div className="min-h-screen bg-white relative overflow-hidden">
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

      <div className="relative z-10 px-4 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <Link href="/">
              <div className="font-bold text-3xl text-investa-primary">Renvue</div>
            </Link>
            <Link href="/">
              <button className="h-10 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-investa-dark leading-tight mb-6">
              Find Investment Opportunities
            </h1>
            <p className="text-investa-gray text-lg max-w-3xl mx-auto">
              Discover promising startups and market opportunities that match your investment criteria.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={productIdea}
                  onChange={(e) => {
                    setProductIdea(e.target.value);
                    setInputError(null);
                  }}
                  placeholder="Describe the startup or investment sector you're interested in..."
                  className="w-full h-14 px-5 bg-white rounded-full border-2 border-investa-primary/30 focus:border-investa-primary text-investa-dark text-lg focus:outline-none shadow-lg focus:shadow-investa-primary/20 transition-all"
                />
                {!isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <button
                      type="submit"
                      className="h-10 px-6 bg-investa-primary text-white rounded-full hover:bg-opacity-90 font-medium text-sm flex items-center justify-center shadow-sm"
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>
              {inputError && (
                <div className="absolute -bottom-6 left-0 w-full text-center">
                  <span className="text-investa-primary text-sm">{inputError}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-2.5 rounded-full text-sm bg-white border border-investa-gray/30 text-investa-gray hover:text-investa-primary hover:border-investa-primary/30 transition-all transform hover:scale-105 active:scale-95 duration-200 shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {isLoading && (
              <div className="text-center">
                <div className="relative h-2 w-full max-w-md mx-auto bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-investa-primary rounded-full"
                    style={{
                      width: `${loadingProgress}%`,
                      transition: "width 0.5s ease-out",
                    }}
                  />
                </div>
                <p className="mt-3 text-investa-gray">Researching investment opportunities...</p>
              </div>
            )}
          </form>

          {response && (
            <div
              ref={resultsRef}
              className="animate-fadeIn"
            >
              <div className="relative max-w-4xl mx-auto">
                <div dangerouslySetInnerHTML={{ __html: response.content }} />
                {response.citations && (
                  <div className="mt-10 border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-semibold text-investa-primary mb-6">
                      Sources
                    </h3>
                    <ul className="space-y-3">
                      {response.citations.map((citation, index) => (
                        <li key={index} className="flex gap-4 text-investa-gray">
                          <span className="text-investa-primary text-xl">•</span>
                          {citation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

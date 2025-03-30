"use client";

import Input from "@/components/Input";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

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
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
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
          <div class="bg-investa-primary/10 border border-investa-primary/20 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <h3 class="text-investa-primary font-semibold mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Error Parsing Response
            </h3>
            <pre class="text-sm text-investa-gray whitespace-pre-wrap bg-white/70 p-5 rounded-xl">${content}</pre>
          </div>
        `;
      }

      const formattedContent = `
        <div class="space-y-10">
          <!-- Problem Statement -->
          <section class="transform hover:scale-[1.02] transition-all duration-500">
            <div class="bg-gradient-to-r from-blue-400/30 via-investa-primary/20 to-purple-400/30 rounded-2xl p-[2px] shadow-lg">
              <div class="bg-white/95 shadow-xl backdrop-blur-xl rounded-2xl p-10 border border-investa-primary/10">
                <div class="flex items-start gap-4 mb-6">
                  <div class="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary flex-shrink-0 mt-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-investa-primary mb-3">
                      Problem Statement
                    </h2>
                    <div class="text-investa-gray leading-relaxed pl-3 border-l-3 border-investa-primary/20 text-lg">
                      ${analysisData.problem_statement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Active Startups -->
          <section class="transform hover:scale-[1.02] transition-all duration-500">
            <div class="bg-gradient-to-r from-blue-400/30 via-investa-primary/20 to-purple-400/30 rounded-2xl p-[2px] shadow-lg">
              <div class="bg-white/95 shadow-xl backdrop-blur-xl rounded-2xl p-10 border border-investa-primary/10">
                <div class="flex items-start gap-4 mb-8">
                  <div class="w-12 h-12 rounded-full bg-investa-primary/15 flex items-center justify-center text-investa-primary flex-shrink-0 mt-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-investa-primary">
                    Active Startups
                  </h2>
                </div>
                <div class="space-y-6">
                  ${
                    analysisData.market_analysis.startups.length === 0
                      ? `
                      <div class="bg-gray-50 rounded-xl border border-gray-100 p-6 flex items-center gap-4">
                        <div class="bg-gray-100/80 rounded-full p-3">
                          <svg class="w-6 h-6 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-medium text-investa-dark">No Startups Found</h4>
                          <p class="text-sm text-investa-gray">No active startups found in this space.</p>
                        </div>
                      </div>
                    `
                      : analysisData.market_analysis.startups
                          .map(
                            (startup: Startup, index: number) => `
                          <div class="bg-white rounded-xl border border-investa-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300" data-startup-index="${index}">
                            <button class="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-investa-primary/5 transition-colors" 
                                    onclick="document.dispatchEvent(new CustomEvent('toggleStartup', { detail: ${index} }))">
                              <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-investa-primary/20 to-investa-primary/10 flex items-center justify-center text-investa-primary font-bold text-lg shadow-sm">
                                  ${startup.name.charAt(0)}${startup.name.split(' ')[1]?.charAt(0) || ''}
                                </div>
                                <h4 class="font-semibold text-lg text-investa-dark">${
                                  startup.name
                                }</h4>
                              </div>
                              <div class="flex items-center gap-4">
                                <span class="text-xs px-4 py-2 bg-investa-primary/10 text-investa-primary rounded-full font-medium">
                                  ${startup.funding_stage}
                                </span>
                                <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                                  <svg class="w-5 h-5 transition-transform duration-300 startup-arrow text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                            <div class="startup-content hidden border-t border-investa-primary/10 bg-gradient-to-b from-white to-gray-50/30">
                              <div class="p-8 space-y-6">
                                <div>
                                  <p class="text-sm text-investa-primary mb-3 font-semibold flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Description
                                  </p>
                                  <p class="text-investa-gray bg-white p-5 rounded-lg border border-gray-100 leading-relaxed">${
                                    startup.description
                                  }</p>
                                </div>
                                <div>
                                  <p class="text-sm text-investa-primary mb-3 font-semibold flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Key Features
                                  </p>
                                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    ${startup.features
                                      .map(
                                        (feature) => `
                                      <li class="flex items-center gap-3 text-investa-gray bg-white px-5 py-4 rounded-lg border border-gray-100 hover:border-investa-primary/20 hover:shadow-sm transition-all">
                                        <div class="w-7 h-7 rounded-full bg-investa-primary/10 flex items-center justify-center flex-shrink-0">
                                          <svg class="w-4 h-4 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                        </div>
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
                                  <div class="border-t border-gray-100 pt-5">
                                    <p class="text-sm text-investa-primary font-semibold mb-3 flex items-center gap-2">
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                      </svg>
                                      Website
                                    </p>
                                    <a href="${startup.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="flex items-center gap-2 text-investa-primary hover:text-investa-primary/80 transition-colors p-4 bg-white rounded-lg border border-gray-100 hover:border-investa-primary/20 hover:shadow-md">
                                      <span class="text-sm truncate">${startup.url}</span>
                                      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
    setSelectedSuggestion(suggestion);
    setProductIdea(suggestion);
    
    // Automatically submit the form after setting the suggestion
    setTimeout(() => {
      // Create a new form submit event and dispatch it
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form')?.dispatchEvent(submitEvent);
      setSelectedSuggestion(null); // Reset after submission
    }, 300); // Slightly longer timeout for visual feedback
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
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30px 30px, #f0f0f0 2px, transparent 0)`,
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-green-500/5 rounded-full blur-2xl" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <Link href="/">
              <div className="font-bold text-3xl text-investa-primary flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-investa-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                Renvue
              </div>
            </Link>
            <Link href="/">
              <button className="h-11 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105 group">
                <span>Back to Home</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </Link>
          </header>

          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute -top-12 left-1/4 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-70" />
            <div className="absolute top-10 right-1/4 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-60" />
            <div className="absolute -left-10 top-1/2 w-24 h-24 bg-yellow-100 rounded-full blur-xl opacity-60" />
            
            {/* Abstract shapes */}
            <div className="hidden md:block absolute -right-8 top-1/3 opacity-20">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" className="text-investa-primary" />
                <path d="M30 60C30 43.4315 43.4315 30 60 30V90C43.4315 90 30 76.5685 30 60Z" fill="currentColor" className="text-investa-primary/20" />
                <circle cx="60" cy="60" r="15" fill="currentColor" className="text-investa-primary/30" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-investa-dark leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-investa-dark to-investa-primary relative z-10">
              Find Investment Opportunities
            </h1>
            <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover promising startups and market opportunities that match your investment criteria and align with your portfolio strategy.
            </p>
            
            
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-3xl mx-auto mb-16 relative"
          >
            {/* Decorative elements */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-investa-primary/20" fill="currentColor">
                <path d="M35.52 0.72C36.0772 0.0336 37.1228 0.0336 37.68 0.72C49.2656 14.7264 67.84 30.7264 67.84 48.96C67.84 65.6 53.76 78.88 36.6 78.88C19.44 78.88 5.36 65.6 5.36 48.96C5.36 30.7264 23.9344 14.7264 35.52 0.72Z" />
              </svg>
            </div>
            <div className="absolute -right-16 top-1/3 transform rotate-45 hidden lg:block">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="2" className="text-investa-primary/30" />
                <circle cx="30" cy="30" r="15" fill="currentColor" className="text-investa-primary/10" />
              </svg>
            </div>
            
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-investa-primary/10 p-8 md:p-10 relative overflow-hidden group transition-all duration-500 hover:shadow-investa-primary/5">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                    <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000000"></circle>
                  </pattern>
                  <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
                </svg>
              </div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-investa-dark mb-6 text-center">What are you looking for?</h3>
                <div className="relative flex items-center">
                  <div className="absolute left-5 text-investa-primary/70">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={productIdea}
                    onChange={(e) => {
                      setProductIdea(e.target.value);
                      setInputError(null);
                    }}
                    placeholder="Describe the startup or investment sector you're interested in..."
                    className="w-full h-14 pl-12 pr-32 bg-white rounded-full border-2 border-investa-primary/20 focus:border-investa-primary text-investa-dark text-lg focus:outline-none shadow-md focus:shadow-investa-primary/20 transition-all"
                  />
                  {!isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <button
                        type="submit"
                        className="h-10 px-6 bg-gradient-to-r from-investa-primary to-investa-primary/90 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all font-medium text-sm flex items-center justify-center group"
                      >
                        <span>Search</span>
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {inputError && (
                  <div className="absolute -bottom-6 left-0 w-full text-center">
                    <span className="text-investa-primary text-sm flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {inputError}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-10">
                <p className="text-investa-gray text-sm mb-4 flex items-center gap-2 justify-center">
                  <svg className="w-4 h-4 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Popular searches</span>
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isLoading || selectedSuggestion !== null}
                      className={`px-5 py-2.5 rounded-full text-sm border transition-all transform hover:scale-105 active:scale-95 duration-200 shadow-sm ${
                        productIdea === suggestion && selectedSuggestion === suggestion
                          ? "bg-investa-primary/20 text-investa-primary border-investa-primary/40 font-medium relative overflow-hidden"
                          : productIdea === suggestion
                          ? "bg-investa-primary/10 text-investa-primary border-investa-primary/30 font-medium" 
                          : "bg-white border-investa-gray/30 text-investa-gray hover:text-investa-primary hover:border-investa-primary/30 hover:bg-investa-primary/5"
                      } ${selectedSuggestion === suggestion ? "cursor-wait" : "cursor-pointer"}`}
                    >
                      {suggestion}
                      {selectedSuggestion === suggestion && (
                        <div className="absolute inset-0 flex items-center justify-center bg-investa-primary/5">
                          <div className="h-4 w-4 rounded-full border-2 border-investa-primary/30 border-t-investa-primary animate-spin"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="text-center animate-pulse bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-investa-primary/10">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-investa-primary animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div className="relative h-3 w-full max-w-md mx-auto bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-investa-primary rounded-full"
                    style={{
                      width: `${loadingProgress}%`,
                      transition: "width 0.5s ease-out",
                    }}
                  />
                </div>
                <p className="mt-5 text-investa-dark flex items-center justify-center gap-2 text-lg font-semibold">
                  Researching investment opportunities...
                </p>
                <div className="mt-3 text-sm text-investa-gray">Analyzing market data and startup trends</div>
              </div>
            )}
          </form>

          {/* How it works section - visible when not showing results */}
          {!response && !isLoading && (
            <div className="max-w-5xl mx-auto mb-20">
              <h2 className="text-2xl font-bold text-center text-investa-dark mb-10 flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>How It Works</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-investa-dark">Describe Your Interest</h3>
                  <p className="text-investa-gray">Enter the type of startup or investment sector you're interested in exploring.</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-investa-dark">Get Market Analysis</h3>
                  <p className="text-investa-gray">Our AI analyzes market trends, existing players, and opportunities in the space.</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-investa-primary/20">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-investa-dark">Discover Opportunities</h3>
                  <p className="text-investa-gray">Review active startups, their features, funding stages, and make informed investment decisions.</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {response && (
            <div
              ref={resultsRef}
              className="animate-fadeIn relative"
            >
              {/* Decorative patterns */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-70" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-xl opacity-60" />
              <div className="absolute -left-20 bottom-40 w-24 h-24 bg-green-100 rounded-full blur-xl opacity-60" />
              
              <div className="relative max-w-4xl mx-auto">
                <div className="p-1.5 bg-gradient-to-r from-blue-400/30 via-investa-primary/30 to-purple-400/30 rounded-2xl mb-8 shadow-xl">
                  <div className="bg-white rounded-2xl px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-investa-gray">
                      <svg className="w-5 h-5 text-investa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-sm font-medium">Investment Analysis Results</span>
                    </div>
                    <button 
                      onClick={() => {setResponse(null);}} 
                      className="text-xs px-4 py-2 rounded-full bg-gray-100 text-investa-gray hover:bg-gray-200 transition-colors flex items-center gap-1.5 hover:text-investa-primary/80"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>New Search</span>
                    </button>
                  </div>
                </div>
                <div className="transition-all duration-500 hover:scale-[1.01]" dangerouslySetInnerHTML={{ __html: response.content }} />
                {response.citations && (
                  <div className="mt-14 pt-8 border-t border-gray-200">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-investa-primary/10">
                      <h3 className="text-xl font-semibold text-investa-primary mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Sources
                      </h3>
                      <ul className="space-y-3">
                        {response.citations.map((citation, index) => (
                          <li key={index} className="flex gap-4 text-investa-gray bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                            <span className="text-investa-primary font-semibold">{index + 1}.</span>
                            {citation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Footer - Always visible */}
          <div className={`mt-20 text-center text-investa-gray/70 text-sm ${response ? 'pt-12 border-t border-gray-100' : ''}`}>
            <p>© 2023 Renvue. All investment data is simulated for demonstration purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
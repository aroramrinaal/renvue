"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import './style.css';

// Define investor type
interface Investor {
  id: number;
  name: string;
  company: string;
  image: string;
  focus: string[];
  stage: string[];
  ticketSize: string;
  portfolioCompanies: string[];
  customerPreference: "B2B" | "B2C" | "Both";
  bio: string;
  location: string;
  founded: number;
  investments: number;
  leadRounds: number;
  exits: number;
  verified: boolean;
  score?: number;
}

// Mock investor data
const INVESTORS: Investor[] = [
  {
    id: 1,
    name: "Kyle Kallman",
    company: "Charge Ventures",
    image: "/investors/investor6.jpg",
    focus: ["SaaS", "AI", "Fintech", "Healthcare", "Real Estate"],
    stage: ["Pre-seed", "Seed", "Series A"],
    ticketSize: "$500K - $2M",
    portfolioCompanies: ["TripleBlind", "Ocrolus", "Alloy"],
    customerPreference: "B2B",
    location: "New York, New York, United States",
    founded: 2015,
    investments: 55,
    leadRounds: 5,
    exits: 9,
    verified: true,
    bio: "Partner at Charge Ventures, a venture capital firm based in New York that invests in early stage B2B companies."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Sequoia Capital",
    image: "/investors/investor2.jpg",
    focus: ["Healthcare", "Biotech", "AI"],
    stage: ["Seed", "Series A", "Series B"],
    ticketSize: "$1M - $5M",
    portfolioCompanies: ["Stripe", "Airbnb", "Unity"],
    customerPreference: "Both",
    location: "Menlo Park, California, United States",
    founded: 1972,
    investments: 250,
    leadRounds: 120,
    exits: 80,
    verified: true,
    bio: "Partner at Sequoia Capital focused on healthcare innovation and transformative technologies. Seeks founders with domain expertise."
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    company: "First Round Capital",
    image: "/investors/investor4.jpg",
    focus: ["E-commerce", "Consumer", "Marketplace"],
    stage: ["Pre-seed", "Seed"],
    ticketSize: "$250K - $1M",
    portfolioCompanies: ["Uber", "Notion", "Roblox"],
    customerPreference: "B2C",
    location: "San Francisco, California, United States",
    founded: 2004,
    investments: 300,
    leadRounds: 75,
    exits: 45,
    verified: true,
    bio: "Principal at First Round Capital specializing in consumer-focused investments with strong network effects and viral potential."
  },
  {
    id: 4,
    name: "Emily Wong",
    company: "Andreessen Horowitz",
    image: "/investors/investor5.jpg",
    focus: ["Crypto", "Web3", "Fintech"],
    stage: ["Seed", "Series A", "Series B"],
    ticketSize: "$2M - $10M",
    portfolioCompanies: ["Coinbase", "GitHub", "Robinhood"],
    customerPreference: "Both",
    location: "Menlo Park, California, United States",
    founded: 2009,
    investments: 350,
    leadRounds: 130,
    exits: 75,
    verified: true,
    bio: "Partner at Andreessen Horowitz focusing on Web3 and crypto investments. Looking for teams with strong technical foundations."
  },
  {
    id: 5,
    name: "David Patel",
    company: "Lightspeed Ventures",
    image: "/investors/investor7.jpg",
    focus: ["Enterprise", "SaaS", "Security"],
    stage: ["Series A", "Series B"],
    ticketSize: "$5M - $15M",
    portfolioCompanies: ["Snap", "StitchFix", "Affirm"],
    customerPreference: "B2B",
    location: "Menlo Park, California, United States",
    founded: 2000,
    investments: 400,
    leadRounds: 150,
    exits: 90,
    verified: true,
    bio: "Managing Partner at Lightspeed Ventures with operational background in enterprise software. Values founder-market fit and clear go-to-market strategy."
  },
  {
    id: 6,
    name: "Lisa Brown",
    company: "Y Combinator",
    image: "/investors/investor.jpg",
    focus: ["AI", "Developer Tools", "Productivity"],
    stage: ["Pre-seed", "Seed"],
    ticketSize: "$125K - $500K",
    portfolioCompanies: ["Stripe", "Airbnb", "Instacart"],
    customerPreference: "Both",
    location: "Mountain View, California, United States",
    founded: 2005,
    investments: 450,
    leadRounds: 0,
    exits: 120,
    verified: true,
    bio: "Partner at Y Combinator focusing on early-stage technical founders. Looks for simple solutions to complex problems with rapid iteration cycles."
  },
  {
    id: 7,
    name: "Mark Williams",
    company: "SV Angel",
    image: "/investors/investor6.jpg",
    focus: ["Healthcare", "Climate", "Deep Tech"],
    stage: ["Seed", "Series A"],
    ticketSize: "$750K - $3M",
    portfolioCompanies: ["Twitter", "Pinterest", "Square"],
    customerPreference: "B2B",
    location: "San Francisco, California, United States",
    founded: 2009,
    investments: 250,
    leadRounds: 45,
    exits: 60,
    verified: true,
    bio: "Managing Partner at SV Angel looking for technologies that can transform industries. Values teams with technical depth."
  }
];

// Industry categories
const INDUSTRIES = [
  "SaaS", 
  "AI", 
  "Fintech", 
  "Healthcare", 
  "Biotech", 
  "E-commerce", 
  "Consumer", 
  "Marketplace", 
  "Crypto", 
  "Web3", 
  "Enterprise", 
  "Security",
  "Developer Tools",
  "Productivity",
  "Climate",
  "Deep Tech",
  "Real Estate",
  "Education",
  "Travel",
  "Entertainment",
  "Artificial Intelligence",
  "Machine Learning",
  "Natural Language Processing",

];

// Startup stages
const STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+"
];

export default function FindInvestors() {
  // Form state
  const [amountToRaise, setAmountToRaise] = useState("");
  const [stage, setStage] = useState("");
  const [industry, setIndustry] = useState<string[]>([]);
  const [customerType, setCustomerType] = useState<"B2B" | "B2C" | "Both" | "">("");
  const [showResults, setShowResults] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  
  // Filtered investors based on form inputs
  const [matchedInvestors, setMatchedInvestors] = useState<Investor[]>([]);
  
  // Calculate investor match scores and sort by best matches
  const findInvestors = () => {
    // Basic validation
    if (!amountToRaise || !stage || industry.length === 0 || !customerType) {
      alert("Please fill in all fields to find matching investors");
      return;
    }
    
    const filteredInvestors = INVESTORS.map(investor => {
      let score = 0;
      
      // Match by stage
      if (investor.stage.includes(stage)) {
        score += 30;
      }
      
      // Match by industry focus - check for any matches between selected industries and investor focus
      const industryMatches = investor.focus.filter(focus => industry.includes(focus));
      if (industryMatches.length > 0) {
        // Award points based on percentage of selected industries that match
        const matchPercentage = industryMatches.length / industry.length;
        score += Math.round(30 * matchPercentage);
      }
      
      // Match by customer type
      if (investor.customerPreference === "Both" || investor.customerPreference === customerType) {
        score += 20;
      }
      
      // Match by ticket size (simplified)
      const requestedAmount = parseFloat(amountToRaise.replace(/[^0-9.]/g, '')) * 1000000;
      const ticketMin = parseFloat(investor.ticketSize.split(' - ')[0].replace(/[^0-9.]/g, '')) * 
                       (investor.ticketSize.includes('K') ? 1000 : 1000000);
      const ticketMax = parseFloat(investor.ticketSize.split(' - ')[1].replace(/[^0-9.]/g, '')) * 
                       (investor.ticketSize.includes('M') ? 1000000 : 1000);
      
      if (requestedAmount >= ticketMin && requestedAmount <= ticketMax) {
        score += 20;
      }
      
      return {
        ...investor,
        score
      };
    });
    
    // Sort by score (highest first) and take top 5
    const topInvestors = filteredInvestors
      .sort((a, b) => b.score! - a.score!)
      .slice(0, 5);
    
    setMatchedInvestors(topInvestors);
    setShowResults(true);
  };
  
  // Toggle industry selection
  const toggleIndustry = (ind: string) => {
    setIndustry(prev => 
      prev.includes(ind)
        ? prev.filter(i => i !== ind)
        : [...prev, ind]
    );
  };
  
  // Function to generate avatar for investors without images
  const generateAvatar = (name: string) => {
    const colors = ['#f13505', '#ff6e50', '#ff9c85', '#ffb8a8', '#ffd4cb'];
    const initials = name.split(' ').map(word => word[0]).join('');
    const colorIndex = name.length % colors.length;
    
    return (
      <div 
        className="special_block_logo_first_characters _128px"
        style={{ background: colors[colorIndex] }}
      >
        {initials}
      </div>
    );
  };
  
  return (
    <div className="main_data_block">
      <div className="section_780">
        {/* Back to Home Link */}
        <div className="horizontal_block layout_justify_stretch mb-6">
          <Link href="/">
            <div className="font-bold text-3xl" style={{ color: "#f13505", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Renvue
            </div>
          </Link>
          <Link href="/">
            <button
              className="secondary_button"
              style={{
                backgroundColor: "#040404",
                color: "white",
                borderRadius: "999px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                border: "none",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "4px" }}
              >
                <path 
                  d="M3 12h18M3 12l6-6M3 12l6 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>

        {/* Title Section */}
        <div className="section_block" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#040404" }}>Find Investors</h1>
          <p style={{ color: "#535050", maxWidth: "540px", margin: "0 auto" }}>
            Connect with investors that match your startup's industry, stage, and funding needs.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section_block"
        >
          {!showResults ? (
            <>
              <div className="vertical_block gap_32" style={{ alignItems: "center", marginBottom: "3rem" }}>
                <h1 style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: "#f13505", 
                  textAlign: "center", 
                  marginBottom: "0.5rem" 
                }}>Find Your Perfect Investors</h1>
                <p style={{ 
                  fontSize: "1.1rem",
                  color: "#666", 
                  textAlign: "center", 
                  marginBottom: "1.5rem" 
                }}>Tell us about your startup to discover investors who match your needs</p>
              </div>
            
              <div style={{ 
                maxWidth: "600px", 
                margin: "0 auto" 
              }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#333", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.9rem", 
                    fontWeight: 500 
                  }}>How much are you looking to raise?</label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={amountToRaise} 
                      onChange={(e) => setAmountToRaise(e.target.value)}
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}
                    >
                      <option value="">Select funding range</option>
                      <option value="0-50k">$0 - $50K</option>
                      <option value="50k-250k">$50K - $250K</option>
                      <option value="250k-1m">$250K - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-10m">$5M - $10M</option>
                      <option value="10m+">$10M+</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#333", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.9rem", 
                    fontWeight: 500 
                  }}>Current startup stage</label>
                  <div style={{ position: "relative" }}>
                    <select 
                      value={stage} 
                      onChange={(e) => setStage(e.target.value)}
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}
                    >
                      <option value="">Select stage</option>
                      {STAGES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#333", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.9rem", 
                    fontWeight: 500 
                  }}>Industry/Category</label>
                  
                  <div style={{ position: "relative" }}>
                    <div 
                      onClick={() => setShowIndustryDropdown(prev => !prev)}
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <div>
                        {industry.length === 0 ? 'Select industries' : `${industry.length} industries selected`}
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={showIndustryDropdown ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"} stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    {showIndustryDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "white",
                          border: "1px solid #E0E0E0",
                          borderRadius: "8px",
                          marginTop: "4px",
                          maxHeight: "200px",
                          overflowY: "auto",
                          zIndex: 10,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          padding: "0.5rem"
                        }}
                      >
                        {INDUSTRIES.map(ind => (
                          <div
                            key={ind}
                            onClick={() => toggleIndustry(ind)}
                            style={{
                              padding: "0.5rem",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              borderRadius: "4px",
                              backgroundColor: industry.includes(ind) ? "#FFF1EE" : "transparent",
                              transition: "all 0.2s ease",
                              color: "#333"
                            }}
                            onMouseEnter={(e) => {
                              if (!industry.includes(ind)) {
                                e.currentTarget.style.backgroundColor = "#F5F5F5";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!industry.includes(ind)) {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                border: `2px solid ${industry.includes(ind) ? "#f13505" : "#ccc"}`,
                                borderRadius: "4px",
                                marginRight: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: industry.includes(ind) ? "#f13505" : "transparent"
                              }}
                            >
                              {industry.includes(ind) && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            {ind}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {industry.length > 0 && (
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: "8px",
                      marginTop: "8px" 
                    }}>
                      {industry.map(ind => (
                        <div 
                          key={ind} 
                          style={{
                            backgroundColor: "#FFF1EE",
                            color: "#f13505",
                            padding: "4px 10px",
                            borderRadius: "16px",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          {ind}
                          <div 
                            onClick={() => toggleIndustry(ind)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18M6 6L18 18" stroke="#f13505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ 
                    display: "block", 
                    color: "#333", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.9rem", 
                    fontWeight: 500 
                  }}>Target customer</label>
                  <div style={{ position: "relative" }}>
                    <select 
                      value={customerType} 
                      onChange={(e) => setCustomerType(e.target.value as "B2B" | "B2C" | "Both" | "")}
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}
                    >
                      <option value="">Select customer type</option>
                      <option value="B2B">B2B</option>
                      <option value="B2C">B2C</option>
                      <option value="Both">Both B2B and B2C</option>
                    </select>
                  </div>
                </div>

                <button 
                  style={{ 
                    width: "100%", 
                    padding: "1rem", 
                    borderRadius: "8px", 
                    background: "#f13505", 
                    color: "white", 
                    fontSize: "1rem", 
                    border: "none", 
                    cursor: "pointer", 
                    transition: "all 0.3s ease", 
                    marginTop: "1rem", 
                    fontWeight: 600,
                    boxShadow: "0 4px 6px rgba(241, 53, 5, 0.25)"
                  }} 
                  onClick={findInvestors}
                  onMouseOver={(e) => e.currentTarget.style.background = "#d83004"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#f13505"}
                >
                  Find Investors
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="horizontal_block layout_justify_stretch" style={{ marginBottom: "2rem" }}>
                <div 
                  className="horizontal_block gap_8" 
                  style={{ 
                    cursor: "pointer", 
                    borderRadius: "8px", 
                    padding: "8px", 
                    transition: "background-color 0.2s ease" 
                  }} 
                  onClick={() => setShowResults(false)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F5F5F5"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <div style={{ width: "24px", height: "24px", position: "relative" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5" stroke="#f13505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 19L5 12L12 5" stroke="#f13505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 style={{ color: "#f13505" }}>Back to Search</h4>
                </div>
              </div>
              
              <h2 style={{
                fontSize: "1.8rem",
                color: "#f13505",
                textAlign: "center",
                marginBottom: "2rem"
              }}>Top Investor Matches</h2>
              
              {matchedInvestors.map((investor, index) => (
                <motion.div 
                  key={investor.id}
                  className="section_block"
                  style={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    marginBottom: "1.5rem",
                    padding: "2rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "3px solid #f13505",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box"
                    }}>
                      {investor.image ? (
                        <Image 
                          src={investor.image}
                          alt={investor.name}
                          width={80}
                          height={80}
                          style={{ 
                            objectFit: "cover", 
                            width: "100%", 
                            height: "100%" 
                          }}
                        />
                      ) : (
                        <div 
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            background: investor.name.length % 5 === 0 ? "#f13505" : 
                                      investor.name.length % 5 === 1 ? "#ff6e50" :
                                      investor.name.length % 5 === 2 ? "#ff9c85" :
                                      investor.name.length % 5 === 3 ? "#ffb8a8" : "#ffd4cb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "1.8rem",
                            fontWeight: "bold"
                          }}
                        >
                          {investor.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#333" }}>
                          {investor.name}
                        </h3>
                        {investor.verified && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#f13505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <p style={{ margin: "0 0 0.75rem", color: "#666", fontSize: "1rem" }}>
                        Partner at {investor.company}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ 
                          background: "#FFF1EE",
                          color: "#f13505",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: 600
                        }}>
                          <span>{investor.score}% Match</span>
                        </div>
                        <div style={{ color: "#666" }}>
                          <span>📍 {investor.location.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ margin: "1.5rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.5rem" }}>Focus Areas</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {investor.focus.slice(0, 3).map(f => (
                          <div key={f} style={{
                            background: "#f5f5f5",
                            color: "#333",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "16px",
                            fontSize: "0.85rem"
                          }}>
                            {f}
                          </div>
                        ))}
                        {investor.focus.length > 3 && (
                          <div style={{
                            color: "#666",
                            padding: "0.3rem 0",
                            fontSize: "0.85rem"
                          }}>
                            +{investor.focus.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.5rem" }}>Investment Stage</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {investor.stage.map(s => (
                          <div key={s} style={{
                            background: "#f5f5f5",
                            color: "#333",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "16px",
                            fontSize: "0.85rem"
                          }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.5rem" }}>Ticket Size</h4>
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>{investor.ticketSize}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <Link 
                      href={`/investors/${investor.id}`}
                      style={{ 
                        padding: "0.75rem 1.5rem", 
                        background: "#f13505", 
                        color: "white", 
                        borderRadius: "8px", 
                        textDecoration: "none",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#d83004"}
                      onMouseOut={(e) => e.currentTarget.style.background = "#f13505"}
                    >
                      View Full Profile
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

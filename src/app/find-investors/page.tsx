"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
    image: "https://xubs-akpz-sxip.n7.xano.io/vault/JXk4kDws/Lj90k7iYTEkMgvBacQq7SxO47_g/nfcJrg../1516246005879.jpeg",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "/investors/lisa-brown.jpg",
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
    image: "/investors/mark-williams.jpg",
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
  "Real Estate"
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
  const [industry, setIndustry] = useState("");
  const [customerType, setCustomerType] = useState<"B2B" | "B2C" | "Both" | "">("");
  const [showResults, setShowResults] = useState(false);
  
  // Filtered investors based on form inputs
  const [matchedInvestors, setMatchedInvestors] = useState<Investor[]>([]);
  
  // Calculate investor match scores and sort by best matches
  const findInvestors = () => {
    // Basic validation
    if (!amountToRaise || !stage || !industry || !customerType) {
      alert("Please fill in all fields to find matching investors");
      return;
    }
    
    const filteredInvestors = INVESTORS.map(investor => {
      let score = 0;
      
      // Match by stage
      if (investor.stage.includes(stage)) {
        score += 30;
      }
      
      // Match by industry focus
      if (investor.focus.includes(industry)) {
        score += 30;
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
  
  return (
    <div className="main_data_block">
      <div className="section_780">
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
                  color: "#333", 
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
                    <input 
                      type="text" 
                      value={amountToRaise} 
                      onChange={(e) => setAmountToRaise(e.target.value)}
                      placeholder="e.g. $2M"
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease" 
                      }}
                    />
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
                        transition: "all 0.3s ease" 
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
                    <select 
                      value={industry} 
                      onChange={(e) => setIndustry(e.target.value)}
                      style={{ 
                        width: "100%", 
                        padding: "0.8rem 1rem", 
                        borderRadius: "8px", 
                        backgroundColor: "white", 
                        border: "1px solid #E0E0E0", 
                        color: "#333", 
                        fontSize: "1rem", 
                        transition: "all 0.3s ease" 
                      }}
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
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
                        transition: "all 0.3s ease" 
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
                    background: "#4D6DFF", 
                    color: "white", 
                    fontSize: "1rem", 
                    border: "none", 
                    cursor: "pointer", 
                    transition: "all 0.3s ease", 
                    marginTop: "1rem", 
                    fontWeight: 600 
                  }} 
                  onClick={findInvestors}
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
                      <path d="M19 12H5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 19L5 12L12 5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="black">Back to Search</h4>
                </div>
              </div>
              
              <h2 style={{
                fontSize: "1.8rem",
                color: "#333",
                textAlign: "center",
                marginBottom: "2rem"
              }}>Top Investor Matches</h2>
              
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
              }}>
                {matchedInvestors.map(investor => (
                  <motion.div 
                    key={investor.id}
                    className="section_block"
                    style={{
                      border: "1px solid #E0E0E0",
                      transition: "all 0.3s ease",
                      marginBottom: 0
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
                      <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
                        {investor.image.startsWith('http') ? (
                          <Image 
                            src={investor.image}
                            alt={investor.name}
                            width={128}
                            height={128}
                            className="logo _128px"
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="special_block_logo_first_characters _128px">
                            {investor.name.split(' ').map(word => word[0]).join('')}
                          </div>
                        )}
                        
                        <div className="vertical_block gap_12" style={{ alignItems: "center" }}>
                          <div className="horizontal_block gap_4 w-clearfix">
                            <h2 style={{
                              fontSize: "1.8rem",
                              fontWeight: 700,
                              margin: 0,
                              color: "#333"
                            }}>{investor.name}</h2>
                            {investor.verified && (
                              <div className="tooltip_content_block">
                                <div style={{ width: "30px", height: "30px", position: "relative" }}>
                                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4D6DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                          <h4 className="secondary center_align" style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            margin: 0
                          }}>
                            Partner at {investor.company}
                          </h4>
                          <div style={{ 
                            background: "#4D6DFF",
                            color: "white",
                            padding: "0.4rem 1rem",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            marginTop: "0.5rem"
                          }}>
                            <span>{investor.score}% Match</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="investor_page_contacts_block" style={{ width: "100%", maxWidth: "500px" }}>
                        <div style={{ textAlign: "center", fontWeight: 500, marginBottom: "4px" }}>How to contact</div>
                        <div className="horizontal_block gap_8 wrap-mobile" style={{ justifyContent: "center" }}>
                          <div className="secondary_button relative_with_icon_no_border">
                            <div className="horizontal_block gap_8">
                              <div style={{ width: "24px", height: "24px", position: "relative" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>Website</div>
                            </div>
                          </div>
                          <div className="secondary_button relative_with_icon_no_border">
                            <div className="horizontal_block gap_8">
                              <div style={{ width: "24px", height: "24px", position: "relative" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>Email</div>
                            </div>
                          </div>
                          <div className="secondary_button relative_with_icon_no_border linkedin">
                            <div style={{ width: "24px", height: "24px", position: "relative" }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 9H2V21H6V9Z" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="vertical_block gap_32 left flex-stretch" style={{ width: "100%" }}>
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Description</div>
                          <h4 style={{ 
                            lineHeight: "1.5",
                            fontSize: "1rem",
                            fontWeight: 500,
                            margin: 0
                          }}>{investor.bio}</h4>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Location</div>
                          <h4 style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            margin: 0
                          }}><span>📍</span> {investor.location}</h4>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Invest in stages</div>
                          <div className="details-wrap">
                            {investor.stage.map(s => (
                              <div key={s} className="tag_block black">
                                <div>{s}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Invest in industries</div>
                          <div className="details-wrap">
                            {investor.focus.map(f => (
                              <div key={f} className="tag_block black">
                                <div>{f}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Customer focus</div>
                          <div className="details-wrap">
                            <div className="tag_block black">
                              <div>{investor.customerPreference}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Ticket size</div>
                          <h4 style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            margin: 0
                          }}>{investor.ticketSize}</h4>
                        </div>
                        
                        <div className="vertical_block gap-8 left-align">
                          <div className="paragraph_m secondary">Portfolio companies</div>
                          <h4 style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            margin: 0
                          }}>{investor.portfolioCompanies.join(", ")}</h4>
                        </div>
                      </div>
                      
                      <div style={{ width: "100%" }}>
                        <div className="section_sub_block">
                          <h5 style={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            margin: "0 0 1rem 0"
                          }}>Organization</h5>
                          <div className="special_block_small_table_row">
                            <div className="vertical_block gap_4 layout_align_left" style={{ width: "calc(100% - 64px)" }}>
                              <div className="horizontal_block gap_4" style={{ width: "100%" }}>
                                <h4 style={{ 
                                  whiteSpace: "nowrap",
                                  fontSize: "1rem",
                                  fontWeight: 500,
                                  margin: 0
                                }}>{investor.company}</h4>
                                {investor.verified && (
                                  <div style={{ width: "20px", height: "20px", position: "relative" }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4D6DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div style={{ 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                lineHeight: "1.2em",
                                maxHeight: "2.4em"
                              }}>
                                {investor.bio}
                              </div>
                            </div>
                          </div>
                          <div className="horizontal_block mobile_vertical">
                            <div className="vertical_block gap_8 layout_align_left flex_grow">
                              <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                margin: 0,
                              }}>{investor.founded}</h3>
                              <h4 className="secondary" style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                margin: 0
                              }}>Founded</h4>
                            </div>
                            <div className="vertical_block gap_8 layout_align_left flex_grow">
                              <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                margin: 0
                              }}>{investor.investments}</h3>
                              <h4 className="secondary" style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                margin: 0
                              }}>Investments</h4>
                            </div>
                            <div className="vertical_block gap_8 layout_align_left flex_grow">
                              <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                margin: 0
                              }}>{investor.leadRounds}</h3>
                              <h4 className="secondary" style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                margin: 0
                              }}>Lead rounds</h4>
                            </div>
                            <div className="vertical_block gap_8 layout_align_left flex_grow">
                              <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                margin: 0
                              }}>{investor.exits}</h3>
                              <h4 className="secondary" style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                margin: 0
                              }}>Exits</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

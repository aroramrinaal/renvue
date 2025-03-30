"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import SignupModal from "@/components/SignupModal";
import '../style.css';

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

interface InvestorProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InvestorProfile({ params }: InvestorProfileProps) {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [investor, setInvestor] = useState<Investor | null>(null);
  
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  useEffect(() => {
    // Find the investor by id from the URL parameter
    const id = parseInt(unwrappedParams.id);
    const foundInvestor = INVESTORS.find(inv => inv.id === id);
    
    if (foundInvestor) {
      setInvestor(foundInvestor);
    }
  }, [unwrappedParams.id]);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // If investor is not found, show a message
  if (!investor) {
    return (
      <div className="main_data_block" style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "80vh" 
      }}>
        <div style={{ textAlign: "center", color: "#333" }}>
          <h2 style={{ color: "#333" }}>Investor not found</h2>
          <p style={{ color: "#333" }}>The investor you're looking for doesn't exist or may have been removed.</p>
          <Link href="/find-investors">
            <button style={{ 
              marginTop: "20px", 
              padding: "10px 20px", 
              background: "#f13505", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer" 
            }}>
              Back to Investors
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main_data_block">
      {/* Signup Modal */}
      <SignupModal isOpen={signUpModalOpen} onClose={closeSignUpModal} />
      
      <div className="side_bars">
        {/* Desktop Sidebar */}
        <div className="desktop_side_bar">
          <div className="side_bar_new">
            <h2 style={{ color: "#333" }}>Renvue AI</h2>
            <nav className="side_bar_navigation">
              <div onClick={openSignUpModal} className="side_bar_item home">
                <h4 style={{ color: "#333" }}>Home</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item investors">
                <h4 style={{ color: "#333" }}>Investors</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item startups">
                <h4 style={{ color: "#333" }}>Startups</h4>
                <div className="tag_block green">New</div>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item lists">
                <h4 style={{ color: "#333" }}>Lists</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item messages">
                <h4 style={{ color: "#333" }}>Messages</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item guide">
                <h4 style={{ color: "#333" }}>Fundraising guide</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item more">
                <h4 style={{ color: "#333" }}>More</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item pricing" style={{ display: "none" }}>
                <h4>Pricing</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item faq" style={{ display: "none" }}>
                <h4>FAQ</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item blog" style={{ display: "none" }}>
                <h4>Blog</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item what-s-new" style={{ display: "none" }}>
                <h4>What's new</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item how-it-works" style={{ display: "none" }}>
                <h4>How it works</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item contact-us" style={{ display: "none" }}>
                <h4>Contact us</h4>
              </div>
            </nav>
            <div className="hidden_block flex_align_stretch" style={{ display: "block" }}>
              <div className="side_bar_navigation">
                <div onClick={openSignUpModal} className="side_bar_item_gradient">
                  <Image 
                    src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c142a64ed6e631573864b8_Sign_up%20icon.svg" 
                    alt="Sign up" 
                    width={24} 
                    height={24} 
                  />
                  <h4 style={{ color: "white" }}>Sign up</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item sign_in">
                  <h4 style={{ color: "#333" }}>Sign in</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="mobile_side_bar">
          <div className="mobile_nav_bar_popup" style={{ display: mobileMenuOpen ? "block" : "none" }}>
            <div className="horizontal_block gap_8">
              <Image 
                src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c29799148e0ae005ec34b4_close%20new%20icon.svg" 
                alt="Close" 
                width={24} 
                height={24} 
                onClick={toggleMobileMenu} 
                className="pointer"
              />
              <h4 style={{ color: "#333" }}>Close</h4>
            </div>
            <div className="side_bar_new">
              <div className="nav-bar-logo_desktop">
                <Image 
                  src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c21ddc9343ae771808937b_Logo.svg" 
                  alt="Logo" 
                  width={100} 
                  height={30} 
                />
              </div>
              <nav className="side_bar_navigation">
                <div onClick={openSignUpModal} className="side_bar_item home">
                  <h4 style={{ color: "#333" }}>Home</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item investors">
                  <h4 style={{ color: "#333" }}>Investors</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item startups">
                  <h4 style={{ color: "#333" }}>Startups</h4>
                  <div className="tag_block green">New</div>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item lists">
                  <h4 style={{ color: "#333" }}>Lists</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item messages">
                  <h4 style={{ color: "#333" }}>Messages</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item guide">
                  <h4 style={{ color: "#333" }}>Fundraising guide</h4>
                </div>
              </nav>
              <div className="hidden_block flex_align_stretch" style={{ display: "block" }}>
                <div className="side_bar_navigation">
                  <div onClick={openSignUpModal} className="side_bar_item_gradient">
                    <Image 
                      src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c142a64ed6e631573864b8_Sign_up%20icon.svg" 
                      alt="Sign up" 
                      width={24} 
                      height={24} 
                    />
                    <h4 style={{ color: "white" }}>Sign up</h4>
                  </div>
                  <div onClick={openSignUpModal} className="side_bar_item sign_in">
                    <h4 style={{ color: "#333" }}>Sign in</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="horizontal_block layout_justify_stretch">
            <Image 
              src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c21ddc9343ae771808937b_Logo.svg" 
              alt="Logo" 
              width={100} 
              height={30} 
            />
            <div className="horizontal_block gap_8">
              <h4 style={{ color: "#333" }}>Menu</h4>
              <Image 
                src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c29417a8aba1863ccbb979_Menu%20icon.svg" 
                alt="Menu" 
                width={24} 
                height={24} 
                onClick={toggleMobileMenu} 
                className="pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Investor Profile */}
      <section className="section_780">
        <div className="section_block">
          <div className="horizontal_block layout_justify_stretch">
            <Link href="/find-investors">
              <div className="horizontal_block gap_8" style={{ 
                cursor: "pointer", 
                borderRadius: "8px", 
                padding: "8px", 
                transition: "background-color 0.2s ease" 
              }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F5F5F5"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <Image 
                  src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65c24bc3008ef522aee3e3b0_Back%20icon%20new.svg" 
                  alt="Back" 
                  width={24} 
                  height={24} 
                />
                <h4 className="black">Back</h4>
              </div>
            </Link>
            <div className="horizontal_block">
              <div className="hidden_block" style={{ display: "block" }}>
                <div onClick={openSignUpModal} className="secondary_button" style={{ 
                  transition: "all 0.2s ease", 
                  border: "1px solid #EFEFEF",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <Image 
                    src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65cb94e5142d28470b5b7846_Plus%20icon.svg" 
                    alt="Add to list" 
                    width={18} 
                    height={18} 
                  />
                  <div>Add to list</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Section */}
          <div className="hidden_block" style={{ display: "block" }}>
            {/* Profile Header - Centered */}
            <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
              <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "128px",
                    height: "128px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #f13505",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box"
                  }}
                >
                  {investor.image ? (
                    <Image 
                      src={investor.image}
                      alt={investor.name} 
                      width={128} 
                      height={128} 
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
                        fontSize: "2.5rem",
                        fontWeight: "bold"
                      }}
                    >
                      {investor.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  )}
                </motion.div>
                <div className="vertical_block gap_12" style={{ alignItems: "center" }}>
                  <div className="horizontal_block gap_4 w-clearfix">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ color: "#333" }}
                    >
                      {investor.name}
                    </motion.h2>
                    {investor.verified && (
                      <motion.div 
                        className="tooltip_content_block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Image 
                          src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b102d6c31f1714085135d9_Icon%20(2).svg" 
                          alt="Verified" 
                          width={30} 
                          height={30} 
                          className="icon _30px"
                        />
                      </motion.div>
                    )}
                  </div>
                  <motion.h4 
                    className="secondary center_align"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ color: "#666" }}
                  >
                    Partner at {investor.company}
                  </motion.h4>
                </div>
              </div>
              
              {/* Contact Section - Centered */}
              <motion.div 
                className="investor_page_contacts_block" 
                style={{ width: "100%", maxWidth: "500px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div style={{ textAlign: "center", fontWeight: 500, marginBottom: "4px" }}>How to contact</div>
                <div className="horizontal_block gap_8 wrap-mobile" style={{ justifyContent: "center" }}>
                  <div onClick={openSignUpModal} className="secondary_button relative_with_icon_no_border">
                    <div className="horizontal_block gap_8">
                      <Image 
                        src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65438b29799573bddd77dc19_Icon%20(14).svg" 
                        alt="Website" 
                        width={24} 
                        height={24} 
                        className="icon _24px"
                      />
                      <div>Website</div>
                    </div>
                  </div>
                  <div onClick={openSignUpModal} className="secondary_button relative_with_icon_no_border">
                    <div className="horizontal_block gap_8">
                      <Image 
                        src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/645ce56c63c33682d4cc811e_Icon%20(20).svg" 
                        alt="Email" 
                        width={24} 
                        height={24} 
                        className="icon _24px"
                      />
                      <div>Email</div>
                    </div>
                  </div>
                  <div 
                    onClick={openSignUpModal} 
                    className="secondary_button relative_with_icon_no_border linkedin" 
                    style={{
                      backgroundColor: "#0077B5", 
                      width: "44px",
                      height: "44px",
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 2px 6px rgba(0, 119, 181, 0.3)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f13505";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 119, 181, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0077B5";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 119, 181, 0.3)";
                    }}
                  >
                    <Image 
                      src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b386839adfd3af6492f185_Icon%20(7).svg" 
                      alt="LinkedIn" 
                      width={24} 
                      height={24} 
                      className="icon _24px"
                      style={{ filter: "brightness(10)" }}
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Details Section */}
              <motion.div 
                className="vertical_block gap_32 left flex-stretch" 
                style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Description</div>
                  <h4 style={{ lineHeight: "1.5", color: "#333" }}>{investor.bio}</h4>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Location</div>
                  <h4 style={{ color: "#333" }}><span>📍</span> {investor.location}</h4>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Invest in regions</div>
                  <div className="details-wrap">
                    <div className="tag_block black">
                      <div>US / Canada</div>
                    </div>
                  </div>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Invest in stages</div>
                  <div className="details-wrap">
                    {investor.stage.map((stage, index) => (
                      <div key={index} className="tag_block black">
                        <div>{stage}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Invest in industries</div>
                  <div className="details-wrap">
                    {investor.focus.map((focus, index) => (
                      <div key={index} className="tag_block black">
                        <div>{focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Typical investment size</div>
                  <h4 style={{ color: "#333" }}>{investor.ticketSize}</h4>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary" style={{ color: "#666" }}>Customer preference</div>
                  <h4 style={{ color: "#333" }}>{investor.customerPreference}</h4>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="hidden_block" 
          style={{ display: "block" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="section_block">
            <h3 style={{ color: "#333" }}>Organization</h3>
            <div className="special_block_small_table_row">
              <div className="vertical_block gap_4 layout_align_left" style={{ width: "calc(100% - 64px)" }}>
                <div className="horizontal_block gap_4" style={{ width: "100%" }}>
                  <h4 style={{ whiteSpace: "nowrap", color: "#333" }}>{investor.company}</h4>
                  {investor.verified && (
                    <Image 
                      src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b102d6c31f1714085135d9_Icon%20(2).svg" 
                      alt="Verified" 
                      width={20} 
                      height={20} 
                      className="icon _20px"
                    />
                  )}
                </div>
                <div style={{ 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  lineHeight: "1.2em",
                  maxHeight: "2.4em",
                  color: "#333"
                }}>
                  {investor.bio}
                </div>
              </div>
            </div>
            <div className="horizontal_block mobile_vertical">
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3 style={{ color: "#333" }}>{investor.founded}</h3>
                <h4 className="secondary" style={{ color: "#666" }}>Founded</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3 style={{ color: "#333" }}>{investor.investments}</h3>
                <h4 className="secondary" style={{ color: "#666" }}>Investments</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3 style={{ color: "#333" }}>{investor.leadRounds}</h3>
                <h4 className="secondary" style={{ color: "#666" }}>Lead rounds</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3 style={{ color: "#333" }}>{investor.exits}</h3>
                <h4 className="secondary" style={{ color: "#666" }}>Exits</h4>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hidden_block" 
          style={{ display: "block" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="section_block">
            <h3 style={{ color: "#333" }}>Portfolio Companies</h3>
            <div className="horizontal_block wrap-mobile" style={{ gap: "12px", marginTop: "16px" }}>
              {investor.portfolioCompanies.map((company, index) => (
                <div key={index} className="tag_block" style={{ 
                  background: "#f5f5f5", 
                  color: "#333", 
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}>
                  {company}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 
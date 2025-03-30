"use client";

import { useState } from "react";
import Image from "next/image";
import './style.css';
import SignupModal from "@/components/SignupModal";
import Link from "next/link";

export default function InvestorPage() {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="main_data_block">
      {/* Signup Modal */}
      <SignupModal isOpen={signUpModalOpen} onClose={closeSignUpModal} />
      
      <div className="side_bars">
        {/* Desktop Sidebar */}
        <div className="desktop_side_bar">
          <div className="side_bar_new">
            <Link href="/" className="no-underline">
              <h2 className="font-bold text-[#f13505] text-2xl transition-transform hover:scale-105" 
                style={{ 
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >Renvue AI</h2>
            </Link>
            <nav className="side_bar_navigation">
              <div onClick={openSignUpModal} className="side_bar_item home">
                <h4>Home</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item investors">
                <h4>Investors</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item startups">
                <h4>Startups</h4>
                <div className="tag_block green">New</div>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item lists">
                <h4>Lists</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item messages">
                <h4>Messages</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item guide">
                <h4>Fundraising guide</h4>
              </div>
              <div onClick={openSignUpModal} className="side_bar_item more">
                <h4>More</h4>
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
                  <h4>Sign up</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item sign_in">
                  <h4>Sign in</h4>
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
              <h4>Close</h4>
            </div>
            <div className="side_bar_new">
              <div className="nav-bar-logo_desktop">
                <Link href="/">
                  <div className="font-bold text-[#f13505] text-2xl"
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
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
              </div>
              <nav className="side_bar_navigation">
                <div onClick={openSignUpModal} className="side_bar_item home">
                  <h4>Home</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item investors">
                  <h4>Investors</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item startups">
                  <h4>Startups</h4>
                  <div className="tag_block green">New</div>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item lists">
                  <h4>Lists</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item messages">
                  <h4>Messages</h4>
                </div>
                <div onClick={openSignUpModal} className="side_bar_item guide">
                  <h4>Fundraising guide</h4>
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
                    <h4>Sign up</h4>
                  </div>
                  <div onClick={openSignUpModal} className="side_bar_item sign_in">
                    <h4>Sign in</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="horizontal_block layout_justify_stretch">
            <Link href="/">
              <div className="font-bold text-[#f13505] text-2xl"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
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
            <div className="horizontal_block gap_8">
              <h4>Menu</h4>
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
              
              <Link href="/find-investors"><h4 className="black">Back</h4></Link>
            </div>
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
              <Link href="/" className="ml-4">
                <button
                  className="primary_button"
                  style={{
                    backgroundColor: "#f13505",
                    color: "white",
                    borderRadius: "999px",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    boxShadow: "0 4px 6px rgba(241, 53, 5, 0.2)",
                    border: "none",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 10px rgba(241, 53, 5, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(241, 53, 5, 0.2)";
                  }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ flexShrink: 0 }}
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
          </div>
          
          {/* Profile Section */}
          <div className="hidden_block" style={{ display: "block" }}>
            {/* Profile Header - Centered */}
            <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
              <div className="vertical_block gap_32" style={{ alignItems: "center" }}>
                <Image 
                  src="https://xubs-akpz-sxip.n7.xano.io/vault/JXk4kDws/Lj90k7iYTEkMgvBacQq7SxO47_g/nfcJrg../1516246005879.jpeg?tpl=big" 
                  alt="Kyle Kallman" 
                  width={128} 
                  height={128} 
                  className="logo _128px"
                />
                <div className="vertical_block gap_12" style={{ alignItems: "center" }}>
                  <div className="horizontal_block gap_4 w-clearfix">
                    <h2>Kyle Kallman</h2>
                    <div className="tooltip_content_block">
                      <Image 
                        src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b102d6c31f1714085135d9_Icon%20(2).svg" 
                        alt="Verified" 
                        width={30} 
                        height={30} 
                        className="icon _30px"
                      />
                    </div>
                  </div>
                  <h4 className="secondary center_align">Partner at Charge Ventures</h4>
                </div>
              </div>
              
              {/* Contact Section - Centered */}
              <div className="investor_page_contacts_block" style={{ width: "100%", maxWidth: "500px" }}>
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
                  <div onClick={openSignUpModal} className="secondary_button relative_with_icon_no_border linkedin">
                    <Image 
                      src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b386839adfd3af6492f185_Icon%20(7).svg" 
                      alt="LinkedIn" 
                      width={24} 
                      height={24} 
                      className="icon _24px"
                    />
                  </div>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="vertical_block gap_32 left flex-stretch" style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary">Description</div>
                  <h4 style={{ lineHeight: "1.5" }}>Charge Ventures is a venture capital firm based in New York that invests in early stage B2B companies.</h4>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary">Location</div>
                  <h4><span>📍</span> New York, New York, United States</h4>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary">Invest in regions</div>
                  <div className="details-wrap">
                    <div className="tag_block black">
                      <div>US / Canada</div>
                    </div>
                  </div>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary">Invest in stages</div>
                  <div className="details-wrap">
                    <div className="tag_block black">
                      <div>Pre-seed</div>
                    </div>
                    <div className="tag_block black">
                      <div>Seed</div>
                    </div>
                    <div className="tag_block black">
                      <div>Series A</div>
                    </div>
                  </div>
                </div>
                <div className="vertical_block gap-8 left-align">
                  <div className="paragraph_m secondary">Invest in industries</div>
                  <div className="details-wrap">
                    <div className="tag_block black">
                      <div>Real Estate</div>
                    </div>
                    <div className="tag_block black">
                      <div>Healthcare</div>
                    </div>
                    <div className="tag_block black">
                      <div>Fintech</div>
                    </div>
                    <div className="tag_block black">
                      <div>SaaS</div>
                    </div>
                    <div className="tag_block black">
                      <div>AI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden_block" style={{ display: "block" }}>
          <div className="section_block">
            <h3>Organization</h3>
            <div className="special_block_small_table_row">
              
              <div className="vertical_block gap_4 layout_align_left" style={{ width: "calc(100% - 64px)" }}>
                <div className="horizontal_block gap_4" style={{ width: "100%" }}>
                  <h4 style={{ whiteSpace: "nowrap" }}>Charge Ventures</h4>
                  <Image 
                    src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b102d6c31f1714085135d9_Icon%20(2).svg" 
                    alt="Verified" 
                    width={20} 
                    height={20} 
                    className="icon _20px"
                  />
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
                  Charge Ventures is a venture capital firm based in New York that invests in early stage companies.
                </div>
              </div>
            </div>
            <div className="horizontal_block mobile_vertical">
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3>2015</h3>
                <h4 className="secondary">Founded</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3>55</h3>
                <h4 className="secondary">Investments</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3>5</h3>
                <h4 className="secondary">Lead rounds</h4>
              </div>
              <div className="vertical_block gap_8 layout_align_left flex_grow">
                <h3>9</h3>
                <h4 className="secondary">Exits</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden_block" style={{ display: "block" }}>
          <div className="section_block">
            <h3>Colleagues</h3>
            <div className="special_block_small_table_row">
              <div className="special_block_logo_first_characters _48px">CH</div>
              <div className="vertical_block gap_4 layout_align_left">
                <div className="horizontal_block gap_4">
                  <h5>Chris Habachy</h5>
                  <Image 
                    src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/65b102d6c31f1714085135d9_Icon%20(2).svg" 
                    alt="Verified" 
                    width={20} 
                    height={20} 
                    className="icon _20px"
                  />
                </div>
                <div className="investor-description text-ellipsis">General Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

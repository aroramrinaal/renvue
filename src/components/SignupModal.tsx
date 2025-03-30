import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'founder' | 'investor'>('founder');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // Add refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLImageElement>(null);

  const handleTabChange = (tab: 'founder' | 'investor') => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
    // Focus the name input when opening the email form
    setTimeout(() => {
      if (!showEmailForm && nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 100);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus the close button when modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowEmailForm(false);
      setFormData({ name: '', email: '', password: '' });
    }
  }, [isOpen]);

  const isFormValid = formData.name && formData.email && formData.password.length >= 6;

  if (!isOpen) return null;

  return (
    <div className="popup_app sign_up_to_continue" 
      style={{ 
        opacity: 1, 
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={(e) => {
        // Close modal when clicking overlay
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="popup-notification-block" 
        ref={modalRef}
        style={{ 
          maxWidth: "480px", 
          width: "90%",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          animation: "fadeIn 0.3s ease" 
        }}
      >
        <div className="horizontal_block layout_justify_stretch">
          <h3 style={{ margin: 0 }}>Sign up to continue</h3>
          <Image 
            src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/645ce56c63c336b15acc80cf_Cancel.svg" 
            alt="Close" 
            width={24} 
            height={24} 
            onClick={onClose}
            ref={closeButtonRef}
            className="icon _24px left-align pointer"
            style={{ cursor: "pointer" }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClose();
              }
            }}
          />
        </div>

        <div className="vertical_block gap_24 align-stretch" style={{ marginTop: "24px" }}>
          <div className="tab_panel_select_block flex_align_center" style={{ 
            borderRadius: "10px", 
            overflow: "hidden",
            backgroundColor: "#f5f5f5"
          }}>
            <div 
              className={`tab_panel_selector_button ${activeTab === 'founder' ? 'current' : ''}`}
              onClick={() => handleTabChange('founder')}
              tabIndex={0}
              role="tab"
              aria-selected={activeTab === 'founder'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTabChange('founder');
                }
              }}
              style={{ 
                cursor: "pointer", 
                fontWeight: activeTab === 'founder' ? 600 : 400,
                transition: "all 0.2s ease"
              }}
            >
              I'm a founder
            </div>
            <div 
              className={`tab_panel_selector_button ${activeTab === 'investor' ? 'current' : ''}`}
              onClick={() => handleTabChange('investor')}
              tabIndex={0}
              role="tab"
              aria-selected={activeTab === 'investor'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTabChange('investor');
                }
              }}
              style={{ 
                cursor: "pointer", 
                fontWeight: activeTab === 'investor' ? 600 : 400,
                transition: "all 0.2s ease"
              }}
            >
              I'm an investor
            </div>
          </div>
          
          <div className="vertical_block stretch">
            {!showEmailForm ? (
              <div className="special_block_auth_basic_block">
                <div 
                  className="secondary_button" 
                  tabIndex={0}
                  role="button"
                  style={{ 
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "12px",
                    transition: "all 0.2s ease",
                    border: "1px solid #EFEFEF"
                  }}
                >
                  <div className="horizontal_block gap-6">
                    <Image 
                      src="https://cdn.prod.website-files.com/645ce56c63c3364f2fcc8080/645ce56c63c3362493cc8113_icon.png" 
                      alt="Google" 
                      width={20} 
                      height={20} 
                      className="image-20px"
                    />
                    <div>Continue with Google</div>
                  </div>
                </div>
                <div className="horizontal_block flex_align_stretch" style={{ margin: "20px 0" }}>
                  <div className="divider flex_align_center" style={{ backgroundColor: "#EFEFEF", height: "1px" }}></div>
                  <div className="paragraph_s secondary-color" style={{ margin: "0 10px" }}>or</div>
                  <div className="divider flex_align_center" style={{ backgroundColor: "#EFEFEF", height: "1px" }}></div>
                </div>
                <div 
                  className="primary_button" 
                  onClick={toggleEmailForm}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleEmailForm();
                    }
                  }}
                  style={{
                    backgroundColor: "#f13505",
                    color: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "background-color 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  Sign up with email
                </div>
              </div>
            ) : (
              <div className="special_block_auth_email_pass_block">
                <div className="vertical_block gap-8 left-align stretch">
                  <div className="paragraph_s medium">Name</div>
                  <input 
                    className="input_default" 
                    placeholder="What's your name?" 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    ref={nameInputRef}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #D9DBE9",
                      fontSize: "16px",
                      width: "100%",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div className="vertical_block gap-8 left-align stretch" style={{ marginTop: "16px" }}>
                  <div className="paragraph_s medium">Email</div>
                  <input 
                    className="input_default" 
                    placeholder="Email address" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #D9DBE9",
                      fontSize: "16px",
                      width: "100%",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div className="vertical_block gap-8 left-align stretch" style={{ marginTop: "16px" }}>
                  <div className="paragraph_s medium">Password</div>
                  <input 
                    className="input_default" 
                    placeholder="Enter password" 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #D9DBE9",
                      fontSize: "16px",
                      width: "100%",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div 
                  className={`primary_button l ${!isFormValid ? 'disabled' : ''}`}
                  tabIndex={isFormValid ? 0 : -1}
                  role="button"
                  aria-disabled={!isFormValid}
                  onKeyDown={(e) => {
                    if (isFormValid && (e.key === 'Enter' || e.key === ' ')) {
                      // Submit form logic here
                    }
                  }}
                  style={{
                    backgroundColor: isFormValid ? "#0070F3" : "#B3B3B3",
                    color: "white",
                    padding: "14px",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                    fontWeight: 500,
                    marginTop: "24px",
                    transition: "background-color 0.2s ease",
                    boxShadow: isFormValid ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                  }}
                >
                  <div>Create account</div>
                </div>
                <div 
                  onClick={toggleEmailForm}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleEmailForm();
                    }
                  }}
                  style={{ 
                    textAlign: "center", 
                    marginTop: "16px", 
                    color: "#0070F3", 
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  ← Back to sign up options
                </div>
              </div>
            )}
          </div>
          
          <div className="paragraph_m center_align" style={{ marginTop: "16px" }}>
            Already have an account? <span style={{ color: "#0070F3", cursor: "pointer", fontWeight: 500 }}>Sign in</span>
          </div>
          <div className="paragraph_s center_align secondary" style={{ fontSize: "12px", color: "#6E7191" }}>
            Clicking "Create account" or "Continue with Google" means that you're okay with our Terms and Privacy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 
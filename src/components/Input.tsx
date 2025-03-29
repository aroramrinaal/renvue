import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
}

const Input = ({ onChange, value, error }: InputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(70, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  // Use media query to determine if we should render input or textarea
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsLargeScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <StyledWrapper className="w-full max-w-3xl mx-auto">
      <div>
        <div className="galaxy" />
        <div id="search-container">
          <div className="nebula" />
          <div className="starfield" />
          <div className="cosmic-dust" />
          <div className="cosmic-dust" />
          <div className="cosmic-dust" />
          <div className="stardust" />
          <div className="cosmic-ring" />
          <div id="main">
            {isLargeScreen ? (
              <textarea 
                ref={textareaRef}
                className={`input ${error ? 'error' : ''}`}
                name="text" 
                placeholder="Enter your idea..." 
                onChange={onChange as any}
                value={value}
                rows={1}
                style={{ resize: 'none' }}
              />
            ) : (
              <input 
                className={`input ${error ? 'error' : ''}`} 
                name="text" 
                type="text" 
                placeholder="Enter your idea..." 
                onChange={onChange as any} 
                value={value}
              />
            )}
            <div id="input-mask" />
            <div id="cosmic-glow" />
            <div className="wormhole-border" />
            <div id="wormhole-icon">
              <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="#a9c7ff" fill="none" height={24} width={24} viewBox="0 0 24 24">
                <circle r={10} cy={12} cx={12} />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div id="search-icon">
              <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="url(#cosmic-search)" fill="none" height={24} width={24} viewBox="0 0 24 24">
                <circle r={8} cy={11} cx={11} />
                <line y2="16.65" x2="16.65" y1={21} x1={21} />
                <defs>
                  <linearGradient gradientTransform="rotate(45)" id="cosmic-search">
                    <stop stopColor="#a9c7ff" offset="0%" />
                    <stop stopColor="#6e8cff" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .galaxy {
    height: 1000px;
    width: 1000px;
    background-image: radial-gradient(#ffffff 1px, transparent 1px),
      radial-gradient(#ffffff 1px, transparent 1px);
    background-size: 50px 50px;
    background-position:
      0 0,
      25px 25px;
    position: absolute;
    z-index: -1;
    animation: twinkle 5s infinite;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .stardust,
  .cosmic-ring,
  .starfield,
  .nebula {
    max-height: 70px;
    max-width: 314px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    border-radius: 12px;
    filter: blur(3px);
  }

  .input {
    background-color: rgba(5, 7, 27, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(169, 199, 255, 0.1);
    width: 100%;
    min-height: 65px;
    border-radius: 35px;
    color: #a9c7ff;
    padding: 14px 70px;
    font-size: 24px;
    transition: all 0.3s ease;
    box-shadow: 0 0 30px rgba(77, 109, 255, 0.1);
  }

  .input:focus {
    border-color: rgba(169, 199, 255, 0.3);
    box-shadow: 0 0 40px rgba(77, 109, 255, 0.2);
    outline: none;
  }

  #search-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input::placeholder {
    color: #6e8cff;
  }

  #main:focus-within > #input-mask {
    display: none;
  }

  #input-mask {
    display: none;
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, #05071b);
    top: 18px;
    left: 120px;
  }

  #cosmic-glow {
    pointer-events: none;
    width: 40px;
    height: 30px;
    position: absolute;
    background: #4d6dff;
    top: 10px;
    left: 5px;
    filter: blur(20px);
    opacity: 0.9;
    transition: all 2s;
  }

  #main:hover > #cosmic-glow {
    opacity: 0;
  }

  .stardust {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
  }

  .stardust::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0) 0%,
      #4d6dff,
      rgba(0, 0, 0, 0) 8%,
      rgba(0, 0, 0, 0) 50%,
      #6e8cff,
      rgba(0, 0, 0, 0) 58%
    );
    transition: all 2s;
  }

  .cosmic-ring {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
  }

  .cosmic-ring::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #05071b,
      #4d6dff 5%,
      #05071b 14%,
      #05071b 50%,
      #6e8cff 60%,
      #05071b 64%
    );
    transition: all 2s;
  }

  .starfield {
    max-height: 65px;
    max-width: 312px;
  }

  .starfield::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #1c2452,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 50%,
      #2a3875,
      rgba(0, 0, 0, 0) 60%
    );
    transition: all 2s;
  }

  #search-container:hover > .starfield::before {
    transform: translate(-50%, -50%) rotate(-98deg);
  }

  #search-container:hover > .nebula::before {
    transform: translate(-50%, -50%) rotate(-120deg);
  }

  #search-container:hover > .stardust::before {
    transform: translate(-50%, -50%) rotate(-97deg);
  }

  #search-container:hover > .cosmic-ring::before {
    transform: translate(-50%, -50%) rotate(-110deg);
  }

  #search-container:focus-within > .starfield::before {
    transform: translate(-50%, -50%) rotate(442deg);
    transition: all 4s;
  }

  #search-container:focus-within > .nebula::before {
    transform: translate(-50%, -50%) rotate(420deg);
    transition: all 4s;
  }

  #search-container:focus-within > .stardust::before {
    transform: translate(-50%, -50%) rotate(443deg);
    transition: all 4s;
  }

  #search-container:focus-within > .cosmic-ring::before {
    transform: translate(-50%, -50%) rotate(430deg);
    transition: all 4s;
  }

  .nebula {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
  }

  .nebula:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #000,
      #4d6dff 5%,
      #000 38%,
      #000 50%,
      #6e8cff 60%,
      #000 87%
    );
    transition: all 2s;
  }

  #wormhole-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    max-height: 40px;
    max-width: 40px;
    height: 100%;
    width: 100%;
    isolation: isolate;
    overflow: hidden;
    border-radius: 12px;
    background: linear-gradient(180deg, #1c2452, #05071b, #2a3875);
    border: 1px solid transparent;
    transform: scale(1.2);
  }

  .wormhole-border {
    height: 42px;
    width: 42px;
    position: absolute;
    overflow: hidden;
    top: 14px;
    right: 14px;
    border-radius: 12px;
  }

  .wormhole-border::before {
    content: "";
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #4d6dff,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 50%,
      #6e8cff,
      rgba(0, 0, 0, 0) 100%
    );
    animation: rotate 4s linear infinite;
  }

  #main {
    position: relative;
  }

  #search-icon {
    position: absolute;
    left: 25px;
    top: 22px;
    transform: scale(1.2);
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(450deg);
    }
  }

  .input.error {
    border-color: rgba(248, 113, 113, 0.4);
    box-shadow: 0 0 30px rgba(248, 113, 113, 0.2);
  }

  .input.error:focus {
    border-color: rgba(248, 113, 113, 0.6);
    box-shadow: 0 0 40px rgba(248, 113, 113, 0.3);
  }

  @media (min-width: 1024px) {
    .input {
      min-width: 600px;
      max-width: 800px;
      resize: none;
      overflow: hidden;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    textarea.input {
      display: block;
      padding-top: 20px;
      &:not(.expanded) {
        padding-top: 15px;
      }
    }

    .stardust,
    .cosmic-ring,
    .starfield,
    .nebula {
      max-width: 500px;
    }

    .nebula {
      max-width: 540px;
    }
  }
`;

export default Input;

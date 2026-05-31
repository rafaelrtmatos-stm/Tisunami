import React, { useState } from 'react';

interface TsunamiLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  imgStyle?: React.CSSProperties;
}

export function TsunamiLogo({ size = 160, showText = true, className = "", imgStyle }: TsunamiLogoProps) {
  // Logic to detect if the user has uploaded the real PNG logo asset (e.g. logo.png or tsunami_logo.png) (without editing/vectorizing)
  // If the PNG file is uploaded, the image loads automatically. If it fails, it uses the high-fidelity SVG fallback.
  const [useSvgFallback, setUseSvgFallback] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  const handleImageError = () => {
    if (logoSrc === '/logo.png') {
      setLogoSrc('/tsunami_logo.png');
    } else {
      setUseSvgFallback(true);
    }
  };

  if (!useSvgFallback) {
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        <img 
          src={logoSrc} 
          alt="Tsunami Distribuidora Logo" 
          onError={handleImageError} 
          className="object-contain"
          style={{ width: size, height: showText ? size * 1.05 : size, ...imgStyle }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: showText ? size * 1.25 : size }}
    >
      {/* 3D Wave Circle Seal Emblem */}
      <div 
        className="relative rounded-full flex items-center justify-center filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)] transform hover:scale-105 transition-transform duration-300 ease-out"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="sealGoldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEE685" />
              <stop offset="70%" stopColor="#FCD535" />
              <stop offset="100%" stopColor="#D9A406" />
            </radialGradient>
            
            <radialGradient id="skyGrad" cx="70%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#E5B20D" />
            </radialGradient>

            <linearGradient id="waveDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1D3A" />
              <stop offset="100%" stopColor="#1E3E62" />
            </linearGradient>

            <linearGradient id="waveMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="waveLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="bubbleGrad" x1="30%" y1="30%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            <linearGradient id="goldButtonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF1BE" />
              <stop offset="50%" stopColor="#FCD535" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>

            <filter id="shadowBlend" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
            </filter>

            <filter id="softOuterShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#091428" floodOpacity="0.5" />
            </filter>
            
            {/* Path for curved DIISTIBBIIDORA text */}
            <path 
              id="textPathRibbon" 
              d="M 33,142 A 81,81 0 0,0 167,142" 
              fill="none"
            />
          </defs>

          {/* BACKGROUND CIRCLE STACK */}
          {/* Outer Border ring (Dark Blue / Gold contour) */}
          <circle cx="100" cy="100" r="94" fill="url(#sealGoldGrad)" stroke="#091428" strokeWidth="4" />
          <circle cx="100" cy="100" r="88" fill="#091428" />
          <circle cx="100" cy="100" r="82" fill="url(#skyGrad)" />

          {/* Circular yellow concentric background contour rings for the 3D clay look */}
          <circle cx="100" cy="100" r="70" fill="none" stroke="#D9A406" strokeWidth="2" strokeDasharray="3,6" opacity="0.4" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="1,4" opacity="0.5" />

          {/* 30 DECORATIVE SECTORS (Contour dashed dots on right edge) */}
          <circle cx="142" cy="74" r="2.5" fill="#B45309" opacity="0.6" />
          <circle cx="146" cy="82" r="2" fill="#B45309" opacity="0.6" />
          <circle cx="148" cy="90" r="1.5" fill="#B45309" opacity="0.6" />

          {/* 3D WHITE SPHERE / MOON (Right-mid background in logo) */}
          <g filter="url(#shadowBlend)">
            <circle cx="138" cy="85" r="13" fill="url(#bubbleGrad)" stroke="#091428" strokeWidth="2.5" />
            <circle cx="134" cy="81" r="4" fill="#FFFFFF" opacity="0.75" />
          </g>

          {/* THE TSUNAMI WAVE (Highly layered to resemble the Japanese / 3D design) */}
          
          {/* Wave Layer 1: Deep Blue Shadow Back Wave */}
          <path 
            d="M 22,118 Q 44,70 70,80 T 115,55 Q 132,45 152,65 T 180,105 L 180,140 L 22,140 Z" 
            fill="url(#waveDeep)" 
            opacity="0.95"
            stroke="#091428"
            strokeWidth="2.5"
          />

          {/* Wave Layer 2: Main Blue Body */}
          <path 
            d="M 21,126 Q 48,82 76,92 T 116,68 Q 130,55 146,72 T 180,116 L 180,145 L 21,145 Z" 
            fill="url(#waveMid)" 
            stroke="#091428"
            strokeWidth="2"
          />

          {/* Wave Layer 3: Light Blue Highlights & Curling Creases */}
          <path 
            d="M 24,136 Q 52,98 80,104 T 120,78 Q 134,66 148,85 T 179,124 L 179,150 L 24,150 Z" 
            fill="url(#waveLight)" 
          />

          {/* Wave Layer 4: Stylized Foam Curls or overlapping White Crest (Wave Crest) */}
          {/* Big crest folding left and creating white froth splash */}
          <g filter="url(#shadowBlend)">
            <path 
              d="M 32,130 C 48,110 65,85 85,85 C 98,85 110,95 115,82 C 120,70 110,55 98,46 C 85,36 65,42 50,56 C 42,64 36,74 38,88 Q 39,94 37,112 Z" 
              fill="url(#foamGrad)" 
              stroke="#091428" 
              strokeWidth="2.5" 
            />
            {/* Foam curly details */}
            <circle cx="86" cy="74" r="5" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="98" cy="65" r="7" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="112" cy="56" r="6" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="72" cy="72" r="5" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="56" cy="64" r="6" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="45" cy="55" r="5.5" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
            <circle cx="38" cy="46" r="4.5" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
          </g>

          {/* Overlapping small foam elements in front */}
          <path 
            d="M 115,82 Q 126,90 142,85 Q 150,81 146,75 Q 138,70 128,78 Z" 
            fill="#FFFFFF" 
            stroke="#091428" 
            strokeWidth="1.5" 
          />

          {/* Dynamic foam splashes on the left */}
          <circle cx="28" cy="62" r="3.5" fill="#FFFFFF" stroke="#091428" strokeWidth="1.5" />
          <circle cx="34" cy="45" r="2.5" fill="#FFFFFF" stroke="#091428" strokeWidth="1" />
          <circle cx="20" cy="85" r="2.5" fill="#FFFFFF" stroke="#091428" strokeWidth="1" />
          <circle cx="16" cy="105" r="3" fill="#FFFFFF" stroke="#091428" strokeWidth="1" />

          {/* BOTTOM CURVED RIBBON FOR Subtext */}
          <g filter="url(#shadowBlend)">
            {/* Dark Blue Ribbon Banner contour */}
            <path 
              d="M 23,126 C 23,126 50,150 100,150 C 150,150 177,126 177,126 C 177,126 182,152 165,166 C 148,180 100,180 100,180 C 100,180 52,180 35,166 C 18,152 23,126 23,126 Z" 
              fill="#091428" 
              stroke="url(#sealGoldGrad)" 
              strokeWidth="2.5" 
            />
          </g>

          {/* Ribbon Inner Dark Blue path where DIISTIBBIIDORA text goes */}
          <path 
            d="M 33,138 C 33,138 55,158 100,158 C 145,158 167,138 167,138 C 167,138 171,154 158,164 C 145,174 100,174 100,174 C 100,174 55,174 42,164 C 29,154 33,138 33,138 Z" 
            fill="#0B1D3A" 
          />

          {/* Text DIISTIBBIIDORA Spelled uniquely matching AI logo art */}
          <text fontFamily="var(--font-sans), system-ui, sans-serif" fontSize="8" fontWeight="800" fill="#FCD535" letterSpacing="2.8">
            <textPath href="#textPathRibbon" startOffset="50%" textAnchor="middle">
              DIISTIBBIIDORA
            </textPath>
          </text>
        </svg>

        {/* 
          Floating Tusnami Text Ribbon (overrides the svg flat rendering to render a beautiful 
          chunky 3D CSS title that pops upwards overlapping the circle, matching the exact logo design!) 
        */}
        <div 
          className="absolute bottom-[-10px] w-[130%] flex flex-col items-center justify-center pointer-events-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)]"
          style={{ transform: `scale(${size / 160}) translateY(${size * 0.05}px)` }}
        >
          {/* Main 3D Text Header "Tsunami" spelling from logo */}
          <div className="relative font-extrabold uppercase select-none flex justify-center text-center">
            {/* Background duplicate elements to simulate the chunky 3D blue outline */}
            <span className="text-3xl tracking-tighter text-[#091428]" style={{ WebkitTextStroke: '10px #091428' }}>
              Tsunami
            </span>
            <span 
              className="absolute inset-0 text-3xl tracking-tighter bg-gradient-to-b from-[#FFF2B2] via-[#FCD535] to-[#B45309] bg-clip-text text-transparent" 
              style={{ 
                WebkitTextStroke: '2px #091428', 
                textShadow: '0 2px 0 #D9A406, 0 4px 6px rgba(0,0,0,0.4)',
                transform: 'translateY(-1px)'
              }}
            >
              Tsunami
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface AnimatedAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ 
  size = 'md', 
  showName = false, 
  className = '' 
}) => {
  const { currentAvatar } = useTheme();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const generateAvatarSVG = () => {
    const [color1, color2, color3] = currentAvatar.colors;
    const animationClass = `avatar-${currentAvatar.animation}`;
    
    return `
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="${animationClass}">
        <defs>
          <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${color2};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color3};stop-opacity:1" />
          </linearGradient>
          <filter id="avatar-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="avatar-shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Background Circle -->
        <circle cx="50" cy="50" r="45" fill="url(#avatar-grad)" filter="url(#avatar-shadow)">
          ${currentAvatar.animation === 'bounce' ? '<animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2s" repeatCount="indefinite"/>' : ''}
          ${currentAvatar.animation === 'glow' ? '<animate attributeName="r" values="45;48;45" dur="3s" repeatCount="indefinite"/>' : ''}
          ${currentAvatar.animation === 'pulse' ? '<animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>' : ''}
        </circle>
        
        <!-- Face Base -->
        <circle cx="50" cy="50" r="35" fill="rgba(255,255,255,0.9)" opacity="0.8"/>
        
        <!-- Eyes -->
        <circle cx="40" cy="42" r="4" fill="white">
          ${currentAvatar.animation === 'blink' ? '<animate attributeName="ry" values="4;0.5;4" dur="4s" repeatCount="indefinite"/>' : ''}
        </circle>
        <circle cx="60" cy="42" r="4" fill="white">
          ${currentAvatar.animation === 'blink' ? '<animate attributeName="ry" values="4;0.5;4" dur="4s" repeatCount="indefinite"/>' : ''}
        </circle>
        <circle cx="40" cy="42" r="2" fill="black"/>
        <circle cx="60" cy="42" r="2" fill="black"/>
        
        <!-- Nose -->
        <ellipse cx="50" cy="50" rx="1.5" ry="2" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Mouth -->
        <path d="M 42 58 Q 50 65 58 58" stroke="${color1}" stroke-width="2" fill="none">
          ${currentAvatar.animation === 'smile' ? '<animate attributeName="d" values="M 42 58 Q 50 65 58 58;M 42 60 Q 50 67 58 60;M 42 58 Q 50 65 58 58" dur="3s" repeatCount="indefinite"/>' : ''}
        </path>
        
        <!-- Category-specific features -->
        ${currentAvatar.category === 'Fantasy' ? `
          <!-- Crown/Halo -->
          <polygon points="50,15 52,25 62,25 54,32 57,42 50,36 43,42 46,32 38,25 48,25" fill="${color3}" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="10s" repeatCount="indefinite"/>
          </polygon>
        ` : ''}
        
        ${currentAvatar.category === 'Gaming' ? `
          <!-- Gaming Headset -->
          <rect x="25" y="20" width="50" height="8" fill="${color2}" rx="4">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          </rect>
          <circle cx="20" cy="24" r="8" fill="${color2}" opacity="0.8"/>
          <circle cx="80" cy="24" r="8" fill="${color2}" opacity="0.8"/>
        ` : ''}
        
        ${currentAvatar.category === 'Professional' ? `
          <!-- Tie -->
          <polygon points="50,65 45,70 45,85 55,85 55,70" fill="${color2}"/>
          <rect x="40" y="65" width="20" height="5" fill="${color3}"/>
        ` : ''}
        
        ${currentAvatar.category === 'Anime' ? `
          <!-- Anime Hair -->
          <path d="M 20 30 Q 30 10 50 15 Q 70 10 80 30 Q 75 25 50 20 Q 25 25 20 30" fill="${color2}">
            <animate attributeName="d" values="M 20 30 Q 30 10 50 15 Q 70 10 80 30 Q 75 25 50 20 Q 25 25 20 30;M 22 28 Q 32 8 50 13 Q 68 8 78 28 Q 73 23 50 18 Q 27 23 22 28;M 20 30 Q 30 10 50 15 Q 70 10 80 30 Q 75 25 50 20 Q 25 25 20 30" dur="4s" repeatCount="indefinite"/>
          </path>
        ` : ''}
        
        ${currentAvatar.category === 'Pets' ? `
          <!-- Animal Ears -->
          <ellipse cx="35" cy="25" rx="8" ry="12" fill="${color2}" transform="rotate(-30 35 25)"/>
          <ellipse cx="65" cy="25" rx="8" ry="12" fill="${color2}" transform="rotate(30 65 25)"/>
          ${currentAvatar.animation === 'wag' ? `
            <animateTransform attributeName="transform" type="rotate" values="-30 35 25;-20 35 25;-30 35 25" dur="1s" repeatCount="indefinite"/>
          ` : ''}
        ` : ''}
        
        <!-- Special Effects -->
        ${currentAvatar.animation === 'sparkle' ? `
          <g opacity="0.8">
            <polygon points="20,20 22,25 27,25 23,28 25,33 20,30 15,33 17,28 13,25 18,25" fill="white">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
            </polygon>
            <polygon points="80,30 82,35 87,35 83,38 85,43 80,40 75,43 77,38 73,35 78,35" fill="white">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
            </polygon>
            <polygon points="30,80 32,85 37,85 33,88 35,93 30,90 25,93 27,88 23,85 28,85" fill="white">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
            </polygon>
          </g>
        ` : ''}
        
        ${currentAvatar.animation === 'fire' ? `
          <g opacity="0.7">
            <ellipse cx="30" cy="20" rx="3" ry="8" fill="#ff4757">
              <animate attributeName="ry" values="8;12;8" dur="1s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="50" cy="15" rx="4" ry="10" fill="#ff6348">
              <animate attributeName="ry" values="10;15;10" dur="1.2s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="70" cy="20" rx="3" ry="8" fill="#ff4757">
              <animate attributeName="ry" values="8;12;8" dur="0.8s" repeatCount="indefinite"/>
            </ellipse>
          </g>
        ` : ''}
        
        ${currentAvatar.animation === 'rgb' ? `
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#avatar-grad)" stroke-width="4" opacity="0.6">
            <animate attributeName="stroke" values="${color1};${color2};${color3};${color1}" dur="2s" repeatCount="indefinite"/>
          </circle>
        ` : ''}
      </svg>
    `;
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <div 
        className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg"
        dangerouslySetInnerHTML={{ __html: generateAvatarSVG() }}
      />
      {showName && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
          {currentAvatar.name}
        </div>
      )}
    </div>
  );
};
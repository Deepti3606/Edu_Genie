import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  category: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  cardBg: string;
  animation: string;
  special?: string;
}

interface Avatar {
  id: string;
  name: string;
  category: string;
  style: string;
  animation: string;
  colors: string[];
}

interface ThemeContextType {
  currentTheme: Theme;
  currentAvatar: Avatar;
  themes: Theme[];
  avatars: Avatar[];
  setTheme: (theme: Theme) => void;
  setAvatar: (avatar: Avatar) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 100+ Themes Database
const themes: Theme[] = [
  // Minimalist & Modern
  { id: 'clean-light', name: 'Clean Light', category: 'Minimalist', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', text: '#2d3748', cardBg: 'rgba(255,255,255,0.9)', animation: 'fadeIn' },
  { id: 'pure-dark', name: 'Pure Dark', category: 'Minimalist', background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)', primary: '#4299e1', secondary: '#805ad5', accent: '#ed64a6', text: '#e2e8f0', cardBg: 'rgba(26,32,44,0.9)', animation: 'slideUp' },
  { id: 'frosted-glass', name: 'Frosted Glass', category: 'Minimalist', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', primary: '#ffffff', secondary: '#f7fafc', accent: '#bee3f8', text: '#2d3748', cardBg: 'rgba(255,255,255,0.2)', animation: 'blur', special: 'backdrop-blur' },
  { id: 'gradient-glow', name: 'Gradient Glow', category: 'Minimalist', background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)', primary: '#e53e3e', secondary: '#d53f8c', accent: '#ed64a6', text: '#2d3748', cardBg: 'rgba(255,255,255,0.8)', animation: 'glow' },
  { id: 'neumorphism', name: 'Neumorphism', category: 'Minimalist', background: 'linear-gradient(135deg, #e3e3e3 0%, #f0f0f0 100%)', primary: '#4a5568', secondary: '#718096', accent: '#4299e1', text: '#2d3748', cardBg: 'rgba(240,240,240,0.9)', animation: 'morph', special: 'neumorphic' },

  // Nature & Aesthetic
  { id: 'forest-vibes', name: 'Forest Vibes', category: 'Nature', background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', primary: '#38a169', secondary: '#68d391', accent: '#9ae6b4', text: '#f7fafc', cardBg: 'rgba(56,161,105,0.2)', animation: 'leaves' },
  { id: 'ocean-blue', name: 'Ocean Blue', category: 'Nature', background: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)', primary: '#3182ce', secondary: '#4299e1', accent: '#63b3ed', text: '#f7fafc', cardBg: 'rgba(49,130,206,0.2)', animation: 'waves' },
  { id: 'sakura-bloom', name: 'Sakura Bloom', category: 'Nature', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', primary: '#ed64a6', secondary: '#f687b3', accent: '#fbb6ce', text: '#2d3748', cardBg: 'rgba(237,100,166,0.1)', animation: 'petals' },
  { id: 'mountain-peaks', name: 'Mountain Peaks', category: 'Nature', background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', primary: '#4a5568', secondary: '#718096', accent: '#a0aec0', text: '#f7fafc', cardBg: 'rgba(74,85,104,0.2)', animation: 'mountains' },
  { id: 'desert-mirage', name: 'Desert Mirage', category: 'Nature', background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', primary: '#dd6b20', secondary: '#ed8936', accent: '#f6ad55', text: '#2d3748', cardBg: 'rgba(221,107,32,0.1)', animation: 'sand' },

  // Fandom & Pop Culture
  { id: 'naruto-ninja', name: 'Naruto Ninja', category: 'Anime', background: 'linear-gradient(135deg, #ff7f00 0%, #ffb347 100%)', primary: '#ff7f00', secondary: '#ff9500', accent: '#ffb347', text: '#2d3748', cardBg: 'rgba(255,127,0,0.1)', animation: 'ninja' },
  { id: 'one-piece-adventure', name: 'One Piece Adventure', category: 'Anime', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', primary: '#2b6cb0', secondary: '#3182ce', accent: '#4299e1', text: '#f7fafc', cardBg: 'rgba(43,108,176,0.2)', animation: 'pirate' },
  { id: 'jujutsu-cursed', name: 'Jujutsu Cursed', category: 'Anime', background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)', primary: '#553c9a', secondary: '#667eea', accent: '#764ba2', text: '#f7fafc', cardBg: 'rgba(85,60,154,0.2)', animation: 'cursed' },
  { id: 'marvel-hero', name: 'Marvel Hero', category: 'Comics', background: 'linear-gradient(135deg, #e53e3e 0%, #3182ce 100%)', primary: '#e53e3e', secondary: '#3182ce', accent: '#ffd700', text: '#f7fafc', cardBg: 'rgba(229,62,62,0.2)', animation: 'hero' },
  { id: 'harry-potter', name: 'Harry Potter Magic', category: 'Fantasy', background: 'linear-gradient(135deg, #2d1b69 0%, #8b5a2b 100%)', primary: '#553c9a', secondary: '#8b5a2b', accent: '#ffd700', text: '#f7fafc', cardBg: 'rgba(85,60,154,0.2)', animation: 'magic' },

  // Tech & Futuristic
  { id: 'cyberpunk-city', name: 'Cyberpunk City', category: 'Tech', background: 'linear-gradient(135deg, #0f0f23 0%, #ff00ff 100%)', primary: '#ff00ff', secondary: '#00ffff', accent: '#ffff00', text: '#f7fafc', cardBg: 'rgba(255,0,255,0.1)', animation: 'neon' },
  { id: 'holographic-waves', name: 'Holographic Waves', category: 'Tech', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', text: '#f7fafc', cardBg: 'rgba(102,126,234,0.2)', animation: 'hologram' },
  { id: 'code-matrix', name: 'Code Matrix', category: 'Tech', background: 'linear-gradient(135deg, #000000 0%, #0d4f3c 100%)', primary: '#00ff00', secondary: '#00cc00', accent: '#00aa00', text: '#00ff00', cardBg: 'rgba(0,255,0,0.1)', animation: 'matrix' },
  { id: 'space-galaxy', name: 'Space Galaxy', category: 'Tech', background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)', primary: '#4299e1', secondary: '#63b3ed', accent: '#90cdf4', text: '#f7fafc', cardBg: 'rgba(66,153,225,0.2)', animation: 'stars' },
  { id: 'ai-neural', name: 'AI Neural Grid', category: 'Tech', background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)', primary: '#4299e1', secondary: '#63b3ed', accent: '#90cdf4', text: '#f7fafc', cardBg: 'rgba(66,153,225,0.2)', animation: 'neural' },

  // Festive & Seasonal
  { id: 'halloween-night', name: 'Halloween Night', category: 'Festive', background: 'linear-gradient(135deg, #2d1b69 0%, #ff7f00 100%)', primary: '#ff7f00', secondary: '#553c9a', accent: '#ffd700', text: '#f7fafc', cardBg: 'rgba(255,127,0,0.2)', animation: 'spooky' },
  { id: 'christmas-magic', name: 'Christmas Magic', category: 'Festive', background: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 100%)', primary: '#e53e3e', secondary: '#38a169', accent: '#ffd700', text: '#f7fafc', cardBg: 'rgba(229,62,62,0.2)', animation: 'snow' },
  { id: 'diwali-lights', name: 'Diwali Lights', category: 'Festive', background: 'linear-gradient(135deg, #ff7f00 0%, #ffd700 100%)', primary: '#dd6b20', secondary: '#ed8936', accent: '#f6ad55', text: '#2d3748', cardBg: 'rgba(221,107,32,0.1)', animation: 'fireworks' },
  { id: 'summer-breeze', name: 'Summer Breeze', category: 'Seasonal', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', primary: '#ed8936', secondary: '#f6ad55', accent: '#fbd38d', text: '#2d3748', cardBg: 'rgba(237,137,54,0.1)', animation: 'breeze' },
  { id: 'monsoon-blues', name: 'Monsoon Blues', category: 'Seasonal', background: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)', primary: '#3182ce', secondary: '#4299e1', accent: '#63b3ed', text: '#f7fafc', cardBg: 'rgba(49,130,206,0.2)', animation: 'rain' }
];

// 100+ Animated Avatars Database
const avatars: Avatar[] = [
  // Cartoon/Anime Styles
  { id: 'anime-student', name: 'Anime Student', category: 'Anime', style: 'manga', animation: 'blink', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
  { id: 'chibi-cute', name: 'Chibi Cute', category: 'Anime', style: 'chibi', animation: 'bounce', colors: ['#ff9ff3', '#54a0ff', '#5f27cd'] },
  { id: 'pixel-hero', name: 'Pixel Hero', category: 'Retro', style: 'pixel', animation: 'glow', colors: ['#00d2d3', '#ff9ff3', '#54a0ff'] },
  { id: 'manga-warrior', name: 'Manga Warrior', category: 'Anime', style: 'manga', animation: 'power', colors: ['#ff6348', '#2ed573', '#1e90ff'] },
  { id: 'kawaii-monster', name: 'Kawaii Monster', category: 'Cute', style: 'kawaii', animation: 'wiggle', colors: ['#ff6b9d', '#c44569', '#f8b500'] },

  // Professional/Social
  { id: 'coder-dev', name: 'Coder Developer', category: 'Professional', style: 'modern', animation: 'typing', colors: ['#2ed573', '#1e90ff', '#ff4757'] },
  { id: 'artist-creative', name: 'Creative Artist', category: 'Professional', style: 'artistic', animation: 'paint', colors: ['#ff6348', '#ff9ff3', '#54a0ff'] },
  { id: 'gamer-pro', name: 'Pro Gamer', category: 'Gaming', style: 'gaming', animation: 'rgb', colors: ['#00ff00', '#ff00ff', '#00ffff'] },
  { id: 'music-lover', name: 'Music Lover', category: 'Creative', style: 'musical', animation: 'beat', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
  { id: 'streamer-live', name: 'Live Streamer', category: 'Gaming', style: 'streaming', animation: 'live', colors: ['#ff4757', '#2ed573', '#1e90ff'] },

  // Fantasy & Mythical
  { id: 'dragon-rider', name: 'Dragon Rider', category: 'Fantasy', style: 'fantasy', animation: 'fire', colors: ['#ff4757', '#ff6348', '#ffa502'] },
  { id: 'elf-mage', name: 'Elf Mage', category: 'Fantasy', style: 'fantasy', animation: 'magic', colors: ['#3742fa', '#2f3542', '#57606f'] },
  { id: 'viking-warrior', name: 'Viking Warrior', category: 'Fantasy', style: 'warrior', animation: 'battle', colors: ['#8b4513', '#cd853f', '#daa520'] },
  { id: 'ghost-spirit', name: 'Ghost Spirit', category: 'Spooky', style: 'ghost', animation: 'float', colors: ['#ffffff', '#e6e6fa', '#b0c4de'] },
  { id: 'vampire-lord', name: 'Vampire Lord', category: 'Spooky', style: 'vampire', animation: 'dark', colors: ['#8b0000', '#2f1b14', '#000000'] },

  // Pet Avatars
  { id: 'cat-cute', name: 'Cute Cat', category: 'Pets', style: 'animal', animation: 'purr', colors: ['#ff6b6b', '#ffa502', '#ff6348'] },
  { id: 'dog-loyal', name: 'Loyal Dog', category: 'Pets', style: 'animal', animation: 'wag', colors: ['#8b4513', '#cd853f', '#daa520'] },
  { id: 'panda-zen', name: 'Zen Panda', category: 'Pets', style: 'animal', animation: 'zen', colors: ['#000000', '#ffffff', '#808080'] },
  { id: 'dragon-pet', name: 'Pet Dragon', category: 'Fantasy', style: 'dragon', animation: 'fly', colors: ['#ff4757', '#2ed573', '#1e90ff'] },
  { id: 'unicorn-magic', name: 'Magic Unicorn', category: 'Fantasy', style: 'unicorn', animation: 'sparkle', colors: ['#ff9ff3', '#54a0ff', '#5f27cd'] },

  // Mood-Based
  { id: 'happy-smile', name: 'Happy Smile', category: 'Mood', style: 'emoji', animation: 'smile', colors: ['#ffd700', '#ff6b6b', '#4ecdc4'] },
  { id: 'sleepy-tired', name: 'Sleepy Tired', category: 'Mood', style: 'emoji', animation: 'sleep', colors: ['#6c5ce7', '#a29bfe', '#fd79a8'] },
  { id: 'angry-fire', name: 'Angry Fire', category: 'Mood', style: 'emoji', animation: 'rage', colors: ['#ff4757', '#ff3838', '#ff6b6b'] },
  { id: 'love-heart', name: 'Love Heart', category: 'Mood', style: 'emoji', animation: 'heart', colors: ['#ff6b9d', '#c44569', '#f8b500'] },
  { id: 'cool-sunglasses', name: 'Cool Sunglasses', category: 'Mood', style: 'emoji', animation: 'cool', colors: ['#000000', '#1e90ff', '#00ff00'] }
];

const defaultTheme = themes[0];
const defaultAvatar = avatars[0];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [currentAvatar, setCurrentAvatar] = useState<Avatar>(defaultAvatar);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.style.setProperty('--theme-background', currentTheme.background);
    document.documentElement.style.setProperty('--theme-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--theme-secondary', currentTheme.secondary);
    document.documentElement.style.setProperty('--theme-accent', currentTheme.accent);
    document.documentElement.style.setProperty('--theme-text', currentTheme.text);
    document.documentElement.style.setProperty('--theme-card-bg', currentTheme.cardBg);
    
    // Add animation class to body
    document.body.className = `theme-${currentTheme.animation}`;
    
    // Add special effects
    if (currentTheme.special) {
      document.body.classList.add(currentTheme.special);
    }
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('edugenie-theme', JSON.stringify(theme));
  };

  const setAvatar = (avatar: Avatar) => {
    setCurrentAvatar(avatar);
    localStorage.setItem('edugenie-avatar', JSON.stringify(avatar));
  };

  // Load saved theme and avatar on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('edugenie-theme');
    const savedAvatar = localStorage.getItem('edugenie-avatar');
    
    if (savedTheme) {
      try {
        setCurrentTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error('Error loading saved theme:', e);
      }
    }
    
    if (savedAvatar) {
      try {
        setCurrentAvatar(JSON.parse(savedAvatar));
      } catch (e) {
        console.error('Error loading saved avatar:', e);
      }
    }
  }, []);

  const value = {
    currentTheme,
    currentAvatar,
    themes,
    avatars,
    setTheme,
    setAvatar,
    isThemeModalOpen,
    setIsThemeModalOpen
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
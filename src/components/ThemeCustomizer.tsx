import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, User, X, Search, Star, Download, Upload, Sparkles } from 'lucide-react';

export const ThemeCustomizer: React.FC = () => {
  const { 
    currentTheme, 
    currentAvatar, 
    themes, 
    avatars, 
    setTheme, 
    setAvatar, 
    isThemeModalOpen, 
    setIsThemeModalOpen 
  } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'themes' | 'avatars'>('themes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const themeCategories = ['All', 'Minimalist', 'Nature', 'Anime', 'Comics', 'Fantasy', 'Tech', 'Festive', 'Seasonal'];
  const avatarCategories = ['All', 'Anime', 'Professional', 'Fantasy', 'Pets', 'Mood', 'Gaming', 'Creative', 'Cute', 'Spooky', 'Retro'];

  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || theme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAvatars = avatars.filter(avatar => {
    const matchesSearch = avatar.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || avatar.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const generateAvatarSVG = (avatar: any) => {
    const [color1, color2, color3] = avatar.colors;
    
    return `
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${avatar.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${color2};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color3};stop-opacity:1" />
          </linearGradient>
          <filter id="glow-${avatar.id}">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Base Circle -->
        <circle cx="30" cy="30" r="25" fill="url(#grad-${avatar.id})" filter="url(#glow-${avatar.id})">
          <animate attributeName="r" values="25;27;25" dur="2s" repeatCount="indefinite"/>
        </circle>
        
        <!-- Eyes -->
        <circle cx="22" cy="25" r="3" fill="white">
          <animate attributeName="ry" values="3;0.5;3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="38" cy="25" r="3" fill="white">
          <animate attributeName="ry" values="3;0.5;3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="22" cy="25" r="1.5" fill="black"/>
        <circle cx="38" cy="25" r="1.5" fill="black"/>
        
        <!-- Mouth -->
        <path d="M 25 35 Q 30 40 35 35" stroke="white" stroke-width="2" fill="none">
          <animate attributeName="d" values="M 25 35 Q 30 40 35 35;M 25 37 Q 30 42 35 37;M 25 35 Q 30 40 35 35" dur="4s" repeatCount="indefinite"/>
        </path>
        
        <!-- Special Effects based on category -->
        ${avatar.category === 'Fantasy' ? `
          <polygon points="30,10 32,16 38,16 33,20 35,26 30,22 25,26 27,20 22,16 28,16" fill="${color3}" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0 30 30;360 30 30" dur="8s" repeatCount="indefinite"/>
          </polygon>
        ` : ''}
        
        ${avatar.category === 'Gaming' ? `
          <rect x="15" y="8" width="30" height="4" fill="${color2}" rx="2">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
          </rect>
        ` : ''}
        
        ${avatar.category === 'Professional' ? `
          <rect x="20" y="45" width="20" height="8" fill="${color2}" rx="2"/>
        ` : ''}
      </svg>
    `;
  };

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Customize Your Experience</h2>
              <p className="text-gray-600">Choose from 100+ themes and animated avatars</p>
            </div>
          </div>
          <button
            onClick={() => setIsThemeModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'themes'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Palette className="h-5 w-5 inline mr-2" />
            Themes ({themes.length})
          </button>
          <button
            onClick={() => setActiveTab('avatars')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'avatars'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <User className="h-5 w-5 inline mr-2" />
            Avatars ({avatars.length})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {(activeTab === 'themes' ? themeCategories : avatarCategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'themes' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setTheme(theme)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg ${
                    currentTheme.id === theme.id ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <div
                    className="h-32 p-4 flex flex-col justify-between"
                    style={{ background: theme.background }}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      {currentTheme.id === theme.id && (
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: theme.text }}>
                        {theme.name}
                      </h3>
                      <p className="text-xs opacity-75" style={{ color: theme.text }}>
                        {theme.category}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  onClick={() => setAvatar(avatar)}
                  className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                    currentAvatar.id === avatar.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-16 h-16 rounded-full overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: generateAvatarSVG(avatar) }}
                    />
                    <div className="text-center">
                      <h3 className="font-medium text-xs text-gray-800">{avatar.name}</h3>
                      <p className="text-xs text-gray-500">{avatar.category}</p>
                    </div>
                    {currentAvatar.id === avatar.id && (
                      <Star className="h-4 w-4 text-purple-500 fill-current" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <strong>Current:</strong> {currentTheme.name} + {currentAvatar.name}
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button
                onClick={() => setIsThemeModalOpen(false)}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
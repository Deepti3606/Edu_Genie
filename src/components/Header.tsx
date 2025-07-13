import React from 'react';
import { BookOpen, Sparkles, User, LogOut, BarChart3, Users, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AnimatedAvatar } from './AnimatedAvatar';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const { setIsThemeModalOpen } = useTheme();
  const location = useLocation();

  return (
    <header className="relative z-20 bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduGenie
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Lesson Plans</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {userProfile && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors ${
                    location.pathname === '/dashboard' ? 'text-blue-600' : ''
                  }`}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link 
                  to="/groups" 
                  className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors ${
                    location.pathname === '/groups' ? 'text-blue-600' : ''
                  }`}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Groups
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <AnimatedAvatar size="sm" />
                    <span className="text-sm text-gray-600">{userProfile.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      userProfile.role === 'teacher' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {userProfile.role}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsThemeModalOpen(true)}
                    className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                    title="Customize Theme & Avatar"
                  >
                    <Palette className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={logout}
                    className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
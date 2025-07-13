import React from 'react';
import { BookOpen, Users, Target, Clock, Award, Lightbulb } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-float">
        <BookOpen className="h-8 w-8 text-blue-300 opacity-30" />
      </div>
      <div className="absolute top-40 right-20 animate-float delay-1000">
        <Users className="h-6 w-6 text-green-300 opacity-30" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float delay-2000">
        <Target className="h-7 w-7 text-purple-300 opacity-30" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float delay-3000">
        <Clock className="h-6 w-6 text-orange-300 opacity-30" />
      </div>
      <div className="absolute top-60 left-1/3 animate-float delay-4000">
        <Award className="h-5 w-5 text-pink-300 opacity-30" />
      </div>
      <div className="absolute bottom-60 right-1/3 animate-float delay-5000">
        <Lightbulb className="h-6 w-6 text-yellow-300 opacity-30" />
      </div>
      
      {/* Floating Bubbles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-200 rounded-full opacity-20 animate-bubble"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-200 rounded-full opacity-20 animate-bubble delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-200 rounded-full opacity-20 animate-bubble delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-orange-200 rounded-full opacity-20 animate-bubble delay-3000"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-10 animate-pulse delay-2000"></div>
    </div>
  );
};
import React from 'react';
import { BookOpen, Users, Target, Clock, Sparkles } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-purple-200 animate-spin animate-reverse"></div>
            <div className="absolute inset-4 rounded-full border-4 border-pink-200 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-blue-600 animate-pulse" />
            </div>
          </div>
          
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
            <Sparkles className="h-4 w-4 text-pink-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          EduGenie is Creating Your Lesson Plan
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our AI is carefully crafting a personalized lesson plan with activities, 
          assessments, and resources tailored to your students.
        </p>
        
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Target className="h-5 w-5 text-blue-600 animate-pulse" />
            <span>Learning Objectives</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5 text-green-600 animate-pulse delay-150" />
            <span>Activities</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5 text-orange-600 animate-pulse delay-300" />
            <span>Assessment</span>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"></div>
        </div>
        
        <p className="text-gray-500 mt-4 text-sm">
          This usually takes 2-3 seconds...
        </p>
      </div>
    </div>
  );
};
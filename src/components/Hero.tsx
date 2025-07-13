import React from 'react';
import { Wand2, Users, Clock, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Transform Teaching with AI
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate comprehensive, engaging lesson plans in seconds. 
            Save time, boost creativity, and inspire your students with EduGenie.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white/20">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Wand2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced AI creates personalized lessons tailored to your students' needs</p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white/20">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Grade-Specific</h3>
              <p className="text-gray-600">Customized content for every grade level and learning style</p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white/20">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Time-Saving</h3>
              <p className="text-gray-600">Generate complete lessons in minutes, not hours</p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white/20">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">High-Quality</h3>
              <p className="text-gray-600">Professional-grade lesson plans with activities and assessments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
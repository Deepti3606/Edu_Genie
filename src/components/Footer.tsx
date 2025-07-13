import React from 'react';
import { Github, Linkedin, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduGenie
            </h3>
            <p className="text-gray-300 mb-4">
              Empowering educators and students with AI-powered lesson plans, quizzes, and learning resources. 
              Making education more accessible, engaging, and effective for everyone.
            </p>
            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://github.com/Deepti3606"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5 mr-3" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/deepti-shah-757970262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EduGenie. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Deepti Shah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
import React, { useState } from 'react';
import { Download, Share2, Edit, ArrowLeft, Clock, Users, Target, CheckCircle, Play, BookOpen, MessageCircle, Youtube } from 'lucide-react';
import { LessonPlan } from '../types/LessonPlan';
import { LoadingAnimation } from './LoadingAnimation';
import { QuizComponent } from './Quiz/QuizComponent';
import { PDFGenerator } from './PDFGenerator';
import { DoubtResolver } from './DoubtResolver';
import { VideoPlayer } from './VideoPlayer';

interface LessonPlanResultsProps {
  lessonPlan: LessonPlan | null;
  isGenerating: boolean;
  videos?: any[];
  quiz?: any;
  onGenerateNew: () => void;
}

export const LessonPlanResults: React.FC<LessonPlanResultsProps> = ({
  lessonPlan,
  isGenerating,
  videos = [],
  quiz,
  onGenerateNew
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDoubtResolver, setShowDoubtResolver] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (isGenerating) {
    return <LoadingAnimation />;
  }

  if (!lessonPlan) {
    return null;
  }

  // Mock enhanced lesson plan data
  const enhancedLessonPlan = {
    ...lessonPlan,
    amazingFacts: [
      `Did you know that ${lessonPlan.topic} is used in many everyday applications?`,
      `Scientists have been studying ${lessonPlan.topic} for over 100 years!`,
      `The principles of ${lessonPlan.topic} can be found in nature everywhere`,
      `Modern technology heavily relies on understanding ${lessonPlan.topic}`,
      `${lessonPlan.topic} connects to many other subjects like math, science, and art`
    ],
    jokes: [
      `Why did the student love learning about ${lessonPlan.topic}? Because it was absolutely fascinating!`,
      `What did the teacher say about ${lessonPlan.topic}? "It's not just a subject, it's an adventure!"`,
      `How do you make ${lessonPlan.topic} more interesting? Add some fun facts and jokes!`
    ],
    quotes: [
      `"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela`,
      `"The beautiful thing about learning is that no one can take it away from you." - B.B. King`,
      `"Learning never exhausts the mind." - Leonardo da Vinci`
    ],
    notes: `
# ${lessonPlan.topic} - Complete Study Notes

## Introduction
${lessonPlan.topic} is a fascinating subject that connects to many aspects of our daily lives. Understanding these concepts will help you see the world in a new way!

## Key Concepts
- Fundamental principles of ${lessonPlan.topic}
- Real-world applications and examples
- Historical development and importance
- Modern innovations and discoveries

## Important Points to Remember
1. ${lessonPlan.topic} is everywhere around us
2. It connects to other subjects like mathematics and science
3. Understanding it helps in problem-solving
4. It has practical applications in technology

## Fun Facts 🌟
- ${lessonPlan.topic} has been studied for centuries
- Many famous scientists contributed to our understanding
- It's used in cutting-edge technology today
- You can see examples in nature and everyday life

## Study Tips
- Practice regularly with examples
- Connect concepts to real-world situations
- Ask questions when you don't understand
- Work with classmates to discuss ideas

## Remember This Quote
"${lessonPlan.topic} is not just about memorizing facts, it's about understanding how the world works!"
    `
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{lessonPlan.topic}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-blue-600" />
                  {lessonPlan.grade}
                </span>
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-1 text-green-600" />
                  {lessonPlan.subject}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-orange-600" />
                  {lessonPlan.duration} minutes
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0 flex-wrap">
              <button
                onClick={onGenerateNew}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                New Plan
              </button>
              <PDFGenerator lessonPlan={enhancedLessonPlan} quiz={quiz} videos={videos} />
              {quiz && !showQuiz && (
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take Quiz (10 MCQs)
                </button>
              )}
              <button 
                onClick={() => setShowDoubtResolver(!showDoubtResolver)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI
              </button>
              <button 
                onClick={() => setShowVideos(!showVideos)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                <Youtube className="h-4 w-4 mr-2" />
                Videos
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        {showQuiz && quiz && (
          <div className="mb-8">
            <QuizComponent 
              quiz={quiz}
              lessonPlanId={lessonPlan.id}
              onComplete={(score, total) => {
                setQuizCompleted(true);
                setShowQuiz(false);
              }}
            />
          </div>
        )}

        {/* Doubt Resolver Section */}
        {showDoubtResolver && (
          <div className="mb-8">
            <DoubtResolver />
          </div>
        )}

        {/* Video Player Section */}
        {showVideos && (
          <div className="mb-8">
            <VideoPlayer videos={videos} topic={lessonPlan.topic} />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Complete Study Notes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Complete Study Notes
              </h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {enhancedLessonPlan.notes}
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Learning Objectives
              </h2>
              <div className="space-y-3">
                {lessonPlan.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amazing Facts */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🌟 Amazing Facts About {lessonPlan.topic}
              </h2>
              <div className="space-y-3">
                {enhancedLessonPlan.amazingFacts.map((fact, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3">✨</span>
                    <span className="text-gray-700 font-medium">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Learning Moments */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                😄 Fun Learning Moments
              </h2>
              <div className="space-y-3">
                {enhancedLessonPlan.jokes.map((joke, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3">😂</span>
                    <span className="text-gray-700 italic">{joke}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspiring Quotes */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                💭 Inspiring Quotes
              </h2>
              <div className="space-y-4">
                {enhancedLessonPlan.quotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-4 border-green-500 pl-4 italic text-gray-700 font-medium">
                    {quote}
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Lesson Structure */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-orange-600" />
                Lesson Structure
              </h2>
              <div className="space-y-4">
                {lessonPlan.lessonStructure.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-gray-800">{section.section}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {section.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {section.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full flex items-center px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Take Quiz</p>
                    <p className="text-sm">10 MCQs • 1 mark each</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowDoubtResolver(!showDoubtResolver)}
                  className="w-full flex items-center px-4 py-3 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Ask AI Doubts</p>
                    <p className="text-sm">Get instant answers</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowVideos(!showVideos)}
                  className="w-full flex items-center px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <Youtube className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Watch Videos</p>
                    <p className="text-sm">Educational content</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Activities</h2>
              <div className="space-y-4">
                {lessonPlan.activities.map((activity, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{activity.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resources</h2>
              <div className="space-y-3">
                {lessonPlan.resources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-3">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">{resource.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        resource.type === 'video' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {resource.type}
                      </span>
                      {resource.duration && (
                        <span className="text-xs text-gray-500">{resource.duration}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Homework */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Homework</h2>
              <div className="space-y-2">
                {lessonPlan.homework.map((task, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Study Tips</h2>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-lg mr-2">💡</span>
                  <span className="text-gray-700 text-sm">Practice regularly with examples</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">🔗</span>
                  <span className="text-gray-700 text-sm">Connect concepts to real-world situations</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">❓</span>
                  <span className="text-gray-700 text-sm">Ask questions when you don't understand</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">👥</span>
                  <span className="text-gray-700 text-sm">Discuss with classmates and teachers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
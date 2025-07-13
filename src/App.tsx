import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { SupabaseSetup } from './components/SupabaseSetup';
import { Hero } from './components/Hero';
import { LessonPlanForm } from './components/LessonPlanForm';
import { LessonPlanResults } from './components/LessonPlanResults';
import { FloatingElements } from './components/FloatingElements';
import { LoginForm } from './components/Auth/LoginForm';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { GroupManagement } from './components/Groups/GroupManagement';
import { AdBanner } from './components/AdBanner';
import { DoubtResolver } from './components/DoubtResolver';
import { Footer } from './components/Footer';
import { LessonPlan } from './types/LessonPlan';
import { generateLessonPlan, searchYouTubeVideos, generateQuiz } from './services/aiService';

const AppContent: React.FC = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [videos, setVideos] = useState([]);
  const [quiz, setQuiz] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EduGenie...</p>
        </div>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return <SupabaseSetup />;
  }

  if (!user) {
    return <LoginForm onToggleMode={() => setIsSignUp(!isSignUp)} isSignUp={isSignUp} />;
  }
  const handleGenerateLessonPlan = async (formData: {
    subject: string;
    grade: string;
    topic: string;
    duration: string;
  }) => {
    setIsGenerating(true);
    
    try {
      // Generate lesson plan using AI
      const aiLessonPlan = await generateLessonPlan(formData);
      
      // Search for relevant YouTube videos
      const youtubeVideos = await searchYouTubeVideos(formData.topic, formData.grade);
      setVideos(youtubeVideos);
      
      // Generate quiz
      const aiQuiz = await generateQuiz(formData.topic, formData.grade);
      setQuiz(aiQuiz);
      
      // Create lesson plan object
      const newLessonPlan: LessonPlan = {
        id: Date.now().toString(),
        topic: formData.topic,
        subject: formData.subject,
        grade: formData.grade,
        duration: formData.duration,
        learningObjectives: aiLessonPlan.learningObjectives || [],
        lessonStructure: aiLessonPlan.lessonStructure || [],
        activities: aiLessonPlan.activities || [],
        assessmentQuestions: aiQuiz.multipleChoice || [],
        resources: youtubeVideos.map(video => ({
          type: 'video' as const,
          title: video.title,
          url: video.url,
          description: video.description
        })),
        homework: aiLessonPlan.homework || [],
        createdAt: new Date()
      };
      
      setLessonPlan(newLessonPlan);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      // Fallback to mock data if AI fails
      const mockLessonPlan: LessonPlan = {
        id: Date.now().toString(),
        topic: formData.topic,
        subject: formData.subject,
        grade: formData.grade,
        duration: formData.duration,
        learningObjectives: [
          `Understand the fundamental concepts of ${formData.topic}`,
          `Apply ${formData.topic} principles to real-world scenarios`,
          `Analyze and evaluate different aspects of ${formData.topic}`,
          `Create connections between ${formData.topic} and other subjects`
        ],
        lessonStructure: [
          {
            section: 'Introduction & Warm-up',
            duration: '10 minutes',
            activities: [
              'Quick review of previous lesson',
              'Introduce today\'s topic with an engaging question',
              'Share learning objectives with students'
            ]
          }
        ],
        activities: [],
        assessmentQuestions: [],
        resources: [],
        homework: [],
        createdAt: new Date()
      };
      setLessonPlan(mockLessonPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10">
        <Header />
        <AdBanner />
        
        <Routes>
          <Route path="/" element={
            !lessonPlan && !isGenerating ? (
              <>
                <Hero />
                <LessonPlanForm onSubmit={handleGenerateLessonPlan} />
              </>
            ) : (
              <LessonPlanResults 
                lessonPlan={lessonPlan}
                isGenerating={isGenerating}
                videos={videos}
                quiz={quiz}
                onGenerateNew={() => {
                  setLessonPlan(null);
                  setIsGenerating(false);
                  setVideos([]);
                  setQuiz(null);
                }}
              />
            )
          } />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/groups" element={<GroupManagement />} />
        </Routes>
        
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
          <ThemeCustomizer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
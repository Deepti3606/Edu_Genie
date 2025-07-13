import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, Trophy, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface QuizComponentProps {
  quiz: any;
  lessonPlanId: string;
  onComplete: (score: number, totalQuestions: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, lessonPlanId, onComplete }) => {
  const { userProfile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = quiz.multipleChoice || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmitQuiz = async () => {
    const correctCount = calculateScore();
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    
    setCorrectAnswers(correctCount);
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);

    // Save quiz result to database
    if (supabase && userProfile) {
      try {
        await supabase
          .from('quiz_results')
          .insert({
            user_id: userProfile.id,
            lesson_plan_id: lessonPlanId,
            score: finalScore,
            total_questions: totalQuestions,
            answers: answers
          });
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    onComplete(finalScore, totalQuestions);
  };

  const getScoreMessage = () => {
    if (score >= 90) return { message: "Outstanding! 🌟", color: "text-green-600", icon: Trophy };
    if (score >= 80) return { message: "Excellent work! 🎉", color: "text-blue-600", icon: Award };
    if (score >= 70) return { message: "Good job! 👍", color: "text-yellow-600", icon: Star };
    if (score >= 60) return { message: "Keep practicing! 📚", color: "text-orange-600", icon: CheckCircle };
    return { message: "Don't give up! Try again! 💪", color: "text-red-600", icon: XCircle };
  };

  if (showResults) {
    const scoreInfo = getScoreMessage();
    const IconComponent = scoreInfo.icon;

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="text-center mb-8">
          <IconComponent className={`h-20 w-20 mx-auto mb-4 ${scoreInfo.color}`} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
          <p className={`text-2xl font-bold ${scoreInfo.color} mb-2`}>{scoreInfo.message}</p>
          <p className="text-xl text-gray-600">Your Score: {score}% ({correctAnswers}/{totalQuestions})</p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-6 rounded-xl text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 font-bold text-2xl">{correctAnswers}</p>
            <p className="text-green-600 text-sm">Correct</p>
            <p className="text-green-600 text-xs">{correctAnswers} marks</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-red-600 font-bold text-2xl">{totalQuestions - correctAnswers}</p>
            <p className="text-red-600 text-sm">Incorrect</p>
            <p className="text-red-600 text-xs">0 marks</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-600 font-bold text-2xl">{totalQuestions}</p>
            <p className="text-blue-600 text-sm">Total</p>
            <p className="text-blue-600 text-xs">Max: {totalQuestions} marks</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review:</h3>
          {questions.map((question: any, index: number) => {
            const isCorrect = answers[index] === question.correctAnswer;
            return (
              <div key={index} className={`border-2 rounded-xl p-4 ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 flex-1">
                    Q{index + 1}: {question.question}
                  </h4>
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 ml-2" />
                  )}
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    Your answer: {answers[index] || 'Not answered'}
                  </p>
                  {!isCorrect && (
                    <p className="text-green-700">
                      Correct answer: {question.correctAnswer}
                    </p>
                  )}
                  {question.explanation && (
                    <p className="text-gray-600 italic mt-2">
                      💡 {question.explanation}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Analysis */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-800 mb-3">Performance Analysis:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-700">
                <strong>Accuracy:</strong> {score}%
              </p>
              <p className="text-blue-700">
                <strong>Questions Attempted:</strong> {answers.filter(a => a).length}/{totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-blue-700">
                <strong>Time Taken:</strong> {formatTime(1800 - timeLeft)}
              </p>
              <p className="text-blue-700">
                <strong>Grade:</strong> {score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  if (totalQuestions === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Quiz Available</h2>
        <p className="text-gray-600">Please generate a lesson plan first to access the quiz.</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
      {/* Quiz Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quiz Time! 📝</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {totalQuestions}</p>
          <p className="text-sm text-gray-500">Each correct answer = 1 mark</p>
        </div>
        <div className="text-center">
          <div className="flex items-center text-orange-600 mb-2">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
          </div>
          <p className="text-xs text-gray-500">Time remaining</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Multiple Choice Question
          </span>
          <span className="text-sm text-gray-500">
            {answers.filter(a => a).length}/{totalQuestions} answered
          </span>
        </div>
        
        <h3 className="text-xl font-medium text-gray-800 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.options.map((option: string, index: number) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = answers[currentQuestion] === option;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center font-bold ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {optionLetter}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isSelected && (
                    <CheckCircle className="h-5 w-5 text-blue-500 ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} / {totalQuestions}
          </span>
          
          <button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion]}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {currentQuestion === totalQuestions - 1 ? (
              <>
                <Award className="h-4 w-4 mr-2" />
                Submit Quiz
              </>
            ) : (
              'Next Question'
            )}
          </button>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-medium text-yellow-800 mb-2">📋 Quiz Instructions:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Each question has only one correct answer</li>
          <li>• Correct answer = 1 mark, Wrong answer = 0 marks</li>
          <li>• You can go back to previous questions</li>
          <li>• Make sure to answer all questions before time runs out</li>
        </ul>
      </div>
    </div>
  );
};
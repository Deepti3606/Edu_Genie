import React, { useState } from 'react';
import { Search, MessageCircle, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';
import { searchDoubt } from '../services/aiService';

export const DoubtResolver: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!question.trim()) return;

    setIsSearching(true);
    try {
      const result = await searchDoubt(question);
      setAnswer(result);
      
      // Add to search history
      const newSearch = {
        id: Date.now(),
        question,
        answer: result,
        timestamp: new Date()
      };
      setSearchHistory(prev => [newSearch, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Error searching doubt:', error);
      setAnswer({
        answer: "I'm sorry, I couldn't process your question right now. Please try again or rephrase your question.",
        relatedTopics: [],
        studyTips: []
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center mb-6">
        <HelpCircle className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">AI Doubt Resolver</h2>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any question or doubt you have..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !question.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Ask AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Display */}
      {answer && (
        <div className="mb-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <MessageCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-800 mb-3">AI Answer:</h3>
                <div className="text-blue-700 whitespace-pre-line leading-relaxed">
                  {answer.answer}
                </div>
              </div>
            </div>
          </div>

          {/* Study Tips */}
          {answer.studyTips && answer.studyTips.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">Study Tips:</h4>
              </div>
              <ul className="space-y-1">
                {answer.studyTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start text-green-700">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Topics */}
          {answer.relatedTopics && answer.relatedTopics.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-purple-800">Related Topics:</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {answer.relatedTopics.map((topic: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Questions:</h3>
          <div className="space-y-3">
            {searchHistory.map((search) => (
              <div
                key={search.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setQuestion(search.question);
                  setAnswer(search.answer);
                }}
              >
                <p className="font-medium text-gray-800 mb-1">{search.question}</p>
                <p className="text-sm text-gray-500">
                  {search.timestamp.toLocaleDateString()} at {search.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Help */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-medium text-yellow-800 mb-2">💡 How to ask better questions:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Be specific about what you don't understand</li>
          <li>• Mention your grade level for age-appropriate answers</li>
          <li>• Ask about real-world applications</li>
          <li>• Request examples or analogies</li>
        </ul>
      </div>
    </div>
  );
};
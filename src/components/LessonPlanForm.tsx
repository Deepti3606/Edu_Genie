import React, { useState } from 'react';
import { Send, BookOpen, Users, Clock, Target } from 'lucide-react';

interface LessonPlanFormProps {
  onSubmit: (formData: {
    subject: string;
    grade: string;
    topic: string;
    duration: string;
  }) => void;
}

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    duration: '60'
  });

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Art', 'Music', 'Physical Education'
  ];

  const grades = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.grade && formData.topic) {
      onSubmit(formData);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Create Your Lesson Plan</h3>
            <p className="text-gray-600 text-lg">Fill in the details and watch the magic happen!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  Grade Level
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  required
                >
                  <option value="">Select grade level</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Target className="h-4 w-4 mr-2 text-purple-600" />
                Topic
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Photosynthesis, Fractions, Shakespeare's Romeo and Juliet"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 mr-2 text-orange-600" />
                Lesson Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Generate Lesson Plan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
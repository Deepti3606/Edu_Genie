import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User, GraduationCap, Users } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignUp }) => {
  const { login, signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as 'teacher' | 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signup(formData.email, formData.password, formData.name, formData.role);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isSignUp ? 'Join EduGenie' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isSignUp ? 'Create your account to start learning' : 'Sign in to continue your learning journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock className="h-4 w-4 mr-2 text-blue-600" />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.role === 'student'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <GraduationCap className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'teacher' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.role === 'teacher'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Teacher</span>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
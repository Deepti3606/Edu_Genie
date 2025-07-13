import React, { useState } from 'react';
import { Database, Settings, CheckCircle, AlertCircle } from 'lucide-react';

export const SupabaseSetup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({
    url: '',
    anonKey: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <Database className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Set Up EduGenie Database
            </h1>
            <p className="text-gray-600">
              Let's configure Supabase to enable user authentication and data storage
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Create Supabase Project</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-2">Create Your Supabase Account</h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-700">
                      <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">supabase.com</a></li>
                      <li>Click "Start your project" and sign up with GitHub</li>
                      <li>Create a new project with these settings:</li>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Project name: <code className="bg-blue-100 px-2 py-1 rounded">EduGenie</code></li>
                        <li>Database password: Choose a strong password</li>
                        <li>Region: Select closest to your location</li>
                      </ul>
                      <li>Wait for the project to be created (2-3 minutes)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Next: Get Credentials
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Get Project Credentials</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Settings className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-800 mb-2">Copy Your Project Details</h3>
                    <ol className="list-decimal list-inside space-y-2 text-green-700">
                      <li>In your Supabase dashboard, go to <strong>Settings → API</strong></li>
                      <li>Copy the <strong>Project URL</strong></li>
                      <li>Copy the <strong>anon public</strong> key</li>
                      <li>Paste them in the fields below:</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={credentials.url}
                    onChange={(e) => setCredentials({ ...credentials, url: e.target.value })}
                    placeholder="https://your-project.supabase.co"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anon Key
                  </label>
                  <textarea
                    value={credentials.anonKey}
                    onChange={(e) => setCredentials({ ...credentials, anonKey: e.target.value })}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!credentials.url || !credentials.anonKey}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Set Up Database
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Set Up Database Schema</h2>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Database className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-purple-800 mb-2">Create Database Tables</h3>
                    <ol className="list-decimal list-inside space-y-2 text-purple-700">
                      <li>Go to your Supabase dashboard</li>
                      <li>Navigate to <strong>SQL Editor</strong></li>
                      <li>Copy and paste the SQL script below</li>
                      <li>Click <strong>Run</strong> to create all tables</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('teacher', 'student')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  usage_time INTEGER DEFAULT 0
);

-- Create lesson_plans table
CREATE TABLE IF NOT EXISTS lesson_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  topic TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_plan_id UUID REFERENCES lesson_plans(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group_members table
CREATE TABLE IF NOT EXISTS group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own lesson plans" ON lesson_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own lesson plans" ON lesson_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can manage own groups" ON groups
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Group members can read group info" ON groups
  FOR SELECT USING (
    auth.uid() = teacher_id OR 
    auth.uid() IN (
      SELECT student_id FROM group_members WHERE group_id = groups.id
    )
  );

CREATE POLICY "Group members can read membership" ON group_members
  FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() IN (
      SELECT teacher_id FROM groups WHERE id = group_members.group_id
    )
  );

CREATE POLICY "Teachers can manage group members" ON group_members
  FOR ALL USING (
    auth.uid() IN (
      SELECT teacher_id FROM groups WHERE id = group_members.group_id
    )
  );`}
                </pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Environment Variables</h4>
                    <p className="text-yellow-700 text-sm">
                      After running the SQL script, create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in your project root with:
                    </p>
                    <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded">
{`VITE_SUPABASE_URL=${credentials.url}
VITE_SUPABASE_ANON_KEY=${credentials.anonKey}
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
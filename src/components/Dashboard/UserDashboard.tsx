import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { BarChart3, Clock, Trophy, BookOpen, Users, Plus } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalQuizzes: 0,
    averageScore: 0,
    timeSpent: 0,
    groups: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (userProfile) {
      fetchUserStats();
      fetchRecentActivity();
    }
  }, [userProfile]);

  const fetchUserStats = async () => {
    if (!supabase) return;
    
    try {
      // Fetch lesson plans count
      const { count: lessonsCount } = await supabase
        .from('lesson_plans')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userProfile.id);

      // Fetch quiz results
      const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('score, total_questions')
        .eq('user_id', userProfile.id);

      // Calculate average score
      const averageScore = quizResults?.length > 0
        ? quizResults.reduce((sum, quiz) => sum + (quiz.score / quiz.total_questions * 100), 0) / quizResults.length
        : 0;

      // Fetch groups count
      let groupsCount = 0;
      if (userProfile.role === 'teacher') {
        const { count } = await supabase
          .from('groups')
          .select('*', { count: 'exact', head: true })
          .eq('teacher_id', userProfile.id);
        groupsCount = count || 0;
      } else {
        const { count } = await supabase
          .from('group_members')
          .select('*', { count: 'exact', head: true })
          .eq('student_id', userProfile.id);
        groupsCount = count || 0;
      }

      setStats({
        totalLessons: lessonsCount || 0,
        totalQuizzes: quizResults?.length || 0,
        averageScore: Math.round(averageScore),
        timeSpent: userProfile.usage_time || 0,
        groups: groupsCount
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    if (!supabase) return;
    
    try {
      const { data } = await supabase
        .from('lesson_plans')
        .select('*')
        .eq('user_id', userProfile.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentActivity(data || []);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {userProfile?.name}!
        </h1>
        <p className="text-gray-600">
          {userProfile?.role === 'teacher' ? 'Manage your lessons and students' : 'Continue your learning journey'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Lessons</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalLessons}</p>
            </div>
            <BookOpen className="h-12 w-12 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Quizzes Taken</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalQuizzes}</p>
            </div>
            <Trophy className="h-12 w-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-purple-600">{stats.averageScore}%</p>
            </div>
            <BarChart3 className="h-12 w-12 text-purple-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {userProfile?.role === 'teacher' ? 'Groups Created' : 'Groups Joined'}
              </p>
              <p className="text-3xl font-bold text-orange-600">{stats.groups}</p>
            </div>
            <Users className="h-12 w-12 text-orange-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Lesson
          </button>
        </div>

        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((lesson: any) => (
              <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.subject} • {lesson.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(lesson.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity. Create your first lesson plan!</p>
          </div>
        )}
      </div>
    </div>
  );
};
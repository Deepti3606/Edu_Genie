import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== '' && supabaseAnonKey !== '' &&
  supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 20;

// Create a comprehensive mock Supabase client for demo purposes
const createMockSupabaseClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ 
      data: { session: null }, 
      error: null 
    }),
    onAuthStateChange: (callback: any) => {
      // Simulate immediate auth state change for demo
      setTimeout(() => {
        callback('SIGNED_IN', {
          user: {
            id: 'demo-user-123',
            email: 'demo@edugenie.com',
            user_metadata: { name: 'Demo User' }
          }
        });
      }, 100);
      
      return { 
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        } 
      };
    },
    signInWithPassword: ({ email, password }: { email: string; password: string }) => {
      // Simulate successful login for demo
      return Promise.resolve({ 
        data: { 
          user: {
            id: 'demo-user-123',
            email: email,
            user_metadata: { name: email.split('@')[0] }
          },
          session: {
            access_token: 'demo-token',
            user: {
              id: 'demo-user-123',
              email: email
            }
          }
        }, 
        error: null 
      });
    },
    signUp: ({ email, password }: { email: string; password: string }) => {
      // Simulate successful signup for demo
      return Promise.resolve({ 
        data: { 
          user: {
            id: 'demo-user-' + Date.now(),
            email: email,
            user_metadata: { name: email.split('@')[0] }
          },
          session: {
            access_token: 'demo-token',
            user: {
              id: 'demo-user-' + Date.now(),
              email: email
            }
          }
        }, 
        error: null 
      });
    },
    signOut: () => Promise.resolve({ error: null })
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => {
          // Return mock user profile data
          if (table === 'users') {
            return Promise.resolve({
              data: {
                id: 'demo-user-123',
                email: 'demo@edugenie.com',
                name: 'Demo User',
                role: 'teacher',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                usage_time: 0
              },
              error: null
            });
          }
          return Promise.resolve({ data: null, error: null });
        },
        limit: (count: number) => Promise.resolve({ data: [], error: null })
      }),
      limit: (count: number) => Promise.resolve({ data: [], error: null })
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ data: null, error: null })
    })
  }
});

// Export either real Supabase client or mock client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();

export const isConfigured = isSupabaseConfigured;

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'teacher' | 'student';
          created_at: string;
          last_login: string;
          usage_time: number;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'teacher' | 'student';
          created_at?: string;
          last_login?: string;
          usage_time?: number;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'teacher' | 'student';
          created_at?: string;
          last_login?: string;
          usage_time?: number;
        };
      };
      lesson_plans: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          subject: string;
          grade: string;
          topic: string;
          content: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          subject: string;
          grade: string;
          topic: string;
          content: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          subject?: string;
          grade?: string;
          topic?: string;
          content?: any;
          created_at?: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          lesson_plan_id: string;
          score: number;
          total_questions: number;
          answers: any;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_plan_id: string;
          score: number;
          total_questions: number;
          answers: any;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_plan_id?: string;
          score?: number;
          total_questions?: number;
          answers?: any;
          completed_at?: string;
        };
      };
      groups: {
        Row: {
          id: string;
          teacher_id: string;
          name: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          name: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          name?: string;
          description?: string;
          created_at?: string;
        };
      };
      group_members: {
        Row: {
          id: string;
          group_id: string;
          student_id: string;
          joined_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          student_id: string;
          joined_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          student_id?: string;
          joined_at?: string;
        };
      };
    };
  };
};
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use fallback values
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://rkzxmezuvsctxwlhoewz.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrenhtZXp1dnNjdHh3bGhvZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTgwNDYsImV4cCI6MjA2NjE5NDA0Nn0.2zlPrYJ84sYWrUsv-sCdZ6PF92Awbf4jjEldasEoiYU';

// Create Supabase client with additional options for better error handling
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Helper function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase connection test failed:', err);
    return false;
  }
}; 
// Simple test to verify Supabase connection
// Run this with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rkzxmezuvsctxwlhoewz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrenhtZXp1dnNjdHh3bGhvZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTgwNDYsImV4cCI6MjA2NjE5NDA0Nn0.2zlPrYJ84sYWrUsv-sCdZ6PF92Awbf4jjEldasEoiYU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('URL:', SUPABASE_URL);
  console.log('Key:', SUPABASE_ANON_KEY.substring(0, 20) + '...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error);
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log('Response:', data);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

testConnection(); 
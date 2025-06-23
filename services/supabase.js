import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://rkzxmezuvsctxwlhoewz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrenhtZXp1dnNjdHh3bGhvZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTgwNDYsImV4cCI6MjA2NjE5NDA0Nn0.2zlPrYJ84sYWrUsv-sCdZ6PF92Awbf4jjEldasEoiYU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
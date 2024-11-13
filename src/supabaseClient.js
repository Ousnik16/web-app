// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gmeyjjswyclorcwyznnu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZXlqanN3eWNsb3Jjd3l6bm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjAwOTEsImV4cCI6MjA0Njk5NjA5MX0.4JOITktUlQsedJcNOw6745vhFmreE9HB7dH1fneC_w0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

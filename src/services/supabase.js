import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vwhmklxideitnerkdnco.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aG1rbHhpZGVpdG5lcmtkbmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NTYwMDAsImV4cCI6MjAxNTUzMjAwMH0.lG_QezoqrCxtMBQAH7GYxuehQmp-D-BTnP68yMvFL8U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

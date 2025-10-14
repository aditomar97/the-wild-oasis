import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hkzrumpnwutrbdhiefnt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJ1bXBud3V0cmJkaGllZm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwOTcwNzIsImV4cCI6MjA3NTY3MzA3Mn0.qjWONjswOmispJWDBP-osw8Ea-4izjoU41fH3u6EOQU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

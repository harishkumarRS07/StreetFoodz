// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrkjvoopgyaqezfhwmnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya2p2b29wZ3lhcWV6Zmh3bW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTA2MjMsImV4cCI6MjA0NTI2NjYyM30.3i03zU11ucm-hqukv8aEDQOc_iSyByh2gjCTw0_iZt0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

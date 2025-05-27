import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbrjiqhykltpwfepuuac.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicmppcWh5a2x0cHdmZXB1dWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDYyMTgsImV4cCI6MjA2MzgyMjIxOH0.YN646YdmxE52-ETSpTPHfV6rp0AjJEbRyV1N5y2oSTE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bjelnvpzsgtdilaxzyes.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWxudnB6c2d0ZGlsYXh6eWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzI3MTYsImV4cCI6MjA2ODM0ODcxNn0.3v4hdYbH2nSfIpHeV7nByu0R3P3fZCiXq3xybVGD2pM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

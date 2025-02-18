import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'supabase-auth-token',
    debug: import.meta.env.DEV,
    site_url: 'https://rahulvital.github.io/simple-vents-fe'
  },
  db: {
    schema: 'public',
    poolConfig: {
      pool: {
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
      }
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
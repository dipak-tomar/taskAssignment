import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://uxbhnqhqddttjynpuwxq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4YmhucWhxZGR0dGp5bnB1d3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTIzNDMsImV4cCI6MjA0NDU2ODM0M30.VvBDn-AoUF9Uv_3PMmWOalV3sCkqqCfOFC3HV22bAYU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

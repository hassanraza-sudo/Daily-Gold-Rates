import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface GoldRate {
  id: string;
  gold_24k: number;
  gold_22k: number;
  gold_18k: number;
  silver: number;
  created_at: string;
  is_current: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  slug: string;
  published: boolean;
  created_at: string;
}

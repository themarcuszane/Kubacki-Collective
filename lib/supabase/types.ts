export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avoid_keywords: string | null;
          created_at: string;
          full_name: string | null;
          must_have_keywords: string | null;
          preferred_locations: string | null;
          remote_preference: string | null;
          salary_max: number | null;
          salary_min: number | null;
          target_role: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avoid_keywords?: string | null;
          created_at?: string;
          full_name?: string | null;
          must_have_keywords?: string | null;
          preferred_locations?: string | null;
          remote_preference?: string | null;
          salary_max?: number | null;
          salary_min?: number | null;
          target_role?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avoid_keywords?: string | null;
          created_at?: string;
          full_name?: string | null;
          must_have_keywords?: string | null;
          preferred_locations?: string | null;
          remote_preference?: string | null;
          salary_max?: number | null;
          salary_min?: number | null;
          target_role?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

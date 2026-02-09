export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          content: string
          category: string
          author: string
          cover_image: string | null
          meta_title: string | null
          meta_description: string | null
          published: boolean
          featured: boolean
          read_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt: string
          content: string
          category: string
          author?: string
          cover_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published?: boolean
          featured?: boolean
          read_time?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string
          content?: string
          category?: string
          author?: string
          cover_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published?: boolean
          featured?: boolean
          read_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          before_image: string
          after_image: string
          treatment_slug: string | null
          patient_age: string | null
          patient_gender: string | null
          sessions_count: string | null
          published: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          before_image: string
          after_image: string
          treatment_slug?: string | null
          patient_age?: string | null
          patient_gender?: string | null
          sessions_count?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          before_image?: string
          after_image?: string
          treatment_slug?: string | null
          patient_age?: string | null
          patient_gender?: string | null
          sessions_count?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      clinic_updates: {
        Row: {
          id: string
          title: string
          content: string
          type: 'announcement' | 'offer' | 'news' | 'event'
          image: string | null
          link: string | null
          active: boolean
          starts_at: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          type?: 'announcement' | 'offer' | 'news' | 'event'
          image?: string | null
          link?: string | null
          active?: boolean
          starts_at?: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          type?: 'announcement' | 'offer' | 'news' | 'event'
          image?: string | null
          link?: string | null
          active?: boolean
          starts_at?: string
          expires_at?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          author_name: string
          rating: number
          text: string
          source: 'google' | 'practo' | 'manual'
          source_url: string | null
          treatment_category: string | null
          location: string | null
          approved: boolean
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          author_name: string
          rating: number
          text: string
          source?: 'google' | 'practo' | 'manual'
          source_url?: string | null
          treatment_category?: string | null
          location?: string | null
          approved?: boolean
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          rating?: number
          text?: string
          source?: 'google' | 'practo' | 'manual'
          source_url?: string | null
          treatment_category?: string | null
          location?: string | null
          approved?: boolean
          featured?: boolean
          created_at?: string
        }
      }
      social_links: {
        Row: {
          id: string
          platform: string
          url: string
          display_name: string | null
          enabled: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          id?: string
          platform: string
          url: string
          display_name?: string | null
          enabled?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          id?: string
          platform?: string
          url?: string
          display_name?: string | null
          enabled?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      update_type: 'announcement' | 'offer' | 'news' | 'event'
      review_source: 'google' | 'practo' | 'manual'
    }
  }
}

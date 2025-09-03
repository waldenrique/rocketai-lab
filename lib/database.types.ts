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
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          content: string
          image?: string
          author: string
          published_at: string
          updated_at: string
          published: boolean
          category: string
          tags: string[]
          reading_time: number
          seo_meta_title?: string
          seo_meta_description?: string
          seo_keywords: string[]
          seo_og_title?: string
          seo_og_description?: string
          seo_og_image?: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt: string
          content: string
          image?: string
          author: string
          published_at?: string
          updated_at?: string
          published?: boolean
          category: string
          tags?: string[]
          reading_time?: number
          seo_meta_title?: string
          seo_meta_description?: string
          seo_keywords?: string[]
          seo_og_title?: string
          seo_og_description?: string
          seo_og_image?: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string
          content?: string
          image?: string
          author?: string
          published_at?: string
          updated_at?: string
          published?: boolean
          category?: string
          tags?: string[]
          reading_time?: number
          seo_meta_title?: string
          seo_meta_description?: string
          seo_keywords?: string[]
          seo_og_title?: string
          seo_og_description?: string
          seo_og_image?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          currency: string
          type: 'pdf' | 'spreadsheet' | 'json' | 'video_access' | 'bundle'
          stripe_product_id: string
          stripe_price_id: string
          thumbnail?: string
          preview_images: string[]
          features: string[]
          download_limit?: number
          access_duration_days?: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          currency?: string
          type: 'pdf' | 'spreadsheet' | 'json' | 'video_access' | 'bundle'
          stripe_product_id: string
          stripe_price_id: string
          thumbnail?: string
          preview_images?: string[]
          features?: string[]
          download_limit?: number
          access_duration_days?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          currency?: string
          type?: 'pdf' | 'spreadsheet' | 'json' | 'video_access' | 'bundle'
          stripe_product_id?: string
          stripe_price_id?: string
          thumbnail?: string
          preview_images?: string[]
          features?: string[]
          download_limit?: number
          access_duration_days?: number
          active?: boolean
          updated_at?: string
        }
      }
      product_files: {
        Row: {
          id: string
          product_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          access_url?: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          access_url?: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          file_name?: string
          file_url?: string
          file_size?: number
          file_type?: string
          access_url?: string
          is_primary?: boolean
        }
      }
      orders: {
        Row: {
          id: string
          customer_email: string
          customer_name?: string
          product_id: string
          stripe_session_id: string
          stripe_payment_intent_id?: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          download_count: number
          expires_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_email: string
          customer_name?: string
          product_id: string
          stripe_session_id: string
          stripe_payment_intent_id?: string
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          download_count?: number
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_email?: string
          customer_name?: string
          product_id?: string
          stripe_session_id?: string
          stripe_payment_intent_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          download_count?: number
          expires_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'customer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'customer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'customer'
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
      [_ in never]: never
    }
  }
}

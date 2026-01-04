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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          status: 'active' | 'suspended' | 'banned'
          role: 'user' | 'admin'
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'suspended' | 'banned'
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'suspended' | 'banned'
          role?: 'user' | 'admin'
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          chain: 'BTC' | 'ETH' | 'BSC' | 'TRX' | 'SOL'
          address: string
          label: string | null
          source: 'generated' | 'connected' | 'imported'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chain: 'BTC' | 'ETH' | 'BSC' | 'TRX' | 'SOL'
          address: string
          label?: string | null
          source: 'generated' | 'connected' | 'imported'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chain?: 'BTC' | 'ETH' | 'BSC' | 'TRX' | 'SOL'
          address?: string
          label?: string | null
          source?: 'generated' | 'connected' | 'imported'
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          details: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      admin_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          target_user_id: string | null
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          target_user_id?: string | null
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          target_user_id?: string | null
          details?: Json
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
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

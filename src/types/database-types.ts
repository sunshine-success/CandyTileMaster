export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      levels: {
        Row: {
          created_at: string | null
          dislikes: number | null
          file: Json | null
          id: number
          likes: number | null
          timesPlayed: number
          title: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string | null
          dislikes?: number | null
          file?: Json | null
          id?: number
          likes?: number | null
          timesPlayed?: number
          title?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string | null
          dislikes?: number | null
          file?: Json | null
          id?: number
          likes?: number | null
          timesPlayed?: number
          title?: string | null
          userId?: string | null
        }
      }
      users: {
        Row: {
          avatarURL: string | null
          completedLevels: Json | null
          createdAt: string | null
          dislikedLevels: number[] | null
          email: string | null
          id: number
          likedLevels: number[] | null
          nickname: string
          userId: string
        }
        Insert: {
          avatarURL?: string | null
          completedLevels?: Json | null
          createdAt?: string | null
          dislikedLevels?: number[] | null
          email?: string | null
          id?: number
          likedLevels?: number[] | null
          nickname: string
          userId: string
        }
        Update: {
          avatarURL?: string | null
          completedLevels?: Json | null
          createdAt?: string | null
          dislikedLevels?: number[] | null
          email?: string | null
          id?: number
          likedLevels?: number[] | null
          nickname?: string
          userId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_user_disliked_level: {
        Args: {
          user_id: number
          level_id: number
        }
        Returns: undefined
      }
      add_user_liked_level: {
        Args: {
          user_id: number
          level_id: number
        }
        Returns: undefined
      }
      increment_level_dislikes: {
        Args: {
          row_id: number
        }
        Returns: undefined
      }
      increment_level_likes: {
        Args: {
          row_id: number
        }
        Returns: undefined
      }
      increment_level_times_played: {
        Args: {
          row_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

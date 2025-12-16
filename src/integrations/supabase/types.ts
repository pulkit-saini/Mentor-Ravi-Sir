export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          message: string
          workshop_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          message: string
          workshop_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          message?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          email: string
          id: string
          internship_id: string
          mobile_number: string
          name: string
          note: string | null
          resume_url: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          internship_id: string
          mobile_number: string
          name: string
          note?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          internship_id?: string
          mobile_number?: string
          name?: string
          note?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string | null
          download_url: string | null
          id: string
          issued_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          download_url?: string | null
          id?: string
          issued_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          download_url?: string | null
          id?: string
          issued_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_queries: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          mobile_number: string
          query_type: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          mobile_number: string
          query_type: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          mobile_number?: string
          query_type?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          level: string | null
          provider: string | null
          thumbnail: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          level?: string | null
          provider?: string | null
          thumbnail?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          level?: string | null
          provider?: string | null
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          selected_events: string[]
          status: string | null
          team_id: string | null
          team_leader: Json
          team_members: Json[] | null
          team_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          selected_events: string[]
          status?: string | null
          team_id?: string | null
          team_leader: Json
          team_members?: Json[] | null
          team_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          selected_events?: string[]
          status?: string | null
          team_id?: string | null
          team_leader?: Json
          team_members?: Json[] | null
          team_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          end_at: string
          id: string
          location: string | null
          start_at: string
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          end_at: string
          id?: string
          location?: string | null
          start_at: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          end_at?: string
          id?: string
          location?: string | null
          start_at?: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          rating: number | null
          suggestions: string | null
          user_id: string
          workshop_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          suggestions?: string | null
          user_id: string
          workshop_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          suggestions?: string | null
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "workshop_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      internship_applications: {
        Row: {
          applied_at: string | null
          course_branch: string | null
          cover_letter: string | null
          email: string | null
          full_name: string | null
          github_profile: string | null
          id: string
          internship_id: string
          phone: string | null
          portfolio_link: string | null
          resume_url: string | null
          selected_task: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
          why_join: string | null
          year_semester: string | null
        }
        Insert: {
          applied_at?: string | null
          course_branch?: string | null
          cover_letter?: string | null
          email?: string | null
          full_name?: string | null
          github_profile?: string | null
          id?: string
          internship_id: string
          phone?: string | null
          portfolio_link?: string | null
          resume_url?: string | null
          selected_task?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
          why_join?: string | null
          year_semester?: string | null
        }
        Update: {
          applied_at?: string | null
          course_branch?: string | null
          cover_letter?: string | null
          email?: string | null
          full_name?: string | null
          github_profile?: string | null
          id?: string
          internship_id?: string
          phone?: string | null
          portfolio_link?: string | null
          resume_url?: string | null
          selected_task?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
          why_join?: string | null
          year_semester?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internship_applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          company: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          location: string | null
          mode: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          skills: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          mode?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          skills?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          mode?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          skills?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      judge_scores: {
        Row: {
          comment: string | null
          created_at: string | null
          group_id: string
          id: string
          judge_id: string
          score: number
          submission_id: string
          task_id: string
          updated_at: string | null
          workshop_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          group_id: string
          id?: string
          judge_id: string
          score: number
          submission_id: string
          task_id: string
          updated_at?: string | null
          workshop_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          group_id?: string
          id?: string
          judge_id?: string
          score?: number
          submission_id?: string
          task_id?: string
          updated_at?: string | null
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "judge_scores_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "workshop_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "judge_scores_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "team_task_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "judge_scores_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "workshop_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "judge_scores_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          idea_description: string
          idea_title: string
          status: string | null
          updated_at: string | null
          user_id: string
          workshop_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          idea_description: string
          idea_title: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          workshop_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          idea_description?: string
          idea_title?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_requests_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          mobile_number: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          mobile_number?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          mobile_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      student_learning: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          last_interacted_at: string | null
          progress_percent: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          last_interacted_at?: string | null
          progress_percent?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          last_interacted_at?: string | null
          progress_percent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      team_task_submissions: {
        Row: {
          file_urls: string[] | null
          group_id: string
          id: string
          judge_comment: string | null
          score: number | null
          status: string | null
          submitted_at: string | null
          task_id: string
          text_submission: string | null
        }
        Insert: {
          file_urls?: string[] | null
          group_id: string
          id?: string
          judge_comment?: string | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          task_id: string
          text_submission?: string | null
        }
        Update: {
          file_urls?: string[] | null
          group_id?: string
          id?: string
          judge_comment?: string | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          task_id?: string
          text_submission?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_task_submissions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "workshop_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_task_submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "workshop_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_courses: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          progress_percent: number | null
          status: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_workshops: {
        Row: {
          created_at: string | null
          id: string
          progress_percent: number | null
          status: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at: string | null
          user_id: string
          workshop_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
          user_id: string
          workshop_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_workshops_profiles"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workshops_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_groups: {
        Row: {
          created_at: string | null
          group_code: string
          group_name: string
          id: string
          logo_url: string | null
          slogan: string | null
          updated_at: string | null
          workshop_id: string
        }
        Insert: {
          created_at?: string | null
          group_code: string
          group_name: string
          id?: string
          logo_url?: string | null
          slogan?: string | null
          updated_at?: string | null
          workshop_id: string
        }
        Update: {
          created_at?: string | null
          group_code?: string
          group_name?: string
          id?: string
          logo_url?: string | null
          slogan?: string | null
          updated_at?: string | null
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_groups_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_judges: {
        Row: {
          assigned_at: string | null
          id: string
          user_id: string
          workshop_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          user_id: string
          workshop_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_judges_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_leaderboard: {
        Row: {
          group_id: string
          id: string
          rank: number | null
          tasks_completed: number | null
          total_score: number | null
          updated_at: string | null
          workshop_id: string
        }
        Insert: {
          group_id: string
          id?: string
          rank?: number | null
          tasks_completed?: number | null
          total_score?: number | null
          updated_at?: string | null
          workshop_id: string
        }
        Update: {
          group_id?: string
          id?: string
          rank?: number | null
          tasks_completed?: number | null
          total_score?: number | null
          updated_at?: string | null
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_leaderboard_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "workshop_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshop_leaderboard_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_ended: boolean | null
          points: number | null
          start_time: string | null
          task_order: number
          timer_minutes: number | null
          title: string
          updated_at: string | null
          workshop_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_ended?: boolean | null
          points?: number | null
          start_time?: string | null
          task_order: number
          timer_minutes?: number | null
          title: string
          updated_at?: string | null
          workshop_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_ended?: boolean | null
          points?: number | null
          start_time?: string | null
          task_order?: number
          timer_minutes?: number | null
          title?: string
          updated_at?: string | null
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_tasks_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          status: string | null
          steps_json: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          status?: string | null
          steps_json?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          status?: string | null
          steps_json?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "judge" | "admin" | "superadmin"
      application_status: "applied" | "under_review" | "accepted" | "rejected"
      enrollment_status: "enrolled" | "in_progress" | "completed" | "dropped"
      event_status: "upcoming" | "ongoing" | "completed"
      registration_status: "joined" | "withdrawn"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "judge", "admin", "superadmin"],
      application_status: ["applied", "under_review", "accepted", "rejected"],
      enrollment_status: ["enrolled", "in_progress", "completed", "dropped"],
      event_status: ["upcoming", "ongoing", "completed"],
      registration_status: ["joined", "withdrawn"],
    },
  },
} as const

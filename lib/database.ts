// Database connection and query utilities
// Supports both Supabase and Neon integrations

interface DatabaseConfig {
  type: "supabase" | "neon" | "mock"
  connectionString?: string
}

class DatabaseManager {
  private config: DatabaseConfig
  private client: any

  constructor() {
    // Auto-detect available database integration
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      this.config = { type: "supabase" }
      this.initializeSupabase()
    } else if (process.env.DATABASE_URL) {
      this.config = { type: "neon", connectionString: process.env.DATABASE_URL }
      this.initializeNeon()
    } else {
      this.config = { type: "mock" }
      console.log("[v0] Using mock database - add Supabase or Neon integration for real data")
    }
  }

  private async initializeSupabase() {
    try {
      const { createClient } = await import("@supabase/supabase-js")
      this.client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    } catch (error) {
      console.error("[v0] Failed to initialize Supabase:", error)
      this.config.type = "mock"
    }
  }

  private async initializeNeon() {
    try {
      const { neon } = await import("@neondatabase/serverless")
      this.client = neon(this.config.connectionString!)
    } catch (error) {
      console.error("[v0] Failed to initialize Neon:", error)
      this.config.type = "mock"
    }
  }

  async query(sql: string, params: any[] = []) {
    if (this.config.type === "mock") {
      return this.getMockData(sql)
    }

    try {
      if (this.config.type === "supabase") {
        // Convert SQL to Supabase query
        return await this.executeSupabaseQuery(sql, params)
      } else if (this.config.type === "neon") {
        return await this.client(sql, params)
      }
    } catch (error) {
      console.error("[v0] Database query failed:", error)
      return this.getMockData(sql)
    }
  }

  private async executeSupabaseQuery(sql: string, params: any[]) {
    // Basic SQL to Supabase conversion for common queries
    if (sql.includes("SELECT * FROM users WHERE role =")) {
      const role = params[0]
      const { data, error } = await this.client.from("users").select("*").eq("role", role)

      if (error) throw error
      return data
    }

    // Add more query conversions as needed
    throw new Error("Query not supported in Supabase mode")
  }

  private getMockData(sql: string) {
    // Return mock data based on query type
    if (sql.includes("users")) {
      return [
        {
          id: "1",
          email: "admin@demo.com",
          role: "admin",
          first_name: "Admin",
          last_name: "User",
          school_id: "1",
        },
        {
          id: "2",
          email: "teacher@demo.com",
          role: "teacher",
          first_name: "John",
          last_name: "Smith",
          school_id: "1",
        },
      ]
    }

    if (sql.includes("students")) {
      return [
        {
          id: "1",
          user_id: "3",
          student_id: "S001",
          first_name: "Alex",
          last_name: "Wilson",
          class_id: "1",
          grade_level: 9,
        },
      ]
    }

    if (sql.includes("attendance")) {
      return [
        {
          id: "1",
          student_id: "1",
          date: "2024-12-01",
          status: "present",
        },
      ]
    }

    return []
  }

  // Utility methods for common operations
  async getUsers(role?: string) {
    const sql = role
      ? "SELECT * FROM users WHERE role = $1 AND is_active = true"
      : "SELECT * FROM users WHERE is_active = true"
    const params = role ? [role] : []
    return await this.query(sql, params)
  }

  async getStudentsByClass(classId: string) {
    const sql = `
      SELECT s.*, u.first_name, u.last_name, u.email, c.name as class_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      JOIN classes c ON s.class_id = c.id
      WHERE s.class_id = $1 AND u.is_active = true
    `
    return await this.query(sql, [classId])
  }

  async getAttendanceByStudent(studentId: string, startDate?: string, endDate?: string) {
    let sql = "SELECT * FROM attendance WHERE student_id = $1"
    const params = [studentId]

    if (startDate && endDate) {
      sql += " AND date BETWEEN $2 AND $3"
      params.push(startDate, endDate)
    }

    sql += " ORDER BY date DESC"
    return await this.query(sql, params)
  }

  async getAssignmentsByClass(classId: string) {
    const sql = `
      SELECT a.*, s.name as subject_name, u.first_name as teacher_name
      FROM assignments a
      JOIN subjects s ON a.subject_id = s.id
      JOIN users u ON a.teacher_id = u.id
      WHERE a.class_id = $1
      ORDER BY a.due_date ASC
    `
    return await this.query(sql, [classId])
  }
}

// Export singleton instance
export const db = new DatabaseManager()

// Type definitions for better TypeScript support
export interface User {
  id: string
  school_id: string
  email: string
  role: "admin" | "teacher" | "student" | "parent"
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  preferences: {
    theme: "light" | "dark"
    language: string
    notifications: boolean
  }
  is_active: boolean
  created_at: string
}

export interface Student {
  id: string
  user_id: string
  school_id: string
  student_id: string
  class_id: string
  admission_date: string
  blood_group?: string
  medical_conditions?: string
}

export interface Teacher {
  id: string
  user_id: string
  school_id: string
  employee_id: string
  department: string
  qualification: string
  experience_years: number
  subjects_taught: string[]
}

export interface Assignment {
  id: string
  class_id: string
  subject_id: string
  teacher_id: string
  title: string
  description: string
  due_date: string
  max_marks: number
  attachment_urls: string[]
}

export interface Attendance {
  id: string
  student_id: string
  class_id: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  marked_by: string
  notes?: string
}

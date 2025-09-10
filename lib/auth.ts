export type UserRole = "admin" | "teacher" | "student" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  studentId?: string // For students and parents
  classId?: string // For teachers and students
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@school.edu",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    role: "teacher",
    classId: "class-1",
    avatar: "/teacher-avatar.png",
  },
  {
    id: "3",
    name: "Mike Student",
    email: "mike.student@school.edu",
    role: "student",
    studentId: "STU001",
    classId: "class-1",
    avatar: "/student-avatar.png",
  },
  {
    id: "4",
    name: "Lisa Parent",
    email: "lisa.parent@email.com",
    role: "parent",
    studentId: "STU001",
    avatar: "/parent-avatar.png",
  },
]

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple mock authentication
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}

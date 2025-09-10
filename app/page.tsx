"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/login-form"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { TeacherDashboard } from "@/components/teacher/teacher-dashboard"
import { StudentDashboard } from "@/components/student/student-dashboard"
import { ParentDashboard } from "@/components/parent/parent-dashboard"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />
      case "teacher":
        return <TeacherDashboard />
      case "student":
        return <StudentDashboard />
      case "parent":
        return <ParentDashboard />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-muted-foreground">Role not recognized</p>
          </div>
        )
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}

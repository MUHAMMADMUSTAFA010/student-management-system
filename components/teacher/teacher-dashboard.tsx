"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  MessageSquare,
  Plus,
  Search,
  Edit,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  attendance: number
  grade: string
  lastActive: string
}

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  submitted: number
  total: number
  status: "active" | "completed" | "overdue"
}

interface ClassStats {
  totalStudents: number
  presentToday: number
  averageGrade: number
  pendingAssignments: number
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@school.edu",
    attendance: 95,
    grade: "A",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@school.edu",
    attendance: 88,
    grade: "B+",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@school.edu",
    attendance: 92,
    grade: "A-",
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@school.edu",
    attendance: 78,
    grade: "C+",
    lastActive: "5 hours ago",
  },
]

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Math Quiz Chapter 5",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    submitted: 18,
    total: 25,
    status: "active",
  },
  {
    id: "2",
    title: "Science Project",
    subject: "Science",
    dueDate: "2024-01-20",
    submitted: 12,
    total: 25,
    status: "active",
  },
  {
    id: "3",
    title: "History Essay",
    subject: "History",
    dueDate: "2024-01-10",
    submitted: 25,
    total: 25,
    status: "completed",
  },
]

const mockClassStats: ClassStats = {
  totalStudents: 28,
  presentToday: 26,
  averageGrade: 85.4,
  pendingAssignments: 3,
}

export function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Class Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClassStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">In your classes</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClassStats.presentToday}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockClassStats.presentToday / mockClassStats.totalStudents) * 100)}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClassStats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClassStats.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes and activities for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Grade 10A - Mathematics</p>
                    <p className="text-sm text-muted-foreground">Room 201</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">9:00 - 10:00 AM</p>
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Grade 11B - Mathematics</p>
                    <p className="text-sm text-muted-foreground">Room 201</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">11:00 - 12:00 PM</p>
                    <Badge variant="secondary" className="text-xs">
                      Next
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Grade 10B - Mathematics</p>
                    <p className="text-sm text-muted-foreground">Room 201</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">2:00 - 3:00 PM</p>
                    <Badge variant="outline" className="text-xs">
                      Later
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common teaching tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Take Attendance
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Grade Submissions
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alice Johnson submitted Math Quiz</p>
                    <p className="text-xs text-muted-foreground">Grade 10A • 15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New message from parent</p>
                    <p className="text-xs text-muted-foreground">Bob Smith's parent • 1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Assignment deadline approaching</p>
                    <p className="text-xs text-muted-foreground">Science Project due in 2 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Take Attendance
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Roster</CardTitle>
              <CardDescription>Manage your students and track their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Attendance</p>
                        <p className={`text-sm ${getAttendanceColor(student.attendance)}`}>{student.attendance}%</p>
                      </div>
                      <Badge className={getGradeBadgeColor(student.grade)}>{student.grade}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Assignment Management</h3>
              <p className="text-sm text-muted-foreground">Create and track assignments</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAssignments.map((assignment) => (
              <Card key={assignment.id} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Due Date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Submissions:</span>
                      <span>
                        {assignment.submitted}/{assignment.total}
                      </span>
                    </div>
                    <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={getAssignmentStatusColor(assignment.status)}>{assignment.status}</Badge>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gradebook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gradebook</CardTitle>
              <CardDescription>View and manage student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Student</th>
                      <th className="text-center p-2">Math Quiz</th>
                      <th className="text-center p-2">Science Project</th>
                      <th className="text-center p-2">History Essay</th>
                      <th className="text-center p-2">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="text-center p-2">85</td>
                        <td className="text-center p-2">92</td>
                        <td className="text-center p-2">88</td>
                        <td className="text-center p-2">
                          <Badge className={getGradeBadgeColor(student.grade)}>{student.grade}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard userRole="teacher" classId="class-1" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

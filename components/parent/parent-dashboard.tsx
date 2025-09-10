"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle,
  DollarSign,
  Award,
  TrendingUp,
  Phone,
  Mail,
  BookOpen,
  Users,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

interface Child {
  id: string
  name: string
  grade: string
  class: string
  studentId: string
  avatar?: string
}

interface AcademicSummary {
  gpa: number
  attendance: number
  totalSubjects: number
  averageGrade: string
  rank: number
  totalStudents: number
}

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: string
}

interface TeacherContact {
  id: string
  name: string
  subject: string
  email: string
  phone: string
  officeHours: string
}

interface FeeInfo {
  id: string
  description: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
}

const mockChild: Child = {
  id: "1",
  name: "Mike Student",
  grade: "Grade 10",
  class: "10A",
  studentId: "STU001",
}

const mockAcademicSummary: AcademicSummary = {
  gpa: 3.7,
  attendance: 94,
  totalSubjects: 6,
  averageGrade: "B+",
  rank: 8,
  totalStudents: 28,
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Math Quiz Chapter 5",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "2024-01-18",
    status: "submitted",
  },
  {
    id: "3",
    title: "History Essay",
    subject: "History",
    dueDate: "2024-01-10",
    status: "graded",
    grade: "A-",
  },
]

const mockTeachers: TeacherContact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    subject: "Mathematics",
    email: "sarah.johnson@school.edu",
    phone: "(555) 123-4567",
    officeHours: "Mon-Fri 2:00-4:00 PM",
  },
  {
    id: "2",
    name: "Mike Wilson",
    subject: "Science",
    email: "mike.wilson@school.edu",
    phone: "(555) 234-5678",
    officeHours: "Tue-Thu 1:00-3:00 PM",
  },
  {
    id: "3",
    name: "Emma Davis",
    subject: "History",
    email: "emma.davis@school.edu",
    phone: "(555) 345-6789",
    officeHours: "Mon-Wed 3:00-5:00 PM",
  },
]

const mockFees: FeeInfo[] = [
  {
    id: "1",
    description: "Tuition Fee - Semester 1",
    amount: 2500,
    dueDate: "2024-01-31",
    status: "pending",
  },
  {
    id: "2",
    description: "Lab Fee",
    amount: 150,
    dueDate: "2024-01-15",
    status: "paid",
  },
  {
    id: "3",
    description: "Library Fee",
    amount: 50,
    dueDate: "2024-02-01",
    status: "pending",
  },
]

export function ParentDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "graded":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      {/* Child Info Header */}
      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{mockChild.name}</h2>
              <p className="text-muted-foreground">
                {mockChild.grade} • Class {mockChild.class} • ID: {mockChild.studentId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Class Rank</p>
              <p className="text-2xl font-bold">
                {mockAcademicSummary.rank}/{mockAcademicSummary.totalStudents}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademicSummary.gpa}</div>
            <p className="text-xs text-muted-foreground">Average Grade: {mockAcademicSummary.averageGrade}</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademicSummary.attendance}%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademicSummary.totalSubjects}</div>
            <p className="text-xs text-muted-foreground">Enrolled courses</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{mockAcademicSummary.rank}</div>
            <p className="text-xs text-muted-foreground">Out of {mockAcademicSummary.totalStudents} students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates about your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Assignment submitted</p>
                      <p className="text-xs text-muted-foreground">Science Lab Report • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Grade updated</p>
                      <p className="text-xs text-muted-foreground">History Essay: A- • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Attendance marked</p>
                      <p className="text-xs text-muted-foreground">Present in all classes • Today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Parent-teacher meeting</p>
                      <p className="text-xs text-muted-foreground">Scheduled for Jan 20 • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Math Quiz</p>
                        <p className="text-xs text-muted-foreground">Chapter 5 Assessment</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Jan 15</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Parent-Teacher Meeting</p>
                        <p className="text-xs text-muted-foreground">Progress Discussion</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Jan 20</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Fee Payment Due</p>
                        <p className="text-xs text-muted-foreground">Semester Tuition</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Jan 31</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common parent tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">Message Teacher</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm">Pay Fees</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Current Assignments</CardTitle>
                <CardDescription>Track your child's assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {assignment.subject} • Due: {assignment.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {assignment.grade && (
                        <Badge className={getGradeBadgeColor(assignment.grade)}>{assignment.grade}</Badge>
                      )}
                      <Badge className={getAssignmentStatusColor(assignment.status)}>{assignment.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Academic progress by subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mathematics</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Science</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>History</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>English</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Weekly attendance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                  <div key={day} className="text-center">
                    <p className="text-sm font-medium mb-2">{day}</p>
                    <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Present</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Contacts</CardTitle>
              <CardDescription>Connect with your child's teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                        <p className="text-xs text-muted-foreground">Office Hours: {teacher.officeHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Communication history with teachers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mike has shown excellent improvement in mathematics. Keep up the great work!
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">Emma Davis</p>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please remind Mike to bring his history textbook to class tomorrow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Management</CardTitle>
              <CardDescription>Track and pay school fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFees.map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{fee.description}</p>
                      <p className="text-sm text-muted-foreground">Due: {fee.dueDate}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${fee.amount}</p>
                        <Badge className={getFeeStatusColor(fee.status)}>{fee.status}</Badge>
                      </div>
                      {fee.status !== "paid" && (
                        <Button size="sm">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Previous fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Lab Fee</p>
                    <p className="text-xs text-muted-foreground">Paid on Jan 10, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$150</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Registration Fee</p>
                    <p className="text-xs text-muted-foreground">Paid on Dec 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$200</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Overall performance trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Grade Average</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignment Completion</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Class Participation</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Behavioral Report</CardTitle>
                <CardDescription>Conduct and discipline tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Excellent Behavior</p>
                    <p className="text-xs text-muted-foreground">No disciplinary issues this semester</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Leadership Recognition</p>
                    <p className="text-xs text-muted-foreground">Helped organize class activities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">Team Player</p>
                    <p className="text-xs text-muted-foreground">Excellent collaboration in group projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Downloadable Reports</CardTitle>
              <CardDescription>Generate and download detailed reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Progress Report</span>
                  <span className="text-xs text-muted-foreground">Semester Summary</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Attendance Report</span>
                  <span className="text-xs text-muted-foreground">Monthly Overview</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Award className="h-6 w-6" />
                  <span className="text-sm">Grade Report</span>
                  <span className="text-xs text-muted-foreground">Subject-wise Grades</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard userRole="parent" userId="parent-1" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

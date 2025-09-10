"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Star,
  Award,
  Bell,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: string
  maxPoints: number
  earnedPoints?: number
}

interface Subject {
  id: string
  name: string
  teacher: string
  currentGrade: string
  percentage: number
  credits: number
}

interface StudentStats {
  gpa: number
  attendance: number
  completedAssignments: number
  totalAssignments: number
  upcomingDeadlines: number
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Math Quiz Chapter 5",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    status: "pending",
    maxPoints: 100,
  },
  {
    id: "2",
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "2024-01-18",
    status: "submitted",
    maxPoints: 50,
  },
  {
    id: "3",
    title: "History Essay",
    subject: "History",
    dueDate: "2024-01-10",
    status: "graded",
    grade: "A-",
    maxPoints: 100,
    earnedPoints: 92,
  },
  {
    id: "4",
    title: "English Presentation",
    subject: "English",
    dueDate: "2024-01-12",
    status: "overdue",
    maxPoints: 75,
  },
]

const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    teacher: "Sarah Johnson",
    currentGrade: "A-",
    percentage: 92,
    credits: 4,
  },
  {
    id: "2",
    name: "Science",
    teacher: "Mike Wilson",
    currentGrade: "B+",
    percentage: 88,
    credits: 4,
  },
  {
    id: "3",
    name: "History",
    teacher: "Emma Davis",
    currentGrade: "A",
    percentage: 95,
    credits: 3,
  },
  {
    id: "4",
    name: "English",
    teacher: "John Smith",
    currentGrade: "B",
    percentage: 85,
    credits: 3,
  },
]

const mockStudentStats: StudentStats = {
  gpa: 3.7,
  attendance: 94,
  completedAssignments: 18,
  totalAssignments: 22,
  upcomingDeadlines: 3,
}

const mockSchedule = [
  { time: "9:00 - 10:00", subject: "Mathematics", room: "Room 201", teacher: "Sarah Johnson" },
  { time: "10:15 - 11:15", subject: "Science", room: "Lab 1", teacher: "Mike Wilson" },
  { time: "11:30 - 12:30", subject: "History", room: "Room 105", teacher: "Emma Davis" },
  { time: "1:30 - 2:30", subject: "English", room: "Room 302", teacher: "John Smith" },
  { time: "2:45 - 3:45", subject: "Physical Education", room: "Gym", teacher: "Coach Brown" },
]

export function StudentDashboard() {
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

  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getAssignmentIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "submitted":
        return <Upload className="h-4 w-4" />
      case "graded":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Academic Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentStats.gpa}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentStats.attendance}%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudentStats.completedAssignments}/{mockStudentStats.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockStudentStats.completedAssignments / mockStudentStats.totalAssignments) * 100)}% completed
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentStats.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSchedule.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.room} • {item.teacher}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.time}</p>
                      {index === 0 && (
                        <Badge variant="outline" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {index === 1 && (
                        <Badge variant="secondary" className="text-xs">
                          Next
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest updates from your teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Math Quiz Postponed</p>
                        <p className="text-xs text-muted-foreground">
                          The quiz scheduled for tomorrow has been moved to Friday.
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Science Lab Materials</p>
                        <p className="text-xs text-muted-foreground">
                          Please bring safety goggles for tomorrow's lab session.
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">History Project Guidelines</p>
                        <p className="text-xs text-muted-foreground">
                          Updated guidelines for the semester project are now available.
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">2d ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common student tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Upload className="h-5 w-5" />
                  <span className="text-sm">Submit Assignment</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">Message Teacher</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Download Resources</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col space-y-2 p-4 bg-transparent">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">View Calendar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">My Assignments</h3>
              <p className="text-sm text-muted-foreground">Track and submit your assignments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAssignments.map((assignment) => (
              <Card key={assignment.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.subject}</CardDescription>
                    </div>
                    {getAssignmentIcon(assignment.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Due Date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Points:</span>
                    <span className="font-medium">
                      {assignment.earnedPoints ? `${assignment.earnedPoints}/` : ""}
                      {assignment.maxPoints}
                    </span>
                  </div>
                  {assignment.grade && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grade:</span>
                      <Badge className={getGradeBadgeColor(assignment.grade)}>{assignment.grade}</Badge>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge className={getAssignmentStatusColor(assignment.status)}>{assignment.status}</Badge>
                    <Button variant="outline" size="sm">
                      {assignment.status === "pending" ? "Submit" : "View"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Grades</CardTitle>
              <CardDescription>Your academic performance by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockSubjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {subject.teacher} • {subject.credits} credits
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getGradeBadgeColor(subject.currentGrade)}>{subject.currentGrade}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{subject.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule</CardTitle>
              <CardDescription>Your complete class schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.subject}</p>
                        <p className="text-sm text-muted-foreground">{item.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Your performance trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignment Completion</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Rate</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grade Average</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your academic milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Perfect Attendance</p>
                    <p className="text-xs text-muted-foreground">No absences this month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Award className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Honor Roll</p>
                    <p className="text-xs text-muted-foreground">GPA above 3.5</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Assignment Streak</p>
                    <p className="text-xs text-muted-foreground">5 assignments in a row</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard userRole="student" userId="student-1" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

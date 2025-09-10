"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  AlertTriangle,
  Award,
  Download,
  Brain,
  Target,
} from "lucide-react"
import { AIAnalytics, generateMockAnalyticsData } from "@/lib/ai-analytics"

interface AnalyticsDashboardProps {
  userRole: "admin" | "teacher" | "student" | "parent"
  userId?: string
  classId?: string
}

export function AnalyticsDashboard({ userRole, userId, classId }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("performance")
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [aiInsights, setAiInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock data and AI insights
    const mockData = generateMockAnalyticsData(30)
    const classAnalytics = AIAnalytics.generateClassAnalytics(mockData)

    // Generate AI insights for different students
    const insights = mockData.slice(0, 5).map((student) => {
      const performancePrediction = AIAnalytics.predictPerformanceTrend(student)
      const dropoutRisk = AIAnalytics.assessDropoutRisk(student)
      return { studentId: student.studentId, performancePrediction, dropoutRisk }
    })

    setAnalyticsData({
      classAnalytics,
      performanceData: [
        { month: "Jan", average: 78, target: 80 },
        { month: "Feb", average: 82, target: 80 },
        { month: "Mar", average: 79, target: 80 },
        { month: "Apr", average: 85, target: 80 },
        { month: "May", average: 88, target: 80 },
        { month: "Jun", average: 91, target: 80 },
      ],
      attendanceData: [
        { day: "Mon", rate: 95 },
        { day: "Tue", rate: 92 },
        { day: "Wed", rate: 88 },
        { day: "Thu", rate: 90 },
        { day: "Fri", rate: 85 },
      ],
      gradeDistribution: [
        { grade: "A+", count: classAnalytics.performanceDistribution.excellent, color: "#10B981" },
        { grade: "A", count: classAnalytics.performanceDistribution.good, color: "#3B82F6" },
        { grade: "B", count: classAnalytics.performanceDistribution.average, color: "#F59E0B" },
        { grade: "C", count: classAnalytics.performanceDistribution.needsImprovement, color: "#EF4444" },
      ],
      riskAnalysis: [
        { category: "Low Risk", count: 22, color: "#10B981" },
        { category: "Medium Risk", count: 6, color: "#F59E0B" },
        { category: "High Risk", count: 2, color: "#EF4444" },
      ],
    })

    setAiInsights(insights)
    setLoading(false)
  }, [timeRange, userRole])

  const exportReport = () => {
    // Mock export functionality
    const reportData = {
      generatedAt: new Date().toISOString(),
      timeRange,
      analytics: analyticsData,
      insights: aiInsights,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-report-${timeRange}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
          <p className="text-muted-foreground">AI-powered insights and performance analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Students</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {analyticsData.classAnalytics.classSize}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Avg Performance</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {analyticsData.classAnalytics.avgGrade}%
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% improvement
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Attendance Rate</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {analyticsData.classAnalytics.avgAttendance}%
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mt-2 flex items-center text-xs text-orange-600 dark:text-orange-400">
              <TrendingDown className="h-3 w-3 mr-1" />
              -1.2% from target
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">At-Risk Students</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {analyticsData.classAnalytics.highRiskStudents}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="mt-2 flex items-center text-xs text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Needs attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly average performance vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="average" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current class performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {analyticsData.gradeDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Pattern</CardTitle>
                <CardDescription>Attendance rates by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Student risk categorization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.riskAnalysis}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ category, count }) => `${category}: ${count}`}
                    >
                      {analyticsData.riskAnalysis.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>Machine learning predictions and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Student {insight.studentId}</h4>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          insight.performancePrediction.prediction.status === "improving"
                            ? "default"
                            : insight.performancePrediction.prediction.status === "declining"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {insight.performancePrediction.prediction.status}
                      </Badge>
                      <Badge
                        variant={
                          insight.dropoutRisk.prediction.riskLevel === "high"
                            ? "destructive"
                            : insight.dropoutRisk.prediction.riskLevel === "medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {insight.dropoutRisk.prediction.riskLevel} risk
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Performance Prediction</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence:</span>
                          <span>{Math.round(insight.performancePrediction.confidence * 100)}%</span>
                        </div>
                        <Progress value={insight.performancePrediction.confidence * 100} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Projected Grade: {Math.round(insight.performancePrediction.prediction.projectedGrade)}%
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Risk Factors</h5>
                      <div className="space-y-1 text-xs">
                        {Object.entries(insight.dropoutRisk.prediction.factors).map(([factor, isRisk]) => (
                          <div key={factor} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isRisk ? "bg-red-500" : "bg-green-500"}`}></div>
                            <span className="capitalize">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Recommendations</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {insight.performancePrediction.recommendations.slice(0, 3).map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Performance Report</h3>
                <p className="text-sm text-muted-foreground mb-4">Comprehensive academic performance analysis</p>
                <Button size="sm" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Attendance Report</h3>
                <p className="text-sm text-muted-foreground mb-4">Detailed attendance patterns and trends</p>
                <Button size="sm" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">AI Insights Report</h3>
                <p className="text-sm text-muted-foreground mb-4">Machine learning predictions and recommendations</p>
                <Button size="sm" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-semibold mb-2">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">Student dropout risk analysis</p>
                <Button size="sm" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="font-semibold mb-2">Class Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">Overall class performance summary</p>
                <Button size="sm" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="font-semibold mb-2">Custom Report</h3>
                <p className="text-sm text-muted-foreground mb-4">Build your own custom analytics report</p>
                <Button size="sm" className="w-full">
                  Create Custom
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

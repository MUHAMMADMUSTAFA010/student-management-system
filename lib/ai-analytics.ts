// AI-Powered Analytics for Student Management System
// Provides predictive insights and performance analytics

interface StudentPerformanceData {
  studentId: string
  grades: number[]
  attendance: number
  assignmentSubmissions: number
  behavioralScore: number
}

interface PredictionResult {
  type: "performance" | "dropout_risk" | "attendance_pattern"
  confidence: number
  prediction: any
  recommendations: string[]
}

export class AIAnalytics {
  // Predict student performance trends
  static predictPerformanceTrend(data: StudentPerformanceData): PredictionResult {
    const { grades, attendance, assignmentSubmissions } = data

    // Calculate trend using simple linear regression
    const avgGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length
    const recentGrades = grades.slice(-3)
    const recentAvg = recentGrades.reduce((sum, grade) => sum + grade, 0) / recentGrades.length

    const trend = recentAvg - avgGrade
    const performanceScore = avgGrade * 0.4 + attendance * 0.3 + assignmentSubmissions * 0.3

    let prediction = "stable"
    let confidence = 0.7
    const recommendations: string[] = []

    if (trend > 5) {
      prediction = "improving"
      confidence = 0.8
      recommendations.push("Continue current study methods")
      recommendations.push("Consider advanced coursework")
    } else if (trend < -5) {
      prediction = "declining"
      confidence = 0.85
      recommendations.push("Schedule parent-teacher meeting")
      recommendations.push("Provide additional tutoring support")
      recommendations.push("Review study habits and time management")
    }

    if (attendance < 80) {
      recommendations.push("Address attendance issues immediately")
      confidence = Math.min(confidence + 0.1, 0.95)
    }

    if (assignmentSubmissions < 70) {
      recommendations.push("Implement assignment tracking system")
      recommendations.push("Provide deadline reminders")
    }

    return {
      type: "performance",
      confidence,
      prediction: {
        trend,
        score: performanceScore,
        status: prediction,
        projectedGrade: Math.max(0, Math.min(100, avgGrade + trend)),
      },
      recommendations,
    }
  }

  // Assess dropout risk
  static assessDropoutRisk(data: StudentPerformanceData): PredictionResult {
    const { grades, attendance, assignmentSubmissions, behavioralScore } = data

    const avgGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length

    // Risk factors scoring
    let riskScore = 0
    const recommendations: string[] = []

    // Academic performance risk
    if (avgGrade < 60) {
      riskScore += 30
      recommendations.push("Immediate academic intervention required")
    } else if (avgGrade < 70) {
      riskScore += 15
      recommendations.push("Monitor academic progress closely")
    }

    // Attendance risk
    if (attendance < 70) {
      riskScore += 25
      recommendations.push("Critical attendance intervention needed")
    } else if (attendance < 85) {
      riskScore += 10
      recommendations.push("Improve attendance tracking")
    }

    // Assignment completion risk
    if (assignmentSubmissions < 60) {
      riskScore += 20
      recommendations.push("Implement assignment support program")
    }

    // Behavioral risk
    if (behavioralScore < 60) {
      riskScore += 15
      recommendations.push("Behavioral counseling recommended")
    }

    let riskLevel = "low"
    let confidence = 0.75

    if (riskScore >= 50) {
      riskLevel = "high"
      confidence = 0.9
      recommendations.unshift("Immediate intervention required")
      recommendations.push("Schedule emergency parent meeting")
    } else if (riskScore >= 25) {
      riskLevel = "medium"
      confidence = 0.8
      recommendations.push("Implement support measures")
    }

    return {
      type: "dropout_risk",
      confidence,
      prediction: {
        riskLevel,
        riskScore,
        factors: {
          academic: avgGrade < 70,
          attendance: attendance < 85,
          assignments: assignmentSubmissions < 70,
          behavioral: behavioralScore < 70,
        },
      },
      recommendations,
    }
  }

  // Analyze attendance patterns
  static analyzeAttendancePattern(attendanceHistory: { date: string; status: string }[]): PredictionResult {
    const totalDays = attendanceHistory.length
    const presentDays = attendanceHistory.filter((a) => a.status === "present").length
    const attendanceRate = (presentDays / totalDays) * 100

    // Analyze weekly patterns
    const weeklyPattern = new Array(7).fill(0)
    attendanceHistory.forEach((record) => {
      const dayOfWeek = new Date(record.date).getDay()
      if (record.status === "absent") {
        weeklyPattern[dayOfWeek]++
      }
    })

    const mostAbsentDay = weeklyPattern.indexOf(Math.max(...weeklyPattern))
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const recommendations: string[] = []
    let confidence = 0.7

    if (attendanceRate < 80) {
      recommendations.push("Attendance intervention required")
      recommendations.push(`Focus on ${dayNames[mostAbsentDay]} attendance`)
      confidence = 0.85
    }

    if (weeklyPattern[mostAbsentDay] > totalDays * 0.3) {
      recommendations.push(`Investigate reasons for frequent ${dayNames[mostAbsentDay]} absences`)
    }

    return {
      type: "attendance_pattern",
      confidence,
      prediction: {
        attendanceRate,
        trend: attendanceRate > 85 ? "good" : attendanceRate > 70 ? "concerning" : "critical",
        weeklyPattern: weeklyPattern.map((absences, index) => ({
          day: dayNames[index],
          absenceRate: (absences / totalDays) * 100,
        })),
        mostProblematicDay: dayNames[mostAbsentDay],
      },
      recommendations,
    }
  }

  // Generate class-level analytics
  static generateClassAnalytics(studentsData: StudentPerformanceData[]) {
    const classSize = studentsData.length
    const avgGrade =
      studentsData.reduce((sum, student) => {
        const studentAvg = student.grades.reduce((s, g) => s + g, 0) / student.grades.length
        return sum + studentAvg
      }, 0) / classSize

    const avgAttendance = studentsData.reduce((sum, student) => sum + student.attendance, 0) / classSize

    const highRiskStudents = studentsData.filter((student) => {
      const risk = this.assessDropoutRisk(student)
      return risk.prediction.riskLevel === "high"
    }).length

    const topPerformers = studentsData.filter((student) => {
      const studentAvg = student.grades.reduce((s, g) => s + g, 0) / student.grades.length
      return studentAvg >= 85
    }).length

    return {
      classSize,
      avgGrade: Math.round(avgGrade * 100) / 100,
      avgAttendance: Math.round(avgAttendance * 100) / 100,
      highRiskStudents,
      topPerformers,
      performanceDistribution: {
        excellent: studentsData.filter((s) => {
          const avg = s.grades.reduce((sum, g) => sum + g, 0) / s.grades.length
          return avg >= 90
        }).length,
        good: studentsData.filter((s) => {
          const avg = s.grades.reduce((sum, g) => sum + g, 0) / s.grades.length
          return avg >= 80 && avg < 90
        }).length,
        average: studentsData.filter((s) => {
          const avg = s.grades.reduce((sum, g) => sum + g, 0) / s.grades.length
          return avg >= 70 && avg < 80
        }).length,
        needsImprovement: studentsData.filter((s) => {
          const avg = s.grades.reduce((sum, g) => sum + g, 0) / s.grades.length
          return avg < 70
        }).length,
      },
    }
  }
}

// Mock data generator for testing
export const generateMockAnalyticsData = (studentCount = 30) => {
  const students: StudentPerformanceData[] = []

  for (let i = 0; i < studentCount; i++) {
    const grades = Array.from({ length: 8 }, () => Math.floor(Math.random() * 40) + 60)
    const attendance = Math.floor(Math.random() * 30) + 70
    const assignmentSubmissions = Math.floor(Math.random() * 40) + 60
    const behavioralScore = Math.floor(Math.random() * 30) + 70

    students.push({
      studentId: `student_${i + 1}`,
      grades,
      attendance,
      assignmentSubmissions,
      behavioralScore,
    })
  }

  return students
}

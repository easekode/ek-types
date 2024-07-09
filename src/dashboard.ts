import { ICourseBatchSession, NewCourseBatchSession } from './courseBatch'
import { IExamTracker } from './exam'
import { IUser } from './user'

export interface TeacherDashboardData {
 totalCourses: number
 totalBatches: number
 totalStudents: number
 totalSessions: number
 totalEarnings: number
 totalRatings: number
 recentlyJoinedStudents: any[]
 recentBatches: any[]
}
export interface TeacherDashboardResponse {
 data: TeacherDashboardData
}

interface ScoreTimeline {
 score: number
 date: Date
}

interface Leaderboard {
 user: IUser
 score: number
}

export interface AttendanceStat {
 present: number
 absent: number
}
export interface StudentDashboardResponse {
 data: StudentDashboardData
}

export interface StudentDashboardData {
 score: number
 attendance: AttendanceStat
 exam: {
  totalExams: number
  totalExamsCompleted: number
 }
 scoreTimeline: ScoreTimeline[]
 sessions: ICourseBatchSession[]
 exams: IExamTracker[]
 leaderboard: Leaderboard[]
}

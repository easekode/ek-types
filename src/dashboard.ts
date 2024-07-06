import { ICourseBatchSession, NewCourseBatchSession } from './courseBatch'
import { IExam, IExamTracker } from './exam'
import { IUser } from './user'

export interface TeacherDashboardResponse {
 totalCourses: number
 totalBatches: number
 totalStudents: number
 totalSessions: number
 totalEarnings: number
 totalRatings: number
 recentlyJoinedStudents: any[]
 recentBatches: any[]
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

import { Course } from './course'
import { IUser } from './user'

export interface Certificate {
 _id: string // Unique identifier for the certificate
 learnerId: string // ID of the learner
 learner?: IUser
 courseId: string // ID of the course
 course?: Course
 courseTitle: string // Title of the course
 completionDate: Date // Date when the course was completed
 certificateId: string // Unique ID for the certificate
 certificateURL: string // URL to the downloadable certificate (PDF)
 verified: boolean // Whether the certificate has been verified
}

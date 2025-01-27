import { CompanyIdFilter } from './company'
import { CourseBatchStatus } from './courseBatch'
import { Types } from 'mongoose'

export interface BatchFilter extends CompanyIdFilter {
 status?: CourseBatchStatus,
 courseId?: Types.ObjectId
 instructors?: Types.ObjectId
}

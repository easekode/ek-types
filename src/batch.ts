import { CompanyIdFilter } from './company'
import { CourseBatchStatus } from './courseBatch'

export interface BatchFilter extends CompanyIdFilter {
 status?: CourseBatchStatus
}

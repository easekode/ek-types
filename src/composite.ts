import { CoursesComposite } from './course'
import { BatchComposite } from './courseBatch'

export interface StudentCompositeData {
 courses: CoursesComposite[]
 batches: BatchComposite[]
}

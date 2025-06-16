import { CompositeApiProjectionValue } from '../query'

export interface HiringCompanyComposite {
 hiringCompanyId: string
 name: string
 type: string
}

export interface JobListComposite {
 id: string
 title: string
 expYears: number
 code: string
 hiringCompanyId: string
}

export interface HiringCompanyCompositeData {
 hiringCompanies: HiringCompanyComposite[]
 jobs: JobListComposite[]
}

export interface CompositeInterviewApiProjection {
 jobs?: CompositeApiProjectionValue
 interviews?: CompositeApiProjectionValue
 hiringCompanies?: CompositeApiProjectionValue
}

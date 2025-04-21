import { CompositeApiProjectionValue } from '../query'

export interface HiringCompanyComposite {
    hiringCompanyId: string
    name: string
    type: string
   }
   
   export interface HiringCompanyCompositeData {
    hiringCompanies: HiringCompanyComposite[]
   }

   export interface CompositeInterviewApiProjection {
    jobs?: CompositeApiProjectionValue
    interviews?: CompositeApiProjectionValue
    hiringCompanies?: CompositeApiProjectionValue
   }
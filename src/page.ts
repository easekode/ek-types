import { Schema, Types } from 'mongoose'
import { Bootcamp } from './bootcamp'
import { Client } from './client'
import { Image, ImageSchema } from './common'
import { Course, MasterClass } from './course'
import { ProjectDetail } from './projectDetail'
import { SEOHead } from './seoHead'
import { Testimonial } from './testimonial'
import { ToolsTechnologies } from './toolsTechnologies'
import { z } from 'zod'

export enum PageType {
 LANDING = 'LANDING',
 COURSES = 'COURSES',
 COURSE = 'COURSE',
 BOOTCAMP = 'BOOTCAMP',
 BOOTCAMPS = 'BOOTCAMPS',
 REFER_AND_EARN = 'REFER_AND_EARN',
 HIRE_FROM_US = 'HIRE_FROM_US',
 FAQ = 'FAQ',
 HELP = 'HELP',
 CONTACT_US = 'CONTACT_US',
 TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
 REFUND_CANCELATION_POLICY = 'REFUND_CANCELATION_POLICY',
 PRIVACY_POLICY = 'PRIVACY_POLICY',
 TERMS_AND_POLICY = 'TERMS_AND_POLICY'
}
export const BannerSchema = z.object({
 title: z.string(),
 description: z.string(),
 image: ImageSchema,
 mobileImage: ImageSchema,
 ctaText: z.string(),
 link: z.string()
})
export type Banner = z.infer<typeof BannerSchema>

export type BannerType<T extends string> = {
 [key in T]: Banner
}

export type Stat = {
 icon: Image
 stat: string
 description: string
}

export type PageStat<T extends string> = {
 [key in T]: Stat[]
}

export type PageContent = {
 pageName?: PageType
 banners?: Banner[]
 courses?: Course[]
 bootcamps?: Bootcamp[]
 testimonials?: Testimonial[]
 stats?: Stat[]
 instructors?: Types.ObjectId[]
 projectDetails?: ProjectDetail[]
 toolsTechnologies?: ToolsTechnologies[]
 masterClasses?: MasterClass[]
 clients?: Client[]
 seoHead?: SEOHead
}

export type PageContents = {
 [key in PageType]: PageContent
}

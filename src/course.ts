import { Types } from 'mongoose'
import { Image, ImageSchema } from './common'
import { Banner, BannerSchema } from './page'
import { PricingSchema } from './pricing'
import { ProjectDetail, ProjectDetailSchema } from './projectDetail'
import { SEOHead, SEOHeadSchema } from './seoHead'
import { ToolsTechnologies } from './toolsTechnologies'
import { IUser, IUserSchema } from './user'
import { IExam, NewExamSchema } from './exam'
import { Category } from './category'
import { CompanyIdFilter } from './company'
import { z } from 'zod'
export enum CourseStatus {
 DRAFT = 'DRAFT',
 PUBLISHED = 'PUBLISHED',
 ARCHIVED = 'ARCHIVED'
}

export enum DurationUnit {
 HOURS = 'hours',
 DAYS = 'days',
 WEEKS = 'weeks',
 MONTHS = 'months'
}
export const CourseStatusSchema = z.nativeEnum(CourseStatus)

export const CategorySchema = z.object({
 id: z.string(),
 name: z.string()
})
export const TopicSchema = z.object({
 _id: z.string().optional(),
 slNo: z.number(),
 code: z.string().optional(),
 name: z.string(),
 description: z.string().optional(),
 duration: z.number().optional(),
 durationUnit: z.nativeEnum(DurationUnit).optional(),
 examIds: z.array(z.instanceof(Types.ObjectId)).optional(),
 exams: z.array(NewExamSchema).optional() // Define IExam schema separately
})

export const NewTopicSchema = TopicSchema.omit({
 _id: true
})
export type Topic = z.infer<typeof TopicSchema>
export type NewTopic = z.infer<typeof NewTopicSchema>

export const ChapterSchema = z.object({
 _id: z.instanceof(Types.ObjectId).optional(),
 slNo: z.number().optional(),
 code: z.string().optional(),
 name: z.string(),
 topics: z.array(TopicSchema), // Define Topic schema separately
 examIds: z.array(z.instanceof(Types.ObjectId)).optional(),
 exams: z.array(NewExamSchema).optional() // Define IExam schema separately
})
export type Chapter = z.infer<typeof ChapterSchema>
export const NewChapterSchema = ChapterSchema.omit({
 _id: true
})

export const ToolsTechnologiesSchema = z.object({
 id: z.string(),
 name: z.string()
})

export const CourseSchema = z.object({
 _id: z.instanceof(Types.ObjectId).optional(),
 //  slNo: z.number(),
 code: z.string().optional(),
 title: z.string(),
 cardImage: ImageSchema.optional(),
 heroImage: ImageSchema.optional(),
 images: z.array(ImageSchema).optional(),
 description: z.string().optional(),
 mediumDescription: z.string().optional(),
 longDescription: z.string().optional(),
 status: CourseStatusSchema.optional(),
 authorId: z.instanceof(Types.ObjectId).optional(),
 categoryId: z.instanceof(Types.ObjectId).optional(),
 category: CategorySchema.optional(),
 chapters: z.array(ChapterSchema).optional(),
 toolsAndTechnologies: z.array(ToolsTechnologiesSchema).optional(),
 projects: z.array(ProjectDetailSchema).optional(),
 instructors: z.array(IUserSchema).optional(),
 instructorIds: z.array(z.instanceof(Types.ObjectId)).optional(),
 banner: z.array(BannerSchema).optional(),
 duration: z.number().optional(),
 durationUnit: z.string().optional(),
 seoHead: SEOHeadSchema.optional(),
 pricings: z.array(PricingSchema).optional(),
 slug: z.string(),
 companyId: z.instanceof(Types.ObjectId)
})

export type Course = z.infer<typeof CourseSchema>

export const NewCourseSchema = CourseSchema.omit({
 _id: true,
 authorId: true,
 categoryId: true,
 instructorIds: true
})

export type NewCourse = z.infer<typeof NewCourseSchema>

export interface MasterClass {
 id?: string
 title: string
 description: string
 startDateTime: string
 endDateTime: string
 course: Course
 attendingCount?: number
 startDate?: string
 startTime?: string
 endDate?: string
 endTime?: string
 image?: Image
 instructors?: Types.ObjectId[]
}

export interface Schedule {
 startDate: string
 days: string[]
 timings: string[]
}

export interface SuggestCourseInput {
 title: string
 description: string
}

export interface CourseDetailsGenInput {
 title: string
 description: string
}

export interface ChaptersAndTopicsGenInput {
 title: string
 description: string
}

export interface AdditionalChaptersGenInput {
 course: NewCourse
 //  existingChapters: Chapter[]
}

export interface TopicsGenInput {
 course: NewCourse
 chapter: NewChapter
}
export interface AdditionalTopicsGenInput {
 course: NewCourse
 chapter: NewChapter
}

export type SuggestCourseGenType =
 | CourseDetailsGenInput
 | ChaptersAndTopicsGenInput
 | AdditionalChaptersGenInput
 | TopicsGenInput
 | AdditionalTopicsGenInput

export type ContentGenType =
 | 'course'
 | 'chapters'
 | 'additionalChapters'
 | 'topics'
 | 'additionalTopics'
 | 'courseDescription'

export type NewChapter = z.infer<typeof NewChapterSchema>

export type AdditionalChapters = NewChapter[]
export type AdditionalTopics = NewTopic[]

export interface CourseContentGenInput {
 payload: SuggestCourseGenType
 operation: ContentGenType
}

type DummyString = string
export type GenerateCourseResult = Partial<
 Record<
  ContentGenType,
  NewChapter | NewTopic | NewCourse | AdditionalChapters | AdditionalTopics | DummyString
 >
>

export interface CourseFilter extends CompanyIdFilter {
 status?: CourseStatus
}

export interface CoursesComposite {
 courseId: string
 title: string
}

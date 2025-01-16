import { Types } from 'mongoose'
import { Image } from './common'
import { Banner } from './page'
import { Pricing } from './pricing'
import { ProjectDetail } from './projectDetail'
import { SEOHead } from './seoHead'
import { ToolsTechnologies } from './toolsTechnologies'
import { IUser } from './user'
import { IExam } from './exam'
import { Category } from './category'
import { CompanyIdFilter } from './company'
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

export interface Topic {
 slNo: number
 code?: string
 name: string
 examIds?: Types.ObjectId[]
 exams?: IExam[]
}
export interface Chapter {
 slNo: number
 code?: string
 name: string
 topics: Topic[]
 examIds?: Types.ObjectId[]
 exams?: IExam[] // Assessment ===
}
export interface Course {
 id?: string
 _id?: Types.ObjectId
 slNo: number
 code: string
 title: string
 slug: string
 cardImage?: Image
 heroImage?: Image
 images?: Image[]
 description?: string
 mediumDescription?: string
 longDescription?: string
 status?: CourseStatus
 authorId?: Types.ObjectId

 categoryId?: Types.ObjectId
 category?: Category

 chapters?: Chapter[]
 toolsAndTechnologies?: ToolsTechnologies[]
 projects?: ProjectDetail[]
 instructors?: IUser[]
 instructorIds?: Types.ObjectId[]
 banner?: Banner[]
 duration?: number
 durationUnit?: string
 seoHead?: SEOHead
 pricings?: Pricing[]
 publishedAt?: Date
 createdAt?: Date
 updatedAt?: Date
}

export type NewCourse = Partial<Course>

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

export type NewChapter = Partial<Chapter>
export type NewTopic = Partial<Topic>

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

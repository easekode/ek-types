import { Schema, Types, Document } from 'mongoose'
import { IUser } from './user'
import { ExamShareStatus, ICourseBatch, ICourseBatchSession } from './courseBatch'
import { Course } from './course'
import { z } from 'zod'
import { FileTypeSchema } from './common'

export enum QuestionType {
 RADIO_GROUP = 'radio_group',
 MULTIPLE_CHOICE = 'multiple_choice',
 SHORT_ANSWER = 'short_answer',
 FILL_IN_THE_BLANK = 'fill_in_the_blank',
 MATCHING = 'matching',
 ESSAY = 'essay',
 RANKING = 'ranking',
 SCALE = 'scale',
 YES_NO = 'yes_no',
 MULTIPLE_RESPONSE = 'multiple_response',
 SCENARIO_BASED = 'scenario_based',
 IMAGE_BASED = 'image_based',
 CODING = 'coding',
 VOICE_BASED = 'voice_based'
}

export enum Level {
 EASY = 'EASY',
 MEDIUM = 'MEDIUM',
 HARD = 'HARD'
}

export enum ExamType {
 EXAM = 'Exam',
 QUIZ = 'Quiz'
}

export const NewQuestionSchema = z.object({
 type: z.nativeEnum(QuestionType), // Type of question
 name: z.string(), // unique name of the question
 title: z.string(), // Text of the question
 choices: z.array(z.string()), // Array of options (for multiple choice, ranking, and multiple response questions)
 correctAnswers: z.array(z.string()), // Correct answer for the question and it's mandatory
 score: z.number().optional().default(1),
 file: FileTypeSchema.optional()
})

export type NewQuestion = z.infer<typeof NewQuestionSchema>

export type Question = NewQuestion & Document

export const QuestionBankSchema = NewQuestionSchema.extend({
 question: z.string(),
 subject: z.instanceof(Types.ObjectId).optional(),
 chapter: z.instanceof(Types.ObjectId).optional(),
 topic: z.instanceof(Types.ObjectId).optional()
})

export type QuestionBank = z.infer<typeof QuestionBankSchema>

export const SuggestQuestionInputSchema = z.object({
 course: z.string().optional(),
 chapter: z.string().optional(),
 topics: z.string().optional(),
 level: z.enum(Object.values(Level) as [Level, ...Level[]]).optional(),
 questionCount: z.number().optional(),
 existingQuestions: z.array(NewQuestionSchema).optional().default([])
})

export type SuggestQuestionInput = z.infer<typeof SuggestQuestionInputSchema>

export const NewExamSchema = z.object({
 //  _id: z.instanceof(Schema.Types.ObjectId).optional(),
 _id: z.union([z.instanceof(Types.ObjectId), z.string()]).optional(),
 title: z.string(),
 description: z.string(),
 courseId: z.instanceof(Types.ObjectId).optional(),
 level: z.enum(Object.values(Level) as [Level, ...Level[]]),
 tags: z.array(z.string()),
 questions: z.array(NewQuestionSchema),
 type: z.nativeEnum(ExamType),
 maxTimeToFinish: z.number().optional().default(0),
 maxTimeToFinishPage: z.number().optional().default(0),
 showTimerPanel: z.boolean().optional().default(false),
 showProgressPanel: z.boolean().optional().default(false),
 //  createdById: z.instanceof(Schema.Types.ObjectId).optional()
 createdById: z.union([z.instanceof(Types.ObjectId), z.string()]).optional()
})

export type NewExam = z.infer<typeof NewExamSchema>
export type IExam = NewExam

export enum ExamTrackerStatus {
 NOT_STARTED = 'NOT_STARTED',
 CANCELLED = 'CANCELLED',
 IN_PROGRESS = 'IN_PROGRESS',
 SUBMITTED = 'SUBMITTED',
 COMPLETED = 'COMPLETED'
}

export const AggregatedExamTrackerSchema = z.object({
 _id: z.string(),
 batchId: z.string().optional(),
 email: z.string().optional(),
 examCode: z.string().optional(),
 notAttempted: z.number().optional(),
 score: z.number().optional(),
 sessionId: z.string().optional(),
 studentId: z.string().optional(),
 totalAnswers: z.number().optional(),
 totalCorrectAnswers: z.number().optional(),
 totalQuestions: z.number().optional(),
 totalWrongAnswers: z.number().optional()
})

export type AggregatedExamTracker = z.infer<typeof AggregatedExamTrackerSchema>

export interface IExamTracker extends Document {
 examId: Types.ObjectId
 exam?: IExam
 examTitle?: string
 studentId: Types.ObjectId
 student?: IUser
 instructorId: Types.ObjectId
 isChecked?: boolean
 batchId?: Types.ObjectId
 batch?: ICourseBatch
 sessionId?: Types.ObjectId
 session?: ICourseBatchSession
 remarks?: string
 score?: number
 questions: NewQuestion[] // questions in the exam
 answers?: string // json stringified AnsweredQuestions
 status?: ExamTrackerStatus
 examCode?: string
 totalCorrectAnswers?: number
 totalWrongAnswers?: number
 isPass?: boolean
 percentage?: number
 totalQuestions?: number
 totalAnswers?: number
}
export interface NewExamTrackersInput {
 batchId: Types.ObjectId
 examId: Types.ObjectId
 studentIds: Types.ObjectId[]
}

export type AnsweredQuestions = Record<string, string[]>
export interface NewAnswerInput {
 answers: AnsweredQuestions // answers submitted by the student
 examCode: string
}

export type NewExamTracker = Omit<IExamTracker, keyof Document>

export type ExistingQuiz = {
 quiz: IExam
 shared?: ExamShareStatus
 status?: ExamShareStatus
}

export interface UpdateExamStatusInput {
 batchId: string
 examId: string
 status: string
}

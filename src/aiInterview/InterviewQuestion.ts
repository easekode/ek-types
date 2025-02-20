import { z } from 'zod'
import { QuestionAnswerSchema } from './QuestionAnswer'
import { CreatedAndUpdatedAt } from '../common'
import { Document } from 'mongoose'

export enum InterviewQuestionStatus {
 DRAFT = 'DRAFT',
 PUBLISHED = 'PUBLISHED',
 IN_PROGRESS = 'PUBLISHED',
 COMPLETED = 'COMPLETED',
 UNDER_REVIEW = 'UNDER_REVIEW'
}

export const InterviewQuestionSchema = z.object({
 title: z.string().min(1),
 status: z.nativeEnum(InterviewQuestionStatus),
 timesUsed: z.number().optional(),
 experienceRange: z
  .object({
   min: z.number().min(0),
   max: z.number().min(0)
  })
  .refine((data) => data.min <= data.max, {
   message: 'min should be less than or equal to max'
  }),
 questions: z.array(QuestionAnswerSchema),
 totalQuestions: z.number().optional()
})

export const UpdateInterviewQuestionSchema = InterviewQuestionSchema.partial()
 .omit({
  timesUsed: true,
  totalQuestions: true
 })
 .strict()

export const NewInterviewQuestionReqSchema = InterviewQuestionSchema.omit({
 title: true,
 status: true,
 timesUsed: true,
 questions: true
}).extend({
 prompt: z.string(),
 questionSet: z.number()
})
export type NewInterviewQuestionReq = z.infer<typeof NewInterviewQuestionReqSchema>
export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema> & Document & CreatedAndUpdatedAt
export type UpdateInterviewQuestion = z.infer<typeof UpdateInterviewQuestionSchema>

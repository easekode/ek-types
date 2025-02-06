import { z } from 'zod'
import { QuestionAnswerSchema } from './QuestionAnswer'

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
 timesUsed: z.number(),
 experienceRange: z
  .object({
   min: z.number().min(0),
   max: z.number().min(0)
  })
  .refine((data) => data.min <= data.max, {
   message: 'min should be less than or equal to max'
  }),
 questions: z.array(QuestionAnswerSchema)
})

const UpdateInterviewQuestionSchema = InterviewQuestionSchema.partial()

export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>
export type UpdateInterviewQuestion = z.infer<typeof UpdateInterviewQuestionSchema>

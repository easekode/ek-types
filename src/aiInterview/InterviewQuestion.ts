import { z } from 'zod';
import { QuestionAnswerSchema } from './QuestionAnswer';
import { CreatedAndUpdatedAt, ObjectIdOrStringId } from '../common';
import { Document } from 'mongoose';
import { QuestionType } from '../exam';

export enum InterviewQuestionStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
  IN_PROGRESS = 'IN_PUBLISHED',
  COMPLETED = 'COMPLETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export const InterviewQuestionSchema = z.object({
  title: z.string().min(1),
  problemSnippet: z.string().optional(),
  status: z.nativeEnum(InterviewQuestionStatus),
  timesUsed: z.number().optional(),
  experienceRange: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
    })
    .refine((data) => data.min <= data.max, {
      message: 'min should be less than or equal to max',
    }),
  questions: z.array(QuestionAnswerSchema),
  totalQuestions: z.number().optional(),
  jobId: ObjectIdOrStringId,
});

export const UpdateInterviewQuestionSchema = InterviewQuestionSchema.partial()
  .omit({
    timesUsed: true,
    totalQuestions: true,
  })
  .strict();

export const NewInterviewQuestionReqSchema = InterviewQuestionSchema.omit({
  title: true,
  status: true,
  timesUsed: true,
  questions: true,
}).extend({
  prompt: z.string(),
  questionSet: z.number(),
});
export type NewInterviewQuestionReq = z.infer<
  typeof NewInterviewQuestionReqSchema
>;
export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema> &
  Document &
  CreatedAndUpdatedAt;
export type UpdateInterviewQuestion = z.infer<
  typeof UpdateInterviewQuestionSchema
>;

/*
this is the schema for the interview question that will be asked by AI to the user
*/
export const AiInterviewQuestionSchema = z.object({
  question: z.string(),
  problemSnippet: z.string().optional(),
  choices: z.array(z.string()).optional(),
  questionType: z.nativeEnum(QuestionType),
});

export type AiInterviewQuestion = z.infer<typeof AiInterviewQuestionSchema>;

export const AiInterviewResponseSchema = z.object({
  buffer: z.string(),
  interviewQuestion: AiInterviewQuestionSchema,
});
export type AiInterviewResponse = z.infer<typeof AiInterviewResponseSchema>;

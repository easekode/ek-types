import { z } from 'zod'
import { ObjectIdOrStringId } from '../common'
import { QuestionAnswerSchema } from './QuestionAnswer'

//refer openai documentation for the roles
export enum InterviewRoles {
 USER = 'user',
 ASSISTANT = 'assistant',
 SYSTEM = 'system'
}

export const MessageSchema = z.object({
 role: z.nativeEnum(InterviewRoles),
 content: z.string()
})

export type Message = z.infer<typeof MessageSchema>

export const ConvHistorySchema = MessageSchema.extend({
 qid: ObjectIdOrStringId.optional(),
 question: QuestionAnswerSchema.optional()
})

export type ConvHistory = z.infer<typeof ConvHistorySchema>

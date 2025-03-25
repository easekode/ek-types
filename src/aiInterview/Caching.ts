import { z } from 'zod'


export enum InterviewSessionStatus {
 ACTIVE = 'ACTIVE',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

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
export const InterviewSessionSchema = z.object({
 interviewId: z.string(),
 status: z.nativeEnum(InterviewSessionStatus).optional(),
 conversation: z.array(MessageSchema).optional(),
 createdAt: z.string().optional(),
 updatedAt: z.string().optional()
})

export type Message = z.infer<typeof MessageSchema>
export type InterviewSession = z.infer<typeof InterviewSessionSchema>


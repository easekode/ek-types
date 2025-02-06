import { z } from 'zod'
import { QuestionType } from '../exam'

export const QuestionAnswerSchema = z.object({
    question: z.string().min(1),
    type: z.nativeEnum(QuestionType),
    choices: z.array(z.string()).optional(),
    answer: z.array(z.string())
})
   
export type NewQuestionAnswer = z.infer<typeof QuestionAnswerSchema>
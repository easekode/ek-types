import { z } from 'zod'

// Define the PromptType enum
export enum PromptType {
 COURSE = 'COURSE',
 COURSE_DESCRIPTION = 'COURSE_DESCRIPTION',
 COURSE_CHAPTER = 'COURSE_CHAPTER',
 CHAPTER_TOPICS = 'CHAPTER_TOPICS',
 EXAMS = 'EXAMS',
 EXAM_QUESTIONS = 'EXAM_QUESTIONS',
 INTERVIEW = 'INTERVIEW'
}

// Create the Zod schema for the prompt
const promptSchema = z.object({
 prompt: z.string().min(1, 'Prompt cannot be empty'),
 type: z.nativeEnum(PromptType)
})

// Infer the Prompt type from the Zod schema
export type Prompt = z.infer<typeof promptSchema>

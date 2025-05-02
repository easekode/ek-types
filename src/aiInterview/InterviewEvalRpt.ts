import { z } from 'zod'

export enum InterviewEvalRecommendation {
 SELECTED = 'SELECTED',
 REJECTED = 'REJECTED'
}
// Define the evaluation result schema
const InterviewEvalResultSchema = z.object({
 technicalScore: z.number().min(1).max(10).describe('Technical accuracy score (1-10)'),
 communicationScore: z.number().min(1).max(10).describe('Clarity of communication score (1-10)'),
 problemSolvingScore: z.number().min(1).max(10).describe('Problem-solving ability score (1-10)'),
 relevanceScore: z.number().min(1).max(10).describe('Relevance to job requirements score (1-10)'),
 overallScore: z.number().min(1).max(10).describe('Composite overall score (1-10)'),
 summary: z.string().describe('Brief qualitative summary of strengths/weaknesses'),
 recommendation: z.nativeEnum(InterviewEvalRecommendation).describe('Final hiring decision')
})

export type InterviewEvalResult = z.infer<typeof InterviewEvalResultSchema>
import { z } from 'zod'

export enum InterviewEvalRecommendation {
 SELECTED = 'SELECTED',
 REJECTED = 'REJECTED'
}
// Define the evaluation result schema
export const InterviewEvalResultSchema = z.object({
 technicalScore: z.number().describe('Technical accuracy score (1-10)'),
 communicationScore: z.number().describe('Clarity of communication score (1-10)'),
 problemSolvingScore: z.number().describe('Problem-solving ability score (1-10)'),
 relevanceScore: z.number().describe('Relevance to job requirements score (1-10)'),
 overallScore: z.number().describe('Composite overall score (1-10)'),
 summary: z.string().describe('Brief qualitative summary of strengths/weaknesses'),
 recommendation: z.nativeEnum(InterviewEvalRecommendation).describe('Final hiring decision')
})

export type InterviewEvalResult = z.infer<typeof InterviewEvalResultSchema>
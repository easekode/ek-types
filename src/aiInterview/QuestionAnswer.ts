import { z } from 'zod'
import { QuestionType } from '../exam'

export const QuestionAnswerSchema = z.object({
 question: z.string(),
 type: z.nativeEnum(QuestionType),
 choices: z.array(z.string()).optional(),
 answer: z.array(z.string())
})

export type NewQuestionAnswer = z.infer<typeof QuestionAnswerSchema>

export const QuestionSetSchema = z.object({
 title: z.string(),
 questions: z.array(QuestionAnswerSchema)
})

export type NewQuestionSet = z.infer<typeof QuestionSetSchema>
export const NewQuestionSetsSchema = z.object({
 questionSets: z.array(QuestionSetSchema)
})
export type NewQuestionSets = z.infer<typeof NewQuestionSetsSchema>

/* export const NewQuestionSetJsonSchema = {
 $schema: 'http://json-schema.org/draft-07/schema#',
 type: 'array',
 items: {
  type: 'object',
  properties: {
   title: {
    type: 'string',
    minLength: 1
   },
   questions: {
    type: 'array',
    items: {
     type: 'object',
     properties: {
      question: {
       type: 'string',
       minLength: 1
      },
      type: {
       type: 'string',
       enum: [QuestionType.RADIO_GROUP, QuestionType.MULTIPLE_CHOICE, QuestionType.YES_NO, QuestionType.SCENARIO_BASED, QuestionType.CODING]
      },
      choices: {
       type: 'array',
       items: {
        type: 'string'
       },
       nullable: true
      },
      answer: {
       type: 'array',
       items: {
        type: 'string'
       },
       minItems: 1
      }
     },
     required: ['question', 'type', 'answer'],
     additionalProperties: false
    }
   }
  },
  required: ['title', 'questions'],
  additionalProperties: false
 }
}
 */

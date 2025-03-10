import { z } from 'zod';
import { QuestionType } from '../exam';
import { InterviewQuestionStatus } from './InterviewQuestion';

export const QuestionAnswerSchema = z.object({
  question: z.string(),
  problemSnippet: z.string().optional(),
  type: z.nativeEnum(QuestionType),
  choices: z.array(z.string()).optional(),
  answer: z.array(z.string()),
});

export type NewQuestionAnswer = z.infer<typeof QuestionAnswerSchema>;
export type ProvidedQnA = NewQuestionAnswer;

export type Questions = Omit<NewQuestionAnswer, 'answer'>;

export const QuestionSetSchema = z.object({
  title: z.string(),
  questions: z.array(QuestionAnswerSchema),
  status: z.nativeEnum(InterviewQuestionStatus).optional(),
});

export type NewQuestionSet = z.infer<typeof QuestionSetSchema>;
export const NewQuestionSetsSchema = z.object({
  questionSets: z.array(QuestionSetSchema),
});
export type NewQuestionSets = z.infer<typeof NewQuestionSetsSchema>;

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
    },
    required: ['title', 'questions'],
    additionalProperties: false,
  },
  required: ['title', 'questions'],
  additionalProperties: false
 }
}
 */

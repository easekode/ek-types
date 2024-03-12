import { Schema } from 'mongoose';
import { QuestionBank } from './questionBank';

export enum Level {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
export interface Assessment {
  assessmentTitle: string;
  assessmentDescription: string;
  questions: AssessmentQuestion[];
  isNegativeScoring: boolean;
  level: Level;
}

export interface AssessmentQuestion {
  order: number;
  questionId?: Schema.Types.ObjectId;
}

// Create
export interface CreateAssessmentQuestionInput {
  assessmentId: Schema.Types.ObjectId;
  order: number;
  questionId?: Schema.Types.ObjectId;
}

// Update
export interface UpdateAssessmentQuestionInput {
  assessmentId: Schema.Types.ObjectId;
  order: number;
  questionId: Schema.Types.ObjectId;
}

// GET
type StudentQuestionBankOmit = 'rightAnswer';
export type StudentAssessmentQuestion = Omit<
  QuestionBank,
  StudentQuestionBankOmit
>;

export interface AssessmentTracker {
  assessmentId?: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  answerByStudent?: string;
  studentId: Schema.Types.ObjectId;
  instructorId: Schema.Types.ObjectId;
  isChecked: boolean;
  remarks?: string;
}

type StudentAssessmentAnswerOmit =
  | 'isChecked'
  | 'remarks'
  | 'instructorId'
  | 'studentId';

export type StudentAssessmentAnswer = Omit<
  AssessmentTracker,
  StudentAssessmentAnswerOmit
>;

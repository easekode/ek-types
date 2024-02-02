import { ObjectId } from 'mongodb';
import { QuestionBank } from './questionBank';

export interface AssessmentQuestion {
  order: number;
  question?: ObjectId;
}

// Create
export interface CreateAssessmentQuestionInput {
  assessmentId: ObjectId;
  order: number;
  question?: ObjectId;
}

// Update
export interface UpdateAssessmentQuestionInput {
  assessmentId: ObjectId;
  order: number;
  question: ObjectId;
}

// GET
type StudentQuestionBankOmit = 'rightAnswer';
export type StudentAssessmentQuestion = Omit<
  QuestionBank,
  StudentQuestionBankOmit
>;

import { Schema } from 'mongoose';
import { NewQuestion, QuestionBank } from './questionBank';

export enum Level {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
export interface Exam {
  examTitle: string;
  examDescription: string;
  questions: ExamQuestion[];
  isNegativeScoring: boolean;
  level: Level;
}

export interface NewExam {
  examTitle: string;
  examDescription: string;
  questions: NewQuestion[];
  isNegativeScoring: boolean;
}

export interface ExamQuestion {
  order: number;
  questionId?: Schema.Types.ObjectId;
}

// Create
export interface AddQuestionToExamInput {
  examId: Schema.Types.ObjectId;
  order: number;
  questionId?: Schema.Types.ObjectId;
}

// Update
export interface UpdateExamQuestionInput {
  examId: Schema.Types.ObjectId;
  order: number;
  questionId: Schema.Types.ObjectId;
}

// GET
type StudentQuestionBankOmit = 'rightAnswer';
export type StudentExamQuestion = Omit<QuestionBank, StudentQuestionBankOmit>;

export interface ExamTracker {
  examId?: Schema.Types.ObjectId;
  data?: Record<string, any>;
  studentId: Schema.Types.ObjectId;
  instructorId: Schema.Types.ObjectId;
  isChecked: boolean;
  remarks?: string;
}

type StudentExamAnswerOmit =
  | 'isChecked'
  | 'remarks'
  | 'instructorId'
  | 'studentId';

export type StudentExamAnswer = Omit<ExamTracker, StudentExamAnswerOmit>;

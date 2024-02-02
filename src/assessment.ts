import { ObjectId } from 'mongodb';
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
	questionId?: ObjectId;
}

// Create
export interface CreateAssessmentQuestionInput {
	assessmentId: ObjectId;
	order: number;
	questionId?: ObjectId;
}

// Update
export interface UpdateAssessmentQuestionInput {
	assessmentId: ObjectId;
	order: number;
	questionId: ObjectId;
}

// GET
type StudentQuestionBankOmit = 'rightAnswer';
export type StudentAssessmentQuestion = Omit<
	QuestionBank,
	StudentQuestionBankOmit
>;

export interface AssessmentTracker {
	assessmentId?: ObjectId;
	questionId: ObjectId;
	answerByStudent?: string;
	studentId: ObjectId;
	instructorId: ObjectId;
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

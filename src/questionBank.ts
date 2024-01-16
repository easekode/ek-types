import { ObjectId } from 'mongodb';
import { Level } from './assessment';

export interface IQuestionBank extends Document {
	question: string;
	subject?: ObjectId;
	chapter?: ObjectId;
	topic?: ObjectId;
	questionType: QuestionType;
	options: string[];
	rightAnswer: string;
	score: number;
	negativeScore: number;
	level: Level;
}

export enum QuestionType {
	MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
	TRUE_FALSE = 'TRUE_FALSE',
	SHORT_ANSWER = 'SHORT_ANSWER',
	CODING = 'CODING',
	TESTING = 'TESTING',
}

import { ObjectId } from 'mongodb';

export interface IAssessmentQuestion {
	order: number;
	question?: ObjectId;
}

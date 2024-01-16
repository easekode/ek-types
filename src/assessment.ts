import { IAssessmentQuestion } from './assessmentQuestion';

export interface IAssessment {
	assessmentTitle: string;
	assessmentDescription: string;
	questions: IAssessmentQuestion[];
	isNegativeScoring: boolean;
	level: Level;
}

export enum Level {
	EASY = 'EASY',
	MEDIUM = 'MEDIUM',
	HARD = 'HARD',
}

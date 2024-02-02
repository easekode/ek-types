import { AssessmentQuestion } from './assessmentQuestion';

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

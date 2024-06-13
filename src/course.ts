import { Schema, Types } from 'mongoose';
import { Image } from './common';
import { Banner } from './page';
import { Pricing } from './pricing';
import { ProjectDetail } from './projectDetail';
import { SEOHead } from './seoHead';
import { ToolsTechnologies } from './toolsTechnologies';
import { IUser, WebUser } from './user';
import { IExam } from './exam';
export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum DurationUnit {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
}

export interface Topic {
  slNo: number;
  code: string;
  name: string;
  examIds?: Schema.Types.ObjectId[];
  exams?: IExam[];
}
export interface Chapter {
  slNo: number;
  code: string;
  name: string;
  topics: Topic[];
  examIds?: Schema.Types.ObjectId[];
  exams?: IExam[];
}
export interface Course {
  id?: string;
  _id?: Schema.Types.ObjectId;
  slNo: number;
  code: string;
  title: string;
  images?: Image[];
  shortDescription?: string;
  mediumDescription?: string;
  longDescription?: string;
  status?: CourseStatus;

  chapters?: Chapter[];
  toolsAndTechnologies?: ToolsTechnologies[];
  projects?: ProjectDetail[];
  instructors?: IUser[];
  instructorIds?: Schema.Types.ObjectId[];
  banner?: Banner[];
  duration?: number;
  durationUnit?: string;
  seoHead?: SEOHead;
  pricings?: Pricing[];
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewCourse = Omit<Course, 'id' | '_id' | 'subjects'> & {
  chapters: NewChapter[];
};

export type NewChapter = Omit<Chapter, 'id' | '_id' | 'topics'> & {
  topics: NewTopic[];
};

export type NewTopic = Omit<Topic, 'id' | '_id'>;

export interface MasterClass {
  id?: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  course: Course;
  attendingCount?: number;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  image?: Image;
  instructors?: WebUser[];
}

export interface Schedule {
  startDate: string;
  days: string[];
  timings: string[];
}

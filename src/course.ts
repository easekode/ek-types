import { Schema, Types } from 'mongoose';
import { Image } from './common';
import { Banner } from './page';
import { Pricing } from './pricing';
import { ProjectDetail } from './projectDetail';
import { SEOHead } from './seoHead';
import { ToolsTechnologies } from './toolsTechnologies';
import { WebUser } from './user';

export interface Topic {
  slNo: number;
  code: string;
  name: string;
}
export interface Chapter {
  slNo: number;
  code: string;
  name: string;
  topics: Topic[];
}
export interface Subject {
  slNo: number;
  code: string;
  title: string;
  chapters: Chapter[];
}

export interface Course {
  id?: string;
  _id?: Types.ObjectId;
  slNo: number;
  code: string;
  title: string;
  images?: Image[];
  shortDescription?: string;
  mediumDescription?: string;
  longDescription?: string;
  durationInMonths?: number;
  subjects?: Subject[];
  toolsAndTechnologies?: ToolsTechnologies[];
  projects?: ProjectDetail[];
  instructors?: WebUser[];
  banner?: Banner[];
  seoHead?: SEOHead;
  pricings?: Pricing[];
}

export interface NewCourse {
  title: string;
  shortDescription: string;
  mediumDescription: string;
  longDescription: string;
  durationInMonths: number;
  subjects: Types.ObjectId[];
  code: string;
  slNo: number;
}

export interface NewSubject {
  title: string;
  chapters: Schema.Types.ObjectId[];
  code: string;
  slNo: number;
}

export interface NewChapter {
  title: string;
  topics: Schema.Types.ObjectId[];
  code: string;
  slNo: number;
}

export interface NewTopic {
  title: string;
  code: string;
  slNo: number;
}

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

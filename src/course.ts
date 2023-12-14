import { Image } from './common';
import { Banner } from './page';
import { Pricing } from './pricing';
import { ProjectDetail } from './projectDetail';
import { SEOHead } from './seoHead';
import { ToolsTechnologies } from './toolsTechnologies';
import { WebUser } from './user';

export interface Topic {
  name: string;
}
export interface Chapter {
  name: string;
  topics: Topic[];
}
export interface Subject {
  title: string;
  chapters: Chapter[];
}
export interface Subject {
  title: string;
  chapters: Chapter[];
}
export interface Course {
  id?: string;
  _id?: string;
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
export interface MasterClass {
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

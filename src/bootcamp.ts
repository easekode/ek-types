import { Image } from './common';
import { Course, Schedule, Subject } from './course';
import { Banner } from './page';
import { Pricing } from './pricing';
import { ProjectDetail } from './projectDetail';
import { SEOHead } from './seoHead';
import { ToolsTechnologies } from './toolsTechnologies';
import { WebUser } from './user';

export interface Bootcamp {
  id: string;
  title: string;
  images?: Image[];
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendingCount: number;
  shortDescription?: string;
  mediumDescription?: string;
  longDescription?: string;
  course?: Course;
  schedules?: Schedule[];
  banner?: Banner[];
  seoHead?: SEOHead;
  subjects?: Subject[];
  toolsAndTechnologies?: ToolsTechnologies[];
  instructors?: WebUser[];
  projects?: ProjectDetail[];
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  pricings?: Pricing[];
}

// test

import { z } from 'zod';
import { CompanyIdFilter } from './company';
import {
  CourseBatchStatus,
  CourseBatchTrackerStatus,
  ExamShareStatus,
} from './courseBatch';
import { Types } from 'mongoose';
import { ObjectIdOrStringId } from './common';

export interface BatchFilter extends CompanyIdFilter {
  status?: CourseBatchStatus;
  courseId?: Types.ObjectId;
  instructors?: Types.ObjectId;
}

const ExamIdStatusSchema = z.object({
  examId: ObjectIdOrStringId,
  status: z.nativeEnum(ExamShareStatus),
});

const TopicSchema = z.object({
  _id: ObjectIdOrStringId,
  name: z.string(),
  status: z
    .nativeEnum(CourseBatchTrackerStatus)
    .default(CourseBatchTrackerStatus.NOT_STARTED),
});

const ChapterSchema = z.object({
  _id: ObjectIdOrStringId,
  name: z.string(),
  topics: z.array(TopicSchema),
  status: z
    .nativeEnum(CourseBatchTrackerStatus)
    .default(CourseBatchTrackerStatus.NOT_STARTED),
  examIdStatus: z.array(ExamIdStatusSchema).optional(),
});

const CourseProgressSchema = z.object({
  _id: ObjectIdOrStringId,
  courseId: ObjectIdOrStringId,
  chapters: z.array(ChapterSchema),
  status: z.nativeEnum(CourseBatchTrackerStatus).optional(),
});

export const CourseBatchSchema = z.object({
  name: z.string(),
  code: z.string(),
  courseId: ObjectIdOrStringId,
  instructors: z.array(ObjectIdOrStringId),
  event: ObjectIdOrStringId.optional(),
  courseProgress: CourseProgressSchema.optional(),
  stats: z
    .object({
      totalChapters: z.number().default(0),
      completedChapters: z.number().default(0),
      ratings: z.number().default(0),
      completedSessions: z.number().default(0),
    })
    .optional(),
  status: z
    .nativeEnum(CourseBatchStatus)
    .default(CourseBatchStatus.NOT_STARTED),
  companyId: ObjectIdOrStringId,
});

export const UpdateCourseBatchSchema = CourseBatchSchema.partial().omit({
  companyId: true,
});

export const NewCourseBatchSchema = CourseBatchSchema.omit({
  status: true,
  courseProgress: true,
}).strict();

export type CourseBatch = z.infer<typeof CourseBatchSchema>;
export type _NewCourseBatch = z.infer<typeof NewCourseBatchSchema>; //TODO remove exp after testing
export type UpdateCourseBatch = z.infer<typeof UpdateCourseBatchSchema>;

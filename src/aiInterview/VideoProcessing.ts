import { z } from 'zod';
import { ObjectIdOrStringId } from '../common';

export const VideoProcessingRetrySchema = z.object({
    interviewId: ObjectIdOrStringId
})

export type VideoProcessingRetry = z.infer<typeof VideoProcessingRetrySchema>
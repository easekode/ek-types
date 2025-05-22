import { z } from 'zod'
import { DateObjOrString } from '../common'

export const RescheduleHistorySchema = z.object({
 prevTime: DateObjOrString.optional(),
 prevReason: z.string().optional(),
 changedAt: DateObjOrString.optional()
})

export type RescheduleHistory = z.infer<typeof RescheduleHistorySchema>

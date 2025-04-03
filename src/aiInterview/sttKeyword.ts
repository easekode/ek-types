import { z } from 'zod'

export const SttKeywordSchem = z.object({
 keywords: z.array(z.string()).min(1)
})

export type SttKeyword = z.infer<typeof SttKeywordSchem>

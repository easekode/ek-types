import { z } from 'zod'

export const SttKeywordSchem = z.object({
 keywords: z.array(z.string())
})

export type SttKeyword = z.infer<typeof SttKeywordSchem>

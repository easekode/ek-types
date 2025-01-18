import { z } from 'zod'

export const ProjectDetailSchema = z.object({
 id: z.string(),
 title: z.string(),
 description: z.string()
})

export type ProjectDetail = z.infer<typeof ProjectDetailSchema>

import { z } from 'zod'
import { Image, ImageSchema } from './common'

export interface SEOHead {
 title?: string
 description?: string
 image?: Image
 url?: string
 keyword?: string
}

export const SEOHeadSchema = z.object({
 title: z.string().optional(),
 description: z.string().optional(),
 image: ImageSchema.optional(),
 url: z.string().optional(),
 keyword: z.string().optional()
})

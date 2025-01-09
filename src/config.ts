import { Address } from './address'
import { Image } from './common'
import { z } from 'zod'

export interface Config {
 websiteName?: string
 websiteTagline?: string
 websiteUrl?: string
 websiteDescription?: string
 logo?: Image
 logoSecondary?: Image
 addressTitle?: string
 address?: Address
 emailTitle?: string
 email?: string
 mobileTitle?: string
 mobile?: string
 whatsAppMessage?: string
}

export const appConfigSchema = z.object({
 COMPANY_PROFILE_CHECK_ENABLED: z.boolean()
})
export type AppConfig = z.infer<typeof appConfigSchema>

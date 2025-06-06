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
 COMPANY_PROFILE_CHECK_ENABLED: z.boolean(),
 REDIS_CONFIG: z.object({
  PRIMARY_PORT: z.number(),
  PRIMARY_HOST: z.string(),
  READONLY_PORT: z.number().optional(),
  READONLY_HOST: z.string().optional(),
  DB: z.number(),
  REPLICA_ENABLED: z.boolean().optional()
 }),
 SOCKET_CLIENT_URL: z.string().url()
})
export type AppConfig = z.infer<typeof appConfigSchema>

export const appConfigFeSchema = z.object({
 NEXT_PUBLIC_CLIENT_KEY: z.string(),
 NEXT_PUBLIC_API_URL: z.string(),
 GOOGLE_CLIENT_ID: z.string(),
 GOOGLE_CLIENT_SECRET: z.string(),
 AUTH_SECRET: z.string(),
 NEXT_PUBLIC_SOCKET_URL: z.string()
})

export type AppConfigFe = z.infer<typeof appConfigFeSchema>

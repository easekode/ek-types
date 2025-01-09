import { z } from 'zod'

/**
 * @deprecated Use `AddressCreate` or `AddressUpdate` instead.
 */
export interface Address {
 street: string
 city: string
 state: string
 postalCode: string
 country: string
}

export const addressCreateSchema = z.object({
 address: z.string(),
 city: z.string(),
 country: z.string(),
 state: z.string(),
 landmark: z.string().optional(),
 pinCode: z.string(),
 location: z
  .object({
   type: z.string(),
   coordinates: z.array(z.number())
  })
  .optional()
})

export type AddressCreate = z.infer<typeof addressCreateSchema>

export const addressUpdateSchema = addressCreateSchema.partial()

export type AddressUpdate = z.infer<typeof addressUpdateSchema>

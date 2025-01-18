import { Types } from 'mongoose'
import { z } from 'zod'

export const AddressSchema = z.object({
 _id: z.instanceof(Types.ObjectId).optional(),
 address: z.string().optional(),
 street: z.string(),
 city: z.string(),
 state: z.string(),
 pinCode: z.string(),
 country: z.string(),
 landmark: z.string().optional(),
 location: z
  .object({
   type: z.string(),
   coordinates: z.array(z.number())
  })
  .optional()
})
export type Address = z.infer<typeof AddressSchema>

export const addressCreateSchema = AddressSchema.omit({
 _id: true
})

export type AddressCreate = z.infer<typeof addressCreateSchema>

export const addressUpdateSchema = addressCreateSchema.partial()

export type AddressUpdate = z.infer<typeof addressUpdateSchema>

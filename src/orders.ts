import { z } from 'zod'
import { Types } from 'mongoose'

export enum OrderStatus {
 pending = 'pending',
 completed = 'completed',
 failed = 'failed'
}

export const OrderItemSchema = z.object({
 productId: z.instanceof(Types.ObjectId),
 quantity: z.number()
})

export type OrderItem = z.infer<typeof OrderItemSchema>

export const OrderSchema = z.object({
 userId: z.instanceof(Types.ObjectId),
 purchaseDate: z.date().optional(),
 items: z.array(OrderItemSchema),
 amount: z.number(),
 charges: z.number(),
 status: z.nativeEnum(OrderStatus).optional()
})

export type IOrder = z.infer<typeof OrderSchema>

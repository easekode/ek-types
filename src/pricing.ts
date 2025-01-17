import { z } from 'zod'

export enum PaymentType {
 UPFRONT = 'UPFRONT',
 MONTHLY = 'MONTHLY',
 SCHOLARSHIP = 'SCHOLARSHIP',
 AFTER_JOB = 'AFTER_JOB'
}

export const PricingSchema = z.object({
 slNo: z.string().optional(),
 paymentType: z.nativeEnum(PaymentType),
 emiValuePerMonth: z.string().optional(),
 price: z.number(),
 actualPrice: z.number()
})

export type Pricing = z.infer<typeof PricingSchema>

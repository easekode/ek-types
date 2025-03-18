import { z } from 'zod';

const LeadStatusSchema = z.object({
  status: z.string(),
  timestamp: z.date(),
});

export const createLeadValidator = z.object({
  name: z.string().min(1),
  companyName: z.string().min(1),
  workEmail: z.string().email(),
  phoneNumber: z.string().min(1),
  statusHistory: z.array(LeadStatusSchema).optional(),
});

export const updateLeadValidator = z.object({
  name: z.string().min(1).optional(),
  companyName: z.string().min(1).optional(),
  workEmail: z.string().email().optional(),
  phoneNumber: z.string().min(1).optional(),
  statusHistory: z.array(LeadStatusSchema).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadValidator>;
export type UpdateLeadInput = z.infer<typeof updateLeadValidator>;
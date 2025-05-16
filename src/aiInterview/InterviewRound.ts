import { z } from 'zod'

   export enum RoundStatus {
    REJECTED = 'rejected',
    SELECTED = 'selected',    
   }
   
   export const InterviewRoundSchema = z.object({
    roundType: z.string(),
    status: z.nativeEnum(RoundStatus),
    remarks: z.string()
  });
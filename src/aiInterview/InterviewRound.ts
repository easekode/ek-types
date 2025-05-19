import { z } from 'zod'

   export enum RoundStatus {
    REJECTED = 'REJECTED',
    SELECTED = 'SELECTED',    
   }
   
   export const InterviewRoundSchema = z.object({
    roundType: z.string(),
    status: z.nativeEnum(RoundStatus),
    remarks: z.string()
  });
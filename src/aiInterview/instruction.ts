export enum ContentType {
 DYNAMIC = 'dynamic',
 STATIC = 'static'
}

export interface Instruction {
 title: string
 description: { content: string; type?: ContentType }[]
}

export interface InterviewInstructions {
 meta: {
  title: string
  description: string
 }
 instructions: Instruction[]
}

export interface InterviewInstructionInput {
 duration: number
 totalQuestion: number
 contactInformation: string
}

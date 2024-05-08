export interface FeedbackTopic extends Document {
  name: string;
}

export type NewFeedbackTopic = Omit<FeedbackTopic, keyof Document>;

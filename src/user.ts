import { Image } from './common';

export interface User {
  name?: string;
  desgination?: string;
  profilePic?: Image;
  description?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
}

export type WebUser = User;

import { AccountStatus, ICommonFields, Image } from './common';

export interface User {
  id?: string;
  name?: string;
  desgination?: string;
  profilePic?: Image;
  description?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
}

export type WebUser = User;

// import type { AccountStatus, ICommonFields, ITokenResponse } from './common';
import type { Types, Model, Schema } from 'mongoose';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  TRANSGENDER = 'TRANSGENDER',
  NOT_SAY = 'RATHER NOT SAY',
}

export interface IAddress {
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  landmark?: string;
  pinCode?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
}

export interface IEnrollmentDetails {
  enrollment?: {
    enrollId: string;
    date: Date;
  };
}

export interface StudentDetails {
  studentCode?: string;
}

export interface IPersonalInfo {
  name?: string;
  uniqueId?: string;
  dob?: string;
  mobile?: string;
  email?: string;
  gender?: Gender;
  address?: IAddress[];
  emailVerified?: boolean;
  mobileVerified?: boolean;
  profilePicture?: Image;
}

export interface IUser
  extends ICommonFields,
    IPersonalInfo,
    IEnrollmentDetails,
    StudentDetails {
  _id?: Schema.Types.ObjectId;
  roles?: Schema.Types.ObjectId[] | string[];
  isAdmin?: boolean;
  lastLoggedIn?: Date;
  isAccountVerified?: boolean;
  accountStatus?: AccountStatus;
  password?: string;
  scopes?: string[];
}
export type TransformedUser = {
  [key in IUserKeys]?: any;
};

export type IUserKeys = keyof IUser;

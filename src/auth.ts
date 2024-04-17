export interface ITokenResponse {
  type: string; // Typically "Bearer" for JWT
  accessToken: string;
  expiresIn: number | string; // Expiration time in seconds
  refreshToken?: string; // Optional refresh token
  scope?: string; // Optional scope or permissions
}

export interface ILoginWithCredInput {
  email: string;
  password: string;
  deviceToken?: string;
}

export interface ILoginResult {
  user: unknown;
  token: ITokenResponse;
}

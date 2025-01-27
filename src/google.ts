export interface GoogleAccessTokenInfo {
 issued_to: string
 audience: string
 user_id: string
 scope: string
 expires_in: number
 email: string
 verified_email: boolean
 access_type: string
}

export interface GoogleIdTokenInfo {
 issued_to: string
 audience: string
 user_id: string
 expires_in: number
 email: string
 email_verified: boolean
 issuer: string
 issued_at: number
}

export interface OAuthUser {
 name: string
 email: string
 providerAccountId: string
}

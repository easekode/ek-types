export interface GoogleTokenInfo {
 issued_to: string
 audience: string
 user_id: string
 scope: string
 expires_in: number
 email: string
 verified_email: boolean
 access_type: string
}

export interface OAuthUser {
 name: string
 email: string
 providerAccountId: string
}

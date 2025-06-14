export interface JwtPayload {
  sub: string // user id
  email: string
  role: "admin" | "member"
  iat?: number
  exp?: number
}

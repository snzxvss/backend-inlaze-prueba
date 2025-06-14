import type { User } from "../auth.service"

export interface AuthResponse {
  user: User
  access_token: string
  expires_in: number
}

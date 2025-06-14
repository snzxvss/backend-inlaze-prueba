import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { DatabaseService } from "../database/database.service"
import type { LoginDto } from "./dto/login.dto"
import type { JwtPayload } from "./interfaces/jwt-payload.interface"
import type { AuthResponse } from "./interfaces/auth-response.interface"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  avatar?: string
  createdAt: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto

    const result = await this.databaseService.executeStoredProcedure("sp_auth_login", [email, password])
    const user = result[0]?.[0]

    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas")
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const access_token = this.jwtService.sign(payload)

    return {
      user,
      access_token,
      expires_in: 3600,
    }
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const result = await this.databaseService.executeStoredProcedure("sp_auth_get_user_by_id", [payload.sub])
    return result[0]?.[0] || null
  }

  async getCurrentUser(userId: string): Promise<User | null> {
    const result = await this.databaseService.executeStoredProcedure("sp_auth_get_user_by_id", [userId])
    return result[0]?.[0] || null
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_auth_get_all_users")
    return result[0] || []
  }
}

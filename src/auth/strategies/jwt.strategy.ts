import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { AuthService } from "../auth.service"
import type { JwtPayload } from "../interfaces/jwt-payload.interface"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET", "your-secret-key"),
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new UnauthorizedException("Token inválido")
    }
    return user
  }
}

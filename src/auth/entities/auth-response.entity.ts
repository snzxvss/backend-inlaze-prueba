import { ApiProperty } from "@nestjs/swagger"

export class UserEntity {
  @ApiProperty({
    description: "ID único del usuario",
    example: "1",
  })
  id: string

  @ApiProperty({
    description: "Nombre completo del usuario",
    example: "Admin Usuario",
  })
  name: string

  @ApiProperty({
    description: "Email del usuario",
    example: "admin@inlaze.com",
  })
  email: string

  @ApiProperty({
    description: "Rol del usuario",
    enum: ["admin", "member"],
    example: "admin",
  })
  role: "admin" | "member"

  @ApiProperty({
    description: "URL del avatar del usuario",
    example: "/placeholder.svg?height=40&width=40",
    required: false,
  })
  avatar?: string

  @ApiProperty({
    description: "Fecha de creación del usuario",
    example: "2024-01-01T00:00:00Z",
  })
  createdAt: string
}

export class AuthResponseEntity {
  @ApiProperty({
    description: "Información del usuario autenticado",
    type: UserEntity,
  })
  user: UserEntity

  @ApiProperty({
    description: "Token JWT para autenticación",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  access_token: string

  @ApiProperty({
    description: "Tiempo de expiración del token en segundos",
    example: 3600,
  })
  expires_in: number
}

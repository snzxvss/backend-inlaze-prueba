import { ApiProperty } from "@nestjs/swagger"

export class UserEntity {
  @ApiProperty({
    description: "ID único del usuario",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  id: string

  @ApiProperty({
    description: "Nombre completo del usuario",
    example: "María García",
  })
  name: string

  @ApiProperty({
    description: "Email del usuario",
    example: "maria.garcia@inlaze.com",
  })
  email: string

  @ApiProperty({
    description: "Rol del usuario",
    enum: ["admin", "member"],
    example: "member",
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

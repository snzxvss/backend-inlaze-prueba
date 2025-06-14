import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, MinLength } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "Nombre completo del usuario",
    example: "María García",
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "Email del usuario",
    example: "maria.garcia@inlaze.com",
    format: "email",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "password123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({
    description: "Rol del usuario",
    enum: ["admin", "member"],
    example: "member",
  })
  @IsEnum(["admin", "member"])
  role: "admin" | "member"

  @ApiPropertyOptional({
    description: "URL del avatar del usuario",
    example: "/placeholder.svg?height=40&width=40",
  })
  @IsString()
  @IsOptional()
  avatar?: string
}

import { IsEmail, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "admin@inlaze.com",
    format: "email",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "admin123",
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  password: string
}

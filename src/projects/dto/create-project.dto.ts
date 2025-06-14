import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateProjectDto {
  @ApiProperty({
    description: "Nombre del proyecto",
    example: "Plataforma de Apuestas Deportivas",
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "Descripción detallada del proyecto",
    example: "Desarrollo de la nueva plataforma principal para apuestas deportivas en Colombia",
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiPropertyOptional({
    description: "Estado del proyecto",
    enum: ["active", "inactive"],
    default: "active",
    example: "active",
  })
  @IsEnum(["active", "inactive"])
  @IsOptional()
  status?: "active" | "inactive" = "active"
}

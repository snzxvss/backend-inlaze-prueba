import { ApiProperty } from "@nestjs/swagger"

export class ProjectEntity {
  @ApiProperty({
    description: "ID único del proyecto",
    example: "550e8400-e29b-41d4-a716-446655440011",
  })
  id: string

  @ApiProperty({
    description: "Nombre del proyecto",
    example: "Plataforma de Apuestas Deportivas",
  })
  name: string

  @ApiProperty({
    description: "Descripción del proyecto",
    example: "Desarrollo de la nueva plataforma principal para apuestas deportivas en Colombia",
  })
  description: string

  @ApiProperty({
    description: "Estado del proyecto",
    enum: ["active", "inactive"],
    example: "active",
  })
  status: "active" | "inactive"

  @ApiProperty({
    description: "Fecha de creación del proyecto",
    example: "2024-01-15T00:00:00Z",
  })
  createdAt: string

  @ApiProperty({
    description: "Fecha de última actualización del proyecto",
    example: "2024-01-15T00:00:00Z",
  })
  updatedAt: string
}

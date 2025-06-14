import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateNotificationDto {
  @ApiProperty({
    description: "Título de la notificación",
    example: "Nueva tarea asignada",
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: "Mensaje de la notificación",
    example: "Se te ha asignado la tarea 'Implementar sistema de autenticación'",
  })
  @IsString()
  @IsNotEmpty()
  message: string

  @ApiProperty({
    description: "Tipo de notificación",
    enum: ["info", "success", "warning", "error"],
    example: "info",
  })
  @IsEnum(["info", "success", "warning", "error"])
  type: "info" | "success" | "warning" | "error"

  @ApiPropertyOptional({
    description: "ID del usuario destinatario",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @IsUUID()
  @IsOptional()
  userId?: string

  @ApiPropertyOptional({
    description: "URL de acción de la notificación",
    example: "/dashboard/tasks",
  })
  @IsString()
  @IsOptional()
  actionUrl?: string
}

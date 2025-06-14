import { IsString, IsNotEmpty, IsEnum, IsDateString, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
  @ApiProperty({
    description: "Título de la tarea",
    example: "Implementar sistema de autenticación",
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: "Descripción detallada de la tarea",
    example: "Desarrollar el sistema de login y registro de usuarios con JWT",
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: "Estado de la tarea",
    enum: ["todo", "in-progress", "completed"],
    default: "todo",
    example: "todo",
  })
  @IsEnum(["todo", "in-progress", "completed"])
  status: "todo" | "in-progress" | "completed" = "todo"

  @ApiProperty({
    description: "Prioridad de la tarea",
    enum: ["low", "medium", "high"],
    example: "high",
  })
  @IsEnum(["low", "medium", "high"])
  priority: "low" | "medium" | "high"

  @ApiProperty({
    description: "ID del proyecto al que pertenece la tarea",
    example: "550e8400-e29b-41d4-a716-446655440011",
  })
  @IsUUID()
  projectId: string

  @ApiProperty({
    description: "ID del usuario asignado a la tarea",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  @IsUUID()
  assigneeId: string

  @ApiProperty({
    description: "Fecha límite de la tarea",
    example: "2024-03-15",
    format: "date",
  })
  @IsDateString()
  dueDate: string
}

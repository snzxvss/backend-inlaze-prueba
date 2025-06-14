import { ApiProperty } from "@nestjs/swagger"

export class TaskEntity {
  @ApiProperty({
    description: "ID único de la tarea",
    example: "550e8400-e29b-41d4-a716-446655440021",
  })
  id: string

  @ApiProperty({
    description: "Título de la tarea",
    example: "Implementar sistema de autenticación",
  })
  title: string

  @ApiProperty({
    description: "Descripción de la tarea",
    example: "Desarrollar el sistema de login y registro de usuarios con JWT",
  })
  description: string

  @ApiProperty({
    description: "Estado de la tarea",
    enum: ["todo", "in-progress", "completed"],
    example: "in-progress",
  })
  status: "todo" | "in-progress" | "completed"

  @ApiProperty({
    description: "Prioridad de la tarea",
    enum: ["low", "medium", "high"],
    example: "high",
  })
  priority: "low" | "medium" | "high"

  @ApiProperty({
    description: "ID del proyecto",
    example: "550e8400-e29b-41d4-a716-446655440011",
  })
  projectId: string

  @ApiProperty({
    description: "ID del usuario asignado",
    example: "550e8400-e29b-41d4-a716-446655440002",
  })
  assigneeId: string

  @ApiProperty({
    description: "Fecha límite",
    example: "2024-03-15",
  })
  dueDate: string

  @ApiProperty({
    description: "Fecha de creación",
    example: "2024-01-20T00:00:00Z",
  })
  createdAt: string

  @ApiProperty({
    description: "Fecha de última actualización",
    example: "2024-02-01T00:00:00Z",
  })
  updatedAt: string
}

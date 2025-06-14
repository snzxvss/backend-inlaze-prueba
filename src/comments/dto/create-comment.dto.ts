import { IsString, IsNotEmpty, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
  @ApiProperty({
    description: "ID de la tarea",
    example: "550e8400-e29b-41d4-a716-446655440021",
  })
  @IsUUID()
  taskId: string

  @ApiProperty({
    description: "ID del autor del comentario",
    example: "550e8400-e29b-41d4-a716-446655440001",
  })
  @IsUUID()
  authorId: string

  @ApiProperty({
    description: "Contenido del comentario",
    example: "Excelente trabajo en el diseño. Los mockups se ven muy profesionales.",
  })
  @IsString()
  @IsNotEmpty()
  content: string
}

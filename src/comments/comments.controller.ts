import { Controller, Get, Post, Patch, Param, Delete, Query, HttpCode, HttpStatus, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from "@nestjs/swagger"
import { CommentsService } from "./comments.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"

@ApiTags("comments")
@ApiBearerAuth("JWT-auth")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todos los comentarios" })
  @ApiResponse({ status: 200, description: "Lista de comentarios obtenida exitosamente" })
  getAll(@Query('taskId') taskId?: string, @Query('authorId') authorId?: string, @Query('recent') recent?: string) {
    if (recent) {
      const limit = Number.parseInt(recent) || 10
      return this.commentsService.getRecentComments(limit)
    }
    if (taskId) {
      return this.commentsService.getByTask(taskId)
    }
    if (authorId) {
      return this.commentsService.getByAuthor(authorId)
    }
    return this.commentsService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener comentario por ID' })
  @ApiParam({ name: 'id', description: 'ID único del comentario' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  getById(@Param('id') id: string) {
    return this.commentsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Crear nuevo comentario" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: "Comentario creado exitosamente" })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar comentario" })
  @ApiParam({ name: "id", description: "ID único del comentario" })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: "Comentario actualizado exitosamente" })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar comentario' })
  @ApiParam({ name: 'id', description: 'ID único del comentario' })
  @ApiResponse({ status: 204, description: 'Comentario eliminado exitosamente' })
  remove(@Param('id') id: string) {
    return this.commentsService.delete(id)
  }
}

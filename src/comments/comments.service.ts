import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import type { CreateCommentDto } from "./dto/create-comment.dto"
import type { UpdateCommentDto } from "./dto/update-comment.dto"

export interface Comment {
  id: string
  taskId: string
  authorId: string
  content: string
  createdAt: string
  updatedAt: string
}

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Comment[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_comments_get_all")
    return result[0] || []
  }

  async getById(id: string): Promise<Comment> {
    const result = await this.databaseService.executeStoredProcedure("sp_comments_get_by_id", [id])
    const comment = result[0]?.[0]

    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`)
    }

    return comment
  }

  async getByTask(taskId: string): Promise<Comment[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_comments_get_by_task", [taskId])
    return result[0] || []
  }

  async getByAuthor(authorId: string): Promise<Comment[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_comments_get_by_author", [authorId])
    return result[0] || []
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { taskId, authorId, content } = createCommentDto

    const result = await this.databaseService.executeStoredProcedure("sp_comments_create", [taskId, authorId, content])
    const commentId = result[0]?.[0]?.id
    return this.getById(commentId)
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const { content } = updateCommentDto

    await this.databaseService.executeStoredProcedure("sp_comments_update", [id, content])
    return this.getById(id)
  }

  async delete(id: string): Promise<void> {
    await this.getById(id) // Verificar que existe
    await this.databaseService.executeStoredProcedure("sp_comments_delete", [id])
  }

  async getRecentComments(limit = 10): Promise<Comment[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_comments_get_recent", [limit])
    return result[0] || []
  }
}

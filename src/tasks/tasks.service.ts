import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import type { CreateTaskDto } from "./dto/create-task.dto"
import type { UpdateTaskDto } from "./dto/update-task.dto"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  projectId: string
  assigneeId: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_all_tasks")
    return result[0] || []
  }

  async findOne(id: string): Promise<Task> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_task_by_id", [id])
    const task = result[0]?.[0]

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`)
    }

    return task
  }

  async findByProject(projectId: string): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_tasks_by_project", [projectId])
    return result[0] || []
  }

  async findByAssignee(assigneeId: string): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_tasks_by_assignee", [assigneeId])
    return result[0] || []
  }

  async findByStatus(status: "todo" | "in-progress" | "completed"): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_tasks_by_status", [status])
    return result[0] || []
  }

  async findByPriority(priority: "low" | "medium" | "high"): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_tasks_by_priority", [priority])
    return result[0] || []
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, priority, projectId, assigneeId, dueDate } = createTaskDto

    const result = await this.databaseService.executeStoredProcedure("sp_create_task", [
      title,
      description,
      status,
      priority,
      projectId,
      assigneeId,
      dueDate,
    ])

    const taskId = result[0]?.[0]?.id
    return this.findOne(taskId)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status, priority, projectId, assigneeId, dueDate } = updateTaskDto

    await this.databaseService.executeStoredProcedure("sp_update_task", [
      id,
      title,
      description,
      status,
      priority,
      projectId,
      assigneeId,
      dueDate,
    ])

    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id) // Verificar que existe
    await this.databaseService.executeStoredProcedure("sp_delete_task", [id])
  }

  async search(query: string): Promise<Task[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_search_tasks", [`%${query}%`])
    return result[0] || []
  }
}

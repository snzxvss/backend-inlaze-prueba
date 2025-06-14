import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import type { CreateProjectDto } from "./dto/create-project.dto"
import type { UpdateProjectDto } from "./dto/update-project.dto"

export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Project[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_all_projects")
    return result[0] || []
  }

  async findOne(id: string): Promise<Project> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_project_by_id", [id])
    const project = result[0]?.[0]

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`)
    }

    return project
  }

  async findByStatus(status: "active" | "inactive"): Promise<Project[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_get_projects_by_status", [status])
    return result[0] || []
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, status } = createProjectDto

    const result = await this.databaseService.executeStoredProcedure("sp_create_project", [name, description, status])

    const projectId = result[0]?.[0]?.id
    return this.findOne(projectId)
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { name, description, status } = updateProjectDto

    await this.databaseService.executeStoredProcedure("sp_update_project", [id, name, description, status])

    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id) // Verificar que existe
    await this.databaseService.executeStoredProcedure("sp_delete_project", [id])
  }

  async search(query: string): Promise<Project[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_search_projects", [`%${query}%`])
    return result[0] || []
  }
}

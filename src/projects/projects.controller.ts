import { Controller, Get, Post, Patch, Param, Delete, Query, Body, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from "@nestjs/swagger"
import { ProjectsService } from "./projects.service"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { ProjectEntity } from "./entities/project.entity"
import { Roles } from "../auth/decorators/roles.decorator"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("projects")
@ApiBearerAuth("JWT-auth")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles("admin")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Crear nuevo proyecto",
    description: "Crea un nuevo proyecto en el sistema. Solo disponible para administradores.",
  })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({
    status: 201,
    description: "Proyecto creado exitosamente",
    type: ProjectEntity,
  })
  @ApiResponse({
    status: 403,
    description: "No tienes permisos para realizar esta acción",
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  create(@Body() createProjectDto: CreateProjectDto, @CurrentUser() user: any) {
    return this.projectsService.create(createProjectDto)
  }

  @Get()
  @ApiOperation({
    summary: "Obtener todos los proyectos",
    description: "Devuelve una lista de todos los proyectos con filtros opcionales",
  })
  @ApiQuery({
    name: "status",
    required: false,
    enum: ["active", "inactive"],
    description: "Filtrar proyectos por estado",
  })
  @ApiQuery({
    name: "search",
    required: false,
    type: String,
    description: "Buscar proyectos por nombre o descripción",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de proyectos obtenida exitosamente",
    type: [ProjectEntity],
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  findAll(@Query('status') status?: 'active' | 'inactive', @Query('search') search?: string) {
    if (search) {
      return this.projectsService.search(search)
    }
    if (status) {
      return this.projectsService.findByStatus(status)
    }
    return this.projectsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener proyecto por ID',
    description: 'Devuelve los detalles de un proyecto específico'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único del proyecto',
    example: '550e8400-e29b-41d4-a716-446655440011'
  })
  @ApiResponse({
    status: 200,
    description: 'Proyecto encontrado',
    type: ProjectEntity
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido'
  })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(":id")
  @Roles("admin")
  @ApiOperation({
    summary: "Actualizar proyecto",
    description: "Actualiza los datos de un proyecto existente. Solo disponible para administradores.",
  })
  @ApiParam({
    name: "id",
    description: "ID único del proyecto",
    example: "550e8400-e29b-41d4-a716-446655440011",
  })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({
    status: 200,
    description: "Proyecto actualizado exitosamente",
    type: ProjectEntity,
  })
  @ApiResponse({
    status: 404,
    description: "Proyecto no encontrado",
  })
  @ApiResponse({
    status: 403,
    description: "No tienes permisos para realizar esta acción",
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @CurrentUser() user: any) {
    return this.projectsService.update(id, updateProjectDto)
  }

  @Delete(":id")
  @Roles("admin")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Eliminar proyecto",
    description: "Elimina un proyecto del sistema. Solo disponible para administradores.",
  })
  @ApiParam({
    name: "id",
    description: "ID único del proyecto",
    example: "550e8400-e29b-41d4-a716-446655440011",
  })
  @ApiResponse({
    status: 204,
    description: "Proyecto eliminado exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Proyecto no encontrado",
  })
  @ApiResponse({
    status: 403,
    description: "No tienes permisos para realizar esta acción",
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.projectsService.remove(id)
  }
}

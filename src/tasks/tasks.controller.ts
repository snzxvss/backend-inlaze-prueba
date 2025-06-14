import { Controller, Get, Post, Patch, Param, Delete, Query, HttpCode, HttpStatus, Body } from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { Roles } from "../auth/decorators/roles.decorator"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from "@nestjs/swagger"
import { TaskEntity } from "./entities/task.entity"

@ApiTags("tasks")
@ApiBearerAuth("JWT-auth")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles("admin")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Crear nueva tarea",
    description: "Crea una nueva tarea en el sistema. Solo disponible para administradores.",
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: "Tarea creada exitosamente",
    type: TaskEntity,
  })
  @ApiResponse({
    status: 403,
    description: "No tienes permisos para realizar esta acción",
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  @ApiOperation({
    summary: "Obtener todas las tareas",
    description:
      "Devuelve una lista de tareas con filtros opcionales. Los usuarios normales solo ven sus tareas asignadas.",
  })
  @ApiQuery({ name: "status", required: false, enum: ["todo", "in-progress", "completed"] })
  @ApiQuery({ name: "priority", required: false, enum: ["low", "medium", "high"] })
  @ApiQuery({ name: "projectId", required: false, type: String })
  @ApiQuery({ name: "assigneeId", required: false, type: String })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiResponse({
    status: 200,
    description: "Lista de tareas obtenida exitosamente",
    type: [TaskEntity],
  })
  findAll(
    @CurrentUser() user: any,
    @Query('status') status?: 'todo' | 'in-progress' | 'completed',
    @Query('priority') priority?: 'low' | 'medium' | 'high',
    @Query('projectId') projectId?: string,
    @Query('assigneeId') assigneeId?: string,
    @Query('search') search?: string,
  ) {
    // Los usuarios normales solo pueden ver sus tareas asignadas
    if (user.role === "member" && !assigneeId) {
      assigneeId = user.id
    }

    if (search) {
      return this.tasksService.search(search)
    }
    if (status) {
      return this.tasksService.findByStatus(status)
    }
    if (priority) {
      return this.tasksService.findByPriority(priority)
    }
    if (projectId) {
      return this.tasksService.findByProject(projectId)
    }
    if (assigneeId) {
      return this.tasksService.findByAssignee(assigneeId)
    }
    return this.tasksService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: TaskEntity })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar tarea" })
  @ApiParam({ name: "id", description: "ID único de la tarea" })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: "Tarea actualizada exitosamente", type: TaskEntity })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  @Roles("admin")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar tarea', description: 'Solo disponible para administradores' })
  @ApiParam({ name: 'id', description: 'ID único de la tarea' })
  @ApiResponse({ status: 204, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para realizar esta acción' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

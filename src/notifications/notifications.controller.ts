import { Controller, Get, Post, Patch, Param, Delete, Query, HttpCode, HttpStatus, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from "@nestjs/swagger"
import { NotificationsService } from "./notifications.service"
import { CreateNotificationDto } from "./dto/create-notification.dto"

@ApiTags("notifications")
@ApiBearerAuth("JWT-auth")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todas las notificaciones" })
  @ApiResponse({ status: 200, description: "Lista de notificaciones obtenida exitosamente" })
  getAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.notificationsService.getByUser(userId)
    }
    return this.notificationsService.getAll()
  }

  @Get("unread-count")
  @ApiOperation({ summary: "Obtener cantidad de notificaciones no leídas" })
  @ApiResponse({ status: 200, description: "Cantidad obtenida exitosamente" })
  getUnreadCount() {
    return this.notificationsService.getUnreadCount()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Crear nueva notificación" })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({ status: 201, description: "Notificación creada exitosamente" })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto)
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Marcar notificación como leída" })
  @ApiParam({ name: "id", description: "ID único de la notificación" })
  @ApiResponse({ status: 200, description: "Notificación marcada como leída" })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id)
  }

  @Patch("mark-all-read")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Marcar todas las notificaciones como leídas" })
  @ApiResponse({ status: 200, description: "Todas las notificaciones marcadas como leídas" })
  markAllAsRead() {
    return this.notificationsService.markAllAsRead()
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar notificación' })
  @ApiParam({ name: 'id', description: 'ID único de la notificación' })
  @ApiResponse({ status: 204, description: 'Notificación eliminada exitosamente' })
  remove(@Param('id') id: string) {
    return this.notificationsService.delete(id)
  }
}

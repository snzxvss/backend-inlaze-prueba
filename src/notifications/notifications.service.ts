import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import type { CreateNotificationDto } from "./dto/create-notification.dto"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  userId?: string
  actionUrl?: string
}

@Injectable()
export class NotificationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Notification[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_notifications_get_all")
    return result[0] || []
  }

  async getUnreadCount(): Promise<number> {
    const result = await this.databaseService.executeStoredProcedure("sp_notifications_get_unread_count")
    return result[0]?.[0]?.count || 0
  }

  async getByUser(userId: string): Promise<Notification[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_notifications_get_by_user", [userId])
    return result[0] || []
  }

  async markAsRead(id: string): Promise<void> {
    await this.databaseService.executeStoredProcedure("sp_notifications_mark_as_read", [id])
  }

  async markAllAsRead(): Promise<void> {
    await this.databaseService.executeStoredProcedure("sp_notifications_mark_all_as_read")
  }

  async delete(id: string): Promise<void> {
    await this.databaseService.executeStoredProcedure("sp_notifications_delete", [id])
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { title, message, type, userId, actionUrl } = createNotificationDto

    const result = await this.databaseService.executeStoredProcedure("sp_notifications_create", [
      title,
      message,
      type,
      userId,
      actionUrl,
    ])

    const notificationId = result[0]?.[0]?.id
    const getResult = await this.databaseService.executeStoredProcedure("sp_notifications_get_by_id", [notificationId])
    return getResult[0]?.[0]
  }
}

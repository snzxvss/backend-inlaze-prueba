import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  avatar?: string
  createdAt: string
}

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_users_get_all")
    return result[0] || []
  }

  async findOne(id: string): Promise<User> {
    const result = await this.databaseService.executeStoredProcedure("sp_users_get_by_id", [id])
    const user = result[0]?.[0]

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
    }

    return user
  }

  async findByRole(role: "admin" | "member"): Promise<User[]> {
    const result = await this.databaseService.executeStoredProcedure("sp_users_get_by_role", [role])
    return result[0] || []
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role, avatar } = createUserDto

    try {
      const result = await this.databaseService.executeStoredProcedure("sp_users_create", [
        name,
        email,
        password,
        role,
        avatar,
      ])
      const userId = result[0]?.[0]?.id
      return this.findOne(userId)
    } catch (error) {
      if (error.message.includes("Duplicate entry")) {
        throw new ConflictException("Ya existe un usuario con este email")
      }
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, password, role, avatar } = updateUserDto

    await this.databaseService.executeStoredProcedure("sp_users_update", [id, name, email, password, role, avatar])
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id) // Verificar que existe
    await this.databaseService.executeStoredProcedure("sp_users_delete", [id])
  }
}

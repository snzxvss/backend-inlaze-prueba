import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  Query,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Roles } from "../auth/decorators/roles.decorator"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from "@nestjs/swagger"
import { UserEntity } from "./entities/user.entity"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("users")
@ApiBearerAuth("JWT-auth")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles("admin")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Crear nuevo usuario",
    description: "Crea un nuevo usuario en el sistema. Solo disponible para administradores.",
  })
  @ApiResponse({
    status: 201,
    description: "Usuario creado exitosamente",
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: "Ya existe un usuario con este email",
  })
  @ApiResponse({
    status: 403,
    description: "No tienes permisos para realizar esta acción",
  })
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @Roles("admin")
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Devuelve una lista de todos los usuarios. Solo disponible para administradores.'
  })
  @ApiQuery({ name: 'role', required: false, enum: ['admin', 'member'] })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [UserEntity]
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para realizar esta acción'
  })
  findAll(@Query('role') role?: "admin" | "member") {
    if (role) {
      return this.usersService.findByRole(role)
    }
    return this.usersService.findAll()
  }

  @Get(":id")
  @ApiOperation({
    summary: "Obtener usuario por ID",
    description: "Los usuarios solo pueden ver su propio perfil, excepto los administradores.",
  })
  @ApiParam({ name: "id", description: "ID único del usuario" })
  @ApiResponse({ status: 200, description: "Usuario encontrado", type: UserEntity })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  @ApiResponse({ status: 403, description: "No tienes permisos para ver este usuario" })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    // Los usuarios solo pueden ver su propio perfil, excepto los admins
    if (user?.role !== "admin" && user?.id !== id) {
      throw new ForbiddenException("No tienes permisos para ver este usuario")
    }
    return this.usersService.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Actualizar usuario",
    description: "Los usuarios solo pueden actualizar su propio perfil, excepto los administradores.",
  })
  @ApiParam({ name: "id", description: "ID único del usuario" })
  @ApiResponse({ status: 200, description: "Usuario actualizado exitosamente", type: UserEntity })
  @ApiResponse({ status: 403, description: "No tienes permisos para actualizar este usuario" })
  update(@Param('id') id: string, updateUserDto: UpdateUserDto, @CurrentUser() user?: any) {
    // Los usuarios solo pueden actualizar su propio perfil, excepto los admins
    if (user?.role !== "admin" && user?.id !== id) {
      throw new ForbiddenException("No tienes permisos para actualizar este usuario")
    }
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles("admin")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Eliminar usuario',
    description: 'Solo disponible para administradores.'
  })
  @ApiParam({ name: 'id', description: 'ID único del usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para realizar esta acción' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { AuthResponseEntity } from "./entities/auth-response.entity"
import { Public } from "./decorators/public.decorator"
import { CurrentUser } from "./decorators/current-user.decorator"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { UserEntity } from "../users/entities/user.entity"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y devuelve un token JWT'
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: AuthResponseEntity
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Obtener perfil del usuario',
    description: 'Devuelve la información del usuario autenticado'
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/UserEntity' },
        message: { type: 'string', example: 'Perfil obtenido exitosamente' }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido'
  })
  getProfile(@CurrentUser() user: any) {
    return {
      user,
      message: "Perfil obtenido exitosamente",
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Cerrar sesión",
    description: "Cierra la sesión del usuario (en el cliente se debe eliminar el token)",
  })
  @ApiResponse({
    status: 200,
    description: "Logout exitoso",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Logout exitoso" },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  logout() {
    return {
      message: "Logout exitoso. Elimina el token del cliente.",
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("users")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Obtener todos los usuarios",
    description: "Devuelve la lista de todos los usuarios del sistema",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de usuarios obtenida exitosamente",
    type: [UserEntity],
  })
  @ApiResponse({
    status: 401,
    description: "Token inválido",
  })
  getAllUsers() {
    return this.authService.getAllUsers()
  }
}

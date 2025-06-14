import { NestFactory } from "@nestjs/core"
import { ValidationPipe, Logger } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger("Bootstrap")

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Configurar CORS
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle("Inlaze API")
    .setDescription("API para el sistema de gestión de proyectos y tareas de Inlaze")
    .setVersion("1.0")
    .addTag("auth", "Endpoints de autenticación")
    .addTag("projects", "Gestión de proyectos")
    .addTag("tasks", "Gestión de tareas")
    .addTag("users", "Gestión de usuarios")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Ingresa tu JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addServer("http://localhost:3000", "Servidor de desarrollo")
    .setContact("Equipo de desarrollo Inlaze", "https://inlaze.com", "dev@inlaze.com")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
    customSiteTitle: "Inlaze API Documentation",
    customfavIcon: "/favicon.ico",
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2563eb }
    `,
  })

  const port = process.env.PORT ?? 3000
  await app.listen(port)

  // Logs informativos con credenciales de prueba
  logger.log(`🚀 Aplicación iniciada exitosamente`)
  logger.log(`🌐 Servidor ejecutándose en: http://localhost:${port}`)
  logger.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api/docs`)
  logger.log(`🔧 Ambiente: ${process.env.NODE_ENV || "development"}`)
  logger.log(`💾 Base de datos: ${process.env.DB_DATABASE || "inlaze_db"}`)
  logger.log(``)
  logger.log(`🔐 Credenciales de prueba:`)
  logger.log(`   Admin: admin@inlaze.com / admin123`)
  logger.log(`   User: user@inlaze.com / user123`)
  logger.log(`   María: maria@inlaze.com / maria123`)
  logger.log(`   Carlos: carlos@inlaze.com / carlos123`)
}

bootstrap()

import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DatabaseModule } from "./database/database.module"
import { AuthModule } from "./auth/auth.module"
import { ProjectsModule } from "./projects/projects.module"
import { TasksModule } from "./tasks/tasks.module"
import { UsersModule } from "./users/users.module"
import { CommentsModule } from "./comments/comments.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard"
import { RolesGuard } from "./auth/guards/roles.guard"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    CommentsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { ProjectsController } from "./projects.controller"
import { DatabaseService } from "../database/database.service"

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, DatabaseService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

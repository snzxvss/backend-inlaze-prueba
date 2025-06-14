import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"

@Injectable()
export class DatabaseService {
  private dataSource: DataSource

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  async executeStoredProcedure(procedureName: string, parameters: any[] = []): Promise<any> {
    const paramPlaceholders = parameters.map(() => "?").join(", ")
    const query = `CALL ${procedureName}(${paramPlaceholders})`

    try {
      const result = await this.dataSource.query(query, parameters)
      return result
    } catch (error) {
      throw new Error(`Error executing stored procedure ${procedureName}: ${error.message}`)
    }
  }

  async executeQuery(query: string, parameters: any[] = []): Promise<any> {
    try {
      return await this.dataSource.query(query, parameters)
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`)
    }
  }
}

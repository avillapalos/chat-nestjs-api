import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'
import { ApiResponse } from '@nestjs/swagger'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Health check',
    type: String,
  })
  checkHealth(): string {
    return this.healthService.checkHealth()
  }
}

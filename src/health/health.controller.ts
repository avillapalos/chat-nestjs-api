import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('chat')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Health check',
    schema: {
      example: 'Ok!',
    },
  })
  checkHealth(): string {
    return this.healthService.checkHealth()
  }
}

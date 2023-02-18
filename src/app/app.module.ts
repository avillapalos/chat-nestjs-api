import { Module } from '@nestjs/common'
import { HealthModule } from '../health/health.module'
import { RoomModule } from '../room/infrastructure/room.module'

@Module({
  imports: [HealthModule, RoomModule],
})
export class AppModule {}

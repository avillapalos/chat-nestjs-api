import { Module } from '@nestjs/common'
import { HealthModule } from '../health/health.module'
import { RoomModule } from '../room/infrastructure/room.module'
import { UserModule } from '../user/infrastructure/user.module'

@Module({
  imports: [HealthModule, RoomModule, UserModule],
})
export class AppModule {}

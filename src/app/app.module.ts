import { Module } from '@nestjs/common'
import { HealthModule } from '../health/health.module'
import { RoomModule } from '../room/infrastructure/room.module'
import { UserModule } from '../user/infrastructure/user.module'
import { RoomUserModule } from '../room/user/infrastructure/room-user.module'
import { MessageModule } from '../message/infrastructure/message.module'

@Module({
  imports: [
    HealthModule,
    RoomModule,
    UserModule,
    RoomUserModule,
    MessageModule,
  ],
})
export class AppModule {}

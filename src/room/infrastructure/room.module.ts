import { Module } from '@nestjs/common'
import { CreateRoomUseCase } from '../application/create/create-room.use-case'
import {
  CREATE_ROOM_USE_CASE_TOKEN,
  CreateRoomController,
} from './create-room.controller'
import { DbRoomRepository } from '../core/infrastructure/persistence/db.room.repository'
import { DatabaseModule } from '../../app/db.module'
import { DbRoom } from '../core/infrastructure/db.room.entity'
import { DataSource, Repository } from 'typeorm'
import { Room } from '../core/domain/room.entity'

export const ROOM_REPOSITORY_TOKEN = Symbol('ROOM_REPOSITORY_TOKEN')
export const ROOM_TYPEORM_REPOSITORY_TOKEN = Symbol(
  'ROOM_TYPEORM_REPOSITORY_TOKEN',
)

@Module({
  imports: [DatabaseModule],
  controllers: [CreateRoomController],
  providers: [
    {
      provide: ROOM_REPOSITORY_TOKEN,
      useFactory: (roomOrmRepository: Repository<Room>) =>
        new DbRoomRepository(roomOrmRepository),
      inject: [ROOM_TYPEORM_REPOSITORY_TOKEN],
    },
    {
      provide: ROOM_TYPEORM_REPOSITORY_TOKEN,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(DbRoom),
      inject: ['POSTGRES_DB'],
    },
    {
      provide: CREATE_ROOM_USE_CASE_TOKEN,
      useFactory: (repository: DbRoomRepository) =>
        new CreateRoomUseCase(repository),
      inject: [ROOM_REPOSITORY_TOKEN],
    },
    CreateRoomUseCase,
  ],
})
export class RoomModule {}

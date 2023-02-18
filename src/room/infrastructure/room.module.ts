import { Module } from '@nestjs/common'
import { CreateRoomUseCase } from '../application/create/create-room.use-case'
import {
  CREATE_ROOM_USE_CASE_TOKEN,
  CreateRoomController,
} from './create-room.controller'
import { DbRoomRepository } from './persistence/db.room.repository'
import { DatabaseModule } from '../../app/db.module'
import { DbRoom } from './db.room.entity'
import { DataSource, Repository } from 'typeorm'
import { Room } from '../domain/room.entity'

const ROOM_REPOSITORY_TOKEN = Symbol('ROOM_REPOSITORY_TOKEN')
const ROOM_TYPEORM_REPOSITORY_TOKEN = Symbol('ROOM_TYPEORM_REPOSITORY_TOKEN')

@Module({
  imports: [DatabaseModule],
  controllers: [CreateRoomController],
  providers: [
    {
      provide: ROOM_REPOSITORY_TOKEN,
      useFactory: (ormRepository: Repository<Room>) =>
        new DbRoomRepository(ormRepository),
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

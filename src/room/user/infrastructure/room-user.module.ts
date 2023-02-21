import { Module } from '@nestjs/common'
import { AddUserUseCase } from '../application/add/add-user.use-case'
import {
  ADD_USER_TO_ROOM_USE_CASE_TOKEN,
  AddUserController,
} from './add-user.controller'
import { DatabaseModule } from '../../../app/db.module'
import { DbRoomRepository } from '../../core/infrastructure/persistence/db.room.repository'
import { DataSource, Repository } from 'typeorm'
import { Room } from '../../core/domain/room.entity'
import { DbRoom } from '../../core/infrastructure/db.room.entity'
import {
  ROOM_TYPEORM_REPOSITORY_TOKEN,
  RoomModule,
} from '../../infrastructure/room.module'
import { UserModule } from '../../../user/infrastructure/user.module'

export const ROOM_USER_REPOSITORY_TOKEN = Symbol('ROOM_USER_REPOSITORY_TOKEN')

@Module({
  imports: [DatabaseModule, RoomModule, UserModule],
  controllers: [AddUserController],
  providers: [
    {
      provide: ROOM_USER_REPOSITORY_TOKEN,
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
      provide: ADD_USER_TO_ROOM_USE_CASE_TOKEN,
      useFactory: (repository: DbRoomRepository) =>
        new AddUserUseCase(repository),
      inject: [ROOM_USER_REPOSITORY_TOKEN],
    },
    AddUserUseCase,
  ],
})
export class RoomUserModule {}

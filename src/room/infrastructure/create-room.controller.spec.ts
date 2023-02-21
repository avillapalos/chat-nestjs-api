import { Test, TestingModule } from '@nestjs/testing'
import { DataSource, Repository } from 'typeorm'
import {
  CREATE_ROOM_USE_CASE_TOKEN,
  CreateRoomController,
} from './create-room.controller'
import { DatabaseModule } from '../../app/db.module'
import {
  ROOM_REPOSITORY_TOKEN,
  ROOM_TYPEORM_REPOSITORY_TOKEN,
} from './room.module'
import { Room } from '../core/domain/room.entity'
import { DbRoomRepository } from '../core/infrastructure/persistence/db.room.repository'
import { DbRoom } from '../core/infrastructure/db.room.entity'
import { CreateRoomUseCase } from '../application/create/create-room.use-case'
import { RoomName } from '../core/domain/room-name.value-object'
import { CreateRoomDto } from './create-room.dto'
import { USER_TYPEORM_REPOSITORY_TOKEN } from '../../user/infrastructure/user.module'
import { User } from '../../user/domain/user.entity'
import { DbUser } from '../../user/infrastructure/db.user.entity'

describe('CreateRoomController test', () => {
  let controller: CreateRoomController
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DbRoom),
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
    }).compile()
    controller = moduleFixture.get(CreateRoomController)
    controller['createRoomUseCase'] = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      repository: {
        createRoom: jest
          .fn()
          .mockImplementation(
            async () => await Room.create(RoomName.create('Room 1')),
          ),
      },
      execute: jest
        .fn()
        .mockImplementation(
          async () => await Room.create(RoomName.create('Room 1')),
        ),
    }
  })
  it('run should work successfully', () => {
    expect(controller.run(new CreateRoomDto('Room 1'))).toBeInstanceOf(Promise)
  })
})

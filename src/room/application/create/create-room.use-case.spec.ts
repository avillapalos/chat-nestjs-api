import { Test, TestingModule } from '@nestjs/testing'
import {
  ROOM_REPOSITORY_TOKEN,
  ROOM_TYPEORM_REPOSITORY_TOKEN,
} from '../../infrastructure/room.module'
import {
  CREATE_ROOM_USE_CASE_TOKEN,
  CreateRoomController,
} from '../../infrastructure/create-room.controller'
import { DatabaseModule } from '../../../app/db.module'
import { DataSource, Repository } from 'typeorm'
import { Room } from '../../domain/room.entity'
import { DbRoomRepository } from '../../infrastructure/persistence/db.room.repository'
import { DbRoom } from '../../infrastructure/db.room.entity'
import { CreateRoomUseCase } from './create-room.use-case'
import { CreateRoomDto } from '../../infrastructure/create-room.dto'
import { RoomName } from '../../domain/room-name.value-object'

describe('CreateRoomUseCase test', () => {
  let useCase: CreateRoomUseCase
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    useCase = moduleFixture.get(CreateRoomUseCase)
    useCase['repository'] = {
      createRoom: jest
        .fn()
        .mockImplementation(
          async () => await Room.create(RoomName.create('Room 1')),
        ),
    }
  })
  it('execute should work successfully', () => {
    expect(useCase.execute(new CreateRoomDto('Room 1'))).toBeInstanceOf(Promise)
  })
})

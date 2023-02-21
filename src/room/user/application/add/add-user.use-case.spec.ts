import {
  ADD_USER_TO_ROOM_USE_CASE_TOKEN,
  AddUserController,
} from '../../infrastructure/add-user.controller'
import { AddUserUseCase } from './add-user.use-case'
import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '../../../../app/db.module'
import { DataSource, Repository } from 'typeorm'
import { Room } from '../../../core/domain/room.entity'
import { DbRoomRepository } from '../../../core/infrastructure/persistence/db.room.repository'
import { ROOM_TYPEORM_REPOSITORY_TOKEN } from '../../../infrastructure/room.module'
import { DbRoom } from '../../../core/infrastructure/db.room.entity'
import { ROOM_USER_REPOSITORY_TOKEN } from '../../infrastructure/room-user.module'
import { RoomId } from '../../../core/domain/room-id.value-object'
import { UserId } from '../../../../user/core/domain/user-id.value-object'

describe('AddUserUseCase test', () => {
  let useCase: AddUserUseCase
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
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
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DbRoom),
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
    }).compile()
    useCase = moduleFixture.get(AddUserUseCase)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useCase['repository'] = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addUser: jest.fn().mockImplementation(() => {}),
    }
  })
  it('execute should work successfully', () => {
    expect(useCase.execute(RoomId.create(), UserId.create())).toBeInstanceOf(
      Promise,
    )
  })
})

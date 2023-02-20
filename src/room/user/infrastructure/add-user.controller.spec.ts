import { Test, TestingModule } from '@nestjs/testing'
import {
  AddUserController,
  ADD_USER_TO_ROOM_USE_CASE_TOKEN,
} from './add-user.controller'
import { AddUserUseCase } from '../application/add/add-user.use-case'
import { DataSource, Repository } from 'typeorm'
import { ROOM_USER_REPOSITORY_TOKEN } from './room-user.module'
import { Room } from '../../core/domain/room.entity'
import { DbRoomRepository } from '../../core/infrastructure/persistence/db.room.repository'
import { ROOM_TYPEORM_REPOSITORY_TOKEN } from '../../infrastructure/room.module'
import { DbRoom } from '../../core/infrastructure/db.room.entity'
import { DatabaseModule } from '../../../app/db.module'
import { User } from '../../../user/domain/user.entity'
import { USER_TYPEORM_REPOSITORY_TOKEN } from '../../../user/infrastructure/user.module'
import { DbUser } from '../../../user/infrastructure/db.user.entity'
import { UserName } from '../../../user/domain/user-name.value-object'
import { UserPassword } from '../../../user/domain/user-password.value-object'

describe('CreateUserController test', () => {
  let controller: AddUserController
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AddUserController],
      providers: [
        {
          provide: ROOM_USER_REPOSITORY_TOKEN,
          useFactory: (
            roomOrmRepository: Repository<Room>,
            userOrmRepository: Repository<User>,
          ) => new DbRoomRepository(roomOrmRepository, userOrmRepository),
          inject: [
            ROOM_TYPEORM_REPOSITORY_TOKEN,
            USER_TYPEORM_REPOSITORY_TOKEN,
          ],
        },
        {
          provide: ROOM_TYPEORM_REPOSITORY_TOKEN,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DbRoom),
          inject: ['POSTGRES_DB'],
        },
        {
          provide: USER_TYPEORM_REPOSITORY_TOKEN,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DbUser),
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
      .overrideProvider(AddUserUseCase)
      .useFactory({
        factory: () => ({
          execute: jest
            .fn()
            .mockImplementation(() =>
              User.create(
                UserName.create('User 1'),
                UserPassword.create('1234'),
              ),
            ),
        }),
      })
      .compile()
    controller = moduleFixture.get(AddUserController)
  })
  it('run should work successfully', async () => {
    expect(
      typeof (await controller.run(
        '8c64874a-e427-4522-ac34-bec6606eb38d',
        '671b9cc0-f57c-43e8-9a32-0204c8823e92',
      )),
    ).toBeInstanceOf(Promise)
  })
})

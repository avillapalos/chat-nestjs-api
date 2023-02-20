import { Test, TestingModule } from '@nestjs/testing'
import {
  CREATE_USER_USE_CASE_TOKEN,
  CreateUserController,
} from './create-user.controller'
import { User } from '../domain/user.entity'
import { UserName } from '../domain/user-name.value-object'
import { UserPassword } from '../domain/user-password.value-object'
import { CreateUserUseCase } from '../application/create/create-user.use-case'
import { DataSource, Repository } from 'typeorm'
import { DbUserRepository } from './persistence/db.user.repository'
import { DbUser } from './db.user.entity'
import {
  USER_REPOSITORY_TOKEN,
  USER_TYPEORM_REPOSITORY_TOKEN,
} from './user.module'
import { DatabaseModule } from '../../app/db.module'
import { CreateUserDto } from './create-user.dto'

describe('CreateUserController test', () => {
  let controller: CreateUserController
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CreateUserController],
      providers: [
        {
          provide: USER_REPOSITORY_TOKEN,
          useFactory: (ormRepository: Repository<User>) =>
            new DbUserRepository(ormRepository),
          inject: [USER_TYPEORM_REPOSITORY_TOKEN],
        },
        {
          provide: USER_TYPEORM_REPOSITORY_TOKEN,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(DbUser),
          inject: ['POSTGRES_DB'],
        },
        {
          provide: CREATE_USER_USE_CASE_TOKEN,
          useFactory: (repository: DbUserRepository) =>
            new CreateUserUseCase(repository),
          inject: [USER_REPOSITORY_TOKEN],
        },
        CreateUserUseCase,
      ],
    })
      .overrideProvider(CreateUserUseCase)
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
    controller = moduleFixture.get(CreateUserController)
  })
  it('run should work successfully', async () => {
    expect(
      typeof (await controller.run(new CreateUserDto('User 1', '1234'))).id,
    ).toBe('string')
  })
})

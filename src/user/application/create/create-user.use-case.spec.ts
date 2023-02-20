import { Test, TestingModule } from '@nestjs/testing'
import {
  USER_REPOSITORY_TOKEN,
  USER_TYPEORM_REPOSITORY_TOKEN,
} from '../../infrastructure/user.module'
import {
  CREATE_USER_USE_CASE_TOKEN,
  CreateUserController,
} from '../../infrastructure/create-user.controller'
import { DatabaseModule } from '../../../app/db.module'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../domain/user.entity'
import { DbUserRepository } from '../../infrastructure/persistence/db.user.repository'
import { DbUser } from '../../infrastructure/db.user.entity'
import { CreateUserUseCase } from './create-user.use-case'
import { CreateUserDto } from '../../infrastructure/create-user.dto'
import { UserName } from '../../domain/user-name.value-object'
import { UserPassword } from '../../domain/user-password.value-object'

describe('CreateUserUseCase test', () => {
  let useCase: CreateUserUseCase
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
    }).compile()
    useCase = moduleFixture.get(CreateUserUseCase)
    useCase['repository'] = {
      createUser: jest
        .fn()
        .mockImplementation(() =>
          User.create(UserName.create('User 1'), UserPassword.create('1234')),
        ),
    }
  })
  it('execute should work successfully', () => {
    expect(useCase.execute(new CreateUserDto('User 1', '1234'))).toBeInstanceOf(
      Promise,
    )
  })
})

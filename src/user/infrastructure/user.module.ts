import { Module } from '@nestjs/common'
import { CreateUserUseCase } from '../application/create/create-user.use-case'
import {
  CREATE_USER_USE_CASE_TOKEN,
  CreateUserController,
} from './create-user.controller'
import { DbUserRepository } from './persistence/db.user.repository'
import { DatabaseModule } from '../../app/db.module'
import { DbUser } from './db.user.entity'
import { DataSource, Repository } from 'typeorm'
import { User } from '../domain/user.entity'

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN')
export const USER_TYPEORM_REPOSITORY_TOKEN = Symbol(
  'USER_TYPEORM_REPOSITORY_TOKEN',
)

@Module({
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
      useFactory: (dataSource: DataSource) => dataSource.getRepository(DbUser),
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
export class UserModule {}

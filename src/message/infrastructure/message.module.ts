import { Module } from '@nestjs/common'
import { DbMessageRepository } from './persistence/db.message.repository'
import { DatabaseModule } from '../../app/db.module'
import { DbMessage } from './db.message.entity'
import { DataSource, Repository } from 'typeorm'
import { Message } from '../domain/message.entity'
import {
  SEND_MESSAGE_USE_CASE_TOKEN,
  SendMessageController,
} from './send-message.controller'
import { SendMessageUseCase } from '../application/create/send-message.use-case'
import {
  GET_LIST_MESSAGE_USE_CASE_TOKEN,
  GetListMessageController,
} from './get-list-message.controller'
import { GetListMessageUseCase } from '../application/create/get-list-message.use-case'

export const MESSAGE_REPOSITORY_TOKEN = Symbol('MESSAGE_REPOSITORY_TOKEN')
export const MESSAGE_TYPEORM_REPOSITORY_TOKEN = Symbol(
  'MESSAGE_TYPEORM_REPOSITORY_TOKEN',
)

@Module({
  imports: [DatabaseModule],
  controllers: [SendMessageController, GetListMessageController],
  providers: [
    {
      provide: MESSAGE_REPOSITORY_TOKEN,
      useFactory: (ormRepository: Repository<Message>) =>
        new DbMessageRepository(ormRepository),
      inject: [MESSAGE_TYPEORM_REPOSITORY_TOKEN],
    },
    {
      provide: MESSAGE_TYPEORM_REPOSITORY_TOKEN,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(DbMessage),
      inject: ['POSTGRES_DB'],
    },
    {
      provide: SEND_MESSAGE_USE_CASE_TOKEN,
      useFactory: (repository: DbMessageRepository) =>
        new SendMessageUseCase(repository),
      inject: [MESSAGE_REPOSITORY_TOKEN],
    },
    {
      provide: GET_LIST_MESSAGE_USE_CASE_TOKEN,
      useFactory: (repository: DbMessageRepository) =>
        new GetListMessageUseCase(repository),
      inject: [MESSAGE_REPOSITORY_TOKEN],
    },
    SendMessageUseCase,
  ],
})
export class MessageModule {}

import { Test, TestingModule } from '@nestjs/testing'
import {
  MESSAGE_REPOSITORY_TOKEN,
  MESSAGE_TYPEORM_REPOSITORY_TOKEN,
} from '../../infrastructure/message.module'
import { DatabaseModule } from '../../../app/db.module'
import { DataSource, Repository } from 'typeorm'
import { Message } from '../../domain/message.entity'
import { DbMessageRepository } from '../../infrastructure/persistence/db.message.repository'
import { DbMessage } from '../../infrastructure/db.message.entity'
import { SendMessageUseCase } from './send-message.use-case'
import { SendMessageDto } from '../../infrastructure/send-message.dto'
import {
  SEND_MESSAGE_USE_CASE_TOKEN,
  SendMessageController,
} from '../../infrastructure/send-message.controller'
import { MessageText } from '../../domain/message-text.value-object'

describe('CreateMessageUseCase test', () => {
  let useCase: SendMessageUseCase
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [SendMessageController],
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
        SendMessageUseCase,
      ],
    }).compile()
    useCase = moduleFixture.get(SendMessageUseCase)
    useCase['repository'] = {
      createMessage: jest
        .fn()
        .mockImplementation(() =>
          Message.create(
            MessageText.create('Message 1'),
            '6d16c97c-222c-41a8-9c5e-82635a511c19',
            '346418b9-25b2-4881-a03f-b81e19447a23',
          ),
        ),
    }
  })
  it('execute should work successfully', () => {
    expect(
      useCase.execute(
        new SendMessageDto(
          'Message 1',
          '6d16c97c-222c-41a8-9c5e-82635a511c19',
          '346418b9-25b2-4881-a03f-b81e19447a23',
        ),
      ),
    ).toBeInstanceOf(Promise)
  })
})

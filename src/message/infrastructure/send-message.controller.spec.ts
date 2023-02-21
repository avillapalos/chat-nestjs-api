import { Test, TestingModule } from '@nestjs/testing'
import { Message } from '../domain/message.entity'
import { SendMessageUseCase } from '../application/create/send-message.use-case'
import { DataSource, Repository } from 'typeorm'
import { DbMessageRepository } from './persistence/db.message.repository'
import { DbMessage } from './db.message.entity'
import {
  MESSAGE_REPOSITORY_TOKEN,
  MESSAGE_TYPEORM_REPOSITORY_TOKEN,
} from './message.module'
import { DatabaseModule } from '../../app/db.module'
import { SendMessageDto } from './send-message.dto'
import {
  SEND_MESSAGE_USE_CASE_TOKEN,
  SendMessageController,
} from './send-message.controller'
import { MessageText } from '../domain/message-text.value-object'
import { UserId } from '../../user/core/domain/user-id.value-object'
import { RoomId } from '../../room/core/domain/room-id.value-object'

describe('SendMessageController test', () => {
  let controller: SendMessageController
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
    })
      .overrideProvider(SendMessageUseCase)
      .useFactory({
        factory: () => ({
          execute: jest
            .fn()
            .mockImplementation(() =>
              Message.create(
                MessageText.create('Message 1'),
                UserId.create(),
                RoomId.create(),
              ),
            ),
        }),
      })
      .compile()
    controller = moduleFixture.get(SendMessageController)
  })
  it('run should work successfully', async () => {
    expect(
      typeof (
        await controller.run(
          new SendMessageDto(
            'Message 1',
            '6d16c97c-222c-41a8-9c5e-82635a511c19',
            '346418b9-25b2-4881-a03f-b81e19447a23',
          ),
        )
      ).id,
    ).toBe('string')
  })
})

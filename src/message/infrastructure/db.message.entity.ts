import { EntitySchema } from 'typeorm'
import { MessageId } from '../domain/message-id.value-object'
import { ValueObjectTransformer } from '../../core/infrastructure/persistence/value-object.transformer'
import { Message } from '../domain/message.entity'
import { MessageText } from '../domain/message-text.value-object'
import { MessageDate } from '../domain/message-date.value-object'

export const DbMessage = new EntitySchema<Message>({
  name: 'Message',
  tableName: 'chat-message',
  target: Message,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(MessageId),
    },
    text: {
      type: String,
      transformer: ValueObjectTransformer(MessageText),
    },
    created: {
      type: Date,
      transformer: ValueObjectTransformer(MessageDate),
    },
  },
  relations: {
    roomId: {
      type: 'many-to-one',
      target: 'Room',
      joinColumn: {
        name: 'room_id',
        referencedColumnName: 'id',
      },
      inverseSide: 'messages',
    },
    userId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      inverseSide: 'messages',
    },
  },
})

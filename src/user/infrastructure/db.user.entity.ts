import { EntitySchema } from 'typeorm'
import { UserId } from '../core/domain/user-id.value-object'
import { UserName } from '../domain/user-name.value-object'
import { ValueObjectTransformer } from '../../core/infrastructure/persistence/value-object.transformer'
import { User } from '../domain/user.entity'
import { UserPassword } from '../domain/user-password.value-object'

export const DbUser = new EntitySchema<User>({
  name: 'User',
  tableName: 'chat-user',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserName),
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(UserPassword),
    },
  },
  relations: {
    messages: {
      type: 'one-to-many',
      target: 'Message',
      cascade: true,
      inverseSide: 'user',
    },
    rooms: {
      type: 'many-to-many',
      inverseSide: 'users',
      target: 'Room',
    },
  },
})

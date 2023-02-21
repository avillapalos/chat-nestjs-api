import { EntitySchema } from 'typeorm'
import { RoomId } from '../domain/room-id.value-object'
import { RoomName } from '../domain/room-name.value-object'
import { ValueObjectTransformer } from '../../../core/infrastructure/persistence/value-object.transformer'
import { Room } from '../domain/room.entity'

export const DbRoom = new EntitySchema<Room>({
  name: 'Room',
  tableName: 'chat-room',
  target: Room,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(RoomId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(RoomName),
    },
  },
  relations: {
    messages: {
      type: 'one-to-many',
      target: 'Message',
      cascade: true,
      inverseSide: 'room',
    },
    users: {
      target: 'User',
      type: 'many-to-many',
      joinTable: {
        name: 'rooms-users',
        joinColumn: {
          name: 'room_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      },
      inverseSide: 'rooms',
      cascade: true,
    },
  },
})

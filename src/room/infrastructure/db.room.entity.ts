import { EntitySchema } from 'typeorm'
import { RoomId } from '../core/domain/room-id.value-object'
import { RoomName } from '../domain/room-name.value-object'
import { ValueObjectTransformer } from '../../core/infrastructure/persistence/value-object.transformer'
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
})

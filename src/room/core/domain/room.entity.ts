import { RoomId } from './room-id.value-object'
import { RoomName } from './room-name.value-object'
import { User } from '../../../user/domain/user.entity'
import { Message } from '../../../message/domain/message.entity'

export class Room {
  id: RoomId
  readonly name: RoomName
  users: User[]
  messages: Message[]

  constructor(id: RoomId, name: RoomName) {
    this.id = id
    this.name = name
  }

  static create(name: RoomName): Room {
    return new Room(RoomId.create(), name)
  }
}

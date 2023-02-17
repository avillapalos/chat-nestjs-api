import { RoomId } from '../core/domain/room-id.value-object'
import { RoomName } from './room-name.value-object'

export class Room {
  readonly id: RoomId
  readonly name: RoomName

  constructor(id: RoomId, name: RoomName) {
    this.id = id
    this.name = name
  }

  static create(name: RoomName): Room {
    return new Room(RoomId.create(), name)
  }
}

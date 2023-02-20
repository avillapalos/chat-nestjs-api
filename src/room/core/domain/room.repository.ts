import { Room } from './room.entity'
import { UserId } from '../../../user/core/domain/user-id.value-object'
import { RoomId } from './room-id.value-object'

export interface RoomRepository {
  createRoom(room: Room): Promise<Room>
  addUser(roomId: RoomId, userId: UserId): Promise<void>
}

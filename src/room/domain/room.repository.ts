import { Room } from './room.entity'

export interface RoomRepository {
  createRoom(room: Room): Promise<Room>
}

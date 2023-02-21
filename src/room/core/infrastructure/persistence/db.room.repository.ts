import { Room } from '../../domain/room.entity'
import { RoomRepository } from '../../domain/room.repository'
import { Repository } from 'typeorm'
import { UserId } from '../../../../user/core/domain/user-id.value-object'
import { RoomId } from '../../domain/room-id.value-object'

export class DbRoomRepository implements RoomRepository {
  constructor(private roomRepository: Repository<Room>) {}
  createRoom(room: Room): Promise<Room> {
    return this.roomRepository.save(room)
  }
  async addUser(roomId: RoomId, userId: UserId): Promise<void> {
    return await this.roomRepository
      .createQueryBuilder('rooms-users')
      .relation(Room, 'users')
      .of(roomId.value)
      .add(userId.value)
  }
}

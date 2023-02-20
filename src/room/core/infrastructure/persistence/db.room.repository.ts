import { Room } from '../../domain/room.entity'
import { RoomRepository } from '../../domain/room.repository'
import { Repository } from 'typeorm'
import { UserId } from '../../../../user/core/domain/user-id.value-object'
import { RoomId } from '../../domain/room-id.value-object'
import { User } from '../../../../user/domain/user.entity'

export class DbRoomRepository implements RoomRepository {
  constructor(
    private roomRepository: Repository<Room>,
    private userRepository: Repository<User>,
  ) {}
  createRoom(room: Room): Promise<Room> {
    return this.roomRepository.save(room)
  }
  async addUser(roomId: RoomId, userId: UserId): Promise<void> {
    const room = await this.roomRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: roomId },
    })
    const user = await this.userRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: userId },
    })
    room.users = [user]
    await this.roomRepository.save(room)
  }
}

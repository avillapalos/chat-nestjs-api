import { Room } from '../../domain/room.entity'
import { RoomRepository } from '../../domain/room.repository'
import { Repository } from 'typeorm'

export class DbRoomRepository implements RoomRepository {
  constructor(private repository: Repository<Room>) {}
  createRoom(room: Room): Promise<Room> {
    return this.repository.save(room)
  }
}

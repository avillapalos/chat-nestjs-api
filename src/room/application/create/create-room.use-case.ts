import { RoomRepository } from '../../core/domain/room.repository'
import { Room } from '../../core/domain/room.entity'
import { RoomName } from '../../core/domain/room-name.value-object'
import { CreateRoomDto } from '../../infrastructure/create-room.dto'

export class CreateRoomUseCase {
  constructor(
    private repository: RoomRepository /* , private eventBus: EventBus */,
  ) {}

  async execute(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = Room.create(RoomName.create(createRoomDto.name))
    return await this.repository.createRoom(room)
    // TODO publish event 'room-created'
  }
}

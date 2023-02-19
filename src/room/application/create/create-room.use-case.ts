import { RoomRepository } from '../../domain/room.repository'
import { Room } from '../../domain/room.entity'
import { RoomName } from '../../domain/room-name.value-object'
import { CreateRoomDto } from '../../infrastructure/create-room.dto'

export class CreateRoomUseCase {
  constructor(
    private repository: RoomRepository /* , private eventBus: EventBus */,
  ) {}

  async execute(createRoomDto: CreateRoomDto): Promise<void> {
    const room = Room.create(RoomName.create(createRoomDto.name))
    await this.repository.createRoom(room)
    // await this.eventBus.publish(room.pullDomainEvents())
  }
}

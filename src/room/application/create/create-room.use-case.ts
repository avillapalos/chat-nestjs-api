import { RoomRepository } from '../../domain/room.repository'
import { Room } from '../../domain/room.entity'
import { RoomName } from '../../domain/room-name.value-object'

export class CreateRoomUseCase {
  constructor(
    private repository: RoomRepository /* , private eventBus: EventBus */,
  ) {}

  async execute(name: string): Promise<void> {
    const room = Room.create(RoomName.create(name))
    await this.repository.createRoom(room)
    // await this.eventBus.publish(room.pullDomainEvents())
  }
}

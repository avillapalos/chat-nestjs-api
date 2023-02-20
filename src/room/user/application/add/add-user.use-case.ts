import { RoomRepository } from '../../../core/domain/room.repository'
import { RoomId } from '../../../core/domain/room-id.value-object'
import { UserId } from '../../../../user/core/domain/user-id.value-object'

export class AddUserUseCase {
  constructor(
    private repository: RoomRepository /* , private eventBus: EventBus */,
  ) {}

  async execute(roomId: RoomId, userId: UserId): Promise<void> {
    return await this.repository.addUser(roomId, userId)
    // TODO publish event 'user-added-to-room'
  }
}

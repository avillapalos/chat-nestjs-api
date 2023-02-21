import { Message } from '../../domain/message.entity'
import { MessageRepository } from '../../domain/message.repository'

export class GetListMessageUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(roomId: string, limit: number): Promise<Message[]> {
    return await this.repository.getListMessage(roomId, limit)
    // TODO publish event 'message-list-fetched'
  }
}

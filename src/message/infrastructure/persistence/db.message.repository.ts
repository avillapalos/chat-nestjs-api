import { Message } from '../../domain/message.entity'
import { MessageRepository } from '../../domain/message.repository'
import { Repository } from 'typeorm'

export class DbMessageRepository implements MessageRepository {
  constructor(private repository: Repository<Message>) {}
  async createMessage(message: Message): Promise<Message> {
    return this.repository.save(message)
  }
}

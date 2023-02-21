import { Message } from '../../domain/message.entity'
import { MessageRepository } from '../../domain/message.repository'
import { Repository } from 'typeorm'

export class DbMessageRepository implements MessageRepository {
  constructor(private repository: Repository<Message>) {}
  async createMessage(message: Message): Promise<Message> {
    return this.repository.save(message)
  }
  async getListMessage(roomId: string, limit: number): Promise<Message[]> {
    return await this.repository
      .createQueryBuilder('chat-message')
      .leftJoinAndSelect('chat-message.userId', 'chat-user')
      .leftJoinAndSelect('chat-message.roomId', 'chat-room')
      .where('room_id =:roomId', { roomId })
      .limit(limit ? limit : 10)
      .orderBy('created', 'DESC')
      .getMany()
  }
}

import { Message } from './message.entity'

export interface MessageRepository {
  createMessage(message: Message): Promise<Message>
}

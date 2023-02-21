import { SendMessageDto } from '../../infrastructure/send-message.dto'
import { Message } from '../../domain/message.entity'
import { MessageText } from '../../domain/message-text.value-object'
import { MessageRepository } from '../../domain/message.repository'

export class SendMessageUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(sendMessageDto: SendMessageDto): Promise<Message> {
    const message = Message.create(
      MessageText.create(sendMessageDto.text),
      sendMessageDto.userId,
      sendMessageDto.roomId,
    )
    return await this.repository.createMessage(message)
    // TODO publish event 'message-sent'
  }
}

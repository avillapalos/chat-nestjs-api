import { MessageId } from './message-id.value-object'
import { MessageText } from './message-text.value-object'
import { MessageDate } from './message-date.value-object'

export class Message {
  readonly id: MessageId
  readonly text: MessageText
  created: MessageDate
  readonly userId: string
  readonly roomId: string

  constructor(
    id: MessageId,
    text: MessageText,
    created: MessageDate,
    userId: string,
    roomId: string,
  ) {
    this.id = id
    this.text = text
    this.created = created
    this.userId = userId
    this.roomId = roomId
  }

  static create(text: MessageText, userId: string, roomId: string): Message {
    return new Message(
      MessageId.create(),
      text,
      MessageDate.create(new Date()),
      userId,
      roomId,
    )
  }
}

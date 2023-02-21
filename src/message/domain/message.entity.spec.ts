import { Message } from './message.entity'
import { MessageText } from './message-text.value-object'
import { UserId } from '../../user/core/domain/user-id.value-object'
import { RoomId } from '../../room/core/domain/room-id.value-object'

describe('Message Entity', () => {
  it('should return success response', () => {
    const message = Message.create(
      MessageText.create('Message 1'),
      UserId.create(),
      RoomId.create(),
    )
    expect(message).toBeInstanceOf(Message)
  })
})

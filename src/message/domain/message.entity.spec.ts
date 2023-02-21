import { Message } from './message.entity'
import { MessageText } from './message-text.value-object'

describe('Message Entity', () => {
  it('should return success response', () => {
    const message = Message.create(
      MessageText.create('Message 1'),
      '7dc19430-d8e7-4b3c-8e5b-781f42550b7f',
      'bb580ca9-1f53-4b25-b91d-4488260cd996',
    )
    expect(message).toBeInstanceOf(Message)
  })
})

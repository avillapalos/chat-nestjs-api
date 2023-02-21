import { MessageId } from './message-id.value-object'

describe('MessageId ValueObject', () => {
  it('should return success response', () => {
    const messageId = MessageId.create()
    expect(messageId).toBeInstanceOf(MessageId)
  })
})

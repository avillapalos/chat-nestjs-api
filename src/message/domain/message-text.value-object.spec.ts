import { MessageText } from './message-text.value-object'

describe('MessageText ValueObject', () => {
  it('should return success response', () => {
    const messageName = MessageText.create('Message 1')
    expect(messageName).toBeInstanceOf(MessageText)
  })
})

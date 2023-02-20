import { UserId } from './user-id.value-object'

describe('UserId ValueObject', () => {
  it('should return success response', () => {
    const userId = UserId.create()
    expect(userId).toBeInstanceOf(UserId)
  })
})

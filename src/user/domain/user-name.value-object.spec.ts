import { UserName } from './user-name.value-object'

describe('UserName ValueObject', () => {
  it('should return success response', () => {
    const userName = UserName.create('User 1')
    expect(userName).toBeInstanceOf(UserName)
  })
})

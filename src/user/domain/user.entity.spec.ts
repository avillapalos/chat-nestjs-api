import { User } from './user.entity'
import { UserName } from './user-name.value-object'
import { UserPassword } from './user-password.value-object'

describe('User Entity', () => {
  it('should return success response', () => {
    const user = User.create(
      UserName.create('User 1'),
      UserPassword.create('1234'),
    )
    expect(user).toBeInstanceOf(User)
  })
})

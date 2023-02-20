import { UserPassword } from './user-password.value-object'
import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

describe('UserPassword ValueObject', () => {
  it('should return success response', () => {
    const userPassword = UserPassword.create('1234')
    expect(userPassword).toBeInstanceOf(UserPassword)
  })
  it('should throw an error', () => {
    try {
      UserPassword.create('123')
    } catch (e: any) {
      expect(e).toBeInstanceOf(InvalidArgumentError)
    }
  })
})

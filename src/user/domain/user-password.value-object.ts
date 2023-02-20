import { StringValueObject } from '../../core/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

export class UserPassword extends StringValueObject {
  public static create(password: string): UserPassword {
    this.validate(password)
    return new UserPassword({ value: password })
  }

  private static validate(password: string) {
    if (password.length < 4) {
      throw new InvalidArgumentError('password must have 4 or more characters')
    }
  }
}

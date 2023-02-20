import { StringValueObject } from '../../core/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

export class UserName extends StringValueObject {
  public static create(name: string): UserName {
    this.validate(name)
    return new UserName({ value: name })
  }

  private static validate(name: string) {
    if (!name) {
      throw new InvalidArgumentError('user name is missing or invalid')
    }
  }
}

import { StringValueObject } from '../../core/domain/value-object/StringValueObject'

export class UserName extends StringValueObject {
  public static create(name: string): UserName {
    return new UserName({ value: name })
  }
}

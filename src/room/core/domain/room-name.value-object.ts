import { StringValueObject } from '../../../core/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../../core/domain/value-object/invalid-argument.error'

export class RoomName extends StringValueObject {
  public static create(name: string): RoomName {
    this.validate(name)
    return new RoomName({ value: name })
  }

  private static validate(name: string) {
    if (!name) {
      throw new InvalidArgumentError('room name is missing or invalid')
    }
  }
}

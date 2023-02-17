import { StringValueObject } from '../../core/domain/value-object/StringValueObject'

export class RoomName extends StringValueObject {
  public static create(name: string): RoomName {
    return new RoomName({ value: name })
  }
}

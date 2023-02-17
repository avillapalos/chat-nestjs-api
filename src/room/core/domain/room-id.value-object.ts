import { Uuid } from '../../../core/domain/value-object/uuid.value-object'

export class RoomId extends Uuid {
  public static create(): Uuid {
    const uuid = Uuid.create()
    return new RoomId({ value: uuid.value })
  }
}

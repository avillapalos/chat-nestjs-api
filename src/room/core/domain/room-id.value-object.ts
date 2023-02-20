import { Uuid } from '../../../core/domain/value-object/uuid.value-object'

export class RoomId extends Uuid {
  public static create(id?: string): Uuid {
    const uuid = Uuid.create(id)
    return new RoomId({ value: uuid.value })
  }
}

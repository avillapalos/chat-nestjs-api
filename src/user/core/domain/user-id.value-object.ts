import { Uuid } from '../../../core/domain/value-object/uuid.value-object'

export class UserId extends Uuid {
  public static create(): Uuid {
    const uuid = Uuid.create()
    return new UserId({ value: uuid.value })
  }
}

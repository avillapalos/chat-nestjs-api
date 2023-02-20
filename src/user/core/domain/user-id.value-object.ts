import { Uuid } from '../../../core/domain/value-object/uuid.value-object'

export class UserId extends Uuid {
  public static create(id?: string): Uuid {
    const uuid = Uuid.create(id)
    return new UserId({ value: uuid.value })
  }
}

import { Uuid } from '../../core/domain/value-object/uuid.value-object'

export class MessageId extends Uuid {
  public static create(id?: string): Uuid {
    const uuid = Uuid.create(id)
    return new MessageId({ value: uuid.value })
  }
}

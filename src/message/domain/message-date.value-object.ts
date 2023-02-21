import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'
import { DateValueObject } from '../../core/domain/value-object/DateValueObject'

export class MessageDate extends DateValueObject {
  public static create(date: Date): MessageDate {
    this.validate(date)
    return new MessageDate({ value: date })
  }

  private static validate(date: Date) {
    if (!date) {
      throw new InvalidArgumentError('message date is missing or invalid')
    }
  }
}

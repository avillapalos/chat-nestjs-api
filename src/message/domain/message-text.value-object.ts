import { StringValueObject } from '../../core/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

export class MessageText extends StringValueObject {
  public static create(text: string): MessageText {
    this.validate(text)
    return new MessageText({ value: text })
  }

  private static validate(text: string) {
    if (!text) {
      throw new InvalidArgumentError('message text is missing or invalid')
    }
  }
}

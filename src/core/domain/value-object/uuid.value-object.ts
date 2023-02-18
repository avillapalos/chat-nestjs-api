import { v4 as uuidv4 } from 'uuid'
import { validate } from 'uuid'
import { InvalidArgumentError } from './invalid-argument.error'
import { StringValueObject } from './StringValueObject'

export class Uuid extends StringValueObject {
  public static create(): Uuid {
    const uuid = uuidv4()
    this.checkIsValidUuid(uuid)
    return new Uuid({ value: uuid })
  }

  private static checkIsValidUuid(uuid: string): void {
    if (!validate(uuid)) {
      throw new InvalidArgumentError(
        `${this.name} does not allow value <${uuid}>`,
      )
    }
  }
}

import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

export class CreateRoomDto {
  name: string

  constructor(name: string) {
    this.name = name
    this.validate()
  }

  private validate() {
    if (!this.name) {
      throw new InvalidArgumentError('name should not be empty')
    }
  }
}

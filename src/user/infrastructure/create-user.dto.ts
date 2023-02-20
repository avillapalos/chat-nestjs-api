import { InvalidArgumentError } from '../../core/domain/value-object/invalid-argument.error'

export class CreateUserDto {
  name: string
  password: string

  constructor(name: string, password: string) {
    this.name = name
    this.password = password
    this.validate()
  }

  private validate() {
    if (!this.name) {
      throw new InvalidArgumentError('user name missing or invalid')
    }
    if (!this.password) {
      throw new InvalidArgumentError('user password missing or invalid')
    }
  }
}

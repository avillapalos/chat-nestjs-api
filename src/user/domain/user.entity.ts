import { UserId } from '../core/domain/user-id.value-object'
import { UserName } from './user-name.value-object'
import { UserPassword } from './user-password.value-object'
import { Room } from '../../room/core/domain/room.entity'

export class User {
  readonly id: UserId
  readonly name: UserName
  readonly password: UserPassword
  rooms: Room[]

  constructor(id: UserId, name: UserName, password: UserPassword) {
    this.id = id
    this.name = name
    this.password = password
  }

  static create(name: UserName, password: UserPassword): User {
    return new User(UserId.create(), name, password)
  }
}

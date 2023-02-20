import { UserRepository } from '../../domain/user.repository'
import { User } from '../../domain/user.entity'
import { UserName } from '../../domain/user-name.value-object'
import { CreateUserDto } from '../../infrastructure/create-user.dto'
import { UserPassword } from '../../domain/user-password.value-object'

export class CreateUserUseCase {
  constructor(
    private repository: UserRepository /* , private eventBus: EventBus */,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create(
      UserName.create(createUserDto.name),
      UserPassword.create(createUserDto.password),
    )
    return await this.repository.createUser(user)
    // TODO publish event 'user-created'
  }
}

import { User } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import { Repository } from 'typeorm'

export class DbUserRepository implements UserRepository {
  constructor(private repository: Repository<User>) {}
  createUser(user: User): Promise<User> {
    return this.repository.save(user)
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { CreateUserUseCase } from '../application/create/create-user.use-case'
import { CreateUserDto } from './create-user.dto'

export const CREATE_USER_USE_CASE_TOKEN = Symbol('CREATE_USER_USE_CASE_TOKEN')

@Injectable()
@ApiTags('user')
@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE_TOKEN)
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      example: { name: 'User 1' },
    },
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_CREATED,
    description: 'Chat User created',
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'User name missing or invalid',
  })
  async run(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const newUser = await this.createUserUseCase.execute(createUserDto)
      return { id: newUser.id.value }
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}

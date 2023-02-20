import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { AddUserUseCase } from '../application/add/add-user.use-case'
import { UserId } from '../../../user/core/domain/user-id.value-object'
import { RoomId } from '../../core/domain/room-id.value-object'
import { InvalidArgumentError } from '../../../core/domain/value-object/invalid-argument.error'
import { NotFoundError } from '../../../core/domain/value-object/not-found.error'

export const ADD_USER_TO_ROOM_USE_CASE_TOKEN = Symbol(
  'ADD_USER_TO_ROOM_USE_CASE_TOKEN',
)

@Injectable()
@ApiTags('room')
@Controller('room')
export class AddUserController {
  constructor(
    @Inject(ADD_USER_TO_ROOM_USE_CASE_TOKEN)
    private addUserUseCase: AddUserUseCase,
  ) {}

  @Post(':roomId/user/:userId')
  @ApiResponse({
    status: constants.HTTP_STATUS_CREATED,
    description: 'User added to chat room',
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'Room or User id missing or invalid',
  })
  async run(
    @Param('roomId') roomId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.addUserUseCase.execute(
        RoomId.create(roomId),
        UserId.create(userId),
      )
    } catch (e: any) {
      if (e instanceof InvalidArgumentError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
      }
      if (e instanceof NotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND)
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

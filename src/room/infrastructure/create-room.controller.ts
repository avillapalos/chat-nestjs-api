import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { CreateRoomUseCase } from '../application/create/create-room.use-case'

export const CREATE_ROOM_USE_CASE_TOKEN = Symbol('CREATE_ROOM_USE_CASE_TOKEN')

@Injectable()
@ApiTags('chat')
@Controller('room')
export class CreateRoomController {
  constructor(
    @Inject(CREATE_ROOM_USE_CASE_TOKEN)
    private readonly createRoomUseCase: CreateRoomUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      example: { name: 'Room 1' },
    },
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_CREATED,
    description: 'Chat Room created',
  })
  run(@Body('name') name: string): Promise<void> {
    return this.createRoomUseCase.execute(name)
  }
}

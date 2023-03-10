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
import { CreateRoomUseCase } from '../application/create/create-room.use-case'
import { CreateRoomDto } from './create-room.dto'

export const CREATE_ROOM_USE_CASE_TOKEN = Symbol('CREATE_ROOM_USE_CASE_TOKEN')

@Injectable()
@ApiTags('room')
@Controller('room')
export class CreateRoomController {
  constructor(
    @Inject(CREATE_ROOM_USE_CASE_TOKEN)
    private createRoomUseCase: CreateRoomUseCase,
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
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'Room name missing or invalid',
  })
  async run(@Body() createRoomDto: CreateRoomDto): Promise<any> {
    try {
      const newRoom = await this.createRoomUseCase.execute(createRoomDto)
      return { id: newRoom.id.value }
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}

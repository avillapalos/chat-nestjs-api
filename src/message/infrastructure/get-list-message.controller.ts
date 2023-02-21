import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { Message } from '../domain/message.entity'
import { UserId } from '../../user/core/domain/user-id.value-object'
import { RoomId } from '../../room/core/domain/room-id.value-object'
import { MessageText } from '../domain/message-text.value-object'
import { GetListMessageUseCase } from '../application/create/get-list-message.use-case'

export const GET_LIST_MESSAGE_USE_CASE_TOKEN = Symbol(
  'GET_LIST_MESSAGE_USE_CASE_TOKEN',
)

@Injectable()
@ApiTags('room')
@Controller('room')
export class GetListMessageController {
  constructor(
    @Inject(GET_LIST_MESSAGE_USE_CASE_TOKEN)
    private getListMessageUseCase: GetListMessageUseCase,
  ) {}

  @Get(':roomId/message')
  @ApiBody({
    description: 'Get a list of most recent messages from a chat room',
    schema: {
      example: [
        Message.create(
          MessageText.create('A message'),
          UserId.create().value,
          RoomId.create().value,
        ),
      ],
    },
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_OK,
    description: 'Chat list fetched successfully',
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'Data provided missing or invalid',
  })
  async run(
    @Param('roomId') roomId: string,
    @Query('limit') limit: number,
  ): Promise<any> {
    try {
      const messagesList = await this.getListMessageUseCase.execute(
        roomId,
        limit,
      )
      // TODO yes, it would be very much better to use a serializer
      return messagesList.map((message: any) => {
        return {
          id: message.id.value,
          text: message.text.value,
          created: message.created.value,
          user_id: message.userId?.id.value,
          room_id: message.roomId?.id.value,
        }
      })
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}

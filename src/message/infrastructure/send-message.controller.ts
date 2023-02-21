import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { SendMessageUseCase } from '../application/create/send-message.use-case'
import { SendMessageDto } from './send-message.dto'

export const SEND_MESSAGE_USE_CASE_TOKEN = Symbol('SEND_MESSAGE_USE_CASE_TOKEN')

@Injectable()
@ApiTags('room')
@Controller('room')
export class SendMessageController {
  constructor(
    @Inject(SEND_MESSAGE_USE_CASE_TOKEN)
    private sendMessageUseCase: SendMessageUseCase,
  ) {}

  @Post(':roomId/message')
  @ApiBody({
    description: 'Sends a message to a chat room',
    schema: {
      example: {
        text: 'Message 1',
        userId: 'd2af464f-1069-40e7-a5ea-0b9b04c73121',
      },
    },
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_NO_CONTENT,
    description: 'Chat Message sent to chat room',
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'Message name missing or invalid',
  })
  async run(
    @Param('roomId') roomId: string,
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<any> {
    try {
      sendMessageDto.roomId = roomId
      const newMessage = await this.sendMessageUseCase.execute(sendMessageDto)
      return { id: newMessage.id.value }
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}

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
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { constants } from 'http2'
import { GetListMessageUseCase } from '../application/get/get-list-message.use-case'

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
  @ApiResponse({
    status: constants.HTTP_STATUS_OK,
    description: 'Chat list fetched successfully',
    schema: {
      example: [
        {
          id: '681e84a5-431a-4daf-b156-274d4c9b74b4',
          text: 'Message example',
          created: '2023-02-21T09:31:40.090Z',
          user_id: '30bb752f-f513-43cb-86d0-9ec9239fcc23',
          room_id: '51b09adb-7289-477c-a654-46a946da51a8',
        },
        {
          id: '10dba169-8050-4d6b-93ea-adebabbc3573',
          text: 'Message example 2',
          created: '2023-02-21T09:29:38.957Z',
          user_id: '30bb752f-f513-43cb-86d0-9ec9239fcc23',
          room_id: '51b09adb-7289-477c-a654-46a946da51a8',
        },
      ],
    },
  })
  @ApiResponse({
    status: constants.HTTP_STATUS_BAD_REQUEST,
    description: 'Data provided missing or invalid',
  })
  async run(
    @Param('roomId') roomId: string,
    @Query('limit') limit?: number,
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

export class SendMessageDto {
  text: string
  userId: string
  roomId: string

  constructor(text: string, userId: string, roomId: string) {
    this.text = text
    this.userId = userId
    this.roomId = roomId
  }
}

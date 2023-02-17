import { RoomId } from './room-id.value-object'

describe('RoomId ValueObject', () => {
  it('should return success response', () => {
    const roomId = RoomId.create()
    expect(roomId).toBeInstanceOf(RoomId)
  })
})

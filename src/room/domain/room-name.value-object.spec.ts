import { RoomName } from './room-name.value-object'

describe('RoomName ValueObject', () => {
  it('should return success response', () => {
    const roomName = RoomName.create('Room 1')
    expect(roomName).toBeInstanceOf(RoomName)
  })
})

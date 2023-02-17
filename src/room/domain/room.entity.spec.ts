import { Room } from './room.entity'
import { RoomName } from './room-name.value-object'

describe('Room Entity', () => {
  it('should return success response', () => {
    const room = Room.create(RoomName.create('Room 1'))
    expect(room).toBeInstanceOf(Room)
  })
})

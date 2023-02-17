import { Uuid } from './uuid.value-object'
import { InvalidArgumentError } from './invalid-argument.error'
import { v4 as uuidv4, validate } from 'uuid'

const validUuid = '8573a415-4445-4f0e-b511-2d4eda7bed8c'
const invalidUuid = 'invalid-uuid'
jest.mock('uuid', () => ({
  v4: jest.fn(),
  validate: jest.fn(),
}))

describe('Uuid ValueObject', () => {
  it('should return success response when uuid is valid', () => {
    uuidv4.mockImplementation(() => validUuid)
    validate.mockImplementation(() => true)
    const uuid = Uuid.create()
    expect(uuid).toBeInstanceOf(Uuid)
  })

  it('should throw an error when uuid is not validated', () => {
    uuidv4.mockImplementation(() => invalidUuid)
    validate.mockImplementation(() => false)
    try {
      Uuid.create()
    } catch (e: any) {
      expect(e).toBeInstanceOf(InvalidArgumentError)
      expect(e.message).toBe(
        `${Uuid.name} does not allow value <${invalidUuid}>`,
      )
    }
  })
})

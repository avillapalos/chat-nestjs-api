import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { RoomModule } from '../room/infrastructure/room.module'

describe('RoomController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RoomModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/room (POST) with valid body', () => {
    return request(app.getHttpServer())
      .post('/room')
      .send({ name: 'Room 1' })
      .expect(201)
  })

  it('/room (POST) with invalid body', () => {
    return request(app.getHttpServer())
      .post('/room')
      .send({ name: '' })
      .expect(400)
  })

  it('/room (POST) without body', () => {
    return request(app.getHttpServer()).post('/room').expect(400)
  })

  afterAll(async () => {
    await app.close()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserModule } from '../user/infrastructure/user.module'

describe('UserController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/user (POST) with valid body', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'User 1', password: '1234' })
      .expect(201)
  })

  it('/user (POST) with invalid body', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: '' })
      .expect(400)
  })

  it('/user (POST) with invalid name', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: '', password: '1234' })
      .expect(400)
  })

  it('/user (POST) with invalid password', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'User 1', password: '123' })
      .expect(400)
  })

  it('/user (POST) without body', () => {
    return request(app.getHttpServer()).post('/user').expect(400)
  })

  afterAll(async () => {
    await app.close()
  })
})

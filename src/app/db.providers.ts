import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'POSTGRES_DB',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'chat',
        password: 'chat',
        database: 'chat-db',
        entities: [__dirname + '/../**/db.*.entity{.ts,.js}'],
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]

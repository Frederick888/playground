import { Column, DataSource, Entity, PrimaryColumn, ValueTransformer } from 'typeorm'
import { UlidMonotonic } from 'id128'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js'

class UlidTransformer implements ValueTransformer {
  public to(value: UlidMonotonic): Buffer {
    return Buffer.from(value.bytes)
  }

  public from(value: Buffer): UlidMonotonic {
    return UlidMonotonic.construct(new Uint8Array(value))
  }
}

@Entity({ name: 'foo' })
class Foo {
  @PrimaryColumn({
    name: 'id',
    type: 'binary',
    length: 16,
    generated: false,
    transformer: new UlidTransformer(),
  })
  id!: UlidMonotonic

  @Column({ name: 'bar', type: 'varchar', length: 64, nullable: true })
  bar!: string
}

const options: MysqlConnectionOptions = {
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '123456',
  database: 'playground',
  logging: true,
  entities: [Foo],
  charset: 'utf8mb4',
  synchronize: true,
}
const AppDataSource = new DataSource(options)
const FooRepository = AppDataSource.getRepository(Foo)

async function main() {
  await AppDataSource.initialize()

  const id = UlidMonotonic.generate()
  const foo = FooRepository.create({
    id,
  })
  await FooRepository.insert(foo)
  console.log({
    ...foo,
    message: 'Write'
  })

  foo.bar = 'hello'
  await FooRepository.save(foo, { reload: false })
  console.log({
    ...foo,
    message: 'Read'
  })

  await AppDataSource.destroy()
}

main()

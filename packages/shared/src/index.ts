import { Column, DataSource, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js'

import { QueryFailedError } from "typeorm";

@Entity({ name: 'foo' })
export class Foo {
    @PrimaryColumn({
        name: 'id',
        type: 'int',
        generated: true,
    })
    id!: number

    @Column({ name: 'bar', type: 'varchar', length: 64, nullable: true })
    bar!: string

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date
}

const options: MysqlConnectionOptions = {
    type: 'mysql',
    connectorPackage: 'mysql2',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'playground',
    logging: true,
    entities: [Foo],
    charset: 'utf8mb4',
    synchronize: true,
}
export const AppDataSource = new DataSource(options)
export const FooRepository = AppDataSource.getRepository(Foo).extend({
    async doThrow() {
        try {
            throw new QueryFailedError("SELECT FOO", [1, 2, 3], new Error("SQL driver error"))
        } catch (err) {
            console.log({
                location: 'shared',
                errIsQueryFailedError: (err instanceof QueryFailedError),
                err,
            })
            throw err
        }
    }
})


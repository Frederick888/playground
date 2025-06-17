import { Column, DataSource, Entity, PrimaryColumn } from 'typeorm';

import { QueryFailedError } from "typeorm";
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions.js';

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
}

const options: SqliteConnectionOptions = {
    type: 'sqlite',
    database: './playground.db',
    logging: true,
    entities: [Foo],
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


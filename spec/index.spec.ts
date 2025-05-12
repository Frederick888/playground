import { afterAll, beforeAll, describe, expect, test } from "@jest/globals"
import { createClient, RedisClientType } from "@redis/client"

describe('hello', () => {
  test('hello() greets the world', () => {
    expect('Hello, world!').toBe('Hello, world!')
  })

  describe('redis', () => {
    let client!: RedisClientType

    beforeAll(async () => {
      client = createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
      })
      await client.connect()
    })
    afterAll(() => {
      client.destroy()
    })

    test('set and get', async () => {
      await client.set('key', 'value')
      const v = await client.get('key')

      expect(v).toStrictEqual('value')
    })
  })
})

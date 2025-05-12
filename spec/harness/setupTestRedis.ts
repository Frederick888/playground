/* eslint-disable no-console */
/* eslint-disable n/no-process-env */

import { RedisContainer } from '@testcontainers/redis'

const REDIS_IMAGE = 'redis:6.2'

async function startContainer() {
  if (globalThis.__REDIS__) {
    const redisContainer = globalThis.__REDIS__
    console.log(`Reusing Redis Test Container on ${redisContainer.getHost()}:${redisContainer.getPort()}`)
    return redisContainer
  }
  return new RedisContainer(REDIS_IMAGE).start()
}

async function setupTestRedis() {
  const redisContainer = await startContainer()

  process.env.REDIS_HOST = redisContainer.getHost()
  process.env.REDIS_PORT = redisContainer.getPort().toString()

  return redisContainer
}

export default setupTestRedis

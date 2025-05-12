/* eslint-disable no-console */

import setupTestRedis from './setupTestRedis'

export default async function globalSetup() {
  console.log()

  const redis = async () => {
    console.log('Setting up Redis Test Container')
    const redisContainer = await setupTestRedis()
    console.log(`Started Redis Test Container on ${redisContainer.getHost()}:${redisContainer.getPort()}`)
    globalThis.__REDIS__ = redisContainer
  }

  return Promise.all([redis()])
}

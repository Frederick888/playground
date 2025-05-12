/* eslint-disable no-var */

import { StartedRedisContainer } from '@testcontainers/redis'

export {}

// https://stackoverflow.com/questions/59459312/using-globalthis-in-typescript
declare global {
  var __REDIS__: StartedRedisContainer
}

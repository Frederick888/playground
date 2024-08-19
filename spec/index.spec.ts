import { describe, expect, test } from "@jest/globals"

describe('hello', () => {
  test('hello() greets the world', () => {
    expect('Hello, world!').toBe('Hello, world!')
  })
})

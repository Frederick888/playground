export default async function globalTeardown() {
  await globalThis.__REDIS__.stop()
}

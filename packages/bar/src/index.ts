import { AppDataSource, FooRepository } from "@playground/shared"
import { QueryFailedError } from "typeorm"

async function main() {
  await AppDataSource.initialize()

  try {
    await FooRepository.doThrow()
  } catch (err) {
    console.log({
      location: 'bar',
      errIsQueryFailedError: (err instanceof QueryFailedError),
      err,
    })
  } finally {
    await AppDataSource.destroy()
  }
}

main()

export class BaseError extends Error {
  constructor (message: string, type: string, public readonly data?: any) {
    super(`DataValid ${type} Error: ${message}`)
  }
}

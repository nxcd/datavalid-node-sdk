import { BaseError } from './base.error'

export class APIError extends BaseError {
  constructor (message: string, data?: any) {
    super(message, 'API', data)
  }
}

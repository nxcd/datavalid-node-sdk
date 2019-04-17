import { BaseError } from './base.error'

export class AuthenticationError extends BaseError {
  constructor (message: string, data?: any) {
    super(message, 'Authentication', data)
  }
}

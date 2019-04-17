import { BaseError } from './base.error'

export class SDKError extends BaseError {
  constructor (message: string, data?: any) {
    super(message, 'SDK', data)
  }
}

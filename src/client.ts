import { SDKError } from './errors/SDKError'
import { APIError, AuthenticationError } from './errors'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'query-string'
import {
  IDataValidPFInput,
  IDataValidPJInput,
  IDataValidImageInput,
  IDataValidParams,
  IDataValidSuccessPFResponse,
  IDataValidSuccessPJResponse,
  IDataValidSuccessImageResponse,
  IDataValidAuthResponse
} from './structures'

export class DataValidClient {
  private readonly apiClient: AxiosInstance
  private readonly authClient: AxiosInstance
  private readonly authPath: string = '/token'

  constructor (config: IDataValidParams) {
    this._checkConfig(config)

    this.authClient = axios.create({
      baseURL: config.authUrl,
      auth: {
        password: config.consumerSecret,
        username: config.consumerKey
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        grant_type: 'client_credentials'
      })
    })

    this.apiClient = axios.create({
      baseURL: config.apiUrl
    })
  }

  async validatePFData (data: IDataValidPFInput): Promise<IDataValidSuccessPFResponse> {
    const apiPath = '/validate/pf'
    return this._call(apiPath, data)
  }

  async validatePFImage (data: IDataValidImageInput): Promise<IDataValidSuccessImageResponse> {
    const apiPath = '/validate/pf-face'
    return this._call(apiPath, data)
  }

  async validatePJData (data: IDataValidPJInput): Promise<IDataValidSuccessPJResponse> {
    const apiPath = '/validate/pj'
    return this._call(apiPath, data)
  }

  private async _call<T> (path: string, data: Partial<T>): Promise<
    T extends IDataValidPFInput ? IDataValidSuccessPFResponse :
    T extends IDataValidPJInput ? IDataValidSuccessPJResponse :
    IDataValidSuccessImageResponse
  > {
    const token = await this._getToken()
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data: response } = await this.apiClient.post(path, data, config)
      return response
    } catch (e) {
      if (e.response) throw new APIError(JSON.stringify(e.response.data), e.response)
      throw new SDKError(e.message)
    }
  }

  private async _getToken () {
    try {
      const { data: response }: AxiosResponse<IDataValidAuthResponse> = await this.authClient.post(this.authPath)
      return response.access_token
    } catch (e) {
      if (e.response) throw new AuthenticationError(JSON.stringify(e.response.data), e.response)
      throw new SDKError(e.message)
    }
  }

  private _checkConfig (config: IDataValidParams): void {
    if (!config.apiUrl || !config.authUrl || !config.consumerKey || !config.consumerSecret) {
      throw new SDKError('Missing configuration params', {
        computedParams: {
          apiUrl: !!config.apiUrl,
          authUrl: !!config.authUrl,
          consumerKey: !!config.consumerKey,
          consumerSecret: !!config.consumerSecret
        }
      })
    }
  }
}

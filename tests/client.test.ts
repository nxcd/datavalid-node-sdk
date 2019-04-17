import { expect } from 'chai'
import interceptor from 'nock'
import { SDKError, IDataValidParams, DataValidClient, APIError, AuthenticationError, IDataValidPFInput, IDataValidPJInput } from '../src'

let app: DataValidClient
const options: IDataValidParams = {
  apiUrl: 'http://api.mock',
  authUrl: 'http://auth.mock',
  consumerKey: 'key',
  consumerSecret: 'secret'
}

before(async () => {
  app = new DataValidClient(options)
})

describe('General Behavior', () => {
  describe('When required config is missing', () => {
    it('Should error with SDK Error requiring config', async () => {
      const fakeOptions = {
        apiUrl: '',
        authUrl: '',
        consumerKey: '',
        consumerSecret: ''
      }
      const appError = () => new DataValidClient(fakeOptions)

      expect(appError).to.throw(SDKError, 'Missing configuration params').that.has.property('data').which.is.deep.equal({
        computedParams: {
          apiUrl: false,
          authUrl: false,
          consumerKey: false,
          consumerSecret: false
        }
      })

      fakeOptions.apiUrl = 'http://url.mock'
      expect(appError).to.throw(SDKError, 'Missing configuration params').that.has.property('data').which.is.deep.equal({
        computedParams: {
          apiUrl: true,
          authUrl: false,
          consumerKey: false,
          consumerSecret: false
        }
      })

    })
  })

  describe('When SDK errors', () => {
    const inputData: IDataValidPFInput = {
      key: {
        cpf: '23123123'
      },
      answer: {
        data_nascimento: 'nasc'
      }
    }
    it('Should error with SDK Error on Auth', async () => {
      interceptor(options.authUrl)
        .post('/token2')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      try {
        await app.validatePFData(inputData)
      } catch (e) {
        expect(e).to.instanceOf(SDKError)
      }
    })

    it('Should error with SDK Error on call', async () => {
      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pf-not-known', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(422, inputData)

      try {
        await app.validatePFData(inputData)
      } catch (e) {
        expect(e).to.instanceOf(SDKError)
      }
    })
  })
})

describe('Get PF image data', () => {

  const inputData: IDataValidPFInput = {
    key: {
      cpf: '734863845458796378'
    },
    answer: {
      nome: 'name'
    }
  }

  describe('When required parameters are missing', () => {
    it('Should error with 422', async () => {
      const invalidEntityError = [
        {
          code: 'DV10',
          property: 'key.cpf',
          message: 'CPF inválido'
        }
      ]

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pf', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(422, invalidEntityError)

      try {
        await app.validatePFData(inputData)
      } catch (e) {
        expect(e).to.instanceOf(APIError)
        expect(e.data.status).to.deep.equal(422)
        expect(e.data.data).to.deep.equal(invalidEntityError)
      }
    })
  })

  describe('When call finalizes', () => {
    it('Should success with 200', async () => {
      const output = {
        some: 'data'
      }

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pf', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(200, output)

      const response = await app.validatePFData(inputData)
      expect(response).to.deep.equal(output)
    })
  })
})

describe('Get PJ data', () => {
  const inputData: IDataValidPJInput = {
    key: {
      cnpj: '734863845458796378'
    },
    answer: {
      nome_fantasia: 'name'
    }
  }
  describe('When required parameters are missing', () => {
    it('Should error with 422', async () => {
      const invalidEntityError = [
        {
          code: 'DV10',
          property: 'key.cnpj',
          message: 'CNPJ inválido'
        }
      ]

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pj', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(422, invalidEntityError)

      try {
        await app.validatePJData(inputData)
      } catch (e) {
        expect(e).to.instanceOf(APIError)
        expect(e.data.status).to.deep.equal(422)
        expect(e.data.data).to.deep.equal(invalidEntityError)
      }
    })
  })

  describe('When call finalizes', () => {
    it('Should success with 200', async () => {
      const output = {
        some: 'data'
      }

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pj', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(200, output)

      const response = await app.validatePJData(inputData)
      expect(response).to.deep.equal(output)
    })
  })
})

describe('Get PF data', () => {
  describe('When required parameters are missing', () => {
    it('Should error with 422', async () => {
      const invalidEntityError = [
        {
          code: 'DV10',
          property: 'key.cpf',
          message: 'CPF inválido'
        }
      ]

      const inputData = {
        key: {
          cpf: '734863845458796378'
        },
        answer: {
          biometria_face: 'base64'
        }
      }

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pf-face', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(422, invalidEntityError)

      try {
        await app.validatePFImage(inputData)
      } catch (e) {
        expect(e).to.instanceOf(APIError)
        expect(e.data.status).to.deep.equal(422)
        expect(e.data.data).to.deep.equal(invalidEntityError)
      }
    })
  })

  describe('When call finalizes', () => {
    it('Should success with 200', async () => {
      const output = {
        some: 'data'
      }

      const inputData = {
        key: {
          cpf: '734863845458796378'
        },
        answer: {
          biometria_face: 'base64'
        }
      }

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(200, {
          access_token: 'd642c84fe0a737c569a0846ae9a091'
        })

      interceptor(options.apiUrl)
        .post('/validate/pf-face', inputData, { reqheaders: { Authorization: 'Bearer d642c84fe0a737c569a0846ae9a091' } })
        .reply(200, output)

      const response = await app.validatePFImage(inputData)
      expect(response).to.deep.equal(output)
    })
  })
})

describe('Authentication behavior', () => {
  describe('When authentication is invalid', () => {
    it('Should error with 401', async () => {
      const errorObject = {
        error: 'invalid_client',
        error_description: 'Client Authentication failed.'
      }

      const inputData = {
        key: {
          cpf: '734863845458796378'
        },
        answer: {
          biometria_face: 'base64'
        }
      }

      interceptor(options.authUrl)
        .post('/token')
        .basicAuth({
          user: options.consumerKey,
          pass: options.consumerSecret
        })
        .reply(401, errorObject)

      try {
        await app.validatePFImage(inputData)
      } catch (e) {
        expect(e).to.instanceOf(AuthenticationError)
        expect(e.data.data).to.deep.equal(errorObject)
        expect(e.data.status).to.equal(401)
      }
    })
  })
})

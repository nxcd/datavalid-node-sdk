# Datavalid Node SDK

> NodeJS SDK to Serpro's DataValid API

[![Build Status](https://travis-ci.org/nxcd/datavalid-node-sdk.svg?branch=master)](https://travis-ci.org/nxcd/datavalid-node-sdk)

## Summary

- [Datavalid Node SDK](#datavalid-node-sdk)
  - [Summary](#summary)
  - [What is it](#what-is-it)
  - [Usage](#usage)
  - [API](#api)
    - [Validate PF Data](#validate-pf-data)
    - [Validate PF Image](#validate-pf-image)
    - [Validata PJ data](#validata-pj-data)

## What is it

This is a client SDK for [DataValid](https://servicos.serpro.gov.br/datavalid/) a brazilian service to validate citizen data against government databases.

## Usage

Install:

```sh
$ npm i @nxcd/datavalid-sdk
```

Instantiate class:

```ts
import {DataValidClient} from '@nxcd/datavalid-sdk'

const options = {
  apiUrl: 'https://apigateway.serpro.gov.br/datavalid/vbeta1',
  authUrl: 'https://apigateway.serpro.gov.br',
  consumerKey: 'key',
  consumerSecret: 'secret'
}

function foo () {
  const client = new DataValidClient(options)
}
```

> **All** options are required to the client

## API

### Validate PF Data

Validates data against a physical person database and compare the data results from the database to the ones you sent:

**Signature**: `async validatePFData (data: IDataValidPFInput): Promise<IDataValidSuccessPFResponse>`

**Input Parameters**:

```ts
interface IDataValidPFInput {
  key: {
    cpf: string
  }
  answer?: {
    nome?: string
    sexo?: 'M' | 'F'
    data_nascimento?: string
    situacao_cpf?: string
    filiacao?: {
      nome_mae?: string
      nome_pai?: string
    }
    nacionalidade?: number
    endereco?: Address
    documento?: {
      tipo?: number
      numero?: string
      orgao_expedidor?: string
      uf_expedidor?: string
    }
    cnh?: {
      numero_registro?: string
      registro_nacional_estrangeiro?: string
      categoria?: string
      data_primeira_habilitacao?: string
      data_validade?: string
    }
  }
}

type Address = {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  municipio: string
  uf: string
}
```

**Response:**

```ts
interface IDataValidSuccessPFResponse {
  sexo: boolean
  data_nascimento: boolean
  situacao_cpf: boolean
  filiacao: {
    nome_mae: boolean
    nome_mae_similaridade: number
    nome_pai: boolean
    nome_pai_similaridade: number
  }
  nacionalidade: boolean
  endereco: {
    logradouro: boolean
    logradouro_similaridade: number
    numero: boolean
    numero_similaridade: number
    bairro: boolean
    bairro_similaridade: number
    cep: boolean
    municipio: boolean
    municipio_similaridade: number
    uf: boolean
    uf_similaridade: number
  }
  documento: {
    tipo: boolean
    numero: boolean
    orgao_expedidor: boolean
    uf_expedidor: boolean
  }
  cnh: {
    categoria: boolean
    registro_nacional_estrangeiro: boolean
    data_primeira_habilitacao: boolean
    data_validade: boolean
    numero_registro: boolean
  }
}
```

### Validate PF Image

Will validate an image against the database to compare similarity

**Signature:** `async validatePFImage (data: IDataValidImageInput): Promise<IDataValidSuccessImageResponse>`

**Input Parameters:**

```ts
interface IDataValidImageInput {
  key: {
    cpf: string
  }
  answer: {
    biometria_face: string
  }
}
```

> `biometria_face` should be the base64 data of an image

**Response:**

```ts
interface IDataValidSuccessImageResponse {
  filiacao: {}
  endereco: {}
  documento: {}
  cnh: {}
  biometria_face: {
    disponivel: boolean
    probabilidade: string
    similaridade: number
  }
}
```

### Validata PJ data

Validates data from a juridic person.

**Signature:** `async validatePJData (data: IDataValidPJInput): Promise<IDataValidSuccessPJResponse>`

**Input parameters:**

```ts
export interface IDataValidPJInput {
  key: {
    cnpj: string
  }
  answer?: {
    razao_social?: string
    nome_fantasia?: string
    data_abertura?: string
    cnae_principal?: {
      codigo?: string
      descricao?: string
    }
    natureza_juridica?: {
      codigo?: string
      descricao?: string
    }
    endereco?: Address
    situacao_especial?: string
    situacao_cadastral?: {
      codigo?: number
      data?: string
      motivo?: string
    }
    nome_orgao?: string
    ente_federativo?: string
    correio_eletronico?: string
    capital_social?: number
    porte?: string
    telefone?: {
      ddd?: string
      numero?: string
    }
  }
}

type Address = {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  municipio: string
  uf: string
}
```

**Response:**

```ts
interface IDataValidSuccessPJResponse {
  razao_social: boolean
  razao_social_similaridade: number
  nome_fantasia: boolean
  nome_fantasia_similaridade: number
  data_abertura: boolean
  cnae_principal: {
    codigo: boolean
    descricao: boolean
    descricao_similaridade: number
  }
  natureza_juridica: {
    codigo: boolean
    descricao: boolean
    descricao_similaridade: number
  }
  endereco: {
    logradouro: boolean
    logradouro_similaridade: number
    numero: boolean
    numero_similaridade: number
    complemento: boolean
    complemento_similaridade: number
    bairro: boolean
    bairro_similaridade: number
    cep: boolean
    municipio: boolean
    municipio_similaridade: number
    uf: boolean
    uf__similaridade: number
  }
  situacao_especial: boolean
  situacao_especial_similaridade: number
  situacao_cadastral: {
    codigo: boolean
    data: boolean
    motivo: boolean
    motivo_similaridade: number
  }
  nome_orgao: boolean
  nome_orgao_similaridade: number
  ente_federativo: boolean
  ente_similaridade: number
  correio_eletronico: boolean
  correio_eletronico_similaridade: number
  capital_social: boolean
  porte: boolean
  telefone: {
    ddd: boolean
    numero: boolean
    data_primeira_habilitacao: boolean
    data_validade: true
  }
}
```

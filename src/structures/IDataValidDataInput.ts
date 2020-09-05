export interface IDataValidPFInput {
  key: {
    cpf: string
  }
  answer?: DatavalidPFQuestionInput
}

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

export interface IDataValidImageInput {
  key: {
    cpf: string
  }
  answer: IImageAnswer
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

type DatavalidPFQuestionInput = {
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
    data_ultima_emissao?: string
    data_primeira_habilitacao?: string
    data_validade?: string
    codigo_situacao?: number
  },
  biometria_face?: string
}

interface IImageAnswer extends DatavalidPFQuestionInput {
  biometria_face?: string
}

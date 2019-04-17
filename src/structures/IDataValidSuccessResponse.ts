export interface IDataValidSuccessPFResponse {
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

export interface IDataValidSuccessPJResponse {
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

export interface IDataValidSuccessImageResponse {
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

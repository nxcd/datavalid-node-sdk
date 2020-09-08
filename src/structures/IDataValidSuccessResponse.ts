type Parents = {
  nome_mae: boolean
  nome_mae_similaridade: number
  nome_pai: boolean
  nome_pai_similaridade: number
}

type Address = {
  cep: boolean
  uf: boolean
  logradouro: boolean
  logradouro_similaridade: number
  numero: boolean
  numero_similaridade: number
  bairro: boolean
  bairro_similaridade: number
  municipio: boolean
  municipio_similaridade: number
  complemento: boolean
  complemento_similaridade: number
}

type Biometry = {
  disponivel: boolean
  probabilidade: string
  similaridade: number
}

type Document = {
  tipo: boolean
  numero: boolean
  numero_similaridade: number
  orgao_expedidor: boolean
  uf_expedidor: boolean
}

type License = {
  nome: boolean
  categoria: boolean
  nome_similaridade: number
  numero_registro: boolean
  registro_nacional_estrangeiro: boolean
  data_primeira_habilitacao: boolean
  data_validade: boolean
  data_ultima_emissao: boolean
  codigo_situacao: boolean
}

export interface IDataValidSuccessPFResponse {
  cpf_disponivel: boolean
  nome: boolean
  nome_similaridade: number
  sexo: boolean
  data_nascimento: boolean
  situacao_cpf: boolean
  filiacao?: Parents
  nacionalidade: boolean
  endereco?: Address
  documento?: Document
  cnh?: License
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

export interface IDataValidSuccessImageResponse extends IDataValidSuccessPFResponse {
  biometria_face: Biometry
}

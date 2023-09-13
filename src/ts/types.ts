export interface Env {
  URLKV: KVNamespace
  URLD1: D1Database
  SHORT_CODE_LENGTH: string
}

export interface UrlRow {
  short: string
  long: string
  created: number
}

export interface CreateUrlFormData {
  short?: string
  long: string
}

export interface DeleteUrlFormData {
  short: string
}

export interface UrlDatatableResponse {
  data: UrlDatatableRow[]
}

interface UrlDatatableRow {
  s: string
  l: string
  c: number
}

export interface Env {
  URLKV: KVNamespace
  URLD1: D1Database
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

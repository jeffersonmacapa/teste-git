export interface Cliente {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  criadoEm: number;
}

export type CamposFormulario = 'nome' | 'endereco' | 'email';

export type ErrosValidacao = Partial<Record<CamposFormulario, string>>;

export interface FormState {
  nome: string;
  endereco: string;
  email: string;
}

export const FORM_INICIAL: FormState = {
  nome: '',
  endereco: '',
  email: '',
};

export const LIMITES = {
  nomeMin: 3,
  enderecoMin: 5,
  emailMax: 254,
  nomeMax: 100,
  enderecoMax: 200,
} as const;
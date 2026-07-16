import type {
  CamposFormulario,
  ErrosValidacao,
  FormState,
} from './tipos';
import { LIMITES } from './tipos';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizar(valor: string): string {
  return valor.trim();
}

export function validarNome(nome: string): string | undefined {
  const v = normalizar(nome);
  if (v.length === 0) return 'Informe o nome.';
  if (v.length < LIMITES.nomeMin)
    return `O nome deve ter no mínimo ${LIMITES.nomeMin} caracteres.`;
  if (v.length > LIMITES.nomeMax)
    return `O nome deve ter no máximo ${LIMITES.nomeMax} caracteres.`;
  return undefined;
}

export function validarEndereco(endereco: string): string | undefined {
  const v = normalizar(endereco);
  if (v.length === 0) return 'Informe o endereço.';
  if (v.length < LIMITES.enderecoMin)
    return `O endereço deve ter no mínimo ${LIMITES.enderecoMin} caracteres.`;
  if (v.length > LIMITES.enderecoMax)
    return `O endereço deve ter no máximo ${LIMITES.enderecoMax} caracteres.`;
  return undefined;
}

export function validarEmail(email: string): string | undefined {
  const v = normalizar(email);
  if (v.length === 0) return 'Informe o e-mail.';
  if (v.length > LIMITES.emailMax) return 'E-mail muito longo.';
  if (!REGEX_EMAIL.test(v)) return 'E-mail inválido.';
  return undefined;
}

const VALIDADORES: Record<
  CamposFormulario,
  (valor: string) => string | undefined
> = {
  nome: validarNome,
  endereco: validarEndereco,
  email: validarEmail,
};

export function validarCampo(
  campo: CamposFormulario,
  valor: string,
): string | undefined {
  return VALIDADORES[campo](valor);
}

export function validarFormulario(form: FormState): ErrosValidacao {
  const erros: ErrosValidacao = {};
  const nome = validarNome(form.nome);
  if (nome) erros.nome = nome;
  const endereco = validarEndereco(form.endereco);
  if (endereco) erros.endereco = endereco;
  const email = validarEmail(form.email);
  if (email) erros.email = email;
  return erros;
}

export function formularioEhValido(form: FormState): boolean {
  return Object.keys(validarFormulario(form)).length === 0;
}
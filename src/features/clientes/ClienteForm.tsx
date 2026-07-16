import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CampoTexto } from './CamposFormulario';
import type { Cliente, CamposFormulario, ErrosValidacao, FormState } from './tipos';
import { FORM_INICIAL, LIMITES } from './tipos';
import { validarCampo, validarFormulario } from './validacao';

export interface ClienteFormProps {
  onSubmit: (cliente: Cliente) => void;
}

const ORDEM_CAMPOS: CamposFormulario[] = ['nome', 'endereco', 'email'];

export function ClienteForm({ onSubmit }: ClienteFormProps) {
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [erros, setErros] = useState<ErrosValidacao>({});
  const refs = React.useRef<Record<CamposFormulario, HTMLInputElement | null>>({
    nome: null,
    endereco: null,
    email: null,
  });

  const atualizarCampo =
    (campo: CamposFormulario) =>
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      setForm((anterior) => ({ ...anterior, [campo]: evento.target.value }));
    };

  const tratarBlur = (campo: CamposFormulario) => () => {
    const mensagem = validarCampo(campo, form[campo]);
    setErros((anterior) => ({ ...anterior, [campo]: mensagem }));
  };

  function focarPrimeiroInvalido(errosAtuais: ErrosValidacao) {
    for (const campo of ORDEM_CAMPOS) {
      if (errosAtuais[campo]) {
        refs.current[campo]?.focus();
        return;
      }
    }
  }

  function tratarSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const errosValidados = validarFormulario(form);
    setErros(errosValidados);
    if (Object.keys(errosValidados).length > 0) {
      focarPrimeiroInvalido(errosValidados);
      return;
    }
    const novoCliente: Cliente = {
      id: crypto.randomUUID(),
      nome: form.nome.trim(),
      endereco: form.endereco.trim(),
      email: form.email.trim(),
      criadoEm: Date.now(),
    };
    onSubmit(novoCliente);
    setForm(FORM_INICIAL);
    setErros({});
    refs.current.nome?.focus();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo cliente</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para cadastrar um cliente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={tratarSubmit}
          className="grid gap-4"
          aria-label="Cadastro de cliente"
        >
          <CampoTexto
            id="nome"
            label="Nome"
            value={form.nome}
            onChange={atualizarCampo('nome')}
            onBlur={tratarBlur('nome')}
            error={erros.nome}
            inputRef={(el) => {
              refs.current.nome = el;
            }}
            autoComplete="name"
            placeholder="Ex.: Maria Souza"
            maxLength={LIMITES.nomeMax}
            required
          />
          <CampoTexto
            id="endereco"
            label="Endereço"
            value={form.endereco}
            onChange={atualizarCampo('endereco')}
            onBlur={tratarBlur('endereco')}
            error={erros.endereco}
            inputRef={(el) => {
              refs.current.endereco = el;
            }}
            autoComplete="street-address"
            placeholder="Ex.: Rua das Flores, 123"
            maxLength={LIMITES.enderecoMax}
            required
          />
          <CampoTexto
            id="email"
            label="E-mail"
            type="email"
            value={form.email}
            onChange={atualizarCampo('email')}
            onBlur={tratarBlur('email')}
            error={erros.email}
            inputRef={(el) => {
              refs.current.email = el;
            }}
            autoComplete="email"
            inputMode="email"
            placeholder="Ex.: maria@email.com"
            maxLength={LIMITES.emailMax}
            required
          />
          <Button type="submit" className="mt-2 w-full sm:w-auto">
            Cadastrar cliente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
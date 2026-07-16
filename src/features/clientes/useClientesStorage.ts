import { useCallback, useEffect, useState } from 'react';

import type { Cliente } from './tipos';

const CHAVE_STORAGE = 'cadastro-clientes:lista';

function lerDoStorage(): Cliente[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) return [];
    const dados = JSON.parse(bruto) as unknown;
    if (!Array.isArray(dados)) return [];
    return dados.filter(isClienteValido);
  } catch {
    return [];
  }
}

function isClienteValido(valor: unknown): valor is Cliente {
  if (typeof valor !== 'object' || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.nome === 'string' &&
    typeof v.endereco === 'string' &&
    typeof v.email === 'string' &&
    typeof v.criadoEm === 'number'
  );
}

function salvarNoStorage(clientes: Cliente[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(clientes));
  } catch {
    // armazenamento indisponível — ignora silenciosamente
  }
}

export function useClientesStorage() {
  const [clientes, setClientes] = useState<Cliente[]>(() => lerDoStorage());
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setClientes(lerDoStorage());
    setPronto(true);
  }, []);

  useEffect(() => {
    if (pronto) salvarNoStorage(clientes);
  }, [clientes, pronto]);

  const adicionar = useCallback((cliente: Cliente) => {
    setClientes((anterior) => [cliente, ...anterior]);
  }, []);

  return { clientes, adicionar, pronto };
}
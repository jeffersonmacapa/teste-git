import { useState } from 'react';

import { ClienteForm } from './ClienteForm';
import { ListaClientes } from './ListaClientes';
import { useClientesStorage } from './useClientesStorage';
import type { Cliente } from './tipos';

const ANUNCIO_SUCESSO = 'Cliente cadastrado com sucesso.';

export function CadastroClientes() {
  const { clientes, adicionar } = useClientesStorage();
  const [anuncio, setAnuncio] = useState('');

  function tratarSubmit(cliente: Cliente) {
    adicionar(cliente);
    setAnuncio(ANUNCIO_SUCESSO);
    window.setTimeout(() => setAnuncio(''), 3000);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      <div className="grid gap-4">
        <h1 className="text-3xl font-semibold">Cadastro de Clientes</h1>
        <p
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          {anuncio}
        </p>
        <ClienteForm onSubmit={tratarSubmit} />
      </div>
      <ListaClientes clientes={clientes} />
    </div>
  );
}
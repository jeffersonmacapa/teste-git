import type { Cliente } from './tipos';

export interface ListaClientesProps {
  clientes: Cliente[];
}

function formatarData(epoch: number): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(epoch));
  } catch {
    return '';
  }
}

export function ListaClientes({ clientes }: ListaClientesProps) {
  if (clientes.length === 0) {
    return (
      <section aria-label="Clientes cadastrados">
        <p className="text-sm text-muted-foreground">
          Nenhum cliente cadastrado ainda.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Clientes cadastrados">
      <h2 className="mb-3 text-xl font-semibold">
        Clientes cadastrados
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({clientes.length})
        </span>
      </h2>
      <ul className="grid gap-3">
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <p className="font-medium">{cliente.nome}</p>
            <dl className="mt-2 grid gap-1 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <dt className="font-medium text-foreground">Endereço:</dt>
                <dd>{cliente.endereco}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-foreground">E-mail:</dt>
                <dd>
                  <a
                    href={`mailto:${cliente.email}`}
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    {cliente.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-foreground">Cadastrado em:</dt>
                <dd>{formatarData(cliente.criadoEm)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
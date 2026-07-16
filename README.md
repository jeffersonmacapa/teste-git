# Cadastro de Clientes

Aplicação web para cadastro de clientes (nome, endereço e e-mail) com foco em
UI/UX responsiva (mobile-first), acessibilidade (WCAG 2.1 AA) e persistência
client-side via LocalStorage.

## Stack

| Item         | Escolha                |
| ------------ | ---------------------- |
| Bundler      | Vite                   |
| Framework    | React 18               |
| Linguagem    | TypeScript             |
| Estilo       | Tailwind CSS v3        |
| UI Kit       | shadcn/ui              |
| Form state   | `useState` local       |
| Persistência | LocalStorage           |
| Testes       | Vitest                 |

## Pré-requisitos

- Node.js 18+ (testado com Node 24)
- npm 9+

## Como rodar

```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção
npm run build

# Pré-visualizar o build
npm run preview

# Verificação de tipos
npm run typecheck

# Rodar testes unitários (uma vez)
npm test

# Rodar testes em modo watch
npm run test:watch
```

## Estrutura do projeto

```
src/
├── main.tsx                          # Entry point React
├── App.tsx                           # Página raiz
├── index.css                         # Tailwind + tokens de tema
├── lib/
│   └── utils.ts                      # cn() helper (shadcn)
├── components/
│   └── ui/                           # Componentes shadcn (Button, Input, Label, Card)
└── features/
    └── clientes/
        ├── CadastroClientes.tsx      # Container da feature
        ├── ClienteForm.tsx           # Formulário + validação onBlur/submit
        ├── CamposFormulario.tsx      # Wrapper acessível de campo de texto
        ├── ListaClientes.tsx          # Lista de clientes cadastrados
        ├── useClientesStorage.ts     # Hook de persistência em LocalStorage
        ├── tipos.ts                  # Tipos (Cliente, FormState, ErrosValidacao)
        └── validacao.ts              # Regras de validação puras
specs/
└── technical-design-clientes.md     # Documento de design técnico
```

## Funcionalidades

- Cadastro de cliente com **nome**, **endereço** e **email**.
- Validação:
  - **nome**: obrigatório, mínimo 3, máximo 100 caracteres.
  - **endereço**: obrigatório, mínimo 5, máximo 200 caracteres.
  - **email**: obrigatório, formato `nome@dominio.tld`, máximo 254 caracteres.
- Validação **onBlur** (campo) e **onSubmit** (formulário completo).
- Persistência das alterações em LocalStorage (chave: `cadastro-clientes:lista`).
- Listagem dos clientes cadastrados na mesma tela.

## Acessibilidade

- Labels reais associadas via `htmlFor`/`id`.
- `aria-invalid` e `aria-describedby` apontando para mensagens de erro.
- `role="alert"` para leitura imediata dos erros por leitores de tela.
- Foco automático no primeiro campo inválido após submit rejeitado.
- `aria-live="polite"` no anúncio de sucesso.
- Ordem de tab semântica e alvos de toque de 44px.
- `http://localhost:5173` para desenvolvimento.

## Documentação de design

O documento de design técnico desta feature está em
[`specs/technical-design-clientes.md`](specs/technical-design-clientes.md),
incluindo decisões de arquitetura, plano de commits atômicos e fora de escopo.
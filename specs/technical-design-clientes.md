# Technical Design Document — Cadastro de Clientes

## 1. Visão Geral

Feature de cadastro de clientes com os campos **nome**, **endereço** e **email**.
Foco em UI/UX responsiva (mobile-first), acessibilidade (WCAG 2.1 AA) e
persistência client-side via LocalStorage.

A interface é construída de forma gradual via commits atômicos, seguindo o
padrão **Conventional Commits** em **português do Brasil**, mantendo a
convenção do histórico atual do repositório.

## 2. Stack

| Item           | Escolha                          | Motivo                                            |
| -------------- | -------------------------------- | ------------------------------------------------- |
| Bundler        | Vite                             | Recomendado por shadcn/ui; setup leve e rápido    |
| Framework      | React 18                         | Requisito                                         |
| Linguagem      | TypeScript                       | Type-safety, DX em formulários                    |
| Estilo         | Tailwind CSS v3                  | Requisito                                         |
| UI Kit         | shadcn/ui                        | Requisito                                         |
| Form state     | `useState` local                 | Decisão do usuário (sem React Hook Form)          |
| Validação      | Funções puras + ARIA             | Acessível, sem libs externas extra                |
| Persistência   | LocalStorage                     | Decisão do usuário (fase inicial sem backend)     |
| Testes         | Vitest                           | Natural ao Vite                                   |
| Commit style   | Conventional Commits pt-BR       | Padrão do repo (`feat:`, `fix:`, `chore:`, `docs:`) |
| Commit lang    | Português do Brasil              | Padrão do repo                                    |

## 3. Estrutura de Diretórios

```
teste-git/
├── index.html                 # substituído por entry do Vite
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── components.json            # config shadcn
├── specs/
│   └── technical-design-clientes.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css              # Tailwind directives + tokens
│   ├── lib/
│   │   └── utils.ts           # cn() helper (shadcn)
│   ├── components/
│   │   └── ui/                # componentes shadcn gerados
│   ├── features/
│   │   └── clientes/
│   │       ├── CadastroClientes.tsx     # container da feature
│   │       ├── ClienteForm.tsx          # formulário + validação
│   │       ├── CamposFormulario.tsx     # wrappers acessíveis
│   │       ├── ListaClientes.tsx        # lista resultante
│   │       ├── useClientesStorage.ts    # hook LocalStorage
│   │       ├── tipos.ts                # Cliente, ErrosValidacao
│   │       └── validacao.ts            # regras de validação puras
└── tests/
    └── validacao.test.ts
```

## 4. Modelo de Dados

Arquivo: `src/features/clientes/tipos.ts`

```ts
export interface Cliente {
  id: string;        // crypto.randomUUID()
  nome: string;
  endereco: string;
  email: string;
  criadoEm: number;  // Date.now()
}

export type CamposFormulario = 'nome' | 'endereco' | 'email';

export type ErrosValidacao = Partial<Record<CamposFormulario, string>>;

export interface FormState {
  nome: string;
  endereco: string;
  email: string;
}
```

## 5. UX / Acessibilidade

- **Mobile-first**: 1 coluna no mobile; grid 2 colunas no `sm:` para endereço;
  botão full-width no mobile.
- **Labels reais** associadas via `htmlFor` / `id` (não placeholders como label).
- **`aria-invalid`** + **`aria-describedby`** apontando para mensagem de erro.
- **`role="alert"`** na mensagem de erro para leitura imediata por leitores de tela.
- **Foco no primeiro campo inválido** após submit rejeitado.
- **Ordem de tab** semântica: nome → endereço → email → submit.
- **Alvo de toque mínimo**: botões com `h-11` (44px) no mobile.
- **Toast de sucesso** com `aria-live="polite"`.
- **Lista resultante** em `<ul>` semântica com `aria-label`.

## 6. Validação (sem libs externas)

Disparo em dois momentos:
1. **onBlur** do campo (valida o campo recém-abandonado).
2. **onSubmit** (valida todos os campos; foca o primeiro inválido).

Regras:
- **nome**: mínimo 3 caracteres, obrigatório.
- **endereco**: mínimo 5 caracteres, obrigatório.
- **email**: regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` e obrigatório.

## 7. Plano de Commits Atômicos

| #  | Commit                                                            | Conteúdo                                                        |
| -- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| 1  | `docs: adiciona technical design de cadastro de clientes`        | `specs/technical-design-clientes.md`                            |
| 2  | `chore: inicializa projeto Vite + React + TypeScript`            | scaffold, package.json, tsconfig, vite.config, main/App           |
| 3  | `chore: configura Tailwind CSS`                                   | tailwind.config, postcss, index.css                              |
| 4  | `chore: configura shadcn/ui`                                      | components.json, lib/utils.ts, tokens CSS                        |
| 5  | `feat(ui): adiciona componentes base Button, Input, Label, Card`  | shadcn generate destes componentes                               |
| 6  | `feat(clientes): adiciona tipos e regras de validacao`            | `tipos.ts` + `validacao.ts`                                      |
| 7  | `feat(clientes): adiciona hook de persistencia em LocalStorage`   | `useClientesStorage.ts`                                          |
| 8  | `feat(clientes): adiciona formulario de cadastro acessivel`       | `ClienteForm.tsx` + `CamposFormulario.tsx`                       |
| 9  | `feat(clientes): adiciona lista de clientes cadastrados`          | `ListaClientes.tsx`                                              |
| 10 | `feat(clientes): integra formulario e lista em CadastroClientes`  | `CadastroClientes.tsx` montado em `App.tsx`                      |
| 11 | `feat(ui): adiciona Toast de feedback de cadastro`                | Toast shadcn com `aria-live`                                     |
| 12 | `feat: torna layout responsivo mobile-first`                      | ajustes finais de responsividade                                 |
| 13 | `test: adiciona validacoes unitarias para email e campos`         | Vitest sobre a camada de validação                               |

Cada commit é **buildável e funcional** em seu escopo, sem quebrar a aplicação.

## 8. Decisões Confirmadas

1. Validação **onBlur + submit manual** (sem validação a cada tecla).
2. Commits em **português do Brasil**, estilo Conventional Commits.
3. **Remover/substituir** `index.html` e `teste-01.js` legados durante o
   scaffolding do Vite (Commit #2).

## 9. Fora de Escopo (nesta fase)

- Backend / API REST.
- Autenticação e múltiplos usuários.
- Edição/remoção de clientes (apenas criação + listagem).
- Testes de UI/integração (apenas testes unitários da validação).
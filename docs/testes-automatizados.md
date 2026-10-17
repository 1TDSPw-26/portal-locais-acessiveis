# Testes automatizados

Os testes unitários e de componentes são executados com Vitest, Testing Library e
o ambiente `jsdom`. Arquivos de teste devem usar o sufixo `.test.ts` ou
`.test.tsx` dentro de `src/`.

## Comandos

```bash
npm test
npm run test:watch
npm run test:coverage
```

- `npm test` executa a suíte uma vez, como no CI.
- `npm run test:watch` mantém o Vitest ativo durante o desenvolvimento.
- `npm run test:coverage` mostra o resumo no terminal e gera o relatório HTML em
  `coverage/`.

O arquivo `src/test/setup.ts` carrega os matchers do Testing Library, limpa o DOM
e o `localStorage` após cada cenário e inclui a implementação mínima de
`HTMLDialogElement` necessária no jsdom.

Antes de abrir o Pull Request, execute também:

```bash
npm run lint
npm run build
```

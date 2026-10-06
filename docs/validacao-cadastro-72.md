# Validação do cadastro — issue #72

Acesse `/cadastro`. O formulário valida nome, categoria, endereço e descrição. Campos compostos somente por espaços são considerados vazios. Como o cadastro era provisório e não há serviço de persistência integrado, esta entrega valida os dados sem salvar locais.

## Executar

```sh
npm ci
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

## Cobertura

- Campos começam sem mensagens de erro.
- Sair de um campo vazio apresenta uma mensagem específica, ligada ao controle por `aria-describedby` e `aria-invalid`.
- Validar o formulário vazio apresenta todos os erros e foca o primeiro campo inválido.
- Espaços em branco são rejeitados; corrigir um campo remove somente seu erro e preserva os demais valores.
- Tab e Enter permitem percorrer e validar o formulário.
- Dados válidos exibem um aviso explícito de que nenhum local foi salvo.
- Editar após a validação limpa o aviso e revalida o campo.
- Chromium em 1280 × 720 e 375 × 812 verifica o fluxo e a ausência de transbordamento horizontal.

Os testes de componente são executados pelo CI existente. Os testes de navegador podem ser executados com `npm run test:e2e`. A revisão técnica e o QA independente permanecem necessários antes do merge. Não foi realizada avaliação com leitor de tela real.

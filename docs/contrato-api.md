# Contrato atual do serviço de locais

## Escopo deste documento

Este documento descreve o comportamento observado em `src/services/locaisService.ts` na branch `develop` consultada em 20/10/2026. Apesar do nome da demanda, o código consultado não implementa uma API HTTP ou um backend: implementa funções TypeScript síncronas que leem e escrevem o `localStorage` do navegador.

Não são definidos aqui endpoints, verbos HTTP, códigos de status ou envelopes de resposta inventados. A futura API remota precisa ser especificada em uma pendência técnica separada, com decisão do Tech Lead.

Fontes consultadas:
- `src/types/Local.ts`
- `src/services/locaisService.ts`
- `src/components/Dados/Locais.ts`
- `src/services/locaisService.test.ts`

Para a descrição dos campos e do estado persistido, consulte também [modelo-local.md](./modelo-local.md).

## Tipos usados pelo serviço

- `Local`: registro completo, incluindo `id`.
- `DadosLocal`: tipo exportado pelo serviço como `Omit<Local, "id">`; é usado nas assinaturas de cadastro e atualização.
- `NovoLocal`: tipo declarado em `src/types/Local.ts` como `Omit<Local, "id">`, com a mesma estrutura de `DadosLocal`, mas não usado atualmente nas assinaturas do serviço.

Essa diferença de nomes foi registrada, não corrigida nesta Issue, porque o escopo proíbe alterações no código de produção. Uma decisão futura deve definir se haverá um único tipo canônico para o payload sem ID.

## Operações implementadas

Todas as funções a seguir são síncronas e usam o armazenamento local; nenhuma faz uma chamada HTTP.

| Operação | Entrada | Saída em caso de sucesso | Ausência/erros relevantes |
|---|---|---|---|
| `listarLocais()` | Nenhuma | `Local[]` | Lança `ArmazenamentoLocaisError` se o armazenamento estiver indisponível, corrompido ou com formato inválido. |
| `buscarLocalPorId(id)` | ID numérico | `Local` ou `undefined` se não existir | ID que não seja inteiro seguro maior que zero lança `Error` com mensagem de validação. Erros de leitura do armazenamento também podem ser lançados. |
| `cadastrarLocal(dados)` | `DadosLocal`, sem ID | `Local` recém-criado com ID gerado | Rejeita dados inválidos, duplicidade, esgotamento do intervalo de IDs e erros de leitura/gravação. |
| `atualizarLocal(id, dados)` | ID existente e `DadosLocal` | `Local` atualizado, mantendo o mesmo ID | ID inválido lança `Error`; ID válido inexistente lança `LocalNaoEncontradoError`; dados inválidos, duplicidade ou falha de armazenamento lançam erro. |
| `excluirLocal(id)` | ID existente | `Local` removido | ID inválido lança `Error`; ID válido inexistente lança `LocalNaoEncontradoError`; falhas de armazenamento lançam erro. |

### Validação e duplicidade

O serviço exige que `nome`, `categoria`, `descricao` e `endereco` sejam strings não vazias após `trim()`. `acessibilidades` deve ser um array de strings não vazias; o array pode estar vazio. Os dados válidos são normalizados removendo os espaços das pontas.

A validação de ID exige um inteiro seguro maior que zero. O ID do cadastro vem de `proximoId`; o cadastro para se o próximo ID for maior ou igual a `Number.MAX_SAFE_INTEGER`.

O serviço considera um registro duplicado quando todos estes campos coincidem após remoção de espaços das pontas e conversão para minúsculas com localidade `pt-BR`: nome, categoria, endereço e descrição. O array de acessibilidades também precisa ter o mesmo comprimento e os itens correspondentes na mesma ordem depois da normalização. No cadastro, duplicidade produz a mensagem `Já existe um local com as mesmas informações.`; na atualização, o próprio ID em edição é ignorado na verificação.

### Erros e mensagens implementados

| Tipo/situação | Mensagem atual |
|---|---|
| ID inválido | `O ID deve ser um número inteiro positivo.` |
| Dados de entrada inválidos | `Informe nome, categoria, endereço e descrição válidos. Os recursos devem ser uma lista de textos não vazios.` |
| Registro duplicado | `Já existe um local com as mesmas informações.` |
| Limite de IDs atingido | `Não há mais IDs disponíveis para cadastro.` |
| ID válido, mas local ausente em atualização/exclusão | `Local com ID {id} não encontrado.` — classe `LocalNaoEncontradoError` |
| Falha ao acessar `localStorage` durante leitura | `Não foi possível acessar os locais neste navegador.` — classe `ArmazenamentoLocaisError` |
| JSON salvo corrompido | `Os dados de locais armazenados estão corrompidos.` — classe `ArmazenamentoLocaisError` |
| Formato salvo inválido | `Os dados de locais armazenados possuem formato inválido.` — classe `ArmazenamentoLocaisError` |
| Falha ao gravar no `localStorage` | `Não foi possível salvar os locais neste navegador.` — classe `ArmazenamentoLocaisError` |

`buscarLocalPorId` não lança `LocalNaoEncontradoError` para um ID válido que não exista: retorna `undefined`. Isso difere do comportamento de atualização e exclusão.

## Formato persistido

A chave atual de armazenamento é `portal-locais-acessiveis:locais:v1`. Seu valor é um JSON que representa um objeto com:

- `proximoId: number`
- `locais: Local[]`

Quando a chave não existe, o serviço usa os dados iniciais de `src/components/Dados/Locais.ts` e calcula o próximo ID como o maior ID inicial mais um. Essa leitura não persiste automaticamente a lista inicial; uma mutação bem-sucedida grava o objeto atualizado. O armazenamento é local ao navegador/origem, não compartilhado entre usuários ou dispositivos, e não equivale a uma base de dados de servidor.

Na leitura de dados salvos, o serviço valida o tipo do objeto, `proximoId`, cada `Local`, IDs positivos e únicos e a regra de que cada ID é menor que `proximoId`. JSON corrompido e formato inválido geram `ArmazenamentoLocaisError`.

## Integração com as funcionalidades do portal

- **Cadastro — Issue #73:** utiliza `cadastrarLocal`; entrada sem `id`, saída com `id` gerado.
- **Edição — Issue #75 / PR #111:** usa `buscarLocalPorId` e `atualizarLocal`; a atualização mantém o ID.
- **Testes — Issue #84 / PR #120:** a suíte do serviço deve validar as operações e cenários de erro. No momento desta análise, o PR #120 ainda não estava integrado a `develop`; sua cobertura adicional foi considerada uma dependência em revisão.
- **Favoritos — Issue #127:** favoritos não fazem parte de `Local` nem de `locaisService` no `develop` consultado. A Issue #127 propõe um armazenamento separado; seu formato ainda não deve ser inferido a partir da chave de locais.

## Auditoria de divergências e dependências

1. **`NovoLocal` e `DadosLocal`:** ambos têm a mesma estrutura sem ID, mas o serviço usa `DadosLocal` e declara esse alias separadamente. A documentação registra a divergência sem modificar código fora do escopo.
2. **API HTTP ausente:** não há endpoints nem contrato de rede implementados no serviço. Métodos, URLs, payloads HTTP, status codes, autenticação e formato de erro de servidor permanecem pendentes de decisão; nenhuma rota foi inventada para esta documentação.
3. **PRs concorrentes consultados em 20/10/2026:** PR [#111](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) altera `src/services/locaisService.ts` e implementa a experiência de edição; PR [#120](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) amplia os testes do mesmo serviço. Ambos estavam abertos durante a análise. Não há sobreposição direta de arquivos com esta entrega, pois os arquivos desta Issue são novos. Esta documentação registra o estado de `develop`; após a integração desses PRs, o contrato deve ser reconferido caso o comportamento do serviço mude.
4. **Favoritos pendentes:** a Issue [#127](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/127) descreve uma funcionalidade ainda não presente nos arquivos verificados de `develop`. Sua chave e seu formato de armazenamento precisam ser documentados pela implementação correspondente, não presumidos aqui.

## Proposta futura, ainda não implementada

A substituição de `localStorage` por uma API HTTP exige decisão técnica separada sobre recursos/rotas, métodos, payloads de entrada e saída, tratamento de erros e respectivos status HTTP, paginação/filtros, autenticação/autorização, persistência e migração dos dados locais. Esta seção registra os assuntos em aberto; não especifica endpoints nem promete comportamento que o código atual não fornece.

## Testes e cobertura observada

No `develop` consultado, `src/services/locaisService.test.ts` cobre a lista inicial, a persistência da exclusão, a exclusão de ID inexistente e armazenamento JSON corrompido. A branch do PR #120 contém cobertura adicional para busca, cadastro, validação, atualização e exclusão; esse PR permanecia aberto no momento da análise.

Os comandos de validação do projeto são `npm run lint`, `npm run build` e `npm run test --if-present`. Os resultados desses comandos devem ser registrados pelo CI/PR; esta documentação não declara testes locais executados.

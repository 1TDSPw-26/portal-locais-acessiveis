# Controle de integração CP3

**Issue responsável:** [#133 — Organizar a integração das pendências e revisar os Pull Requests](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/133)  
**Data da consulta-base:** 26/10/2026  
**Branch desta documentação:** `feature/133-controle-integracao-cp3`

> Este documento é um plano de coordenação, não uma autorização de merge. Estado de CI, aprovações, conversas, conflito de merge e milestone podem mudar. Confira novamente o GitHub antes de cada integração.

## 1. Regra de classificação e autorização para alterações

A classificação abaixo considera a **milestone da Issue mencionada no corpo do PR**. Na consulta, todos os 21 PRs listados estavam abertos e referenciavam uma Issue. Uma Issue na milestone 3 é tratada como CP3; Issue sem milestone ou na milestone 2 é tratada como fora da CP3.

- **FORA DA CP3 — QA/Tech Lead PODE corrigir:** os PRs **#111, #114, #116, #119, #120, #121 e #122**. As alterações devem ocorrer na branch do próprio PR, com coordenação do responsável, justificativa no PR, escopo preservado e novos testes/revisão. Esta marcação não autoriza push em `develop`, bypass de revisão ou merge automático.
- **CP3 — QA/Tech Lead NÃO PODE alterar código diretamente:** os PRs **#135, #136, #145, #162, #164, #165, #166, #167, #168, #169, #170, #171, #172 e #173**. QA e Tech Lead podem revisar, produzir evidências, comentar e solicitar mudanças; as correções na branch devem ser feitas pelos autores/desenvolvedores responsáveis.

Esta regra evita que uma revisão altere silenciosamente a entrega pela qual outra pessoa responde. Se a milestone de uma Issue for alterada no GitHub, atualize esta classificação antes de qualquer edição.

## 2. Ordem de integração proposta

A ordem busca resolver primeiro a base de testes e os PRs fora da CP3 que servem de base, depois integrar as alterações isoladas e finalmente os grupos que disputam arquivos compartilhados. PRs independentes podem ser revisados em paralelo, mas a integração em `develop` deve ser controlada e revalidada após cada merge.

| Ordem | PR / Issue vinculada | Classificação | Dependência, risco ou ação obrigatória |
|---:|---|---|---|
| 1 | [#121 — Vitest](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/121) · [Issue #85](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/85) | **FORA DA CP3 — EDITÁVEL** | Base da execução de testes. Confirmar `npm test`, cobertura, lint e build no estado resultante. As automações auxiliares do Project tiveram falhas/cancelamentos na consulta; distingui-las do check `lint-build-test` e confirmar os checks obrigatórios atuais. |
| 2 | [#122 — dados mockados](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/122) · [Issue #59](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/59) | **FORA DA CP3 — EDITÁVEL** | Definir a fonte canônica dos mocks e do campo `avaliacao` antes dos testes de serviço. A Issue #59 não tem milestone CP3 (e está fechada). |
| 3 | [#120 — testes do serviço](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) · [Issue #84](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/84) | **FORA DA CP3 — EDITÁVEL** | Requer o Vitest do #121 e o serviço que já entrou por #117. **Resolver antes do merge** a expectativa divergente de dado: os testes citam ID 1 como “Biblioteca Municipal”, enquanto #122 substitui o local de ID 1 por “Museu Catavento”. Confirmar o dado correto e adaptar o teste ou mock de forma intencional. |
| 4 | [#116 — validação do cadastro](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/116) · [Issue #71](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/71) | **FORA DA CP3 — EDITÁVEL** | A Issue está fechada, mas o PR segue aberto. Verificar estado funcional e evidências. Integração deve preceder #172 (responsividade de Cadastro); #119 também modifica `Cadastro.tsx` e fica para o final. |
| 5 | [#114 — busca por nome](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/114) · [Issue #63](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/63) | **FORA DA CP3 — EDITÁVEL (milestone 2)** | Estabelecer a busca antes de integrar mudanças CP3 de nova tentativa, URL, limpeza e responsividade da listagem. A Issue vinculada está na milestone 2, não na CP3. |
| 6 | [#111 — editar local](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) · [Issue #75](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/75) | **FORA DA CP3 — EDITÁVEL** | Resolver a rota compartilhada em `src/main.tsx` antes de #145 (favoritos) e #119 (títulos). Verificar a limitação documentada sobre persistência após recarregar a página e confirmar se isso atende à Issue. |
| 7 | [#162 — normalização de dados de formulário](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/162) · [Issue #157](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/157) | **CP3 — NÃO ALTERAR** | Utilitário e testes isolados. Revisar pureza, imutabilidade e compatibilidade; se houver mudança de código, solicitar ao autor. |
| 8 | [#164 — notificações temporárias](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) · [Issue #150](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/150) | **CP3 — NÃO ALTERAR** | Componente isolado. Conferir testes de temporizador, limpeza do timer e fechamento manual. Foi observada falha em automação auxiliar do Project; verificar o check obrigatório correto e o estado atual. |
| 9 | [#165 — testes do ConfirmDialog](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) · [Issue #148](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/148) | **CP3 — NÃO ALTERAR** | Revisar testes unitários/E2E, teclado, Escape e foco antes do E2E de exclusão do #166. |
| 10 | [#166 — testes E2E de exclusão](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) · [Issue #149](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/149) | **CP3 — NÃO ALTERAR** | O PR deixa desmarcado o critério de isolamento/restauração dos dados e também algumas verificações do autor. Validar fixture, execução real e limpeza de dados; não considerar apenas os checks verdes. |
| 11 | [#167 — resumo acessível de filtros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) · [Issue #153](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/153) | **CP3 — NÃO ALTERAR** | Componente isolado; a integração na página foi declarada fora do escopo deste PR. Avaliar somente os critérios do componente e não presumir que o resumo já está integrado em Locais. |
| 12 | [#170 — resumo acessível de erros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) · [Issue #158](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/158) | **CP3 — NÃO ALTERAR** | Componente isolado, ainda sem integração em formulário. A verificação de teclado/foco está desmarcada; solicitar evidência ou validação manual antes da decisão. |
| 13 | [#168 — nova tentativa no carregamento](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) · [Issue #130](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/130) | **CP3 — NÃO ALTERAR** | Modifica `useLocais.ts`, `EstadoErro.tsx` e `Locais.tsx`. Integrar antes dos outros PRs de listagem. O critério de preservação de busca/filtros está desmarcado; confirmar com testes/evidências antes do merge. |
| 14 | [#169 — preservar busca/filtros na URL](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/169) · [Issue #123](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/123) | **CP3 — NÃO ALTERAR** | Modifica `Locais.tsx`, `filtros.ts` e testes; integrar antes do #135 para que a limpeza também sincronize a URL. **Revisar `src/services/apagar.txt`**, que aparece entre os arquivos alterados mas não está explicado no resumo: pedir justificativa ou remoção ao autor antes de aprovar. |
| 15 | [#135 — limpar busca e filtros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/135) · [Issue #125](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/125) | **CP3 — NÃO ALTERAR** | Compartilha `Locais.tsx` e testes com #168, #169, #173 e #119. Integrar depois de #169 e retestar URL, histórico, foco e mensagem de status. |
| 16 | [#173 — responsividade da listagem](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/173) · [Issue #139](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/139) | **CP3 — NÃO ALTERAR** | Deixar para depois das alterações funcionais em Locais (#114, #168, #169 e #135). Retestar em larguras pequenas, teclado e regressão dos filtros/URL após a combinação final. |
| 17 | [#172 — responsividade do cadastro](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/172) · [Issue #138](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/138) | **CP3 — NÃO ALTERAR** | Integrar após #116. Compartilha `Cadastro.tsx` com #116 e #119. Após merge, retestar erros, rótulos, foco e layout em mobile/desktop. |
| 18 | [#136 — testes da página de detalhes](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/136) · [Issue #132](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/132) | **CP3 — NÃO ALTERAR** | A dependência técnica #112 já está merged em `develop`. Este PR altera `LocalDetalhe.tsx` e `LocalDetalhe.test.tsx`; integrar antes de #171. |
| 19 | [#171 — compartilhar link do local](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/171) · [Issue #126](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/126) | **CP3 — NÃO ALTERAR** | Modifica os mesmos arquivos de detalhes/testes que #136. Reconciliar testes após #136 e validar API nativa, fallback de cópia, permissão negada e teclado. O compartilhamento nativo real não foi testado em dispositivo físico segundo o PR. |
| 20 | [#145 — página de favoritos](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) · [Issue #128](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/128) | **CP3 — NÃO ALTERAR** | **Bloqueio de coordenação:** a Issue #127 está aberta na CP3 e define `useFavoritos.ts`/`favoritosStorage.ts`, arquivos que #145 também cria. O responsável deve reconciliar contrato e responsabilidade antes do merge; se surgir PR para #127, integrar a base acordada primeiro. #145 também altera `.github/workflows/ci.yml`: revisar se é estritamente necessário, mas QA/Tech Lead não deve editar a branch CP3. Esta tarefa documental não altera o workflow. |
| 21 | [#119 — títulos por rota](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/119) · [Issue #86](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/86) | **FORA DA CP3 — EDITÁVEL** | Deixar por último: altera várias páginas, incluindo `Cadastro.tsx`, `Locais.tsx` e `LocalDetalhe.tsx`. Na consulta, GitHub retornou `mergeable: false`; atualizar a branch e resolver conflitos só após integrar os PRs anteriores. Refazer lint/build/testes e solicitar revisão após qualquer resolução. |

## 3. Conflitos e decisões que bloqueiam merge

1. **#122 × #120 — dados de teste:** antes de aprovar os testes de serviço, confirmar qual registro é canônico para o ID 1 e alinhar fixtures/assertions. Não escolher um dos nomes por suposição.
2. **#168 — critério pendente:** a preservação da busca/filtros durante retry aparece desmarcada; validar o comportamento combinado com #169.
3. **#169 — arquivo extra:** conferir o conteúdo e a necessidade de `src/services/apagar.txt`. Não aprovar arquivos fora do escopo sem justificativa.
4. **#145 × #127 — contrato de favoritos:** a Issue #127 permanece aberta e CP3. Conciliar os arquivos compartilhados `useFavoritos.ts` e `favoritosStorage.ts` com o responsável antes de integrar #145.
5. **#145 — workflow CI:** o arquivo `.github/workflows/ci.yml` consta no diff do PR. Não editar o workflow no trabalho da Issue #133; solicitar ao autor justificativa e ajuste se a mudança não for indispensável.
6. **#119 — merge bloqueado no estado consultado:** o GitHub retornou `mergeable: false`. Só considerar depois das alterações concorrentes, atualização da branch e nova validação.
7. **#166 e #170 — critérios/evidências incompletos:** confirmar os itens desmarcados com execução real, evidências e decisão explícita do QA antes de aprovar.

## 4. Verificações obrigatórias antes de cada merge

- [ ] Milestone da Issue vinculada confirmada; classificação de autorização ainda válida.
- [ ] PR aponta para `develop`, tem `Closes #N` e permanece dentro do escopo.
- [ ] Dependências já estão integradas e o diff continua coerente com o estado atual de `develop`.
- [ ] CI obrigatório, especialmente `lint-build-test`, está verde para o commit mais recente.
- [ ] Lint, build e testes relevantes executados depois da última atualização/resolução de conflito.
- [ ] Critérios de aceite, acessibilidade, responsividade e evidências conferidos pelo QA.
- [ ] Revisão técnica independente concluída; conversas resolvidas; nenhuma mudança posterior sem nova revisão.
- [ ] Arquivos extras e riscos/limitações documentados; bloqueios com responsável e próximo passo.
- [ ] Somente então o Tech Lead autorizado realiza o merge via GitHub, usando o fluxo definido em [Tutorial 4 — revisão e merge](tutoriais/04-tech-lead-revisao-merge.md).

### Estado observado na consulta-base

- As execuções consultadas do workflow de qualidade `lint-build-test` estavam verdes para os PRs listados. Isso não substitui a conferência da execução mais recente, nem demonstra que a combinação final de todos os PRs foi testada.
- Foram encontrados problemas/cancelamentos em automações auxiliares do GitHub Project em alguns PRs (#121, #164 e #171); confirmar se algum deles corresponde a um check obrigatório antes de decidir.
- A busca por issues abertas usando literalmente as labels `P0` e `P1` não retornou resultados. Isso não comprova que não existam prioridades críticas no Project: confirmar se o repositório usa outra convenção/campo de prioridade.
- A lista de PRs é um snapshot e deve ser atualizada caso novos PRs abram, sejam merged/fechados ou mudem de milestone.


## 5. Controle recorrente de status, reviews e alterações

Esta seção registra o **estado operacional dos PRs**, separado da ordem proposta na seção 2. A ordem responde “qual vem antes”; esta seção responde “em que estado está cada PR, que review falta e se o código mudou desde a última checagem”.

### 5.1. Regras para cada checagem

Em cada rodada de acompanhamento:

1. Consulte o PR no GitHub e confirme se está aberto, fechado ou integrado.
2. Compare o `HEAD SHA` atual com o SHA registrado na rodada anterior. **SHA diferente = houve novo commit na branch**; registre o SHA anterior e o atual, e revise se a aprovação e o QA continuam válidos para o novo conteúdo.
3. Confira a review formal mais recente em **Reviews**. Registre autor, estado (`APPROVED`, `CHANGES_REQUESTED`, `COMMENTED`) e data. Não trate uma aprovação antiga como aprovação automática de commits posteriores.
4. Confirme que a revisão técnica foi feita por revisor autorizado e não pelo autor do próprio PR. Uma review formal `APPROVED` é evidência de revisão técnica, mas não substitui a decisão de QA.
5. Confira separadamente a seção **Decisão do QA** no PR e/ou a Issue de teste vinculada: `Aprovado`, `Aprovado com ressalva`, `Reprovado` ou `Bloqueado`. Registre o link da evidência/Issue do teste.
6. Confira conversas de revisão não resolvidas, comentários na aba **Conversation**, solicitações de mudança e revisões pendentes. A consulta-base não retornou threads de revisão inline para os PRs; isso **não elimina a necessidade de conferir a conversa geral**.
7. Confira o workflow **Verificação de qualidade / lint-build-test** associado ao HEAD atual. Registre `Passou`, `Falhou`, `Em execução` ou `Não localizado`, de preferência com link/número da execução. Não use resultado de um SHA antigo.
8. Só altere o status de integração para **Pronto para merge** quando dependências e bloqueios estiverem resolvidos, o HEAD atual tiver review técnica válida, QA estiver aprovado, CI estiver verde e as conversas estiverem resolvidas. Após o merge, registre data e SHA do merge em vez de deixar o PR como pendente.

### 5.2. Valores padronizados de status

| Campo | Valores sugeridos | Quando usar |
|---|---|---|
| Status de integração | `Pendente`, `Em revisão`, `Bloqueado`, `Pronto para merge`, `Integrado`, `Fechado sem merge` | `Integrado` somente depois de confirmar o merge em `develop`. |
| Review técnica | `Faltando`, `APPROVED`, `CHANGES_REQUESTED`, `COMMENTED`, `Re-review necessária` | Use `Re-review necessária` se o HEAD mudou depois da aprovação ou depois de uma solicitação de mudanças. |
| QA | `Não confirmado`, `Pendente`, `Aprovado`, `Aprovado com ressalva`, `Reprovado`, `Bloqueado` | Só marque como aprovado após encontrar a decisão e a evidência no PR/Issue de teste. |
| Mudou desde a última checagem? | `Sim`, `Não`, `Primeira comparação` | Compare o SHA atual com o último SHA salvo. |
| CI do HEAD atual | `Passou`, `Falhou`, `Em execução`, `Não localizado` | Sempre conferir a execução associada ao commit atual. |
| Conversas | número de abertas + ação | Não marcar como resolvido apenas para liberar merge; a correção ou decisão precisa estar registrada. |

### 5.3. Linha de base observada em 26/10/2026

Os SHAs abaixo são a **primeira linha de base para comparações futuras**, não o SHA necessariamente revisado por cada aprovador. A consulta de reviews não expôs consistentemente o commit exato coberto por cada aprovação; antes do merge, confirme no GitHub se a review abrange o HEAD atual.

Todos os 21 PRs estavam **abertos e não integrados** na consulta. O check de qualidade `lint-build-test` retornou sucesso no HEAD consultado para cada PR listado abaixo. Isso não equivale a aprovação de QA nem valida a integração conjunta dos PRs.

| PR | Status de integração em 26/10 | Review técnica formal mais recente encontrada | QA | CI de qualidade no HEAD consultado | HEAD SHA (base) | Última atualização do PR (UTC) |
|---|---|---|---|---|---|---|
| [#111](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) | **Pendente — re-review necessária** | `CHANGES_REQUESTED` (17/10); PR atualizado em 21/10 | Não confirmado | Passou (#163) | `46e979f` | 2026-10-21T22:31:01Z |
| [#114](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/114) | Pendente | `APPROVED` (15/10) | Não confirmado | Passou (#129) | `1e23ff0` | 2026-10-15T01:31:12Z |
| [#116](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/116) | Pendente | `APPROVED` (15/10) | Não confirmado | Passou (#135) | `2b90a4b` | 2026-10-15T21:37:26Z |
| [#119](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/119) | **Bloqueado — GitHub retornou `mergeable: false`** | `APPROVED` (19/10); exigir nova conferência após resolver conflitos | Não confirmado | Passou (#149) | `d75c46a` | 2026-10-19T22:19:49Z |
| [#120](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) | **Bloqueado — alinhar dado do ID 1 com #122** | `APPROVED` (15/10); confirmar se cobre o HEAD atual após a decisão sobre os mocks | Não confirmado | Passou (#122) | `7228688` | 2026-10-15T21:38:10Z |
| [#121](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/121) | Pendente | `APPROVED` (15/10) | Não confirmado | Passou (#117) | `97c19d5` | 2026-10-15T01:33:23Z |
| [#122](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/122) | Pendente — precede a decisão final do #120 | `APPROVED` (19/10) | Não confirmado | Passou (#150) | `87da7d7` | 2026-10-19T22:19:32Z |
| [#135](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/135) | Pendente | `APPROVED` (19/10) | Não confirmado | Passou (#153) | `19f50bb` | 2026-10-19T22:19:15Z |
| [#136](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/136) | Pendente — integrar antes do #171 | `APPROVED` (19/10) | Não confirmado | Passou (#154) | `30b0e13` | 2026-10-19T22:19:01Z |
| [#145](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) | **Bloqueado — conciliar contrato com Issue #127** | **Faltando** | Não confirmado | Passou (#157) | `9d5f155` | 2026-10-19T23:28:38Z |
| [#162](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/162) | Pendente | **Faltando** | Não confirmado | Passou (#164) | `dda3beb` | 2026-10-21T00:31:42Z |
| [#164](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) | Pendente | **Faltando** | Não confirmado | Passou (#166) | `7a43d24` | 2026-10-21T23:22:40Z |
| [#165](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) | Pendente | **Faltando** | Não confirmado | Passou (#167) | `65b0c73` | 2026-10-21T23:21:25Z |
| [#166](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) | Pendente — confirmar isolamento/restauração dos dados E2E | **Faltando** | Não confirmado | Passou (#168) | `fbe619c` | 2026-10-23T01:25:55Z |
| [#167](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) | Pendente | **Faltando** | Não confirmado | Passou (#169) | `c37f698` | 2026-10-23T19:54:03Z |
| [#168](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) | Pendente — confirmar preservação de busca/filtros no retry | **Faltando** | Não confirmado | Passou (#170) | `aa55c9e` | 2026-10-23T22:26:18Z |
| [#169](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/169) | Pendente — justificar/remover `src/services/apagar.txt` | **Faltando** | Não confirmado | Passou (#171) | `6adc9ce` | 2026-10-24T00:37:03Z |
| [#170](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) | Pendente — validar teclado e foco | **Faltando** | Não confirmado | Passou (#172) | `244db01` | 2026-10-24T02:12:37Z |
| [#171](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/171) | Pendente — integrar após #136 | **Faltando** | Não confirmado | Passou (#174) | `e6a4c11` | 2026-10-24T21:47:20Z |
| [#172](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/172) | Pendente | **Faltando** | Não confirmado | Passou (#175) | `dc235e5` | 2026-10-26T02:53:44Z |
| [#173](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/173) | Pendente | **Faltando** | Não confirmado | Passou (#176) | `231f22c` | 2026-10-26T18:11:55Z |

#### Resumo de reviews faltantes na linha de base

- **12 PRs sem review formal registrada na consulta:** #145, #162, #164, #165, #166, #167, #168, #169, #170, #171, #172 e #173.
- **1 PR com solicitação de mudanças e re-review pendente:** #111.
- **8 PRs com review formal `APPROVED` registrada:** #114, #116, #119, #120, #121, #122, #135 e #136. Isso não elimina os bloqueios listados acima, não prova aprovação de QA e não garante que o HEAD atual foi o commit revisado.
- **QA:** a decisão de QA não foi confirmada para nenhum PR nesta checagem; verificar a seção `Decisão do QA` e a Issue de teste antes de marcar qualquer PR como pronto para merge.
- **Conversas inline:** a consulta de threads inline não retornou threads para estes PRs. Ainda assim, revisar a aba Conversation de cada PR e confirmar que todas as solicitações de mudança e comentários relevantes foram tratados.
- **CI:** a execução de qualidade associada ao HEAD consultado passou para todos os 21 PRs. Uma nova atualização de código exige conferir novamente o CI e a validade das reviews.

## 6. Formulário para a próxima rodada de checagem

Preencha este bloco sempre que fizer a verificação periódica. Use a tabela da seção 5.3 como comparação anterior, atualize os status atuais e registre abaixo somente as diferenças e decisões desta rodada. **Não apague o histórico anterior**: mantenha os registros de rodadas para saber quando um SHA mudou, uma review foi concedida ou um PR foi integrado.

### Rodada de checagem — [AAAA-MM-DD HH:MM BRT]

- **Responsável pela checagem:** [preencher]
- **Data/hora da checagem:** [preencher em horário de Brasília]
- **SHA atual de `develop`:** [preencher]
- **Quantidade de PRs abertos nesta rodada:** [preencher]
- **PRs integrados desde a checagem anterior:** [número + data + SHA do merge; ou “Nenhum”]
- **PRs fechados sem merge:** [número + motivo; ou “Nenhum”]
- **PRs com novo commit (SHA anterior → SHA atual):** [listar; ou “Nenhum”]
- **Reviews técnicas recebidas desde a última rodada:** [PR + revisor + decisão + data]
- **Reviews técnicas ainda faltantes:** [listar PRs]
- **PRs com `CHANGES_REQUESTED` ou re-review necessária:** [listar + ação esperada]
- **Decisões de QA recebidas:** [PR/Issue de teste + decisão + evidência]
- **Decisões de QA ainda faltantes:** [listar PRs]
- **Conversas/comentários pendentes:** [PR + resumo + responsável]
- **CI falhou, está em execução ou não foi localizado:** [PR + SHA + link da execução]
- **Bloqueios removidos nesta rodada:** [PR + decisão tomada]
- **Bloqueios que continuam abertos:** [PR + responsável + próximo passo + prazo]
- **Mudanças na ordem de integração:** [descrever o motivo; ou “Nenhuma”]

#### Diferenças por PR nesta rodada

Copie uma linha para cada PR aberto ou alterado; não é necessário repetir linhas de PRs fechados e sem alteração quando a última checagem ainda é válida.

| PR | Status atual | HEAD SHA atual | SHA mudou? | Review cobre o HEAD atual? | Review técnica | QA | Threads/comentários pendentes | CI do HEAD | Próxima ação / responsável |
|---|---|---|---|---|---|---|---|---|---|
| #NNN | [Pendente/Em revisão/Bloqueado/Pronto para merge/Integrado/Fechado sem merge] | [SHA] | [Sim/Não/Primeira comparação] | [Sim/Não/Confirmar] | [Faltando/APPROVED/CHANGES_REQUESTED/COMMENTED/Re-review necessária] | [Não confirmado/Aprovado/Aprovado com ressalva/Reprovado/Bloqueado] | [0 ou descrição] | [Passou/Falhou/Em execução/Não localizado] | [Ação + responsável + prazo] |

#### Critério para encerrar a checagem

- [ ] Todos os PRs abertos foram revisados quanto ao estado, milestone e SHA atual.
- [ ] Os novos commits foram identificados por comparação de SHA.
- [ ] Para cada novo commit, foi verificado se a review técnica e a aprovação de QA ainda cobrem o conteúdo atual.
- [ ] Reviews faltantes, decisões de QA, comentários e conversas pendentes foram listados.
- [ ] CI foi conferido no HEAD atual dos PRs candidatos a merge.
- [ ] Bloqueios têm próximo passo e responsável.
- [ ] A ordem sugerida foi preservada ou a justificativa da alteração foi registrada.

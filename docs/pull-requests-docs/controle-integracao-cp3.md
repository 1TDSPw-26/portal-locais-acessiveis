# Controle de integração CP3

**Issue responsável:** [#133 — Organizar a integração das pendências e revisar os Pull Requests](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/133)  
**Data da consulta-base:** 28/10/2026  
**Branch desta documentação:** `feature/133-controle-integracao-cp3`

> Este documento é um plano de coordenação, não uma autorização de merge. Estado de CI, aprovações, conversas, conflito de merge e milestone podem mudar. Confira novamente o GitHub antes de cada integração.

## 1. Regra de classificação e autorização para alterações

A consulta de **28/10/2026** encontrou **25 Pull Requests abertos e ainda não integrados**: 24 PRs de entrega e o PR **#174**, que contém esta documentação de coordenação. Os 24 PRs de entrega se dividem em **7 fora da CP3** e **17 da CP3**. O #174 entra na contagem geral, mas fica fora da ordem funcional da seção 2 para evitar que o documento de coordenação seja tratado como uma entrega de produto.

A classificação usa a **milestone da Issue vinculada no corpo do PR**. Issue na milestone 3 é tratada como CP3; Issue sem milestone ou na milestone 2 é tratada como fora da CP3. As milestones dos novos PRs #175, #176 e #177 foram conferidas na consulta atual.

- **FORA DA CP3 — QA/Tech Lead PODE corrigir com coordenação:** **#111, #114, #116, #119, #120, #121 e #122**. Mudanças devem ser feitas na branch do próprio PR, com alinhamento com o autor, justificativa explícita, escopo preservado e nova execução dos testes/revisão. Isso não autoriza push em `develop`, bypass de revisão ou merge automático.
- **CP3 — QA/Tech Lead NÃO DEVE alterar código de implementação diretamente:** **#135, #136, #145, #162, #164, #165, #166, #167, #168, #169, #170, #171, #172, #173, #175, #176 e #177**. QA e Tech Lead podem revisar, reunir evidências, comentar e solicitar mudanças; o autor/desenvolvedor responsável deve corrigir o código na própria branch.
- **Coordenação/documentação CP3:** **#174**, vinculado à Issue #133. A atualização deste documento deve ocorrer na branch própria `feature/133-controle-integracao-cp3`; a exceção documental não permite alterar código de implementação nas branches dos demais PRs.

Esta regra preserva a autoria e evita alterações silenciosas em entregas de outras pessoas. Se a milestone de uma Issue mudar no GitHub, atualize a classificação antes de qualquer intervenção. A condição `mergeable: true` significa apenas que o GitHub não reporta conflito de merge naquele momento; não significa que o PR esteja aprovado ou pronto para integrar.

## 2. Ordem de integração proposta

A ordem proposta prioriza as bases de teste e os PRs fora da CP3, e depois separa componentes isolados dos conjuntos de arquivos compartilhados. Ela considera também que uma alteração transversal pequena e já sincronizada com `develop` pode ser melhor integrada **antes** de PRs mais extensos que mudam os mesmos arquivos, para que estes incorporem o comportamento integrado. A posição é uma recomendação de coordenação, não uma dependência técnica absoluta. PRs independentes podem ser revisados em paralelo, mas a integração em `develop` deve ser controlada e revalidada após cada merge.

| Ordem | PR / Issue vinculada | Classificação | Dependência, risco ou ação obrigatória |
|---:|---|---|---|
| 1 | [#121 — configurar Vitest](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/121) · [Issue #85](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/85) | **FORA DA CP3 — EDITÁVEL** | Base da execução de testes. Review formal aprovada e CI de qualidade registrado como verde; confirmar novamente `npm test`, lint e build no estado combinado antes de integrar. |
| 2 | [#122 — dados mockados](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/122) · [Issue #59](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/59) | **FORA DA CP3 — EDITÁVEL** | A Issue #59 está fechada e sem milestone. Definir a fonte canônica dos mocks e do campo `avaliacao` em conjunto com #120; a review está aprovada, mas o desacordo sobre o registro ID 1 permanece como bloqueio para a integração combinada. |
| 3 | [#120 — testes do serviço de locais](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) · [Issue #84](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/84) | **FORA DA CP3 — EDITÁVEL** | Depende do Vitest (#121) e do serviço já integrado por #117. **Não integrar antes de resolver a divergência do ID 1:** os testes esperam “Biblioteca Municipal”, enquanto #122 usa “Museu Catavento”. Confirmar o dado correto e ajustar mock/assertion intencionalmente. |
| 4 | [#116 — validação do cadastro](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/116) · [Issue #71](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/71) | **FORA DA CP3 — EDITÁVEL** | A Issue está fechada, mas o PR segue aberto. Confirmar comportamento e evidências de validação; integrar antes de #172. #119 também toca a área de cadastro, portanto é preciso retestar o fluxo combinado. |
| 5 | [#114 — busca por nome](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/114) · [Issue #63](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/63) | **FORA DA CP3 — EDITÁVEL (milestone 2)** | Estabelecer a busca por nome antes de integrar alterações CP3 de retry, sincronização de URL, limpeza de filtros e responsividade da listagem. Review formal aprovada; QA ainda precisa ser confirmado. |
| 6 | [#111 — editar local](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) · [Issue #75](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/75) | **FORA DA CP3 — EDITÁVEL** | A review mais recente está em `CHANGES_REQUESTED` e houve atualização posterior; pedir nova review. Resolver a rota compartilhada em `src/main.tsx` e verificar a limitação de persistência após recarregar antes de integrar. |
| 7 | [#175 — utilitários reutilizáveis para testes E2E](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/175) · [Issue #147](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/147) | **CP3 — NÃO ALTERAR** | PR de fixtures/helpers Playwright, sem alteração aparente de código de produção. Revisar os quatro arquivos do diff, confirmar que `tests/utilitarios.spec.ts` está justificado pelo critério de demonstração dos helpers e integrar antes de #166 caso este passe a consumi-los. Ainda não há review formal. |
| 8 | [#162 — normalização de dados de formulário](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/162) · [Issue #157](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/157) | **CP3 — NÃO ALTERAR** | **Bloqueado por `CHANGES_REQUESTED`:** arrays normalizam apenas strings, deixando objetos/arrays aninhados sem processamento, apesar da promessa de recursividade. O autor deve corrigir a normalização dos elementos e incluir testes para objeto dentro de array; CI verde não elimina este bloqueio. |
| 9 | [#164 — notificações temporárias](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) · [Issue #150](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/150) | **CP3 — NÃO ALTERAR** | Componente isolado. Fazer review formal e conferir timers, limpeza, fechamento manual, acessibilidade e estados de teste antes de aprovar. |
| 10 | [#165 — testes do ConfirmDialog](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) · [Issue #148](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/148) | **CP3 — NÃO ALTERAR** | Revisar testes unitários/E2E, teclado, Escape e foco. Serve como base de cobertura para o fluxo de exclusão em #166. |
| 11 | [#166 — testes E2E de exclusão](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) · [Issue #149](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/149) | **CP3 — NÃO ALTERAR** | Verificar isolamento e restauração de dados persistidos, fixture determinística e limpeza depois dos testes. O checklist/evidência do PR não permite concluir que esses critérios foram comprovados; não aprovar apenas com base no CI. |
| 12 | [#167 — resumo acessível de filtros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) · [Issue #153](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/153) | **CP3 — NÃO ALTERAR** | Componente isolado; a integração do resumo na página foi declarada fora do escopo deste PR. Rever o componente e seus testes sem presumir que já está conectado à página Locais. |
| 13 | [#170 — resumo acessível de erros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) · [Issue #158](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/158) | **CP3 — NÃO ALTERAR** | Componente isolado e ainda não integrado ao formulário. Confirmar teclado, foco, navegação para campos inválidos e evidência de acessibilidade; não há review formal registrada. |
| 14 | [#177 — fallback para armazenamento indisponível](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/177) · [Issue #152](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/152) | **CP3 — NÃO ALTERAR** | Componente isolado para armazenamento indisponível, corrompido ou sem permissão. Revisar estados, mensagens, teclado e semântica acessível; não presumir que o componente já foi ligado ao serviço ou à listagem. |
| 15 | [#119 — títulos por rota](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/119) · [Issue #86](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/86) | **FORA DA CP3 — EDITÁVEL** | GitHub reporta `mergeable: true` e a branch está sincronizada com `develop`, mas o PR **não está pronto para merge**: Home real ainda renderiza a rota antiga; `package-lock.json` contém alterações transitivas não justificadas; testes não cobrem a rota Home real, o título dinâmico do detalhe e a afirmação de um único `h1` por rota. Aprovações anteriores estão `DISMISSED`; exigir nova review e QA. |
| 16 | [#168 — nova tentativa no carregamento](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) · [Issue #130](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/130) | **CP3 — NÃO ALTERAR** | Altera `useLocais.ts`, `EstadoErro.tsx` e `Locais.tsx`. Validar retry sem perder busca/filtros e coordenar o teste combinado com #169 e #176. |
| 17 | [#169 — preservar busca/filtros na URL](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/169) · [Issue #123](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/123) | **CP3 — NÃO ALTERAR** | Altera `Locais.tsx`, filtros e testes; integrar antes de #135 para que limpar filtros também sincronize a URL. **Pedir justificativa ou remoção de `src/services/apagar.txt`** antes de aprovar. |
| 18 | [#135 — limpar busca e filtros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/135) · [Issue #125](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/125) | **CP3 — NÃO ALTERAR** | Compartilha `Locais.tsx` e testes com #168, #169, #176 e #173. Integrar depois de #169; validar URL, histórico, foco e mensagem de status na sequência combinada. |
| 19 | [#176 — estado vazio para busca sem resultado](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/176) · [Issue #137](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/137) | **CP3 — NÃO ALTERAR** | Compartilha `Locais.tsx` com #168, #169, #135 e #173; por isso deve vir após os comportamentos de busca/URL/limpeza e antes da responsividade final. **O diff atual também muda `package-lock.json`**: justificar essas alterações fora do escopo ou removê-las antes da aprovação. |
| 20 | [#173 — responsividade da listagem](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/173) · [Issue #139](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/139) | **CP3 — NÃO ALTERAR** | Deixar depois das alterações funcionais em Locais (#168, #169, #135 e #176). Retestar larguras pequenas, teclado e regressão de filtros/URL depois da combinação final. |
| 21 | [#172 — responsividade do cadastro](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/172) · [Issue #138](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/138) | **CP3 — NÃO ALTERAR** | Integrar após #116 e resolver primeiro os títulos/estrutura de páginas de #119. Depois do merge, retestar validação, rótulos, foco e layout em mobile/desktop. |
| 22 | [#136 — testes da página de detalhes](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/136) · [Issue #132](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/132) | **CP3 — NÃO ALTERAR** | A dependência técnica #112 já está integrada em `develop`. Este PR altera `LocalDetalhe.tsx` e `LocalDetalhe.test.tsx`; revisar e integrar antes de #171. |
| 23 | [#171 — compartilhar link do local](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/171) · [Issue #126](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/126) | **CP3 — NÃO ALTERAR** | Modifica os mesmos arquivos de detalhe/teste que #136. Reconciliar os testes após #136 e validar Web Share API, fallback de cópia, permissão negada e teclado; a evidência anterior não comprova teste em dispositivo físico. |
| 24 | [#145 — página de favoritos](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) · [Issue #128](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/128) | **CP3 — NÃO ALTERAR** | **Bloqueado por coordenação:** a Issue #127 continua aberta na CP3 e define `useFavoritos.ts`/`favoritosStorage.ts`, arquivos também criados por #145. Conciliar o contrato com o responsável antes do merge. O diff também altera `.github/workflows/ci.yml`; pedir justificativa e não considerar esse arquivo necessário por padrão. |
 
**PR de coordenação separado da ordem funcional:** [#174 — esta documentação](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/174), ligado à Issue #133. Está aberto, tem CI de qualidade verde e ainda não possui review formal registrada; deve receber revisão independente e verificação de documentação antes do merge. Ele é contado nos 25 PRs abertos, mas não concorre com a sequência de 24 entregas acima.

### Registro histórico: reavaliação da posição do PR #119 — 26/10/2026, 20:30 BRT

Na consulta de 26/10, a resolução de conflitos alterou a conclusão técnica anterior. A branch estava **4 commits à frente e 0 atrás de `develop`**, o GitHub reportava **`mergeable: true`** e o workflow de qualidade do HEAD `c17bf03` havia passado.

Na versão do documento de 26/10, o #119 foi movido para a posição 13, antes dos PRs CP3 que compartilham páginas com ele. **Na proposta atual de 28/10, ele aparece na posição 15** porque novos PRs de suporte/testes foram adicionados à frente; sua prioridade relativa foi preservada: continua antes de #168, #169, #135, #176, #173, #172, #136 e #171 para que essas alterações partam de uma base com os títulos/headings já integrados.

**A posição na lista não é autorização de merge.** As três pendências de conteúdo continuam bloqueando a aprovação do #119:

1. `src/routes/Home/index.tsx` continua renderizando a Home antiga (`<main><h2>Home</h2></main>`) e não aparece nos arquivos alterados do PR. O novo efeito em `src/pages/Home/Home.tsx` não é executado pela rota inicial real; corrigir o roteamento ou o componente efetivamente usado.
2. `package-lock.json` contém mudanças de versões transitivas que não fazem parte do objetivo declarado da Issue #86. O autor deve justificar a necessidade ou remover essas alterações do PR.
3. `src/pages/titulos.test.tsx` renderiza componentes isoladamente; não valida a rota inicial real, o título dinâmico do detalhe nem a afirmação de um único `h1` por rota. Ampliar os testes e retestar após as correções.

As aprovações formais anteriores aparecem como `DISMISSED`. Solicitar nova revisão técnica e decisão explícita de QA para o HEAD atual. O CI verde é necessário, mas não substitui essas etapas.

## 3. Conflitos e decisões que bloqueiam merge

1. **#122 × #120 — dados de teste:** decidir qual registro é canônico para o ID 1 e alinhar fixtures/assertions. Não escolher o nome por suposição.
2. **#162 — revisão solicita correção:** normalizar recursivamente os elementos de arrays (incluindo objetos e arrays aninhados, conforme o contrato) e adicionar testes. A review formal atual é `CHANGES_REQUESTED`.
3. **#166 — confiabilidade E2E:** confirmar isolamento/restauração de dados e limpeza das fixtures; faltam evidências suficientes para considerar o critério atendido.
4. **#168 × #169 × #135 × #176 × #173 — arquivos de listagem compartilhados:** testar a combinação de retry, parâmetros de URL, limpeza, estado vazio e responsividade, evitando que um PR sobrescreva comportamento de outro.
5. **#169 — arquivo extra:** justificar ou remover `src/services/apagar.txt`.
6. **#176 — alteração fora do objetivo:** justificar ou remover as atualizações em `package-lock.json`; a Issue #137 está voltada ao estado vazio da busca e já compartilha `Locais.tsx) com outras entregas.
7. **#170 — acessibilidade:** obter evidência de teclado/foco e navegação para o campo inválido antes da decisão de QA.
8. **#175 — utilitários E2E:** revisar o diff e confirmar que a suíte de demonstração não altera dados reais/persistentes nem excede o escopo. A issue prevê consumo por suítes futuras, então coordenar com #166.
9. **#145 × #127 — contrato de favoritos:** a Issue #127 continua aberta na CP3 e define `useFavoritos.ts` e `favoritosStorage.ts). Conciliar contrato e responsabilidade antes de integrar #145.
10. **#145 — workflow CI:** `.github/workflows/ci.yml` consta no diff. Solicitar justificativa e confirmar necessidade, escopo e revisão específica; esta atividade de documentação não altera o workflow.
11. **#119 — bloqueios de conteúdo apesar de `mergeable: true`:** rota Home não atualizada, alterações de `package-lock.json` não justificadas, testes incompletos e reviews antigas dismissadas.
12. **#111 — re-review:** a review formal mais recente é `CHANGES_REQUESTED`; verificar se as correções posteriores atendem a todos os pontos antes de reaprovar.
13. **#177 — integração futura:** o componente de fallback está isolado, como previsto pela Issue #152. Não declarar concluído o tratamento de armazenamento da aplicação até que a integração e os testes de ponta a ponta sejam tratados em uma demanda própria.
14. **#174 — documento de coordenação:** falta review formal independente. A atualização da ordem não substitui review técnica de documentação nem revisão dos outros PRs.

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

- Em **28/10/2026**, o GitHub retornou **25 PRs abertos, nenhum mergeado e `mergeable: true` nos 25 PRs consultados**. Isso indica ausência de conflito reportado, não prontidão para merge.
- Para os 21 PRs funcionais presentes na linha de base de 26/10, os HEAD SHAs atuais permanecem iguais aos registrados naquela consulta; o workflow de qualidade estava verde nesses SHAs. Para #174, #175, #176 e #177, foram conferidas execuções recentes de **Verificação de qualidade** e **Automação do GitHub Project**, ambas concluídas com sucesso no HEAD atual.
- O CI verde não elimina bloqueios de revisão/conteúdo: #111 e #162 têm `CHANGES_REQUESTED`; a aprovação do #119 está `DISMISSED`; 15 PRs não têm review formal registrada na consulta atual.
- Não foi possível confirmar decisão explícita de QA em nenhum dos 25 PRs nesta rodada. Conferir a seção **Decisão do QA** no PR e a Issue de teste antes de marcar uma entrega como pronta.
- O relatório anterior registrou falhas/cancelamentos em automações auxiliares do GitHub Project para alguns PRs (#121, #164 e #171). Isso deve ser revalidado no workflow mais recente do HEAD, sem confundir automação do Project com o check de qualidade `lint-build-test`.
- A busca anterior por labels literais `P0` e `P1` não comprovou ausência de prioridades críticas; confirmar no campo de prioridade realmente utilizado no Project.
- A ordem da seção 2 é uma proposta de integração, não uma licença de merge. Atualize o documento se novos PRs abrirem, PRs forem fechados/integrados, milestones mudarem ou aparecerem novos commits.

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

### 5.3. Linha de base observada em 28/10/2026

Os HEAD SHAs abaixo foram consultados no GitHub em **28/10/2026**. Para os 21 PRs funcionais já acompanhados em 26/10, os SHAs permanecem iguais à linha de base anterior; o CI de qualidade registrado continua associado ao mesmo conteúdo. Para #174–#177, foram conferidas execuções atuais. A ausência de mudança de SHA não prova, por si só, que uma review cobre o commit; consulte o detalhe da review antes de liberar o merge.

**Resumo do estado atual:** 25 PRs abertos e não integrados (24 de entrega + #174 de coordenação); 7 com review formal `APPROVED` (#114, #116, #120, #121, #122, #135 e #136); 2 com `CHANGES_REQUESTED` (#111 e #162); 1 com aprovações anteriores `DISMISSED` (#119); e 15 sem review formal retornada na consulta (#145, #164, #165, #166, #167, #168, #169, #170, #171, #172, #173, #174, #175, #176 e #177). A decisão de QA permanece **não confirmada** para fins deste controle, até que a evidência seja checada explicitamente.

| PR | Status de integração em 28/10 | Review técnica formal mais recente encontrada | QA | CI de qualidade no HEAD consultado | HEAD SHA | Última atualização do PR (UTC) |
|---|---|---|---|---|---|---|
| [#111](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) | **Bloqueado — nova review necessária** | `CHANGES_REQUESTED` (17/10); PR recebeu atualização posterior | Não confirmado | Passou (#163; revalidar antes do merge) | `46e979f99a31` | 2026-10-21T22:31:01Z |
| [#114](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/114) | Pendente — QA não confirmado | `APPROVED` (15/10) | Não confirmado | Passou (#129) | `1e23ff019c44` | 2026-10-15T01:31:12Z |
| [#116](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/116) | Pendente — validar evidências/QA | `APPROVED` (15/10) | Não confirmado | Passou (#135) | `2b90a4bf1407` | 2026-10-15T21:37:26Z |
| [#119](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/119) | **Bloqueado — não pronto para merge** | Aprovações anteriores `DISMISSED`; nova review necessária | Não confirmado | Passou (#179; HEAD não mudou desde a base) | `c17bf035cb50` | 2026-10-26T23:30:57Z |
| [#120](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) | **Bloqueado — alinhar dado do ID 1 com #122** | `APPROVED` (15/10) | Não confirmado | Passou (#122) | `7228688cd189` | 2026-10-15T21:38:10Z |
| [#121](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/121) | Pendente — confirmar QA/dependências | `APPROVED` (15/10) | Não confirmado | Passou (#117) | `97c19d545ac4` | 2026-10-15T01:33:23Z |
| [#122](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/122) | Pendente — coordenar com #120 | `APPROVED` (19/10) | Não confirmado | Passou (#150) | `87da7d7d6dba` | 2026-10-19T22:19:32Z |
| [#135](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/135) | Pendente — integrar após #169 | `APPROVED` (19/10) | Não confirmado | Passou (#153) | `19f50bbc8619` | 2026-10-19T22:19:15Z |
| [#136](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/136) | Pendente — integrar antes de #171 | `APPROVED` (19/10) | Não confirmado | Passou (#154) | `30b0e13f4636` | 2026-10-19T22:19:01Z |
| [#145](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) | **Bloqueado — conciliar contrato com #127** | Faltando | Não confirmado | Passou (#157) | `9d5f155346f5` | 2026-10-19T23:28:38Z |
| [#162](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/162) | **Bloqueado — corrigir recursividade de arrays** | `CHANGES_REQUESTED` (26/10; normalização de objetos em arrays e testes) | Não confirmado | Passou (#164; o código não mudou depois da base) | `dda3bebf4582` | 2026-10-26T23:50:48Z |
| [#164](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) | Pendente — falta review formal | Faltando | Não confirmado | Passou (#166) | `7a43d2433f8f` | 2026-10-21T23:22:40Z |
| [#165](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) | Pendente — falta review formal | Faltando | Não confirmado | Passou (#167) | `65b0c738201f` | 2026-10-21T23:21:25Z |
| [#166](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) | Pendente — evidenciar isolamento E2E | Faltando | Não confirmado | Passou (#168) | `fbe619c911fd` | 2026-10-23T01:25:55Z |
| [#167](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) | Pendente — falta review formal | Faltando | Não confirmado | Passou (#169) | `c37f69855d5a` | 2026-10-23T19:54:03Z |
| [#168](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) | Pendente — validar busca/filtros no retry | Faltando | Não confirmado | Passou (#170) | `aa55c9e54e97` | 2026-10-23T22:26:18Z |
| [#169](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/169) | **Bloqueado — justificar/remover arquivo extra** | Faltando | Não confirmado | Passou (#171) | `6adc9ce2bd3b` | 2026-10-24T00:37:03Z |
| [#170](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) | Pendente — confirmar teclado/foco | Faltando | Não confirmado | Passou (#172) | `244db0134645` | 2026-10-24T02:12:37Z |
| [#171](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/171) | Pendente — integrar após #136 e validar evidências | Faltando | Não confirmado | Passou (#174) | `e6a4c1193702` | 2026-10-24T21:47:20Z |
| [#172](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/172) | Pendente — retestar após #116/#119 | Faltando | Não confirmado | Passou (#175) | `dc235e55148b` | 2026-10-26T02:53:44Z |
| [#173](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/173) | Pendente — integrar após as mudanças de listagem | Faltando | Não confirmado | Passou (#176) | `231f22c9075d` | 2026-10-26T18:11:55Z |
| [#174](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/174) | Pendente — revisão desta documentação | Faltando | Não confirmado | Passou (Verificação de qualidade e Automação do Project no HEAD atual) | `8beeb52bb183` | 2026-10-26T23:34:49Z |
| [#175](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/175) | Pendente — revisão dos utilitários E2E | Faltando | Não confirmado | Passou (Verificação de qualidade e Automação do Project no HEAD atual) | `d6071264981c` | 2026-10-26T23:45:29Z |
| [#176](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/176) | **Bloqueado — alterações de `package-lock.json` fora do escopo** | Faltando | Não confirmado | Passou (Verificação de qualidade e Automação do Project no HEAD atual) | `2901e3fa316f` | 2026-10-26T23:50:22Z |
| [#177](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/177) | Pendente — revisão do componente isolado | Faltando | Não confirmado | Passou (Verificação de qualidade e Automação do Project no HEAD atual) | `0e32265500f3` | 2026-10-27T21:45:09Z |

#### Resumo de reviews faltantes na linha de base

- **7 PRs com review formal `APPROVED` atual:** #114, #116, #120, #121, #122, #135 e #136. Isso não confirma aprovação de QA nem prontidão para merge.
- **2 PRs com `CHANGES_REQUESTED`:** #111 e #162. Para #111, conferir correções posteriores e solicitar re-review; para #162, corrigir a normalização recursiva e adicionar os testes correspondentes.
- **1 PR com aprovações antigas `DISMISSED`:** #119. Exigir nova review para o HEAD atual.
- **15 PRs sem review formal retornada na consulta atual:** #145, #164, #165, #166, #167, #168, #169, #170, #171, #172, #173, #174, #175, #176 e #177.
- **QA:** não marcar nenhum PR como pronto até que a decisão e a evidência de QA sejam conferidas explicitamente no PR/Issue de teste.
- **CI:** o check de qualidade está registrado como verde para os SHAs listados; para #174–#177 também foram confirmadas as execuções atuais da Automação do GitHub Project com sucesso. Revalidar no HEAD exato antes de cada merge.
- **Mergeabilidade:** todos os 25 PRs estavam abertos e o GitHub reportou `mergeable: true` nesta consulta; isso não substitui revisão, QA, dependências e critérios de aceite.

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

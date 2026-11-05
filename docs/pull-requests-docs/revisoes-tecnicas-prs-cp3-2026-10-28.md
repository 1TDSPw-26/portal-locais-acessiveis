# Registro de revisões técnicas e prontidão para integração — CP3

**Rodada de atualização:** 03/11/2026 (horário de Brasília)  
**Branch de documentação:** `feature/133-controle-integracao-cp3`  
**Base consultada:** `develop` em `db7b8c653b0d7820edac7565265a7350ad75d2b6`  
**Total consultado:** 28 PRs abertos

> Este documento registra uma fotografia do GitHub na data acima. Nenhum merge foi executado por esta análise. Aprovação técnica não substitui QA. O GitHub reportou `mergeable: true` para os 28 PRs consultados, mas vários estão divergentes/atrasados em relação a `develop`; mergeabilidade não significa prontidão. Antes de integrar, atualize a branch, confirme o HEAD, CI, reviews, conversas e decisão de QA.

## 1. Resultado executivo

- **28 PRs abertos, nenhum fechado ou integrado** na consulta.
- **14 PRs com review formal mais recente APPROVED** e **14 com CHANGES_REQUESTED**.
- **Nenhum PR pode ser declarado liberado para merge apenas com esta análise**, pois não foi localizada evidência suficiente de aprovação formal de QA para cada entrega.
- **Candidatos técnicos mais fortes para a próxima etapa de integração:** #166, #167, #170, #175 e #177. São entregas isoladas, com review APPROVED no HEAD consultado, CI de qualidade e automação do Project concluídos com sucesso, e branches sem commits atrás de `develop`. Ainda exigem confirmação do QA e verificação de conversas.
- #168, #171, #172 e #173 também receberam APPROVED e CI verde no HEAD atual, mas devem ser integradas em sequência coordenada por compartilharem áreas funcionais ou exigirem reteste de integração.
- #120, #121, #114 e #116 estão muito atrás da base atual (37 commits em alguns casos); não devem ser integradas sem atualização/rebase e nova validação.
- #122 tem falha no workflow de qualidade; #178 tem falha na automação do GitHub Project. Ambos permanecem bloqueados.
- #174, PR desta documentação, tem um pedido de alteração documental ativo; os links internos foram corrigidos nesta branch nesta rodada, mas ainda é necessária nova revisão formal.

### Decisão recomendada

**Não realizar merge em lote.** Primeiro, encaminhar #166, #167, #170, #175 e #177 para confirmação explícita de QA. Após aprovação de QA, podem ser avaliadas individualmente para integração, começando pelos PRs isolados. Para os demais, respeitar os bloqueios e a sequência abaixo.

## 2. Estado atual de todos os PRs

Todos os PRs abaixo estavam abertos, com base `develop`, sem draft e com `mergeable: true` na consulta. “Atraso” é o resultado de comparação da branch com a referência atual de `develop`; os valores podem mudar a cada atualização.

| PR | Issue | Review formal mais recente | CI no HEAD consultado | Comparação com develop | Situação / próxima ação |
|---|---|---|---|---|---|
| [#111](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/111) | #75 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +5 / -2 | Atualizar documentação para refletir persistência real em localStorage e serviços/arquivos atuais; nova review após correção. |
| [#114](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/114) | #63 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +3 / -37 | Descrição/roteiro não correspondem ao diff atual, que acrescenta teste de regressão; atualizar documentação e revalidar. |
| [#116](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/116) | #71 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +1 / -37 | Descrição afirma React Hook Form/Zod, mas diff atual extrai utilitário e adaptador; corrigir documentação e roteiro do cadastro. |
| [#119](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/119) | #86 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +4 / 0 | Home real da rota não recebe o título; corrigir componente/rota e teste via roteamento real. |
| [#120](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) | #84 | **APPROVED** | Qualidade + Project: sucesso | +1 / -37 | Review positiva, mas branch muito atrasada; atualizar antes de integrar e repetir testes. Atualizar contagem de 9 testes e esclarecer que Vitest já está na base. |
| [#121](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/121) | #85 | **APPROVED** | Qualidade: sucesso; Project: histórico com falhas/cancelamento | +2 / -37 | Base de testes aprovada, mas extremamente atrasada. Atualizar branch, resolver conflitos e revalidar scripts/dependências/coverage. |
| [#122](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/122) | #59 | **CHANGES_REQUESTED** | Qualidade: **falha**; Project: sucesso | +8 / -12 | Build falha: campo obrigatório `avaliacao` ausente em 31 registros e no estado inicial `NovoLocal`. Corrigir contrato e produtores; CI verde obrigatório. |
| [#135](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/135) | #125 | **APPROVED** | Qualidade + Project: sucesso | +1 / -12 | Tecnicamente aprovada; atualizar branch e integrar após #169, #168 e #178 conforme sequência da listagem. |
| [#136](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/136) | #132 | **APPROVED** | Qualidade + Project: sucesso | +2 / -12 | Testes de detalhes aprovados; atualizar branch e coordenar antes de #171, que altera os mesmos arquivos. |
| [#145](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) | #128 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +3 / -12 | Alinhar com #180, escolhido como implementação compartilhada; preservar retorno de sucesso/falha exigido pela página. Retestar integração. |
| [#162](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/162) | #157 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +1 / -2 | Normalização recursiva de objetos/arrays internos ainda incompleta; adicionar testes e corrigir. |
| [#164](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) | #150 | **CHANGES_REQUESTED** | Qualidade: sucesso; Project: histórico com falha | +1 / -2 | Aviso ainda usa `role=alert`; sucesso/aviso devem usar status/polite e erro alert/assertive. Corrigir testes. |
| [#165](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) | #148 | **APPROVED** | Qualidade + Project: sucesso | +4 / -2 | Correções verificadas; suíte isolada e integração separada. Atualizar branch/revalidar por estar 2 commits atrás. |
| [#166](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) | #149 | **APPROVED** | Qualidade + Project: sucesso | +2 / 0 | **Candidato técnico forte.** E2E de cancelamento, confirmação e falha executados em desktop/mobile; 6 casos reportados. Confirmar QA. |
| [#167](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) | #153 | **APPROVED** | Qualidade + Project: sucesso | +1 / 0 | **Candidato técnico forte.** Componente isolado e testes aprovados. Confirmar QA; integração à página é separada. |
| [#168](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) | #130 | **APPROVED** | Qualidade + Project: sucesso | +6 / 0 | Correções de retry, categoria, concorrência e foco confirmadas. Coordenar com #169, #173, #176 e #178 antes de integrar. |
| [#169](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/169) | #123 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +3 / 0 | Faltam testes reais para limpar filtros/URL, voltar/avançar no histórico e preservar parâmetros desconhecidos. Também permanece `src/services/apagar.txt` no diff; esclarecer/remover. |
| [#170](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) | #158 | **APPROVED** | Qualidade + Project: sucesso | +4 / 0 | **Candidato técnico forte.** Propriedade própria e teclado Enter/Espaço testados; confirmar QA. |
| [#171](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/171) | #126 | **APPROVED** | Qualidade + Project: sucesso | +1 / 0 | Tecnicamente aprovada; coordenar com #136 e retestar Web Share/fallback após integração. |
| [#172](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/172) | #138 | **APPROVED** | Qualidade + Project: sucesso | +2 / 0 | Responsividade do cadastro aprovada; integrar após resolver base/compatibilidade de #116 e #119. |
| [#173](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/173) | #139 | **APPROVED** | Qualidade + Project: sucesso | +2 / 0 | Responsividade da listagem aprovada; coordenar depois das alterações funcionais em busca/filtros/retry/ordenação/estado vazio. |
| [#174](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/174) | #133 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +8 / 0 | Corrigir links relativos dos tutoriais e caminho citado na descrição. Links corrigidos nesta branch; solicitar nova review e confirmar PR body atualizado. |
| [#175](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/175) | #147 | **APPROVED** | Qualidade + Project: sucesso | +1 / 0 | **Candidato técnico forte.** Fixtures/helpers E2E aprovados; 10 casos desktop/mobile reportados. Preencher autoria que ainda contém `@usuario`; confirmar QA. |
| [#176](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/176) | #137 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +2 / 0 | Justificar ou remover mudanças não relacionadas em `package-lock.json`; atualizar lista de arquivos e validar lockfile. |
| [#177](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/177) | #152 | **APPROVED** | Qualidade + Project: sucesso | +1 / 0 | **Candidato técnico forte.** Componente isolado de fallback de armazenamento aprovado; confirmar QA e dependências de integração. |
| [#178](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/178) | #124 | **CHANGES_REQUESTED** | Qualidade: sucesso; Project: **falha** | +2 / 0 | Substituir `Closes #NUMERO_DA_ISSUE` por `Closes #124`; revalidar automação. Compartilha arquivos de Locais com #168/#169/#173/#176/#135. |
| [#179](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/179) | #160 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +2 / 0 | Diff altera paginação, mas Issue pede componente isolado `IndicadorPosicao`; entregar escopo correto ou formalizar mudança de escopo. |
| [#180](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/180) | #127 | **CHANGES_REQUESTED** | Qualidade + Project: sucesso | +3 / 0 | Base compartilhada de favoritos escolhida, mas storage precisa validar JSON/registro, tratar falha de leitura/escrita e incluir testes de corrupção, reload e storage indisponível. Justificar/remover alterações transitivas do lockfile. |

**Legenda da comparação:** `+X / -Y` = commits exclusivos da branch / commits que faltam em relação a `develop`. A comparação não substitui análise de conflitos por arquivo nem testes após integração.

## 3. PRs com maior prontidão técnica

### Grupo A — podem seguir para validação final de QA

Os cinco PRs abaixo têm review formal APPROVED no HEAD consultado, workflows de qualidade e Project com sucesso, branch sem commits atrás de `develop` e escopo isolado:

1. **#166 — testes E2E de exclusão.** Revisão e execução Playwright desktop/mobile reportadas; 6 casos.
2. **#167 — resumo acessível de filtros.** Componente isolado, aprovado; não inclui integração à página.
3. **#170 — resumo acessível de erros.** Propriedade própria e ativação por teclado testadas.
4. **#175 — utilitários E2E.** 10 casos desktop/mobile reportados; completar autoria na descrição.
5. **#177 — fallback de armazenamento.** Componente isolado e aprovado.

**Decisão:** solicitar/verificar a decisão de QA e evidência associada a cada Issue. Se QA estiver aprovado e não houver conversa pendente, estes são os primeiros candidatos para merge individual. Reexecutar CI após qualquer atualização.

### Grupo B — aprovação técnica obtida, mas integração coordenada necessária

- **#168 (retry):** aprovado e atualizado em relação à revisão anterior. Integrar com o conjunto de Locais.
- **#171 (compartilhamento):** aprovado; integrar depois de #136 por compartilhar página de detalhes.
- **#172 (responsividade Cadastro):** aprovado; aguardar alinhamento da base do formulário com #116/#119.
- **#173 (responsividade Locais):** aprovado; integrar depois das alterações funcionais em Locais.
- **#165 (ConfirmDialog):** aprovado, mas está 2 commits atrás de develop; atualizar/revalidar antes de merge.

Esses PRs não devem ser misturados em um único merge. Integrar um por vez, testar a combinação e reavaliar as demais branches.

## 4. Bloqueios e dependências que impedem merge

1. **#122:** falha de build causada pelo novo campo obrigatório `avaliacao` ausente em registros e no estado inicial do cadastro.
2. **#145 ↔ #180:** #180 é a implementação compartilhada escolhida para favoritos. #180 precisa primeiro corrigir validação e tratamento de erro do armazenamento; depois #145 deve consumir o mesmo contrato, sem duplicar hook/storage.
3. **#164:** semântica ARIA de aviso ainda não foi corrigida no HEAD analisado.
4. **#169 ↔ #135 ↔ #168 ↔ #173 ↔ #176 ↔ #178:** conjunto compartilha `Locais.tsx`/testes e filtros. #169 e #178 têm bloqueios; #176 tem alteração de lockfile não justificada. Resolver primeiro os bloqueios e testar a combinação.
5. **#136 ↔ #171:** ambos alteram `LocalDetalhe.tsx` e testes. #136 aprovado; #171 deve ser revalidado depois da combinação.
6. **#116 ↔ #172:** ambos afetam Cadastro; #116 tem descrição incompatível com o diff atual e está em changes requested.
7. **#119:** corrigir título da Home efetivamente montada pela rota inicial. Não basta o teste isolado do componente alternativo.
8. **#121/#120/#114/#116:** branches com 37 commits atrás de develop; atualização e revalidação obrigatórias.
9. **#178:** issue vinculada correta (#124) não está indicada no fechamento do PR e automação do Project falhou.
10. **#179:** escopo entregue não corresponde à Issue #160.
11. **#174:** os links nos tutoriais apontavam para caminho inexistente. Os dois tutoriais foram atualizados nesta branch para apontar a `docs/pull-requests-docs/controle-integracao-cp3.md`; o PR ainda precisa de nova revisão para confirmar a correção.

## 5. Ordem operacional recomendada

A ordem abaixo é condicional e não representa autorização de merge:

| Etapa | PRs | Condição |
|---|---|---|
| 1 — candidatos isolados | #166, #167, #170, #175, #177 | Confirmar QA aprovado, conversas resolvidas e CI no HEAD; integrar individualmente. |
| 2 — componentes aprovados com pequena defasagem | #165 | Atualizar os 2 commits atrás, resolver conflitos, reexecutar testes/CI e obter nova review se o diff mudar. |
| 3 — detalhes | #136 → #171 | #136 já aprovado, mas branch 12 commits atrás; atualizar e integrar/testar antes de #171. |
| 4 — recuperação/listagem | #168 → #169 (após correções) → #135 → #176 (após lockfile) → #178 (após vínculo) → #173 | Revalidar os arquivos compartilhados após cada integração. A ordem exata deve ser revista conforme o conteúdo final de cada branch. |
| 5 — cadastro e títulos | #119 (após correção) → #116 (após correção e atualização) → #172 | Corrigir a Home real e a documentação do cadastro; reexecutar testes combinados. |
| 6 — favoritos | #180 (após correções) → #145 (adaptado ao contrato) | Um único hook/storage compartilhado; validar persistência, falhas e fluxo completo. |
| 7 — restantes | #111, #114, #120, #121, #122, #162, #164, #174, #176, #178, #179 | Somente depois de resolver os bloqueios listados, atualizar branches e obter nova review/QA. |

**Nota:** #121 é uma base de testes histórica, mas está muito atrasada; não a integre automaticamente antes de comparar o que já foi incorporado a develop. Verifique se sua entrega ainda é necessária ou se já foi absorvida por merges posteriores.

## 6. Regras de liberação de merge

Um PR só pode ser considerado pronto quando todos os itens forem verdadeiros:

- [ ] Issue vinculada e milestone conferidas.
- [ ] Branch atualizada com `develop`; comparação sem atraso relevante e sem conflito.
- [ ] Diff revisado no HEAD atual e compatível com o escopo/Issue.
- [ ] Review formal APPROVED válida para o HEAD atual.
- [ ] Todas as conversas e threads resolvidas ou com decisão documentada.
- [ ] Workflow de qualidade passou no HEAD atual.
- [ ] Automação do Project não apresenta falha impeditiva.
- [ ] Testes específicos (incluindo Playwright quando aplicável) executados e evidenciados.
- [ ] QA aprovou formalmente e evidência está vinculada à Issue/PR.
- [ ] Dependências e PRs que compartilham arquivos foram integrados/retestados na ordem adequada.

## 7. Histórico da rodada anterior

O documento de 28/10 registrava 25 PRs abertos. Em 03/11 foram identificados 28, incluindo #178, #179 e #180. O estado técnico de vários PRs mudou substancialmente: houve novas reviews, correções e atualização de alguns commits. Esta rodada substitui as recomendações antigas quando há evidência mais recente no GitHub.

O registro histórico das análises individuais de 28/10 permanece útil para entender a origem dos comentários, mas as decisões vigentes são as tabelas e bloqueios desta atualização.

## 8. Registro para a próxima rodada

- Data/hora: [preencher]
- SHA atual de develop: [preencher]
- PRs integrados desde esta rodada: [preencher]
- PRs fechados sem merge: [preencher]
- Novos commits e SHAs: [PR + SHA anterior → atual]
- Reviews recebidas: [PR + decisão + autor + data]
- QA aprovado/pendente: [PR/Issue + evidência]
- Falhas de CI/Project: [PR + SHA + workflow]
- Conversas abertas: [PR + responsável + próxima ação]
- Mudanças na ordem de integração: [motivo]

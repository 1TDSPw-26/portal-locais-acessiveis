# Registro de revisões técnicas — PRs CP3

**Data da rodada:** 28/10/2026  
**Branch de documentação:** `feature/133-controle-integracao-cp3`  
**Repositório:** [portal-locais-acessiveis](https://github.com/1TDSPw-26/portal-locais-acessiveis)

> **Importante:** este documento registra análises técnicas e recomendações preparadas para publicação manual. Nenhuma das decisões abaixo foi enviada como review formal ao GitHub por meio desta rodada. Confira o HEAD, os comentários, as conversas, o CI e o status de QA diretamente no GitHub antes de agir. As recomendações valem para os commits identificados e devem ser reavaliadas se o código mudar.

## 1. Resumo executivo

| PR | Issue | Recomendação da revisão | Principais ações |
|---|---|---|---|
| [#145 — página de favoritos](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/145) | [#128](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/128) | **Request changes** | Conciliar o contrato com #127; definir rota canônica; preservar foco visível. |
| [#164 — notificações temporárias](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/164) | [#150](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/150) | **Request changes** | Separar semântica de status/alerta e usar anúncio assertivo para erro. |
| [#165 — testes de ConfirmDialog](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/165) | [#148](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/148) | **Request changes** | Tornar os testes unitários independentes de Cadastro e validar o foco após fechar o diálogo. |
| [#166 — testes E2E de exclusão](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/166) | [#149](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/149) | **Approve** | Confirmar/atualizar o checklist de isolamento de dados; os E2E citados não são executados pelo workflow de qualidade padrão. |
| [#167 — resumo de filtros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/167) | [#153](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/153) | **Approve** | Componente isolado, propriedades claras e testes adequados; integração à página não faz parte do escopo desta PR. |
| [#168 — retry de carregamento](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/168) | [#130](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/130) | **Request changes** | Testar categoria ativa, estado pendente/bloqueio de tentativas concorrentes e foco após sucesso. |
| [#170 — resumo acessível de erros](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/170) | [#158](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/158) | **Request changes** | Validar somente propriedades próprias do mapa de referências e testar ativação por Enter/Espaço. |

As recomendações acima não equivalem a reviews formais nem a decisões de QA. As PRs #166 e #167 podem receber recomendação de aprovação técnica, mas continuam sujeitas ao processo de revisão e QA do projeto.

## 2. Registro por PR

### PR #145 — página de favoritos

- **Branch:** `feature/128-pagina-favoritos`
- **HEAD analisado:** `9d5f155346f508009f1b0129ca752dda733065c1`
- **Recomendação:** **Request changes**
- **CI consultado:** workflows disponíveis concluídos com sucesso no commit analisado.
- **Escopo observado:** página de consulta/remoção de favoritos, hook e armazenamento, rota e testes de navegador.

#### Correções solicitadas

1. **Conciliar a dependência #127.** A PR cria `useFavoritos.ts` e `favoritosStorage.ts`, embora a Issue #127 seja responsável pelo contrato comum de favoritos e continue pendente. Definir com o responsável a interface pública do hook, chave e formato de armazenamento; garantir uma implementação compartilhada e integração com o fluxo real de favoritar.
2. **Definir a configuração canônica de rotas.** A rota foi adicionada em `src/main.tsx` e `src/routes/AppRoutes.tsx`. Coordenar a solução com a Issue #31 e com PRs que alteram os mesmos arquivos; evitar duas fontes de verdade.
3. **Preservar foco visual.** O título recebe foco programático, mas `focus:outline-none` remove o indicador visual. Usar estilo de foco perceptível, especialmente após desfavoritar com teclado.

#### Condição para reavaliar

- [ ] Contrato e responsabilidade de #127 conciliados.
- [ ] Roteamento canônico decidido e integração combinada verificada.
- [ ] Indicador visual de foco corrigido e testado.
- [ ] Testes, lint, build e CI conferidos no HEAD atualizado.
- [ ] Review formal e decisão de QA registradas.

### PR #164 — notificações temporárias

- **Branch:** `feat/notificacao-temporaria`
- **HEAD analisado:** `7a43d2433f8f` (SHA abreviado registrado no controle de integração).
- **Recomendação:** **Request changes**
- **CI consultado:** workflow de qualidade passou no commit registrado.

#### Correção solicitada

A semântica de anúncio precisa refletir a prioridade da mensagem. Não combinar de forma inconsistente `role="alert"` com `aria-live="polite"`. Mensagens informativas/sucesso devem usar anúncio educado quando apropriado; erros que exigem atenção imediata devem usar semântica assertiva consistente. Confirmar o comportamento com testes acessíveis e garantir limpeza de timers/fechamento sem anúncios duplicados.

#### Condição para reavaliar

- [ ] Semântica de status e alerta corrigida.
- [ ] Testes cobrem o tipo de anúncio esperado e fechamento/limpeza.
- [ ] CI conferido no HEAD atualizado.
- [ ] Review formal e QA registrados.

### PR #165 — testes de ConfirmDialog

- **Branch:** `feature/148-testes-confirm-dialog`
- **HEAD analisado:** `65b0c738201f` (SHA abreviado registrado no controle de integração).
- **Recomendação:** **Request changes**
- **CI consultado:** workflow de qualidade passou no commit registrado.

#### Correções solicitadas

1. A Issue #148 pede testes unitários do componente de confirmação; os testes estão excessivamente acoplados à página Cadastro. Isolar os testes do `ConfirmDialog` para validar o componente sem depender da implementação da página.
2. O teste de retorno de foco desmonta o componente em vez de verificar a transição real de aberto para fechado. Testar a interação completa e confirmar que, ao fechar, o foco retorna ao elemento de origem conforme o contrato do componente.

#### Condição para reavaliar

- [ ] Testes unitários independentes do Cadastro.
- [ ] Retorno de foco validado em uma transição real de aberto para fechado.
- [ ] Cobertura de teclado e Escape conferida conforme o contrato do diálogo.
- [ ] CI, review formal e QA atualizados.

### PR #166 — testes E2E de exclusão de locais

- **Branch:** `149-dev-criar-testes-e2e-da-exclusão-de-locais`
- **HEAD analisado:** `fbe619c911fd` (SHA abreviado registrado no controle de integração).
- **Recomendação:** **Approve**
- **CI consultado:** workflows disponíveis passaram; o workflow de qualidade padrão não executa Playwright.

#### Pontos positivos

- Cenários cobrem cancelamento, confirmação e falha ao persistir.
- A estratégia de contexto/fixtures do Playwright ajuda a isolar os dados persistidos entre cenários.
- A implementação é voltada a testes E2E e não exige alterar o código de produção.

#### Ação complementar

O checklist de isolamento/evidência na descrição da PR estava desmarcado. Após registrar a explicação de como o contexto e as fixtures isolam os dados, o autor deve atualizar o checklist. A aprovação técnica não deve ser interpretada como confirmação de que os testes Playwright foram executados pelo CI padrão; essa execução deve ser conferida separadamente.

#### Condição para encerrar

- [ ] Checklist/evidência de isolamento atualizado pelo autor.
- [ ] Resultado real dos testes E2E confirmado.
- [ ] Review formal e QA registrados.

### PR #167 — resumo acessível de filtros

- **Branch:** `feature/153-resumo-filtros`
- **HEAD analisado:** `c37f69855d5a` (SHA abreviado registrado no controle de integração).
- **Recomendação:** **Approve**
- **CI consultado:** workflows disponíveis passaram no commit registrado.

#### Pontos positivos

- O componente recebe os filtros por propriedades e não incorpora lógica da página.
- Os testes cobrem os estados relevantes do componente.
- O escopo está adequadamente isolado.

#### Limite de escopo

A aprovação desta entrega cobre o componente e seus testes. Não significa que o resumo já esteja integrado à página de Locais; essa integração deve ser acompanhada separadamente.

#### Condição para encerrar

- [ ] Review formal e QA registrados.
- [ ] Integração à página tratada em tarefa/PR apropriada, caso continue prevista.

### PR #168 — retry de carregamento

- **Branch:** `feature/130-retry-carregamento`
- **HEAD analisado:** `aa55c9e54e97e4a3b53adf988cf564ce34c69bba`
- **Recomendação:** **Request changes**
- **CI consultado:** workflows disponíveis concluídos com sucesso no commit analisado.

#### Correções solicitadas

1. **Preservação de categoria:** o teste chamado `mantém a categoria selecionada após uma falha consecutiva` deixa a categoria no valor padrão vazio. Selecionar uma categoria real e verificar que ela permanece selecionada depois da falha/tentativa.
2. **Estado pendente:** o teste `desabilita o botão enquanto tenta carregar novamente` só verifica que o botão está habilitado após a tentativa. Manter a operação pendente no teste, verificar o texto “Tentando novamente...” e comprovar que o botão fica desabilitado e não inicia chamadas concorrentes.
3. **Foco após sucesso:** quando o retry tem sucesso, o componente de erro e o botão desaparecem. Definir e testar um destino de foco lógico após essa transição, principalmente quando o retry é iniciado por teclado.

#### Coordenação

A PR compartilha `Locais.tsx` e testes com outras entregas de busca, filtros, URL e responsividade, incluindo #135, #169, #173 e #176. Revalidar o fluxo combinado após integração/rebase.

#### Condição para reavaliar

- [ ] Categoria ativa preservada e comprovada por teste.
- [ ] Estado pendente, botão desabilitado e prevenção de tentativas concorrentes testados.
- [ ] Foco após sucesso definido e testado.
- [ ] Testes, lint, build e CI conferidos no HEAD atualizado.
- [ ] Review formal e QA registrados.

### PR #170 — resumo acessível de erros de formulário

- **Branch:** `158-dev-criar-componente-de-resumo-acessível-dos-erros-do-formulário`
- **HEAD analisado:** `244db01346458aab9288b04d9736fcb2d2c0d77e`
- **Recomendação:** **Request changes**
- **CI consultado:** workflows disponíveis concluídos com sucesso no commit analisado.

#### Correções solicitadas

1. **Verificação de referências:** `erro.campo in referencias` também aceita propriedades herdadas, como `toString`, mesmo que não exista referência real de campo. Usar validação de propriedade própria, por exemplo `Object.hasOwn(referencias, erro.campo)`, e adicionar teste para chave herdada.
2. **Teclado:** os testes verificam o foco após clique, mas não a ativação por teclado. Adicionar testes para Enter e Espaço no botão de cada erro e verificar que somente o campo correspondente recebe foco.

#### Condição para reavaliar

- [ ] Apenas propriedades próprias de `referencias` são consideradas.
- [ ] Teste para chave herdada sem referência real adicionado.
- [ ] Ativação por Enter e Espaço testada.
- [ ] Testes, lint, build e CI conferidos no HEAD atualizado.
- [ ] Review formal e QA registrados.

## 3. Acompanhamento de pendências

Use esta tabela para atualizar a situação depois de cada nova rodada. “Pendente” significa que a recomendação ainda precisa ser verificada no GitHub; não significa que uma review formal tenha sido submetida.

| PR | Recomendação registrada | Próximo passo | Estado do acompanhamento |
|---|---|---|---|
| #145 | Request changes | Conciliar #127, rotas e foco visual | Pendente de confirmação |
| #164 | Request changes | Corrigir semântica de anúncios | Pendente de confirmação |
| #165 | Request changes | Isolar testes e validar retorno de foco | Pendente de confirmação |
| #166 | Approve | Atualizar checklist e confirmar execução E2E | Pendente de confirmação |
| #167 | Approve | Registrar review/QA e acompanhar integração | Pendente de confirmação |
| #168 | Request changes | Corrigir testes de categoria, estado pendente e foco | Pendente de confirmação |
| #170 | Request changes | Corrigir validação de referências e testes de teclado | Pendente de confirmação |

### Checklist para a próxima revisão

- [ ] Confirmar se o HEAD de cada PR mudou desde a revisão registrada.
- [ ] Ler comentários e threads existentes e verificar se as correções foram feitas.
- [ ] Executar/verificar testes, lint, build e CI no commit atual.
- [ ] Confirmar se a review formal corresponde ao HEAD atual.
- [ ] Registrar separadamente a decisão de QA.
- [ ] Atualizar esta documentação com data, SHA, evidências e próximos passos.
- [ ] Não marcar uma recomendação como concluída antes de confirmar o estado real no GitHub.

## 4. Regra de responsabilidade

As PRs da CP3 devem ser corrigidas pelos respectivos autores/desenvolvedores. QA e Tech Lead devem revisar, documentar evidências, abrir comentários e solicitar mudanças, sem modificar diretamente o código de implementação de outra pessoa. A branch `feature/133-controle-integracao-cp3` é a exceção para manutenção desta documentação de coordenação.

Uma recomendação `Approve` ou `Request changes` neste arquivo é apenas o resultado da análise técnica registrada. A decisão formal só existe quando publicada no GitHub por um revisor autorizado; aprovação técnica não substitui o QA nem libera automaticamente o merge.

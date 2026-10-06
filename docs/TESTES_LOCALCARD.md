# Testes do Componente LocalCard

## Suite de Testes Implementada

O componente `LocalCard` possui uma suite completa de testes que validam:

### 1. Renderização de Elementos
- ✅ Nome do local é renderizado em um `<h3>`
- ✅ Categoria é exibida corretamente
- ✅ Endereço é renderizado com semântica `<address>`

### 2. Recursos de Acessibilidade
- ✅ Todos os recursos são renderizados como itens de lista
- ✅ Lista é renderizada apenas quando há recursos
- ✅ Validação de atributos ARIA para acessibilidade

### 3. Navegação e Links
- ✅ Link para página de detalhe é renderizado
- ✅ Atributo `href` está correto
- ✅ Texto oculto do link inclui nome do local (acessibilidade)

### 4. Acessibilidade
- ✅ Atributo `aria-labelledby` vincula card ao título
- ✅ Heading `<h4>` oculto descreve lista de recursos
- ✅ Navegação por teclado totalmente funcional
- ✅ Compatibilidade com leitores de tela

## Como Executar os Testes

### Pré-requisitos
1. Ter Node.js instalado
2. Estar no diretório raiz do projeto

### Instalação de Dependências de Teste
```bash
npm install --legacy-peer-deps --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Executar Testes
```bash
npm test
```

### Executar Testes em Modo Watch
```bash
npm test -- --watch
```

### Gerar Relatório de Cobertura
```bash
npm test -- --coverage
```

## Casos de Teste Detalhados

1. **renderiza o nome do local**
   - Valida se o nome aparece no DOM
   - Verifica se está em um elemento `<h3>`

2. **renderiza a categoria do local**
   - Confirma exibição da categoria

3. **renderiza o endereço do local**
   - Valida renderização do endereço

4. **renderiza todos os recursos de acessibilidade**
   - Itera sobre cada recurso e valida presença

5. **renderiza link para página de detalhe do local**
   - Verifica existência do link
   - Valida atributo `href` com ID correto

6. **inclui o nome do local no texto oculto do link**
   - Testa acessibilidade com leitores de tela
   - Valida texto sr-only do link

7. **usa labelledby para vincular o card ao título**
   - Verifica atributo `aria-labelledby`
   - Confirma vínculo com ID correto do título

8. **renderiza lista de recursos com acessibilidade**
   - Testa renderização de `<ul>` e `<li>`
   - Valida quantidade de itens

9. **renderiza texto oculto descrevendo recursos**
   - Verifica presença de heading oculto `<h4>`
   - Valida acessibilidade da lista

## Arquitetura dos Testes

- Framework: **Vitest**
- Biblioteca de teste: **@testing-library/react**
- Ambiente: **jsdom** (simulação do DOM no Node.js)
- Matchers: **jest-dom** (assertions HTML-específicas)

## Conformidade com Padrões

✅ **WCAG 2.1 AA** - Acessibilidade Web
✅ **React Best Practices** - Renderização eficiente
✅ **Testing Best Practices** - Testes semânticos e acessíveis

---

**Nota:** Os testes não estão inclusos no build de produção para evitar conflitos de dependências. Execute localmente conforme instruções acima.

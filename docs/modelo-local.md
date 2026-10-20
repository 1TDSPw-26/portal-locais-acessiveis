# Modelo de dados `Local`

## Estado e fonte da verdade

Este documento descreve o modelo implementado no código consultado na branch `develop`. A fonte do tipo é `src/types/Local.ts`; a validação de dados e o formato persistido são definidos em `src/services/locaisService.ts`.

O modelo atual representa um local por seis propriedades. Ele não define coordenadas, horários de funcionamento, avaliação, imagens, data de criação ou favoritos.

## Tipos TypeScript

O tipo implementado é:

```ts
export type Local = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  endereco: string;
  acessibilidades: string[];
};

export type NovoLocal = Omit<Local, "id">;
```

O serviço também exporta `DadosLocal = Omit<Local, "id">`. Esse tipo tem a mesma estrutura de `NovoLocal`, mas é declarado separadamente e é o tipo usado atualmente nas assinaturas de cadastro e atualização do serviço. A diferença de nomes não representa, hoje, uma diferença de campos.

## Campos e validações

| Campo | Tipo | Regra observada no serviço |
|---|---|---|
| `id` | `number` | Gerado pelo serviço no cadastro. Deve ser inteiro seguro e maior que zero. Não é enviado em `NovoLocal`/`DadosLocal`. |
| `nome` | `string` | Obrigatório; não pode estar vazio depois de remover espaços das pontas. |
| `categoria` | `string` | Obrigatório; não pode estar vazio depois de remover espaços das pontas. Não há enum de categorias no tipo. |
| `descricao` | `string` | Obrigatório; não pode estar vazio depois de remover espaços das pontas. |
| `endereco` | `string` | Obrigatório; não pode estar vazio depois de remover espaços das pontas. |
| `acessibilidades` | `string[]` | O campo deve ser um array; cada item informado deve ser uma string não vazia após a remoção de espaços. O array vazio é aceito pela validação atual. |

Na preparação de dados, o serviço aplica `trim()` a nome, categoria, descrição e endereço, e a cada item de acessibilidade. Não há validação de endereço por formato, lista fechada de categorias nem vocabulário controlado de recursos de acessibilidade.

## Exemplo existente no conjunto inicial

O trecho abaixo reproduz um registro já presente em `src/components/Dados/Locais.ts` (não é um novo local inventado para esta documentação):

```json
{
  "id": 1,
  "nome": "Biblioteca Municipal",
  "categoria": "Educação",
  "descricao": "Biblioteca municipal com ampla coleção de livros.",
  "endereco": "Centro - São Paulo/SP",
  "acessibilidades": [
    "Acesso para cadeirantes",
    "Banheiro acessível"
  ]
}
```

Para criar um registro, a entrada contém os mesmos campos exceto `id`; o serviço atribui o identificador.

## Armazenamento persistido atual

O serviço não usa uma base de dados remota. Ele serializa em JSON um objeto com esta estrutura interna:

```ts
type ArmazenamentoLocais = {
  proximoId: number;
  locais: Local[];
};
```

A chave de armazenamento é:

```text
portal-locais-acessiveis:locais:v1
```

O valor persistido contém o objeto inteiro, com `proximoId` e a lista `locais`; não é apenas um registro `Local`. O armazenamento fica no `localStorage` do navegador e é específico à origem/navegador do usuário.

Quando a chave ainda não existe, o serviço monta o estado inicial usando `src/components/Dados/Locais.ts` e calcula `proximoId` como o maior ID inicial mais um. A leitura inicial, por si só, não grava esse estado no `localStorage`; a persistência ocorre quando uma operação de escrita é concluída.

### Validação do estado persistido

Ao ler um valor existente, o serviço verifica que:

- o JSON pode ser analisado;
- o objeto tem um `proximoId` inteiro seguro maior ou igual a 1;
- `locais` é um array e cada entrada atende ao modelo `Local`;
- cada ID é um inteiro seguro, maior que zero;
- não existem IDs duplicados;
- todos os IDs são menores que `proximoId`.

Se o JSON estiver corrompido ou o formato não passar pelas validações, o serviço lança `ArmazenamentoLocaisError` em vez de aceitar silenciosamente o conteúdo.

## Identidade e funcionalidades relacionadas

O `id` identifica um registro e não deve ser confundido com sua posição na lista. O serviço atribui IDs durante o cadastro e preserva o ID durante a atualização.

- **Cadastro:** Issue [#73](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/73) usa o modelo de entrada sem ID.
- **Edição:** Issue [#75](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/75) usa o ID para localizar e atualizar um local.
- **Favoritos:** a Issue [#127](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/127) define trabalho futuro de favoritos com armazenamento separado. No `develop` consultado para esta documentação, o tipo `Local` não tem campo de favorito e o serviço não define o contrato desse armazenamento; não se deve inferir sua chave ou formato a partir de `portal-locais-acessiveis:locais:v1`.
- **Testes:** a suíte de `src/services/locaisService.test.ts` e a Issue [#84](https://github.com/1TDSPw-26/portal-locais-acessiveis/issues/84) verificam o comportamento do serviço. O PR [#120](https://github.com/1TDSPw-26/portal-locais-acessiveis/pull/120) foi consultado como trabalho relacionado ainda em revisão no momento desta análise.

## Limites do modelo atual

O tipo `Local` não especifica um contrato HTTP, endpoints, métodos HTTP, códigos de status, autenticação nem formato de erro de servidor. Essas definições dependem de uma futura decisão técnica e não devem ser deduzidas deste modelo de armazenamento local.

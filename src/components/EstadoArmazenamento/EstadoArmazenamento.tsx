export type TipoEstadoArmazenamento = 'indisponivel' | 'corrompido' | 'sem-permissao'

type EstadoArmazenamentoProps = {
  estado: TipoEstadoArmazenamento
  mensagem?: string
}

const CONFIG: Record<
  TipoEstadoArmazenamento,
  { titulo: string; mensagem: string; orientacao: string }
> = {
  indisponivel: {
    titulo: 'Armazenamento indisponível',
    mensagem: 'Não foi possível acessar o armazenamento local do navegador.',
    orientacao:
      'Verifique se o navegador está em modo privado ou se o armazenamento está desativado nas configurações e recarregue a página.',
  },
  corrompido: {
    titulo: 'Dados armazenados inválidos',
    mensagem: 'Os dados salvos neste navegador estão corrompidos e não puderam ser lidos.',
    orientacao:
      'Limpe os dados do site nas configurações do navegador e recarregue a página para recomeçar.',
  },
  'sem-permissao': {
    titulo: 'Sem permissão de armazenamento',
    mensagem: 'O navegador não permitiu o acesso ao armazenamento local.',
    orientacao:
      'Libere a permissão de armazenamento para este site nas configurações do navegador e recarregue a página.',
  },
}

export default function EstadoArmazenamento({ estado, mensagem }: EstadoArmazenamentoProps) {
  const { titulo, mensagem: mensagemPadrao, orientacao } = CONFIG[estado]

  return (
    <div role="alert" className="flex flex-col items-center justify-center py-16 text-center">
      <span aria-hidden="true" className="text-5xl">🔒</span>
      <h3 className="mt-4 text-xl font-bold text-amber-800">{titulo}</h3>
      <p className="mt-2 max-w-md text-gray-700">{mensagem ?? mensagemPadrao}</p>
      <p className="mt-2 max-w-md text-gray-700">{orientacao}</p>
    </div>
  )
}
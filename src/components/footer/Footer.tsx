export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo e descrição */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-xl">
              +
            </div>
            <h3 className="text-lg font-bold">AcessoLocal</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Portal colaborativo que reúne informações de acessibilidade para ampliar autonomia e participação.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="text-base font-semibold mb-4">Navegação</h4>
          <ul className="space-y-3">
            <li><a href="#inicio" className="text-gray-300 text-sm hover:text-white transition-colors">Início</a></li>
            <li><a href="#locais" className="text-gray-300 text-sm hover:text-white transition-colors">Locais</a></li>
            <li><a href="#cadastrar" className="text-gray-300 text-sm hover:text-white transition-colors">Cadastrar local</a></li>
            <li><a href="#sobre" className="text-gray-300 text-sm hover:text-white transition-colors">Sobre</a></li>
          </ul>
        </div>

        {/* Projeto */}
        <div>
          <h4 className="text-base font-semibold mb-4">Projeto</h4>
          <ul className="space-y-3">
            <li><a href="#sobre-portal" className="text-gray-300 text-sm hover:text-white transition-colors">Sobre o portal</a></li>
            <li><a href="#acessibilidade" className="text-gray-300 text-sm hover:text-white transition-colors">Acessibilidade</a></li>
            <li><a href="#info-projeto" className="text-gray-300 text-sm hover:text-white transition-colors">Informações do projeto</a></li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h4 className="text-base font-semibold mb-4">Institucional</h4>
          <ul className="space-y-3">
            <li><a href="#projeto-academico" className="text-gray-300 text-sm hover:text-white transition-colors">Projeto acadêmico — FIAP</a></li>
            <li><a href="#semestre" className="text-gray-300 text-sm hover:text-white transition-colors">2º semestre de ADS — 2026</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

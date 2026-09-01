export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-16 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-blue-800">
          
          {/* Logo e descrição */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-2xl shadow-lg hover:shadow-xl transition-shadow">
                +
              </div>
              <h3 className="text-xl font-bold tracking-tight">AcessoLocal</h3>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Portal colaborativo que reúne informações de acessibilidade para ampliar autonomia e participação.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Início
                </a>
              </li>
              <li>
                <a href="#locais" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Locais
                </a>
              </li>
              <li>
                <a href="#cadastrar" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Cadastrar local
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Sobre
                </a>
              </li>
            </ul>
          </div>

          {/* Projeto */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white uppercase tracking-wider">Projeto</h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre-portal" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Sobre o portal
                </a>
              </li>
              <li>
                <a href="#acessibilidade" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Acessibilidade
                </a>
              </li>
              <li>
                <a href="#info-projeto" className="text-blue-200 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  → Informações do projeto
                </a>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-blue-200 text-sm block">Projeto acadêmico — FIAP</span>
              </li>
              <li>
                <span className="text-blue-200 text-sm block">2º semestre de ADS — 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-blue-300">
            © 2026 AcessoLocal. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#privacidade" className="text-xs text-blue-300 hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#termos" className="text-xs text-blue-300 hover:text-white transition-colors">
              Termos
            </a>
            <a href="#contato" className="text-xs text-blue-300 hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

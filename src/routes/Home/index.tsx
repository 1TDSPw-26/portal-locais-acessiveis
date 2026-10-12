import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Volume2, 
  Accessibility,
  HeartHandshake,
  Star,
  Info
} from 'lucide-react';

// Locais acessíveis em destaque na Home
interface LocalDestaque {
  id: string;
  nome: string;
  categoria: string;
  endereco: string;
  recursos: string[];
  avaliacao: number;
  imagem: string;
}

const LOCAIS_DESTAQUE: LocalDestaque[] = [
  {
    id: '1',
    nome: 'Museu da Inclusão e Arte',
    categoria: 'Cultura',
    endereco: 'Av. Central, 1000 - Centro',
    recursos: ['Rampa de Acesso', 'Audioguia', 'Sinalização em Braille', 'Piso Tátil'],
    avaliacao: 4.9,
    imagem: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    nome: 'Parque Ecológico Acessível',
    categoria: 'Lazer',
    endereco: 'Rua das Flores, 500 - Jardim Botânico',
    recursos: ['Trilhas Adaptadas', 'Banheiros Acessíveis', 'Estacionamento Reservado'],
    avaliacao: 4.8,
    imagem: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    nome: 'Centro Gastronômico Inclusivo',
    categoria: 'Restaurante',
    endereco: 'Praça da Liberdade, 42 - Centro',
    recursos: ['Cardápio em Braille / QR Voz', 'Atendimento em Libras', 'Mesas Adaptadas'],
    avaliacao: 4.7,
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600'
  }
];

export default function Home() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro] = useState('todos');

  const locaisFiltrados = LOCAIS_DESTAQUE.filter(local => {
    const combinaBusca = local.nome.toLowerCase().includes(busca.toLowerCase()) || 
                          local.endereco.toLowerCase().includes(busca.toLowerCase()) ||
                          local.recursos.some(r => r.toLowerCase().includes(busca.toLowerCase()));
    
    const combinaCategoria = categoriaFiltro === 'todos' || local.categoria.toLowerCase() === categoriaFiltro.toLowerCase();

    return combinaBusca && combinaCategoria;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* SEÇÃO HERO */}
      <section 
        className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="hero-title"
      >
        <div className="max-w-6xl mx-auto text-center space-y-8 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-4 py-2 rounded-full text-sm font-medium">
            <Accessibility className="w-5 h-5 text-blue-400" aria-hidden="true" />
            <span>Mapeando cidades para todas as pessoas</span>
          </div>

          <h1 
            id="hero-title" 
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-center"
          >
            Encontre e compartilhe espaços <span className="text-blue-400 decoration-blue-500 underline-offset-8">verdadeiramente acessíveis</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed text-center">
            Sua plataforma para consultar, avaliar e cadastrar locais com acessibilidade física, visual, auditiva e cognitiva.
          </p>

          {/* BARRA DE PESQUISA RÁPIDA */}
          <div className="w-full max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-2xl text-slate-800">
            <form 
              role="search" 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col md:flex-row gap-3"
            >
              <div className="relative flex-grow">
                <label htmlFor="search-home" className="sr-only">
                  Pesquisar por local, endereço ou recurso de acessibilidade
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  id="search-home"
                  type="search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Ex: Rampa, Museu, Braille, Centro..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-100 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-600 border border-slate-200 text-base"
                />
              </div>

              <Link
                to={`/locais${busca ? `?q=${encodeURIComponent(busca)}` : ''}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 focus:ring-4 focus:ring-blue-400 focus:outline-none text-lg shrink-0"
                aria-label="Buscar locais acessíveis"
              >
                <span>Explorar Locais</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </form>
          </div>

          {/* ATALHOS RÁPIDOS */}
          <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300 text-center">
            <span className="text-slate-400">Filtros frequentes:</span>
            <button 
              onClick={() => setBusca('Rampa')} 
              className="hover:text-blue-300 underline focus:ring-2 focus:ring-blue-400 rounded px-1"
            >
              Rampa de Acesso
            </button>
            <button 
              onClick={() => setBusca('Braille')} 
              className="hover:text-blue-300 underline focus:ring-2 focus:ring-blue-400 rounded px-1"
            >
              Sinalização em Braille
            </button>
            <button 
              onClick={() => setBusca('Libras')} 
              className="hover:text-blue-300 underline focus:ring-2 focus:ring-blue-400 rounded px-1"
            >
              Intérprete de Libras
            </button>
          </div>

        </div>
      </section>

      {/* SEÇÃO DE CATEGORIAS / TIPOS DE ACESSIBILIDADE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="recursos-title">
        <div className="text-center mb-12">
          <h2 id="recursos-title" className="text-3xl font-bold text-slate-900">
            Acessibilidade para Todos os Perfis
          </h2>
          <p className="text-slate-600 mt-2 text-lg">
            Avaliamos e classificamos os locais de acordo com necessidades específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
              <Accessibility className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Mobilidade Reduzida</h3>
            <p className="text-slate-600 text-sm">
              Rampas de acesso, elevadores adaptados, portas amplas e banheiros acessíveis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Deficiência Visual</h3>
            <p className="text-slate-600 text-sm">
              Piso tátil, mapas táteis, placas em Braille e suporte a cães-guia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
              <Volume2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Deficiência Auditiva</h3>
            <p className="text-slate-600 text-sm">
              Atendimento em Libras, sistemas de alarme visual e avisos em telas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Neurodiversidade</h3>
            <p className="text-slate-600 text-sm">
              Ambientes de descompressão, iluminação suave e comunicação clara.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO DE LOCAIS EM DESTAQUE */}
      <section className="py-16 bg-slate-100 px-4 sm:px-6 lg:px-8" aria-labelledby="locais-destaque-title">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 id="locais-destaque-title" className="text-3xl font-bold text-slate-900">
                Locais em Destaque
              </h2>
              <p className="text-slate-600 mt-2 text-lg">
                Espaços bem avaliados pela comunidade por suas instalações inclusivas.
              </p>
            </div>

            <Link
              to="/locais"
              className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-900 underline focus:ring-2 focus:ring-blue-600 rounded p-1"
            >
              <span>Ver todos os locais</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locaisFiltrados.map((local) => (
              <article 
                key={local.id} 
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={local.imagem} 
                    alt={`Imagem ilustrativa de ${local.nome}`} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {local.categoria}
                  </span>
                  <div className="absolute top-3 right-3 bg-white/95 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span>{local.avaliacao}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {local.nome}
                    </h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                      <span>{local.endereco}</span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Recursos disponíveis:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {local.recursos.map((recurso, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-blue-600" aria-hidden="true" />
                          {recurso}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/locais/${local.id}`}
                    className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl text-center transition focus:ring-4 focus:ring-blue-500 focus:outline-none"
                    aria-label={`Ver detalhes sobre ${local.nome}`}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CHAMADA PARA CADASTRO DE LOCAIS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
          <HeartHandshake className="w-16 h-16 mx-auto text-blue-200" aria-hidden="true" />
          
          <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold">
            Conhece um local acessível ou gerencia um estabelecimento?
          </h2>
          
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed text-center">
            Ajude-nos a expandir o mapa de acessibilidade. Cadastre novos pontos, compartilhe detalhes de infraestrutura e colabore para uma sociedade inclusiva.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/cadastro"
              className="bg-blue-800 hover:bg-blue-900 text-white border border-blue-500 font-semibold px-8 py-4 rounded-xl transition text-lg focus:ring-4 focus:ring-white focus:outline-none"
            >
              Cadastrar Novo Local
            </Link>

            <Link
              to="/sobre"
              className="bg-blue-800 hover:bg-blue-900 text-white border border-blue-500 font-semibold px-8 py-4 rounded-xl transition text-lg focus:ring-4 focus:ring-white focus:outline-none"
            >
              Saber mais sobre o projeto
            </Link>
          </div>
        </div>
      </section>

{/* SEÇÃO INFORMATIVA DE ACESSIBILIDADE DO SITE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center" aria-labelledby="info-acessibilidade-title">
        <div className="bg-slate-200/60 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4">
            <Info className="w-8 h-8 text-blue-700 shrink-0" aria-hidden="true" />
            <div>
              <h3 id="info-acessibilidade-title" className="font-bold text-slate-900 text-lg">
                Diretrizes e Recursos de Acessibilidade
              </h3>
              <p className="text-slate-600 text-sm">
                Conheça os <a 
                  href="https://www.w3c.br/traducoes/wcag/wcag21-pt-BR/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 font-semibold underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-0.5"
                  aria-label="Conheça os padrões WCAG 2.1 (abre em uma nova aba)"
                >
                  padrões WCAG 2.1
                </a> aplicados neste portal e os atalhos para navegação por teclado.
              </p>
            </div>
          </div>
          <Link
            to="/acessibilidade"
            className="bg-slate-900 text-white font-medium px-5 py-2.5 rounded-lg shrink-0 hover:bg-slate-800 transition focus:ring-4 focus:ring-blue-600 focus:outline-none text-sm inline-flex items-center gap-2"
            aria-label="Mais informações sobre a acessibilidade do portal"
          >
            <span>Mais informações</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
}
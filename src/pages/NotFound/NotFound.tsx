import { Link } from 'react-router-dom'

export default function NotFound(){
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <span className="text-brand-primary text-7xl font-extrabold sm:text-8xl">404</span>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Essa página não foi encontrada
            </h1>
            <p className="max-w-md text-sm text-gray-500">
                O endereço acessado não existe ou foi movido. Volte para a página
                principal e continue explorando os locais acessíveis.
            </p>
            <Link
                to="/"
                className="bg-brand-action mt-4 inline-flex min-h-10.5 items-center justify-center rounded-[7px] px-6 text-[13px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
                Voltar para a página principal
            </Link>
        </div>
    )
}
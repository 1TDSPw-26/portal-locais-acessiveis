import { useState } from 'react';
import type { FormEvent } from 'react';

function Cadastro() {
  const [sucesso, setSucesso] = useState(false);
  const [nomeLocal, setNomeLocal] = useState('');
  const [localCadastrado, setLocalCadastrado] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nome = nomeLocal.trim();
    if (!nome) {
      return;
    }

    setLocalCadastrado(nome);
    setSucesso(true);
    setNomeLocal('');
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-10">
      <h2 className="text-brand-primary mb-2 text-2xl font-bold">
        Cadastrar local
      </h2>
      <p className="mb-6 text-gray-700">
        Página destinada ao cadastro de locais acessíveis.
      </p>

      {sucesso && (
        <div
          role="status"
          className="mb-6 rounded-md border-2 border-green-700 bg-green-50 p-4 font-bold text-green-900"
        >
          Cadastro do local "{localCadastrado}" realizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="nomeLocal" className="font-bold">
            Nome do local:
          </label>
          <input
            id="nomeLocal"
            type="text"
            value={nomeLocal}
            onChange={(e) => {
              setNomeLocal(e.target.value);
              setSucesso(false);
            }}
            required
            className="focus:outline-brand-action w-full rounded-md border border-gray-500 px-3 py-2.5 focus:outline-3 focus:outline-offset-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-brand-action inline-flex min-h-11 items-center rounded-[7px] px-6 font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Confirmar cadastro
          </button>
        </div>
      </form>
    </section>
  );
}

export default Cadastro; 
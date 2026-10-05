import { useState, FormEvent } from 'react';

function Cadastro() {
  const [sucesso, setSucesso] = useState(false);
  const [nomeLocal, setNomeLocal] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nomeLocal.trim()) {
      setSucesso(true);
    }
  };

  return (
    <section>
      <h2>Cadastrar local</h2>
      <p>Página destinada ao cadastro de locais acessíveis.</p>

      {sucesso && (
        <div
          role="alert"
          aria-live="polite"
          className="mensagem-sucesso"
        >
          Cadastro realizado com sucesso!!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeLocal">
            Nome do Local:
          </label>
          <input
            id="nomeLocal"
            type="text"
            value={nomeLocal}
            onChange={(e) => setNomeLocal(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Confirmar Cadastro
        </button>
      </form>
    </section>
  );
}

export default Cadastro;
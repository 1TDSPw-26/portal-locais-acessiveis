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
    <section>
      <h2>Cadastrar local</h2>
      <p>Página destinada ao cadastro de locais acessíveis.</p>

      {sucesso && (
        <div role="status" className="mensagem-sucesso">
          Cadastro do local "{localCadastrado}" realizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeLocal">Nome do local:</label>
          <input
            id="nomeLocal"
            type="text"
            value={nomeLocal}
            onChange={(e) => {
              setNomeLocal(e.target.value);
              setSucesso(false);
            }}
            required
          />
        </div>

        <button type="submit">Confirmar cadastro</button>
      </form>
    </section>
  );
}

export default Cadastro;
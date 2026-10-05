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
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '4px',
            margin: '16px 0',
            border: '1px solid #c3e6cb',
          }}
        >
          ✅ Cadastro realizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="nomeLocal" style={{ display: 'block', marginBottom: '4px' }}>
            Nome do Local:
          </label>
          <input
            id="nomeLocal"
            type="text"
            value={nomeLocal}
            onChange={(e) => setNomeLocal(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', maxWdt: '300px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Confirmar Cadastro
        </button>
      </form>
    </section>
  );
}

export default Cadastro;
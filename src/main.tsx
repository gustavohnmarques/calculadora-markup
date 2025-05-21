// Para usar com Vite + React + TypeScript:
// 1) Rode: npm create vite@latest markup-calculator -- --template react-ts
// 2) Apague todo o conteúdo de src/main.tsx e cole este código.
// 3) Garanta que src/index.css e index.html existam com <div id="root"></div>.

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  const [custo, setCusto] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [margemDesejada, setMargemDesejada] = useState<string>('33');

  const custoNum = parseFloat(custo.replace(',', '.')) || 0;
  const precoNum = parseFloat(preco.replace(',', '.')) || 0;
  const margemNum = parseFloat(margemDesejada.replace(',', '.')) || 0;

  const markup = custoNum === 0 ? 0 : ((precoNum - custoNum) / custoNum) * 100;
  const margemLucro = precoNum === 0 ? 0 : ((precoNum - custoNum) / precoNum) * 100;
  const custoMaxPermitido = precoNum * (1 - margemNum / 100);
  const valorSellOut = custoNum > custoMaxPermitido ? custoNum - custoMaxPermitido : 0;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const styles: Record<string, React.CSSProperties> = {
    container: {
      maxWidth: 600,
      margin: '2rem auto',
      padding: '1rem',
      fontFamily: 'sans-serif',
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    field: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '0.5rem', fontWeight: 'bold' },
    input: { padding: '0.5rem', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' },
    result: { margin: '0.5rem 0', fontSize: '1.1rem' }
  };

  return (
    <div style={styles.container}>
      <h1>Calculadora de Markup & Margem</h1>

      <div style={styles.field}>
        <label style={styles.label}>Custo de Fornecimento (R$)</label>
        <input
          style={styles.input}
          type="text"
          value={custo}
          onChange={e => setCusto(e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Preço de Revenda (R$)</label>
        <input
          style={styles.input}
          type="text"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Margem Mínima Desejada (%)</label>
        <input
          style={styles.input}
          type="text"
          value={margemDesejada}
          onChange={e => setMargemDesejada(e.target.value)}
          placeholder="33"
        />
      </div>

      <div>
        <p style={styles.result}>
          <strong>Markup (%):</strong> {fmt(markup)}
        </p>
        <p style={styles.result}>
          <strong>Margem de Lucro (%):</strong> {fmt(margemLucro)}
        </p>
        <p style={styles.result}>
          <strong>Custo Máximo Permitido (R$):</strong> {fmt(custoMaxPermitido)}
        </p>
        <p style={styles.result}>
          <strong>Valor Sell Out (R$):</strong> {fmt(valorSellOut)}
        </p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

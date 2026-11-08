'use client';

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Ocorreu um erro inesperado</h2>
        <button
          onClick={() => reset()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#0B6E54',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}

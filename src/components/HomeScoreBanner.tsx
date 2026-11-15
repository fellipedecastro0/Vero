'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PROGRESSO_PADRAO,
  carregarProgresso,
  gerarLinkWhatsappGuardiao,
  type VeroProgresso
} from '@/lib/progress-storage';

export default function HomeScoreBanner() {
  const [progresso, setProgresso] = useState<VeroProgresso>(PROGRESSO_PADRAO);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setProgresso(carregarProgresso());
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const jogosCompletos = Object.values(progresso.jogosConcluidos).filter((j) => j.jogadas > 0).length;
  const linkWhatsapp = gerarLinkWhatsappGuardiao(progresso);

  return (
    <section
      style={{
        background: 'var(--ink)',
        color: '#fff',
        borderRadius: 24,
        padding: '24px 26px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        marginTop: 28
      }}
      aria-label="Seu painel de proteção salvo"
    >
      <div>
        <div
          style={{
            color: 'var(--mint2)',
            fontSize: '.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.06em'
          }}
        >
          Seu Score Cidadão neste aparelho
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
          <strong style={{ fontFamily: 'var(--fd)', fontSize: '2.3rem', lineHeight: 1 }}>
            {progresso.scoreCidadania}/100
          </strong>
          <span style={{ color: '#B4D0C4', fontSize: '.95rem' }}>
            {progresso.pontosTotais} pontos · {progresso.ofensivaDias}{' '}
            {progresso.ofensivaDias === 1 ? 'dia' : 'dias'} de ofensiva · {jogosCompletos}/4 arenas jogadas
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/treino" className="btn b-go">
          Ir para Arena de Minigames
        </Link>
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn b-out"
          style={{ color: '#fff', borderColor: '#2E453C', textDecoration: 'none' }}
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-share" />
          </svg>
          Compartilhar com Família
        </a>
      </div>
    </section>
  );
}


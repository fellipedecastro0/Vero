'use client';

import { useEffect, useState } from 'react';
import {
  PROGRESSO_PADRAO,
  carregarProgresso,
  gerarLinkWhatsappGuardiao,
  resetarProgressoPessoal,
  type MinigameId,
  type VeroProgresso
} from '@/lib/progress-storage';
import { falarTexto, pararVoz } from '@/lib/speech';
import PhishingGame from './PhishingGame';
import SpotFakeGame from './SpotFakeGame';
import PixAuditGame from './PixAuditGame';
import VishingGame from './VishingGame';
import OficinaAcePanel from './OficinaAcePanel';

type TelaAtiva = 'hub' | MinigameId | 'oficina';

const CATALOGO_JOGOS: {
  id: MinigameId;
  titulo: string;
  subtitulo: string;
  icone: string;
  imagem: string;
  duracao: string;
  tag: string;
}[] = [
  {
    id: 'caca-golpes',
    titulo: '1. Caça-Golpes (Mensagens)',
    subtitulo:
      'WhatsApp de falso parente, SMS dos Correios e E-mail bancário. Decida na hora e veja o Raio-X das armadilhas.',
    icone: '#i-msg',
    imagem: '/images/games/caca-golpes.jpg',
    duracao: '3 min · 18 cenários',
    tag: 'Mais jogado'
  },
  {
    id: 'site-clone',
    titulo: '2. Qual é o Site Verdadeiro?',
    subtitulo:
      'Duelo lado a lado entre o endereço oficial e um clone quase idêntico. Aprenda a ler o domínio antes da barra.',
    icone: '#i-browser',
    imagem: '/images/games/site-clone.jpg',
    duracao: '2 min · 5 duelos',
    tag: 'Novo'
  },
  {
    id: 'pix-boleto',
    titulo: '3. Hora de Pagar (Pix & Boleto)',
    subtitulo:
      'Audite nome do recebedor, CPF/CNPJ, banco e CRC antes de digitar a senha do banco.',
    icone: '#i-qr',
    imagem: '/images/games/pix-boleto.jpg',
    duracao: '3 min · 5 comprovantes',
    tag: 'Novo'
  },
  {
    id: 'vishing',
    titulo: '4. Ligação Suspeita (Falsa Central)',
    subtitulo:
      'Simulador com voz em português: atenda chamadas da "central do banco" ou suporte técnico e escolha como reagir.',
    icone: '#i-phone',
    imagem: '/images/games/vishing.jpg',
    duracao: '2 min · Áudio + Texto',
    tag: 'Novo'
  }
];

export default function MinigamesHub() {
  const [progresso, setProgresso] = useState<VeroProgresso>(PROGRESSO_PADRAO);
  const [tela, setTela] = useState<TelaAtiva>('hub');
  const [confirmandoReset, setConfirmandoReset] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setProgresso(carregarProgresso());
      const params = new URLSearchParams(window.location.search);
      const jogoParam = params.get('jogo') as TelaAtiva | null;
      if (
        jogoParam &&
        ['caca-golpes', 'site-clone', 'pix-boleto', 'vishing', 'oficina'].includes(jogoParam)
      ) {
        setTela(jogoParam);
      }
    }, 0);
    return () => {
      window.clearTimeout(t);
      pararVoz();
    };
  }, []);

  const abrirJogo = (destino: TelaAtiva) => {
    pararVoz();
    setTela(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const atualizarProgresso = (novo: VeroProgresso) => {
    setProgresso(novo);
  };

  const renderBarraNavegacaoRapida = () => (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <nav className="quick-nav-games" aria-label="Navegação rápida entre minigames">
        <button
          type="button"
          className={`qnav-btn ${tela === 'hub' ? 'active' : ''}`}
          onClick={() => abrirJogo('hub')}
        >
          ⊞ Hub
        </button>
        <button
          type="button"
          className={`qnav-btn ${tela === 'caca-golpes' ? 'active' : ''}`}
          onClick={() => abrirJogo('caca-golpes')}
        >
          1. Mensagens
        </button>
        <button
          type="button"
          className={`qnav-btn ${tela === 'site-clone' ? 'active' : ''}`}
          onClick={() => abrirJogo('site-clone')}
        >
          2. Sites
        </button>
        <button
          type="button"
          className={`qnav-btn ${tela === 'pix-boleto' ? 'active' : ''}`}
          onClick={() => abrirJogo('pix-boleto')}
        >
          3. Pix &amp; Boleto
        </button>
        <button
          type="button"
          className={`qnav-btn ${tela === 'vishing' ? 'active' : ''}`}
          onClick={() => abrirJogo('vishing')}
        >
          4. Ligação
        </button>
        <button
          type="button"
          className={`qnav-btn ${tela === 'oficina' ? 'active' : ''}`}
          onClick={() => abrirJogo('oficina')}
        >
          🎓 Oficina ACE
        </button>
      </nav>
    </div>
  );

  if (tela === 'caca-golpes') {
    return (
      <div style={{ width: '100%' }}>
        {renderBarraNavegacaoRapida()}
        <PhishingGame
          onVoltarHub={() => abrirJogo('hub')}
          onProgressoAtualizado={atualizarProgresso}
        />
      </div>
    );
  }

  if (tela === 'site-clone') {
    return (
      <div style={{ width: '100%' }}>
        {renderBarraNavegacaoRapida()}
        <SpotFakeGame
          onVoltarHub={() => abrirJogo('hub')}
          onProgressoAtualizado={atualizarProgresso}
        />
      </div>
    );
  }

  if (tela === 'pix-boleto') {
    return (
      <div style={{ width: '100%' }}>
        {renderBarraNavegacaoRapida()}
        <PixAuditGame
          onVoltarHub={() => abrirJogo('hub')}
          onProgressoAtualizado={atualizarProgresso}
        />
      </div>
    );
  }

  if (tela === 'vishing') {
    return (
      <div style={{ width: '100%' }}>
        {renderBarraNavegacaoRapida()}
        <VishingGame
          onVoltarHub={() => abrirJogo('hub')}
          onProgressoAtualizado={atualizarProgresso}
        />
      </div>
    );
  }

  if (tela === 'oficina') {
    return (
      <div style={{ width: '100%' }}>
        {renderBarraNavegacaoRapida()}
        <OficinaAcePanel progresso={progresso} onProgressoAtualizado={atualizarProgresso} />
      </div>
    );
  }

  const linkWhatsappGuardiao = gerarLinkWhatsappGuardiao(progresso);

  return (
    <div style={{ width: '100%' }}>
      <div className="no-print">
      {/* Barra de Progresso Real Persistente */}
      <div className="hub-stats" aria-label="Resumo do seu treino salvo neste aparelho">
        <div className="stat-box dark">
          <small>Score de Proteção</small>
          <strong>{progresso.scoreCidadania}/100</strong>
        </div>
        <div className="stat-box">
          <small>Pontos Acumulados</small>
          <strong>{progresso.pontosTotais} pts</strong>
        </div>
        <div className="stat-box">
          <small>Ofensiva Ativa</small>
          <strong>
            {progresso.ofensivaDias} {progresso.ofensivaDias === 1 ? 'dia' : 'dias'}
          </strong>
        </div>
        <div className="stat-box">
          <small>Medalhas Conquistadas</small>
          <strong>{progresso.medalhas.length}</strong>
        </div>
      </div>

      {/* Medalhas se já houver */}
      {progresso.medalhas.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 20,
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--muted)' }}>
            Suas conquistas:
          </span>
          {progresso.medalhas.map((m) => (
            <span
              key={m}
              className="pill"
              style={{ background: 'var(--gsoft)', color: 'var(--gtext)', fontSize: '.8rem' }}
            >
              ★ {m}
            </span>
          ))}
        </div>
      )}

      {/* Grid dos 4 Minigames */}
      <div className="hub-grid">
        {CATALOGO_JOGOS.map((jogo) => {
          const stats = progresso.jogosConcluidos[jogo.id];
          return (
            <button
              key={jogo.id}
              type="button"
              className="game-card"
              onClick={() => abrirJogo(jogo.id)}
            >
              <div className="game-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={jogo.imagem} alt={jogo.titulo} loading="lazy" />
              </div>

              <div className="gc-top">
                <div className="gc-ico" aria-hidden="true">
                  <svg className="ic">
                    <use href={jogo.icone} />
                  </svg>
                </div>
                <span
                  className="pill"
                  style={{
                    background: jogo.tag === 'Novo' ? 'var(--ink)' : 'var(--gsoft)',
                    color: jogo.tag === 'Novo' ? 'var(--mint2)' : 'var(--gtext)',
                    fontSize: '.78rem'
                  }}
                >
                  {jogo.tag}
                </span>
              </div>

              <div>
                <h3>{jogo.titulo}</h3>
                <p style={{ marginTop: 6 }}>{jogo.subtitulo}</p>
              </div>

              <div className="gc-foot">
                <span>
                  {stats.jogadas > 0
                    ? `Jogado ${stats.jogadas}x · Recorde ${stats.melhorScore}%`
                    : jogo.duracao}
                </span>
                <span>Abrir Arena →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Ações extras: Vero Família, Ouvir instrução e Modo Oficina ACE */}
      <div
        style={{
          marginTop: 24,
          background: '#fff',
          borderRadius: 22,
          padding: '20px 22px',
          boxShadow: '0 0 0 1px var(--line)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.15rem', display: 'block' }}>
            Vero Família &amp; Oficina Presencial ACE
          </strong>
          <span style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
            Compartilhe seu progresso com um familiar de confiança no WhatsApp ou abra o painel de
            registro Antes/Depois para oficinas comunitárias.
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button
            type="button"
            className="btn b-out"
            onClick={() =>
              falarTexto(
                'Escolha um dos quatro minigames na tela para treinar contra golpes no WhatsApp, sites falsos, Pix e ligações suspeitas.',
                false,
                true
              )
            }
          >
            <svg className="ic" aria-hidden="true">
              <use href="#i-volume" />
            </svg>
            Ouvir guia
          </button>

          <a
            href={linkWhatsappGuardiao}
            target="_blank"
            rel="noopener noreferrer"
            className="btn b-go"
            style={{ textDecoration: 'none' }}
          >
            <svg className="ic" aria-hidden="true">
              <use href="#i-share" />
            </svg>
            Enviar ao Guardião
          </a>

          <button type="button" className="btn b-ink" onClick={() => abrirJogo('oficina')}>
            <svg className="ic" aria-hidden="true">
              <use href="#i-users" />
            </svg>
            Modo Oficina ACE
          </button>

          {progresso.totalRespondidos > 0 && (
            <button
              type="button"
              className="btn b-out"
              onClick={() => window.print()}
              title="Imprimir resumo de desempenho e medalhas"
            >
              Imprimir Selo Vero
            </button>
          )}

          {progresso.totalRespondidos > 0 && (
            <button
              type="button"
              className="btn b-out"
              style={
                confirmandoReset
                  ? { borderColor: 'var(--red)', color: 'var(--redd)', background: 'var(--rsoft)' }
                  : { color: 'var(--muted)' }
              }
              onClick={() => {
                if (!confirmandoReset) {
                  setConfirmandoReset(true);
                  return;
                }
                const zerado = resetarProgressoPessoal();
                setProgresso(zerado);
                setConfirmandoReset(false);
              }}
            >
              {confirmandoReset ? 'Confirmar: zerar pontos' : 'Zerar progresso'}
            </button>
          )}
        </div>
      </div>
      </div>

      {/* Versão limpa de impressão do Selo Vero */}
      <section className="print-only seal-print" aria-label="Certificado impresso Vero">
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0B6E54', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Vero · Cidadania Digital · Projeto de Extensão ACE UNIEURO
        </div>
        <h2 style={{ fontFamily: 'var(--fd)', fontSize: '2rem', margin: '10px 0 6px' }}>
          Selo de Treinamento contra Golpes Digitais
        </h2>
        <p style={{ margin: '0 0 20px', color: '#45544E' }}>
          Registro de participação e desempenho salvo neste dispositivo em{' '}
          {new Date().toLocaleDateString('pt-BR')}.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ border: '1px solid #D5D2CA', borderRadius: 12, padding: 12 }}>
            <small style={{ color: '#45544E', fontWeight: 700 }}>Score de Proteção</small>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{progresso.scoreCidadania}/100</div>
          </div>
          <div style={{ border: '1px solid #D5D2CA', borderRadius: 12, padding: 12 }}>
            <small style={{ color: '#45544E', fontWeight: 700 }}>Pontos Acumulados</small>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{progresso.pontosTotais} pts</div>
          </div>
          <div style={{ border: '1px solid #D5D2CA', borderRadius: 12, padding: 12 }}>
            <small style={{ color: '#45544E', fontWeight: 700 }}>Taxa de Acertos</small>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {progresso.totalRespondidos > 0
                ? `${Math.round((progresso.totalAcertos / progresso.totalRespondidos) * 100)}%`
                : '0%'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          {CATALOGO_JOGOS.map((jogo) => {
            const st = progresso.jogosConcluidos[jogo.id];
            return (
              <div key={jogo.id} style={{ border: '1px solid #E5E7E3', borderRadius: 10, padding: 10 }}>
                <strong style={{ display: 'block', fontSize: 13 }}>{jogo.titulo}</strong>
                <span style={{ fontSize: 12, color: '#45544E' }}>
                  {st.jogadas > 0
                    ? `Concluído ${st.jogadas}x · Melhor marca: ${st.melhorScore}%`
                    : 'Ainda não realizado'}
                </span>
              </div>
            );
          })}
        </div>

        {progresso.medalhas.length > 0 && (
          <p style={{ margin: '0 0 12px', fontSize: 13 }}>
            <b>Medalhas conquistadas:</b> {progresso.medalhas.join(' · ')}
          </p>
        )}

        <div style={{ borderTop: '1px solid #D5D2CA', paddingTop: 12, fontSize: 11.5, color: '#45544E' }}>
          Autores do Projeto ACE (4º Semestre): Fellipe de Castro &amp; Jhonatgan Magalhães · UNIEURO
        </div>
      </section>
    </div>
  );
}


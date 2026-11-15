'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CARTILHA_GOLPES, PROTOCOLOS_EMERGENCIA } from '@/lib/challenges-data';
import { falarTexto, pararVoz } from '@/lib/speech';
import type { ProtocoloEmergencia } from '@/types/challenge';

const MAPA_TREINO_GOLPE: Record<string, { jogo: string; label: string }> = {
  'cart-parente': { jogo: 'caca-golpes', label: 'Treinar no Caça-Golpes' },
  'cart-mao-fantasma': { jogo: 'vishing', label: 'Treinar em Ligação Suspeita' },
  'cart-pix-errado': { jogo: 'pix-boleto', label: 'Treinar em Pix & Boleto' },
  'cart-taxa': { jogo: 'site-clone', label: 'Treinar em Sites Falsos' },
  'cart-boleto': { jogo: 'pix-boleto', label: 'Treinar em Pix & Boleto' },
  'cart-sms': { jogo: 'caca-golpes', label: 'Treinar no Caça-Golpes' }
};

const PASSOS_BLINDAGEM = [
  {
    id: '2fa-zap',
    titulo: 'Ativar confirmação em duas etapas no WhatsApp',
    detalhe: 'No WhatsApp: Configurações → Conta → Confirmação em duas etapas. Crie um PIN de 6 números que só você sabe.'
  },
  {
    id: 'limite-pix',
    titulo: 'Reduzir limite de Pix noturno no app do banco',
    detalhe: 'Ajuste o limite entre 20h e 6h para o mínimo que você usa (ex.: R$ 300 a R$ 500) e cadastre contas de confiança.'
  },
  {
    id: 'chamadas',
    titulo: 'Ativar filtro de ligações de spam e desconhecidos',
    detalhe: 'Nos ajustes de telefone do Android/iPhone, ative "Identificador de chamadas e spam" para bloquear falsas centrais.'
  },
  {
    id: 'previa-sms',
    titulo: 'Ocultar códigos SMS da tela bloqueada',
    detalhe: 'Evita que alguém veja códigos bancários ou do WhatsApp se olhar sua tela enquanto o aparelho estiver travado.'
  },
  {
    id: 'guardiao',
    titulo: 'Combinar uma palavra-chave ou contato Guardião na família',
    detalhe: 'Antes de qualquer Pix urgente de familiar, ligue para o número antigo salvo na agenda para confirmar.'
  }
];

export default function EmergencyGuide() {
  const [ativo, setAtivo] = useState<ProtocoloEmergencia['id']>('pix');
  const [marcados, setMarcados] = useState<string[]>([]);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem('vero-blindagem-v1');
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) {
          setTimeout(() => setMarcados(parsed), 0);
        }
      }
    } catch {
      // ignore
    }
    return () => {
      pararVoz();
    };
  }, []);

  const alternarPasso = (id: string) => {
    setMarcados((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('vero-blindagem-v1', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const protocolo =
    PROTOCOLOS_EMERGENCIA.find((p) => p.id === ativo) || PROTOCOLOS_EMERGENCIA[0];

  const ouvirProtocolo = () => {
    const texto = `${protocolo.titulo}. Janela crítica: ${protocolo.janelaCritica}. ${protocolo.resumo}. ${protocolo.passos
      .map((passo, idx) => `Passo ${idx + 1}: ${passo.titulo}. ${passo.detalhe}`)
      .join(' ')}`;
    falarTexto(texto, false, true);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tabs dos 4 cenários críticos */}
      <div className="emerg-tabs" role="tablist" aria-label="Escolha o tipo de emergência">
        {PROTOCOLOS_EMERGENCIA.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={ativo === item.id}
            className="emerg-tab"
            onClick={() => {
              pararVoz();
              setAtivo(item.id);
            }}
          >
            <span style={{ fontSize: '1.05rem' }}>{item.titulo}</span>
            <small style={{ color: 'var(--muted)', fontWeight: 600 }}>{item.janelaCritica}</small>
          </button>
        ))}
      </div>

      {/* Passo a passo acionável */}
      <section className="emerg-card" aria-live="polite">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid var(--line)',
            paddingBottom: 14
          }}
        >
          <div>
            <span
              className="pill"
              style={{ background: 'var(--rsoft)', color: 'var(--redd)', fontSize: '.82rem' }}
            >
              URGÊNCIA · {protocolo.janelaCritica}
            </span>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.85rem', margin: '8px 0 4px' }}>
              {protocolo.titulo}
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{protocolo.resumo}</p>
          </div>

          <button type="button" className="btn b-red" onClick={ouvirProtocolo}>
            <svg className="ic" aria-hidden="true">
              <use href="#i-volume" />
            </svg>
            Ouvir passo a passo em voz alta
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {protocolo.passos.map((passo, idx) => (
            <div key={passo.titulo} className="step-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  className="pill"
                  style={{ background: 'var(--red)', color: '#fff', fontSize: '.75rem' }}
                >
                  PASSO {idx + 1}
                </span>
                <strong style={{ fontSize: '1.08rem', color: 'var(--text)' }}>{passo.titulo}</strong>
              </div>
              <p style={{ margin: '4px 0 0', color: 'var(--text)', lineHeight: 1.55 }}>
                {passo.detalhe}
              </p>
              {passo.linkOficialUrl && passo.linkOficialLabel && (
                <div style={{ marginTop: 6 }}>
                  <a
                    href={passo.linkOficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn b-out"
                    style={{ fontSize: '.85rem', textDecoration: 'none' }}
                  >
                    {passo.linkOficialLabel} ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cartilha dos Golpes da Semana */}
      <section style={{ marginTop: 56 }}>
        <div style={{ maxWidth: 680 }}>
          <span className="kicker">Cartilha Ilustrada de Bolso</span>
          <h2 className="h2 display" style={{ margin: '8px 0' }}>
            Principais Golpes em Circulação no Brasil
          </h2>
          <p className="sub">
            Toque em &ldquo;Ouvir resumo&rdquo; para escutar a explicação em voz clara e compartilhar com pais,
            avós e clientes da sua loja.
          </p>
        </div>

        <div className="cartilha-grid">
          {CARTILHA_GOLPES.map((golpe) => (
            <article key={golpe.id} className="cart-card">
              {golpe.imagem && (
                <div className="cart-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={golpe.imagem} alt={golpe.titulo} loading="lazy" />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span
                  className="pill"
                  style={{
                    background: golpe.risco === 'Crítico' ? 'var(--rsoft)' : '#FEF3C7',
                    color: golpe.risco === 'Crítico' ? 'var(--redd)' : '#92400E',
                    fontSize: '.75rem'
                  }}
                >
                  Risco {golpe.risco}
                </span>
                <button
                  type="button"
                  className="btn b-out"
                  style={{ padding: '6px 10px', fontSize: '.8rem' }}
                  onClick={() =>
                    falarTexto(
                      `${golpe.titulo}. Como funciona: ${golpe.comoFunciona}. Sinal de alerta: ${golpe.sinalAlerta}. Como evitar: ${golpe.comoEvitar}.`,
                      false,
                      true
                    )
                  }
                >
                  <svg className="ic" style={{ width: 15, height: 15 }} aria-hidden="true">
                    <use href="#i-volume" />
                  </svg>
                  Ouvir
                </button>
              </div>

              <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', margin: '4px 0 0' }}>
                {golpe.titulo}
              </h3>
              <small style={{ color: 'var(--green)', fontWeight: 700 }}>{golpe.apelido}</small>

              <p style={{ margin: '4px 0', fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                <b>Como funciona:</b> {golpe.comoFunciona}
              </p>
              <p style={{ margin: '2px 0', fontSize: '.92rem', color: 'var(--redd)', lineHeight: 1.45 }}>
                <b>Sinal de alerta:</b> {golpe.sinalAlerta}
              </p>
              <p
                style={{
                  margin: 'auto 0 0',
                  paddingTop: 10,
                  borderTop: '1px solid var(--soft)',
                  fontSize: '.92rem',
                  color: 'var(--gtext)',
                  fontWeight: 600
                }}
              >
                Como evitar: {golpe.comoEvitar}
              </p>

              {MAPA_TREINO_GOLPE[golpe.id] && (
                <Link
                  href={`/treino?jogo=${MAPA_TREINO_GOLPE[golpe.id].jogo}`}
                  style={{
                    marginTop: 8,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: 12,
                    background: 'var(--gsoft)',
                    color: 'var(--gtext)',
                    fontWeight: 700,
                    fontSize: '.86rem',
                    textDecoration: 'none'
                  }}
                >
                  <span>{MAPA_TREINO_GOLPE[golpe.id].label}</span>
                  <span>→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Blindagem Rápida do Celular */}
      <section style={{ marginTop: 56 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '24px 26px',
            boxShadow: '0 0 0 1px var(--line)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16
            }}
          >
            <div>
              <span className="kicker">Prevenção em 5 minutos</span>
              <h2 className="h2 display" style={{ margin: '6px 0 0', fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)' }}>
                Blindagem Rápida do Celular
              </h2>
            </div>
            <span
              className="pill"
              style={{ background: 'var(--gsoft)', color: 'var(--gtext)', fontSize: '.86rem' }}
            >
              {marcados.length} de {PASSOS_BLINDAGEM.length} concluídos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PASSOS_BLINDAGEM.map((passo) => {
              const ok = marcados.includes(passo.id);
              return (
                <button
                  key={passo.id}
                  type="button"
                  onClick={() => alternarPasso(passo.id)}
                  aria-pressed={ok}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    textAlign: 'left',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: `2px solid ${ok ? 'var(--green)' : 'var(--line)'}`,
                    background: ok ? 'var(--gsoft)' : 'var(--bg)',
                    color: 'var(--text)',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      flexShrink: 0,
                      marginTop: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: ok ? 'var(--green)' : '#fff',
                      color: ok ? '#fff' : 'var(--muted)',
                      border: `2px solid ${ok ? 'var(--green)' : 'var(--line)'}`,
                      fontWeight: 800,
                      fontSize: 14
                    }}
                  >
                    {ok ? '✓' : ''}
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', textDecoration: ok ? 'line-through' : 'none' }}>
                      {passo.titulo}
                    </strong>
                    <span style={{ display: 'block', fontSize: '.9rem', color: 'var(--muted)', marginTop: 3, lineHeight: 1.45 }}>
                      {passo.detalhe}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


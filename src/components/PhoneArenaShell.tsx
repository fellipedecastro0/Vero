'use client';

import type { ReactNode } from 'react';

interface PhoneArenaShellProps {
  /** Conteúdo que aparece dentro da tela do smartphone */
  phoneScreen: ReactNode;
  /** Botões/controles fixos na base do celular (opcional) */
  phoneDock?: ReactNode;
  /** Título no painel lateral */
  tituloJogo: string;
  /** Subtítulo curto do progresso (ex: "Mensagem 1 de 6") */
  progressoTexto: string;
  /** Porcentagem 0-100 da barra de progresso */
  progressoPct?: number;
  /** Pontuação / acertos exibidos no painel */
  badgeDireita?: string;
  /** Filtros ou botões extras no painel lateral */
  controlesExtras?: ReactNode;
  /** Card de explicação / resultado ou dicas ao lado do celular */
  painelLateral: ReactNode;
  onVoltarHub?: () => void;
}

export default function PhoneArenaShell({
  phoneScreen,
  phoneDock,
  tituloJogo,
  progressoTexto,
  progressoPct,
  badgeDireita,
  controlesExtras,
  painelLateral,
  onVoltarHub
}: PhoneArenaShellProps) {
  return (
    <div className="phone-stage">
      {/* COLUNA ESQUERDA: CELULAR REALISTA */}
      <div className="sim-phone" role="region" aria-label={`Tela do celular: ${tituloJogo}`}>
        <div className="sim-screen">
          {/* Status bar do smartphone */}
          <div className="sim-status" aria-hidden="true">
            <span>09:41</span>
            <div className="sim-island" />
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
              <span>5G</span>
              <span>🔋 88%</span>
            </span>
          </div>

          {/* Conteúdo rolável do app simulado */}
          <div className="sim-app-scroll">{phoneScreen}</div>

          {/* Dock de decisões ou barra home */}
          <div className="sim-dock">
            {phoneDock}
            <div className="sim-home-bar" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* COLUNA DIREITA: PAINEL DE PROGRESSO, CONTROLES & RAIO-X */}
      <div className="sim-side">
        <div className="sim-side-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {onVoltarHub && (
                <button type="button" className="btn b-out" style={{ minHeight: 36, padding: '0 12px', fontSize: '.85rem' }} onClick={onVoltarHub}>
                  ← Hub
                </button>
              )}
              <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.15rem' }}>{tituloJogo}</strong>
            </div>
            {badgeDireita && (
              <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)', fontSize: '.8rem' }}>
                {badgeDireita}
              </span>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.86rem', color: 'var(--muted)', marginBottom: 6 }}>
              <span>{progressoTexto}</span>
              {typeof progressoPct === 'number' && <b>{Math.round(progressoPct)}%</b>}
            </div>
            {typeof progressoPct === 'number' && (
              <div className="bar" role="progressbar" aria-valuenow={progressoPct} aria-valuemin={0} aria-valuemax={100}>
                <i style={{ width: `${progressoPct}%` }} />
              </div>
            )}
          </div>

          {controlesExtras}
        </div>

        {painelLateral}
      </div>
    </div>
  );
}


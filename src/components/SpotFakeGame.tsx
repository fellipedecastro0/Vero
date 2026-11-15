'use client';

import { useEffect, useState } from 'react';
import { DESAFIOS_SITE_CLONE } from '@/lib/challenges-data';
import { falarTexto, pararVoz } from '@/lib/speech';
import {
  registrarResultadoJogo,
  gerarLinkWhatsappGuardiao,
  tocarSomFeedback,
  type VeroProgresso
} from '@/lib/progress-storage';
import PhoneArenaShell from './PhoneArenaShell';

interface SpotFakeGameProps {
  onVoltarHub?: () => void;
  onProgressoAtualizado?: (progresso: VeroProgresso) => void;
}

export default function SpotFakeGame({
  onVoltarHub,
  onProgressoAtualizado
}: SpotFakeGameProps) {
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [escolhidoIdx, setEscolhidoIdx] = useState<number | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [progressoSalvo, setProgressoSalvo] = useState<VeroProgresso | null>(null);

  useEffect(() => {
    return () => {
      pararVoz();
    };
  }, []);

  const total = DESAFIOS_SITE_CLONE.length;
  const atual = DESAFIOS_SITE_CLONE[indice] || DESAFIOS_SITE_CLONE[0];
  const respondido = escolhidoIdx !== null;
  const acertouAtual = respondido && atual.opcoes[escolhidoIdx].isVerdadeiro;

  const escolherSite = (idx: 0 | 1) => {
    if (respondido) return;
    setEscolhidoIdx(idx);
    const acertou = atual.opcoes[idx].isVerdadeiro;
    tocarSomFeedback(acertou);

    if (acertou) {
      setAcertos((prev) => prev + 1);
      falarTexto(`Acertou! ${atual.explicacao}`);
    } else {
      falarTexto(`Cuidado, esse é o site falso! ${atual.explicacao}`);
    }
  };

  const avancar = () => {
    pararVoz();
    if (indice + 1 < total) {
      setIndice((prev) => prev + 1);
      setEscolhidoIdx(null);
    } else {
      const novo = registrarResultadoJogo('site-clone', acertos, total);
      setProgressoSalvo(novo);
      onProgressoAtualizado?.(novo);
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    pararVoz();
    setIndice(0);
    setAcertos(0);
    setEscolhidoIdx(null);
    setFinalizado(false);
    setProgressoSalvo(null);
  };

  if (finalizado) {
    const taxa = Math.round((acertos / total) * 100);
    const linkZap = progressoSalvo
      ? gerarLinkWhatsappGuardiao(
          progressoSalvo,
          'Qual é o Site Verdadeiro?',
          `${acertos} de ${total} sites conferidos corretamente (${taxa}%).`
        )
      : '#';

    return (
      <div className="arena">
        <div className="arena-head">
          <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
            Treino Concluído · {acertos}/{total} acertos
          </span>
          {onVoltarHub && (
            <button type="button" className="btn b-out" onClick={onVoltarHub}>
              Voltar ao Hub
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div className="eyebrow" style={{ color: 'var(--green)' }}>
            OLHO CLÍNICO NO ENDEREÇO
          </div>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.85rem', margin: '8px 0' }}>
            Você identificou {acertos} de {total} sites oficiais
          </h3>
          <p style={{ margin: '0 auto', maxWidth: 520, color: 'var(--muted)' }}>
            O cadeado HTTPS não prova que o site é verdadeiro — ele só criptografa a conexão. Leia
            sempre o domínio antes da primeira barra &quot;/&quot;.
          </p>
        </div>

        <div className="arena-acts">
          <button type="button" className="bigbtn b-go" onClick={reiniciar}>
            Jogar Novamente
          </button>
          {progressoSalvo ? (
            <a
              href={linkZap}
              target="_blank"
              rel="noopener noreferrer"
              className="bigbtn b-out"
              style={{ textDecoration: 'none' }}
            >
              <svg className="ic" aria-hidden="true">
                <use href="#i-share" />
              </svg>
              Avisar Família no WhatsApp
            </a>
          ) : (
            onVoltarHub && (
              <button type="button" className="bigbtn b-out" onClick={onVoltarHub}>
                Escolher outro minigame
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  const phoneScreen = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#EEF2EC' }}>
      {/* Topo claro e acessível */}
      <div
        style={{
          background: '#0B1310',
          color: '#fff',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--mint2)', fontWeight: 700, textTransform: 'uppercase' }}>
            Qual endereço é verdadeiro?
          </div>
          <strong style={{ fontSize: 15, fontFamily: 'var(--fd)' }}>{atual.marca}</strong>
        </div>
        <button
          type="button"
          className="listen"
          onClick={() =>
            falarTexto(
              `${atual.contexto}. Site 1: ${atual.opcoes[0].url}. Site 2: ${atual.opcoes[1].url}. Toque no site verdadeiro.`,
              false,
              true
            )
          }
          aria-label="Ouvir os dois endereços"
          style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.16)', color: '#fff' }}
        >
          <svg className="ic" style={{ width: 18, height: 18 }}>
            <use href="#i-volume" />
          </svg>
        </button>
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p
          style={{
            margin: 0,
            background: '#fff',
            borderRadius: 14,
            padding: '10px 12px',
            fontSize: 13.5,
            lineHeight: 1.4,
            color: 'var(--text)',
            border: '1px solid var(--line)',
            fontWeight: 700
          }}
        >
          {atual.contexto}
        </p>

        {atual.opcoes.map((site, idx) => {
          const isChosen = escolhidoIdx === idx;
          let borderColor = '#C7D1C8';
          let bgColor = '#FFFFFF';
          if (respondido) {
            if (site.isVerdadeiro) {
              borderColor = 'var(--green)';
              bgColor = '#E7F6EF';
            } else if (isChosen) {
              borderColor = 'var(--red)';
              bgColor = '#FDECEC';
            }
          }

          return (
            <button
              key={site.url}
              type="button"
              disabled={respondido}
              onClick={() => escolherSite(idx as 0 | 1)}
              aria-label={`Site ${idx + 1}: ${site.url}`}
              style={{
                width: '100%',
                textAlign: 'left',
                borderRadius: 18,
                border: `2.5px solid ${borderColor}`,
                background: bgColor,
                padding: 0,
                overflow: 'hidden',
                boxShadow: '0 6px 16px -10px rgba(11,19,16,.28)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Cabeçalho nítido Site 1 / Site 2 */}
              <div
                style={{
                  background: '#172C25',
                  color: '#fff',
                  padding: '7px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <strong style={{ fontSize: 13, letterSpacing: '.02em' }}>SITE {idx + 1}</strong>
                {respondido ? (
                  <span
                    style={{
                      background: site.isVerdadeiro ? '#0B6E54' : '#B42318',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '2px 9px',
                      borderRadius: 99
                    }}
                  >
                    {site.isVerdadeiro ? '✓ OFICIAL' : '✕ SITE FALSO'}
                  </span>
                ) : (
                  <span style={{ fontSize: 11.5, color: 'var(--mint2)', fontWeight: 700 }}>
                    Toque para escolher
                  </span>
                )}
              </div>

              {/* Barra de endereço GRANDE e de alto contraste */}
              <div
                style={{
                  background: '#F4F7F4',
                  padding: '10px 12px',
                  borderBottom: '1px solid #D9DFD6',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  width: '100%'
                }}
              >
                <svg
                  className="ic"
                  style={{
                    width: 17,
                    height: 17,
                    marginTop: 2,
                    color: site.temCadeadoSsl ? 'var(--green)' : 'var(--red)',
                    flexShrink: 0
                  }}
                  aria-hidden="true"
                >
                  <use href={site.temCadeadoSsl ? '#i-lock' : '#i-unlock'} />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0B1310',
                    wordBreak: 'break-all',
                    lineHeight: 1.38
                  }}
                >
                  {site.url}
                </span>
              </div>

              {/* Resumo legível do site */}
              <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                <b style={{ fontSize: 15, color: '#0B1310', fontFamily: 'var(--fd)' }}>{site.tituloPagina}</b>
                <span style={{ fontSize: 13, color: '#3F4F49', lineHeight: 1.35 }}>{site.subtitulo}</span>

                {respondido && (
                  <div
                    style={{
                      marginTop: 6,
                      padding: '6px 9px',
                      borderRadius: 8,
                      background: site.isVerdadeiro ? '#D1EFE1' : '#FAD7D4',
                      color: site.isVerdadeiro ? '#074A38' : '#8F1B12',
                      fontFamily: 'var(--fm)',
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    Endereço principal: {site.destaqueDominio}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const phoneDock = !respondido ? (
    <div className="sim-dock-acts">
      <button type="button" className="bigbtn b-ink" onClick={() => escolherSite(0)}>
        Site 1 é real
      </button>
      <button type="button" className="bigbtn b-ink" onClick={() => escolherSite(1)}>
        Site 2 é real
      </button>
    </div>
  ) : (
    <button type="button" className="bigbtn b-ink" onClick={avancar} style={{ minHeight: 46, fontSize: '.95rem' }}>
      {indice + 1 < total ? 'Próximo Duelo →' : 'Ver Resultado Final'}
    </button>
  );

  const painelLateral = (
    <>
      {respondido ? (
        <div
          className="sim-side-card"
          role="status"
          aria-live="polite"
          style={{
            background: acertouAtual ? '#E7F6EF' : '#FDECEC',
            color: acertouAtual ? '#074A38' : '#8F1B12',
            border: `2px solid ${acertouAtual ? 'var(--green)' : 'var(--red)'}`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                background: acertouAtual ? 'var(--green)' : 'var(--red)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 99
              }}
            >
              {acertouAtual ? '✓ VOCÊ ACERTOU!' : '✕ VOCÊ ERROU'}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 800 }}>
              {acertouAtual ? 'Site oficial identificado' : 'Você escolheu o site CLONE'}
            </span>
          </div>

          <div
            style={{
              background: '#fff',
              color: '#10201B',
              borderRadius: 12,
              padding: '12px 14px',
              border: '1px solid rgba(11,19,16,.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div style={{ fontSize: '.92rem', lineHeight: 1.5 }}>
              <b>Por quê? </b>
              {atual.explicacao}
            </div>
            <div style={{ fontSize: '.86rem', fontWeight: 700, color: '#0B6E54' }}>
              Dica visual: {atual.dicaVisual}
            </div>
          </div>
        </div>
      ) : (
        <div className="sim-side-card">
          <strong style={{ fontSize: '1.05rem' }}>Regra simples para nunca errar:</strong>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: '.94rem', lineHeight: 1.55 }}>
            <li>Leia sempre o endereço na faixa cinza logo abaixo do nome <b>SITE 1</b> e <b>SITE 2</b>.</li>
            <li>Desconfie de finais estranhos como <code>.top</code>, <code>.xyz</code> ou <code>.online</code>.</li>
            <li>Toque no cartão desejado ou nos botões <b>Site 1 / Site 2</b> embaixo do celular.</li>
          </ul>
        </div>
      )}
    </>
  );

  return (
    <PhoneArenaShell
      phoneScreen={phoneScreen}
      phoneDock={phoneDock}
      tituloJogo="Qual é o Site Verdadeiro?"
      progressoTexto={`Duelo ${indice + 1} de ${total} · ${atual.marca}`}
      progressoPct={((indice + 1) / total) * 100}
      badgeDireita={`Acertos: ${acertos}`}
      onVoltarHub={onVoltarHub}
      controlesExtras={
        <button
          type="button"
          className="btn b-out"
          style={{ width: '100%', minHeight: 42, fontSize: '.9rem' }}
          onClick={() =>
            falarTexto(
              `${atual.contexto}. Compare os endereços Site 1 e Site 2 na tela do celular e toque no site verdadeiro.`,
              false,
              true
            )
          }
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-volume" />
          </svg>
          Ouvir cenário em voz alta
        </button>
      }
      painelLateral={painelLateral}
    />
  );
}

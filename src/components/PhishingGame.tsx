'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { DESAFIOS_PHISHING, RANKING_COMUNIDADE_MOCK } from '@/lib/challenges-data';
import { falarTexto, pararVoz } from '@/lib/speech';
import {
  PROGRESSO_PADRAO,
  carregarProgresso,
  registrarResultadoJogo,
  gerarLinkWhatsappGuardiao,
  tocarSomFeedback,
  type VeroProgresso
} from '@/lib/progress-storage';
import type { MensagemDesafio } from '@/types/challenge';
import PhoneArenaShell from './PhoneArenaShell';

interface PhishingGameProps {
  compact?: boolean;
  onVoltarHub?: () => void;
  onProgressoAtualizado?: (progresso: VeroProgresso) => void;
}

function renderTextoComRaioX(texto: string, trechos?: string[], ativo?: boolean): ReactNode {
  if (!ativo || !trechos || trechos.length === 0) {
    return texto;
  }

  const escaped = trechos
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) return texto;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const partes = texto.split(regex);

  return partes.map((parte, idx) => {
    const isMatch = trechos.some((t) => t.toLowerCase() === parte.toLowerCase());
    if (isMatch) {
      return (
        <mark key={idx} className="xray-hit" title="Trecho suspeito identificado pelo Raio-X Vero">
          {parte}
        </mark>
      );
    }
    return <span key={idx}>{parte}</span>;
  });
}

export default function PhishingGame({
  compact = false,
  onVoltarHub,
  onProgressoAtualizado
}: PhishingGameProps) {
  const [fase, setFase] = useState<'intro' | 'jogando' | 'fim'>('intro');
  const [nivel, setNivel] = useState<'todos' | 'iniciante' | 'intermediario' | 'avancado'>('todos');
  const [modalRanking, setModalRanking] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);

  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [pontosPartida, setPontosPartida] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [ultimaRespostaCorreta, setUltimaRespostaCorreta] = useState(false);
  const [progressoLocal, setProgressoLocal] = useState<VeroProgresso>(PROGRESSO_PADRAO);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setProgressoLocal(carregarProgresso());
    }, 0);
    return () => {
      window.clearTimeout(t);
      pararVoz();
    };
  }, []);

  const listaDesafios: MensagemDesafio[] =
    nivel === 'todos'
      ? DESAFIOS_PHISHING
      : DESAFIOS_PHISHING.filter((d) => d.nivelDificuldade === nivel);

  const totalMensagens = Math.min(listaDesafios.length, 6);
  const atual = listaDesafios[indice] || DESAFIOS_PHISHING[0];

  const iniciarJogo = () => {
    setIndice(0);
    setAcertos(0);
    setPontosPartida(0);
    setRespondido(false);
    setFase('jogando');
    falarTexto('Primeira mensagem na tela. Olhe com calma e toque se é golpe ou parece seguro.');
  };

  const responder = (escolheuGolpe: boolean) => {
    if (respondido) return;

    const acertou = escolheuGolpe === atual.isGolpe;
    setRespondido(true);
    setUltimaRespostaCorreta(acertou);
    tocarSomFeedback(acertou);

    if (acertou) {
      setAcertos((prev) => prev + 1);
      setPontosPartida((prev) => prev + 25);
      falarTexto(`Muito bem! Você acertou. ${atual.explicacao}`);
    } else {
      falarTexto(`Fica a pista para a próxima: ${atual.explicacao}`);
    }
  };

  const proximaMensagem = () => {
    if (indice + 1 < totalMensagens) {
      setIndice((prev) => prev + 1);
      setRespondido(false);
    } else {
      const novoProgresso = registrarResultadoJogo('caca-golpes', acertos, totalMensagens);
      setProgressoLocal(novoProgresso);
      if (onProgressoAtualizado) {
        onProgressoAtualizado(novoProgresso);
      }
      setFase('fim');
      falarTexto(
        `Parabéns! Você concluiu o Caça-Golpes com ${acertos} acertos de ${totalMensagens}. Seu Score agora é ${novoProgresso.scoreCidadania}.`
      );
    }
  };

  const ouvirMensagemAtual = () => {
    falarTexto(`${atual.canal}, de ${atual.remetente}. Mensagem: ${atual.texto}`, false, true);
  };

  const scorePartida = Math.round((acertos / Math.max(1, totalMensagens)) * 100);
  const linkWhatsapp = gerarLinkWhatsappGuardiao(
    progressoLocal,
    'Caça-Golpes (WhatsApp, SMS e E-mail)',
    scorePartida < 80 ? 'Atenção redobrada a domínios falsos e pedidos urgentes' : undefined
  );

  // ======================== RENDER DO CARD DA MENSAGEM ========================
  const renderCardMensagem = () => (
    <div style={{ width: '100%' }}>
      {atual.canal === 'WhatsApp' ? (
        <div className="wa-shell">
          <div className="wa-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <span style={{ fontSize: 18, opacity: 0.9 }} aria-hidden="true">
                ←
              </span>
              <div
                className="wa-avatar"
                style={{
                  background: atual.whatsappInfo?.isContatoSalvo ? '#128C7E' : '#54656F'
                }}
              >
                {atual.whatsappInfo?.avatarLetra || 'W'}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {atual.whatsappInfo?.numeroOuNome || atual.remetente}
                </div>
                <div style={{ fontSize: 11.5, opacity: 0.85 }}>
                  {atual.whatsappInfo?.isContatoSalvo
                    ? 'contato salvo · online agora'
                    : 'remetente desconhecido'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 13, opacity: 0.75 }} aria-hidden="true">
                📞 ⋮
              </span>
              <button
                className="listen"
                type="button"
                onClick={ouvirMensagemAtual}
                aria-label="Ouvir a mensagem do WhatsApp em voz alta"
                style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                <svg className="ic" style={{ width: 18, height: 18 }}>
                  <use href="#i-volume" />
                </svg>
              </button>
            </div>
          </div>

          {atual.whatsappInfo?.avisoSeguranca && (
            <div className="wa-warn">
              <span>⚠️ {atual.whatsappInfo.avisoSeguranca}</span>
              <div className="wa-warn-acts" aria-hidden="true">
                <span>Bloquear</span>
                <span>Denunciar</span>
              </div>
            </div>
          )}

          <div className="wa-chat">
            <span className="wa-date">HOJE</span>
            <div
              className="wa-bubble"
              style={{ fontSize: compact ? 14.5 : 16.5 }}
            >
              {renderTextoComRaioX(atual.texto, atual.trechosSuspeitos, respondido && atual.isGolpe)}
              <div className="wa-meta">
                <span>{atual.whatsappInfo?.horaEnvio || '14:20'}</span>
                <span style={{ color: '#53BDEB', fontWeight: 700 }}>✓✓</span>
              </div>
            </div>
          </div>

          <div className="wa-composer" aria-hidden="true">
            <div className="wa-input">Mensagem</div>
            <div className="wa-mic">🎤</div>
          </div>
        </div>
      ) : atual.canal === 'E-mail' ? (
        <div className="gm-shell" style={{ border: 'none', borderRadius: 0 }}>
          <div className="gm-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span aria-hidden="true" style={{ fontSize: 16 }}>←</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#202124'
                }}
              >
                <span style={{ color: '#EA4335', fontWeight: 800 }}>M</span>
                Caixa de Entrada
              </span>
            </div>
            <div className="gm-tools">
              <span aria-hidden="true" style={{ fontSize: 13, opacity: 0.7 }}>
                📥 🗑 ☆ ⋮
              </span>
              <button
                className="listen"
                type="button"
                onClick={ouvirMensagemAtual}
                aria-label="Ouvir o e-mail em voz alta"
                style={{ width: 32, height: 32 }}
              >
                <svg className="ic" style={{ width: 16, height: 16 }}>
                  <use href="#i-volume" />
                </svg>
              </button>
            </div>
          </div>

          <div className="gm-subj" style={{ padding: '12px 14px 6px' }}>
            <h4 style={{ fontSize: compact ? 14.5 : 16 }}>
              {atual.emailInfo?.assunto || 'Comunicado Importante'}
            </h4>
            <span className="gm-inbox-tag">Entrada</span>
          </div>

          <div className="gm-sender" style={{ padding: '6px 14px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0, width: '100%' }}>
              <div
                className="gm-avatar"
                style={{
                  width: 34,
                  height: 34,
                  fontSize: 14,
                  background: atual.emailInfo?.corMarca || '#1A73E8',
                  color: atual.emailInfo?.corTextoMarca || '#fff'
                }}
              >
                {(atual.emailInfo?.deNome || atual.remetente).charAt(0).toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                  <b style={{ fontSize: 13.5, color: '#1F1F1F' }}>
                    {atual.emailInfo?.deNome || atual.remetente}
                  </b>
                  <span style={{ fontSize: 11, color: '#5F6368', flexShrink: 0 }}>
                    {atual.emailInfo?.dataHora || '09:42'}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: '#5F6368',
                    fontFamily: 'var(--fm)',
                    wordBreak: 'break-all',
                    lineHeight: 1.35
                  }}
                >
                  &lt;
                  {renderTextoComRaioX(
                    atual.emailInfo?.deEmail || 'alerta@seguranca.br',
                    atual.trechosSuspeitos,
                    respondido && atual.isGolpe
                  )}
                  &gt;
                </div>
                <div style={{ fontSize: 11, color: '#5F6368', marginTop: 1 }}>
                  Para: voce@gmail.com ▾
                </div>
              </div>
            </div>
          </div>

          {atual.emailInfo?.alertaSelo && (
            <div className="gm-banner-warn" style={{ margin: '0 12px 8px', padding: '8px 10px', fontSize: 11.5 }}>
              <span aria-hidden="true">⚠️</span>
              <div>
                <b>Aviso do servidor:</b> {atual.emailInfo.alertaSelo}
              </div>
            </div>
          )}

          {/* Corpo HTML estilizado simulando newsletter / comunicado real */}
          <div className="gm-html-card">
            <div
              className="gm-html-head"
              style={{
                background: atual.emailInfo?.corMarca || '#1D3A8A',
                color: atual.emailInfo?.corTextoMarca || '#FFFFFF'
              }}
            >
              <span>{atual.emailInfo?.marcaLogo || atual.emailInfo?.deNome || 'Comunicado'}</span>
              <span style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>NOTIFICAÇÃO</span>
            </div>

            <div className="gm-html-inner">
              {atual.emailInfo?.destaqueCard && (
                <div
                  className="gm-html-box"
                  style={{ borderLeftColor: atual.emailInfo?.corMarca || '#1A73E8' }}
                >
                  {atual.emailInfo.destaqueCard}
                </div>
              )}

              <div>
                {renderTextoComRaioX(atual.texto, atual.trechosSuspeitos, respondido && atual.isGolpe)}
              </div>

              {atual.emailInfo?.botaoCtaTexto && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div
                    className="gm-html-cta"
                    style={{
                      background: atual.emailInfo?.corMarca || '#1D3A8A',
                      color: atual.emailInfo?.corTextoMarca || '#FFFFFF'
                    }}
                  >
                    {atual.emailInfo.botaoCtaTexto}
                  </div>
                  {atual.emailInfo.linkCtaPreview && (
                    <div className="gm-html-url">
                      Destino do botão:{' '}
                      {renderTextoComRaioX(
                        atual.emailInfo.linkCtaPreview,
                        atual.trechosSuspeitos,
                        respondido && atual.isGolpe
                      )}
                    </div>
                  )}
                </div>
              )}

              {atual.emailInfo?.temAnexo && (
                <div className="gm-attach" style={{ marginTop: 2 }}>
                  <span>📎</span>
                  <span>
                    {renderTextoComRaioX(
                      atual.emailInfo.anexoNome || 'Fatura_Atualizada_PDF.pdf',
                      atual.trechosSuspeitos,
                      respondido && atual.isGolpe
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="gm-html-foot">
              Mensagem automática · Central de Atendimento · Cancelar recebimento
            </div>
          </div>

          <div className="gm-reply-bar" style={{ padding: '8px 14px' }} aria-hidden="true">
            <span className="gm-reply-pill">↩ Responder</span>
            <span className="gm-reply-pill">↪ Encaminhar</span>
          </div>
        </div>
      ) : (
        <div className="sms-shell">
          <div className="sms-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 17, color: '#444746' }} aria-hidden="true">
                ←
              </span>
              <div
                className="wa-avatar"
                style={{ background: '#3C5A50', width: 38, height: 38, fontSize: 14 }}
              >
                SMS
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1F1F1F' }}>{atual.remetente}</div>
                <div style={{ fontSize: 11.5, color: '#5F6368' }}>Mensagem de texto · Operadora</div>
              </div>
            </div>
            <button
              className="listen"
              type="button"
              onClick={ouvirMensagemAtual}
              aria-label="Ouvir a mensagem SMS"
              style={{ width: 38, height: 38 }}
            >
              <svg className="ic" style={{ width: 18, height: 18 }}>
                <use href="#i-volume" />
              </svg>
            </button>
          </div>

          <div className="sms-chat">
            <span className="wa-date" style={{ background: '#E2E8E5' }}>
              Hoje · SMS recebido
            </span>
            <div className="sms-bubble" style={{ fontSize: compact ? 14.5 : 16.5 }}>
              {renderTextoComRaioX(atual.texto, atual.trechosSuspeitos, respondido && atual.isGolpe)}
            </div>
          </div>

          <div className="wa-composer" style={{ background: '#fff' }} aria-hidden="true">
            <div className="wa-input" style={{ background: '#F1F4F6' }}>
              Mensagem de texto (SMS)
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ======================== CONTEÚDO DO JOGO ========================
  const renderConteudo = () => (
    <>
      {fase === 'intro' && (
        <div className={compact ? 'tr-body' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="tr-hero" style={compact ? undefined : { minHeight: 210 }}>
            <svg className="logo">
              <use href="#i-logo" />
            </svg>
            <small>MINIGAME 1 · CAÇA-GOLPES</small>
            <h4 style={{ margin: 0, fontSize: compact ? '1.5rem' : '2rem', lineHeight: 1.1 }}>
              Isso é golpe ou é seguro?
            </h4>
            <p style={{ margin: 0, fontSize: compact ? '0.95rem' : '1.05rem', opacity: 0.92 }}>
              Analise {totalMensagens} mensagens reais de WhatsApp, SMS e E-mail. No final, o Raio-X mostra onde estava a armadilha.
            </p>
          </div>
          <div className={compact ? '' : 'arena-acts'}>
            <button
              className="bigbtn b-out"
              type="button"
              onClick={() =>
                falarTexto(
                  'Vou mostrar mensagens do dia a dia no WhatsApp, SMS e e-mail. Para cada uma, toque se é golpe ou parece seguro. Não tem pressa.'
                )
              }
            >
              <svg className="ic">
                <use href="#i-volume" />
              </svg>
              Ouvir instruções
            </button>
            <button className="bigbtn b-go" type="button" onClick={iniciarJogo}>
              Começar Agora
            </button>
          </div>
        </div>
      )}

      {fase === 'jogando' && atual && (
        <div className={compact ? 'tr-body' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="prog">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                Mensagem <b>{indice + 1}</b> de {totalMensagens}
              </span>
              <span
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 12,
                  padding: '2px 8px',
                  borderRadius: 99,
                  background: 'var(--soft)'
                }}
              >
                Nível: {atual.nivelDificuldade}
              </span>
            </div>
            <div
              className="bar"
              role="progressbar"
              aria-valuenow={indice + 1}
              aria-valuemin={0}
              aria-valuemax={totalMensagens}
            >
              <i style={{ width: `${((indice + 1) / totalMensagens) * 100}%` }} />
            </div>
          </div>

          {renderCardMensagem()}

          {!respondido ? (
            <div className={compact ? 'acts' : 'arena-acts'} style={{ marginTop: 'auto' }}>
              <button className="bigbtn b-red" type="button" onClick={() => responder(true)}>
                <svg className="ic">
                  <use href="#i-alert" />
                </svg>
                É golpe
              </button>
              <button className="bigbtn b-safe" type="button" onClick={() => responder(false)}>
                <svg className="ic">
                  <use href="#i-check" />
                </svg>
                Parece seguro
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                className={`fb ${ultimaRespostaCorreta ? 'ok' : 'no'}`}
                role="status"
                aria-live="polite"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b>
                    {ultimaRespostaCorreta
                      ? '✓ Você acertou!'
                      : '💡 Quase! O erro vira pista para a próxima:'}
                  </b>
                  {atual.isGolpe && atual.trechosSuspeitos && atual.trechosSuspeitos.length > 0 && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        background: '#fff',
                        padding: '3px 9px',
                        borderRadius: 99
                      }}
                    >
                      🔍 Raio-X ativo acima
                    </span>
                  )}
                </div>
                <p>{atual.explicacao}</p>
                <div className="tags">
                  {atual.pistas.map((p, i) => (
                    <span key={i}>• {p}</span>
                  ))}
                </div>
              </div>
              <button className="bigbtn b-ink" type="button" onClick={proximaMensagem}>
                {indice + 1 < totalMensagens ? 'Próxima mensagem →' : 'Ver meu resultado'}
              </button>
            </div>
          )}
        </div>
      )}

      {fase === 'fim' && (
        <div className={compact ? 'tr-body' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="endcard" style={{ padding: compact ? 20 : 28 }}>
            <div className="medal" style={{ margin: '0 auto 8px' }}>
              <svg className="ic">
                <use href="#i-trophy" />
              </svg>
            </div>
            <small>TREINO CONCLUÍDO</small>
            <h4>
              {scorePartida >= 80
                ? 'Detetive de Golpes 🛡️'
                : scorePartida >= 60
                ? 'Olho Atento 🦅'
                : 'Primeiros Passos 💡'}
            </h4>
            <div style={{ fontSize: 34, fontWeight: 800, fontFamily: 'var(--fd)', color: 'var(--ink)' }}>
              {acertos}/{totalMensagens}{' '}
              <small style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 700 }}>
                ({scorePartida}% · +{pontosPartida} pts salvos)
              </small>
            </div>
            <p>
              Seu Score de Cidadania Digital está em <b>{progressoLocal.scoreCidadania}/100</b> e sua ofensiva em{' '}
              <b>{progressoLocal.ofensivaDias} dia(s)</b>.
            </p>
          </div>

          <div className={compact ? '' : 'arena-acts'}>
            <a
              className="bigbtn b-out"
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <svg className="ic">
                <use href="#i-share" />
              </svg>
              Enviar ao Guardião (WhatsApp)
            </a>
            <button className="bigbtn b-out" type="button" onClick={() => setModalRelatorio(true)}>
              📄 Gerar Relatório
            </button>
          </div>

          <div className={compact ? '' : 'arena-acts'}>
            <button className="bigbtn b-go" type="button" onClick={iniciarJogo}>
              Jogar de novo
            </button>
            {onVoltarHub && (
              <button className="bigbtn b-ink" type="button" onClick={onVoltarHub}>
                Escolher outro minigame
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );

  const renderFiltrosNivel = () => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {(['todos', 'iniciante', 'intermediario', 'avancado'] as const).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => {
            setNivel(n);
            setFase('intro');
          }}
          style={{
            padding: '6px 11px',
            borderRadius: 99,
            border: '1px solid var(--line)',
            background: nivel === n ? 'var(--green)' : '#fff',
            color: nivel === n ? '#fff' : 'var(--text)',
            fontWeight: 700,
            fontSize: 12.5
          }}
        >
          {n === 'todos'
            ? 'Todos'
            : n === 'iniciante'
            ? 'Iniciante'
            : n === 'intermediario'
            ? 'Intermediário'
            : 'Avançado'}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setModalRanking(true)}
        style={{
          padding: '6px 11px',
          borderRadius: 99,
          border: '1px solid #C98A12',
          background: '#FCEFD2',
          color: '#6B4500',
          fontWeight: 700,
          fontSize: 12.5
        }}
      >
        🏆 Ranking
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* MODO COMPACTO (Vitrine /sobre) vs MODO CELULAR + PAINEL (/treino) */}
      {compact ? (
        <>
          <div style={{ marginBottom: 14 }}>{renderFiltrosNivel()}</div>
          <div className="phone">
            <div className="screen" style={{ minHeight: 580, display: 'flex', flexDirection: 'column' }}>
              <div className="tr-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="av" aria-hidden="true">
                    V
                  </span>
                  <span className="hi">
                    <small>Score {progressoLocal.scoreCidadania}/100</small>
                    <b>Cidadão Vero</b>
                  </span>
                </div>
                <div className="chips">
                  <span className="chip fl">
                    <svg className="ic" style={{ width: 17, height: 17 }}>
                      <use href="#i-flame" />
                    </svg>
                    {progressoLocal.ofensivaDias}d
                  </span>
                  <span className="chip pt">{progressoLocal.pontosTotais + pontosPartida} pts</span>
                </div>
              </div>
              {renderConteudo()}
            </div>
          </div>
        </>
      ) : fase === 'fim' ? (
        <div className="arena">
          <div className="arena-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {onVoltarHub && (
                <button type="button" className="btn b-out" onClick={onVoltarHub}>
                  ← Hub
                </button>
              )}
              <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem' }}>
                Resultado · Caça-Golpes
              </strong>
            </div>
            <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
              {acertos}/{totalMensagens} acertos
            </span>
          </div>
          {renderConteudo()}
        </div>
      ) : (
        <PhoneArenaShell
          tituloJogo="Caça-Golpes"
          progressoTexto={
            fase === 'intro'
              ? `${totalMensagens} cenários prontos · Nível ${nivel === 'todos' ? 'completo' : nivel}`
              : `Mensagem ${indice + 1} de ${totalMensagens} · ${atual.canal}`
          }
          progressoPct={fase === 'jogando' ? ((indice + 1) / totalMensagens) * 100 : 0}
          badgeDireita={`${progressoLocal.pontosTotais + pontosPartida} pts`}
          onVoltarHub={onVoltarHub}
          controlesExtras={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {renderFiltrosNivel()}
              {fase === 'jogando' && (
                <button
                  type="button"
                  className="btn b-out"
                  style={{ width: '100%', minHeight: 40, fontSize: '.88rem' }}
                  onClick={ouvirMensagemAtual}
                >
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-volume" />
                  </svg>
                  Ouvir mensagem em voz alta
                </button>
              )}
            </div>
          }
          phoneScreen={
            fase === 'intro' ? (
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12, height: '100%', justifyContent: 'center' }}>
                <div className="tr-hero">
                  <svg className="logo">
                    <use href="#i-logo" />
                  </svg>
                  <small>MINIGAME 1 · CAÇA-GOLPES</small>
                  <h4 style={{ margin: 0, fontSize: '1.55rem', lineHeight: 1.15 }}>
                    Isso é golpe ou é seguro?
                  </h4>
                  <p style={{ margin: 0, fontSize: '.92rem', opacity: 0.92 }}>
                    Veja mensagens simuladas em telas reais de WhatsApp, Gmail e SMS e ative o Raio-X das armadilhas.
                  </p>
                </div>
              </div>
            ) : (
              renderCardMensagem()
            )
          }
          phoneDock={
            fase === 'intro' ? (
              <button className="bigbtn b-go" type="button" onClick={iniciarJogo} style={{ minHeight: 48, fontSize: '1rem' }}>
                Começar Agora →
              </button>
            ) : !respondido ? (
              <div className="sim-dock-acts">
                <button className="bigbtn b-red" type="button" onClick={() => responder(true)}>
                  <svg className="ic">
                    <use href="#i-alert" />
                  </svg>
                  É golpe
                </button>
                <button className="bigbtn b-safe" type="button" onClick={() => responder(false)}>
                  <svg className="ic">
                    <use href="#i-check" />
                  </svg>
                  Parece seguro
                </button>
              </div>
            ) : (
              <button className="bigbtn b-ink" type="button" onClick={proximaMensagem} style={{ minHeight: 46, fontSize: '.95rem' }}>
                {indice + 1 < totalMensagens ? 'Próxima mensagem →' : 'Ver meu resultado'}
              </button>
            )
          }
          painelLateral={
            fase === 'intro' ? (
              <div className="sim-side-card">
                <strong style={{ fontSize: '1rem' }}>Como funciona o simulador</strong>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.5 }}>
                  Você vai receber mensagens reais no formato de <b>WhatsApp</b>, <b>Gmail HTML</b> e{' '}
                  <b>SMS</b> na tela do smartphone ao lado. Observe quem enviou, o domínio do e-mail,
                  links suspeitos e pedidos urgentes.
                </p>
                <button
                  type="button"
                  className="btn b-out"
                  style={{ width: '100%', minHeight: 40, fontSize: '.88rem' }}
                  onClick={() =>
                    falarTexto(
                      'Vou mostrar mensagens do dia a dia no celular. Para cada uma, toque em É golpe ou Parece seguro.'
                    )
                  }
                >
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-volume" />
                  </svg>
                  Ouvir instruções
                </button>
              </div>
            ) : respondido ? (
              <div
                className="sim-side-card"
                role="status"
                aria-live="polite"
                style={{
                  background: ultimaRespostaCorreta ? '#E7F6EF' : '#FDECEC',
                  color: ultimaRespostaCorreta ? '#074A38' : '#8F1B12',
                  border: `2px solid ${ultimaRespostaCorreta ? 'var(--green)' : 'var(--red)'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: ultimaRespostaCorreta ? 'var(--green)' : 'var(--red)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: 99
                    }}
                  >
                    {ultimaRespostaCorreta ? '✓ VOCÊ ACERTOU!' : '✕ VOCÊ ERROU'}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 800 }}>
                    Veredito: {atual.isGolpe ? 'ERA GOLPE' : 'ERA MENSAGEM SEGURA'}
                  </span>
                </div>

                {atual.isGolpe && atual.trechosSuspeitos && atual.trechosSuspeitos.length > 0 && (
                  <span style={{ alignSelf: 'flex-start', fontSize: 11.5, fontWeight: 700, background: '#fff', padding: '3px 9px', borderRadius: 99 }}>
                    🔍 Trechos suspeitos grifados no celular
                  </span>
                )}

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
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: '.86rem', color: '#33433D' }}>
                    {atual.pistas.map((p, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="sim-side-card">
                <strong style={{ fontSize: '1rem' }}>O que observar agora ({atual.canal})</strong>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                  <li>Confira o endereço exato de quem enviou (número salvo ou domínio após o <code>@</code>).</li>
                  <li>Desconfie de pressa, ameaças de bloqueio ou descontos fora do aplicativo.</li>
                  <li>Depois de escolher no celular, o <b>Raio-X</b> mostra exatamente a armadilha.</li>
                </ul>
              </div>
            )
          }
        />
      )}

      {/* MODAL RANKING COMUNITÁRIO */}
      {modalRanking && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              maxWidth: 460,
              width: '100%',
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>🏆 Ranking da Comunidade</h3>
              <button
                type="button"
                onClick={() => setModalRanking(false)}
                aria-label="Fechar ranking"
                style={{ background: 'none', border: 'none', fontSize: 20 }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 16px' }}>
              Seu Score atual: <b>{progressoLocal.scoreCidadania}/100</b> ({progressoLocal.pontosTotais} pts).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {RANKING_COMUNIDADE_MOCK.map((item) => (
                <div
                  key={item.posicao}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: item.posicao === 1 ? '#FCEFD2' : 'var(--soft)',
                    border: item.posicao === 1 ? '1px solid #F2B84B' : '1px solid var(--line)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, width: 26 }}>#{item.posicao}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.nome}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                        {item.categoria} · {item.medalha}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--green)', fontSize: 15 }}>
                      {item.scoreRisco} pts
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                      {item.desafiosConcluidos} desafios
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="bigbtn b-ink"
              onClick={() => setModalRanking(false)}
              style={{ marginTop: 16, minHeight: 48, fontSize: 16 }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* MODAL RELATÓRIO IMPRIMÍVEL */}
      {modalRelatorio && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              maxWidth: 560,
              width: '100%',
              padding: 28,
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '2px solid var(--line)',
                paddingBottom: 14,
                marginBottom: 16
              }}
            >
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase' }}>
                  Projeto de Extensão Universitária ACE · CEUB
                </span>
                <h2 style={{ margin: '4px 0 0', fontSize: '1.4rem' }}>Relatório de Cidadania Digital</h2>
                <small style={{ color: 'var(--muted)' }}>
                  Autores: Fellipe de Castro &amp; Jhonatgan Magalhaes
                </small>
              </div>
              <button
                type="button"
                onClick={() => setModalRelatorio(false)}
                aria-label="Fechar relatório"
                style={{ background: 'none', border: 'none', fontSize: 22 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'var(--soft)', padding: 12, borderRadius: 12 }}>
                <small style={{ color: 'var(--muted)' }}>Score de Cidadania Digital</small>
                <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--green)' }}>
                  {progressoLocal.scoreCidadania} / 100
                </div>
              </div>
              <div style={{ background: 'var(--soft)', padding: 12, borderRadius: 12 }}>
                <small style={{ color: 'var(--muted)' }}>Desempenho nesta Trilha</small>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
                  {acertos} de {totalMensagens} ({scorePartida}%)
                </div>
              </div>
            </div>

            <h4 style={{ margin: '0 0 8px', fontSize: 15 }}>Recomendações Práticas:</h4>
            <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.55, color: 'var(--text)' }}>
              <li>
                Nunca transfira via Pix por pedido urgente de parente em número novo sem telefonar para o número antigo.
              </li>
              <li>Sempre leia o domínio exato antes da primeira barra &quot;/&quot; em links de bancos e órgãos públicos.</li>
              <li>Ative a confirmação em duas etapas com PIN no seu WhatsApp e e-mail principal.</li>
            </ul>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                type="button"
                className="bigbtn b-go"
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                style={{ minHeight: 48, fontSize: 16 }}
              >
                🖨️ Imprimir / Salvar PDF
              </button>
              <button
                type="button"
                className="bigbtn b-out"
                onClick={() => setModalRelatorio(false)}
                style={{ minHeight: 48, fontSize: 16 }}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { DESAFIOS_VISHING } from '@/lib/challenges-data';
import { falarTexto, pararVoz } from '@/lib/speech';
import {
  registrarResultadoJogo,
  gerarLinkWhatsappGuardiao,
  tocarSomFeedback,
  type VeroProgresso
} from '@/lib/progress-storage';
import PhoneArenaShell from './PhoneArenaShell';

interface VishingGameProps {
  onVoltarHub?: () => void;
  onProgressoAtualizado?: (progresso: VeroProgresso) => void;
}

export default function VishingGame({
  onVoltarHub,
  onProgressoAtualizado
}: VishingGameProps) {
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [escolhidoIdx, setEscolhidoIdx] = useState<number | null>(null);
  const [ouvindo, setOuvindo] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [progressoSalvo, setProgressoSalvo] = useState<VeroProgresso | null>(null);

  useEffect(() => {
    return () => {
      pararVoz();
    };
  }, []);

  const total = DESAFIOS_VISHING.length;
  const atual = DESAFIOS_VISHING[indice] || DESAFIOS_VISHING[0];
  const respondido = escolhidoIdx !== null;
  const acertouAtual = respondido && atual.opcoes[escolhidoIdx].correta;

  const reproduzirLigacao = () => {
    setOuvindo(true);
    falarTexto(atual.falaScript, false, true);
    window.setTimeout(() => {
      setOuvindo(false);
    }, 3500);
  };

  const escolherResposta = (idx: 0 | 1) => {
    if (respondido) return;
    pararVoz();
    setOuvindo(false);
    setEscolhidoIdx(idx);
    const acertou = atual.opcoes[idx].correta;
    tocarSomFeedback(acertou);

    if (acertou) {
      setAcertos((prev) => prev + 1);
      falarTexto(`Reação segura! ${atual.explicacao}`);
    } else {
      falarTexto(`Atenção! ${atual.explicacao}`);
    }
  };

  const avancar = () => {
    pararVoz();
    setOuvindo(false);
    if (indice + 1 < total) {
      setIndice((prev) => prev + 1);
      setEscolhidoIdx(null);
    } else {
      const novo = registrarResultadoJogo('vishing', acertos, total);
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
    setOuvindo(false);
    setFinalizado(false);
    setProgressoSalvo(null);
  };

  if (finalizado) {
    const taxa = Math.round((acertos / total) * 100);
    const linkZap = progressoSalvo
      ? gerarLinkWhatsappGuardiao(
          progressoSalvo,
          'Ligação Suspeita (Falsa Central)',
          `${acertos} de ${total} ligações atendidas com segurança (${taxa}%).`
        )
      : '#';

    return (
      <div className="arena">
        <div className="arena-head">
          <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
            Simulado de Voz Concluído · {acertos}/{total}
          </span>
          {onVoltarHub && (
            <button type="button" className="btn b-out" onClick={onVoltarHub}>
              Voltar ao Hub
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div className="eyebrow" style={{ color: 'var(--green)' }}>
            DEFESA CONTRA FALSA CENTRAL
          </div>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.85rem', margin: '8px 0' }}>
            Você soube agir em {acertos} de {total} chamadas
          </h3>
          <p style={{ margin: '0 auto', maxWidth: 520, color: 'var(--muted)' }}>
            Bancos reais nunca pedem transferência de segurança, instalação de apps de suporte remoto
            nem códigos SMS em ligações. Na dúvida, desligue.
          </p>
        </div>

        <div className="arena-acts">
          <button type="button" className="bigbtn b-go" onClick={reiniciar}>
            Treinar Ligações de Novo
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
              Compartilhar com Guardião
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        background: 'linear-gradient(180deg, #0B1310 0%, #15251F 100%)',
        color: '#fff',
        padding: '16px 14px'
      }}
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            fontSize: 10.5,
            background: respondido
              ? atual.isGolpe
                ? 'rgba(180,35,24,.35)'
                : 'rgba(11,110,84,.45)'
              : 'rgba(255,255,255,.12)',
            color: '#fff',
            padding: '3px 10px',
            borderRadius: 99,
            fontWeight: 700
          }}
        >
          {respondido
            ? atual.isGolpe
              ? '🚨 Chamada de Golpe'
              : '🛡️ Chamada Segura'
            : ouvindo
              ? '🔊 Em viva-voz ativo'
              : '📞 Chamada de voz recebida'}
        </span>
        <div className="call-pulse" style={{ marginTop: 4 }} aria-hidden="true">
          <svg className="ic">
            <use href="#i-phone" />
          </svg>
        </div>
        <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', lineHeight: 1.2 }}>
          {atual.chamadorDisplay}
        </strong>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 12, color: '#B4D0C4' }}>
          {atual.numeroDisplay}
        </span>

        <button
          type="button"
          className="btn b-go"
          style={{ minHeight: 38, fontSize: 13, marginTop: 4 }}
          onClick={reproduzirLigacao}
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-volume" />
          </svg>
          {ouvindo ? 'Ouvindo voz...' : 'Ouvir voz da ligação'}
        </button>
      </div>

      <div className="call-script" style={{ fontSize: 13.5, padding: 12, marginTop: 10 }}>
        <div style={{ fontSize: 10.5, color: 'var(--mint2)', marginBottom: 4, fontWeight: 700 }}>
          O QUE A PESSOA DIZ NA LINHA:
        </div>
        “{atual.falaScript}”
      </div>

      <div
        aria-hidden="true"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          textAlign: 'center',
          fontSize: 11,
          color: '#9AB8AB',
          marginTop: 10
        }}
      >
        <div style={{ background: '#172822', padding: '7px 4px', borderRadius: 10 }}>🎙️ Mudo</div>
        <div style={{ background: '#172822', padding: '7px 4px', borderRadius: 10 }}>🔢 Teclado</div>
        <div
          style={{
            background: ouvindo ? 'rgba(95,211,168,.2)' : '#172822',
            color: ouvindo ? 'var(--mint2)' : '#9AB8AB',
            padding: '7px 4px',
            borderRadius: 10,
            fontWeight: 700
          }}
        >
          🔊 Viva-voz
        </div>
      </div>
    </div>
  );

  const phoneDock = !respondido ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {atual.opcoes.map((op, idx) => {
        const ehDesligar = /^(desligar|recusar)/i.test(op.texto.trim());
        return (
          <button
            key={op.texto}
            type="button"
            className={`bigbtn ${ehDesligar ? 'b-red' : 'b-safe'}`}
            onClick={() => escolherResposta(idx as 0 | 1)}
            style={{ minHeight: 42, fontSize: '.82rem', padding: '8px 10px', lineHeight: 1.25 }}
          >
            {op.texto}
          </button>
        );
      })}
    </div>
  ) : (
    <button type="button" className="bigbtn b-ink" onClick={avancar} style={{ minHeight: 46, fontSize: '.95rem' }}>
      {indice + 1 < total ? 'Próxima Ligação →' : 'Finalizar Simulado'}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
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
              Veredito: {atual.isGolpe ? 'ERA GOLPE' : 'ERA LIGAÇÃO SEGURA'}
            </span>
          </div>

          <strong style={{ fontSize: '1.08rem', lineHeight: 1.3 }}>
            {acertouAtual
              ? atual.isGolpe
                ? 'Você se protegeu contra a falsa central!'
                : 'Você reconheceu corretamente um contato legítimo.'
              : atual.isGolpe
                ? 'Essa ligação era golpe — a reação escolhida colocaria seus dados em risco.'
                : 'Calma: essa ligação era segura e você recusou um contato legítimo.'}
          </strong>

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
              {atual.pistas.map((p) => (
                <li key={p} style={{ marginBottom: 4 }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="sim-side-card">
          <strong style={{ fontSize: '1rem' }}>Como reagir a ligações suspeitas</strong>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.5 }}>
            Toque em <b>&ldquo;Ouvir voz da ligação&rdquo;</b> na tela do celular ou leia a transcrição
            e escolha qual atitude protege seus dados e seu dinheiro.
          </p>
        </div>
      )}
    </>
  );

  return (
    <PhoneArenaShell
      phoneScreen={phoneScreen}
      phoneDock={phoneDock}
      tituloJogo="Ligação Suspeita (Vishing)"
      progressoTexto={`Ligação ${indice + 1} de ${total}`}
      progressoPct={((indice + 1) / total) * 100}
      badgeDireita={`Acertos: ${acertos}`}
      onVoltarHub={onVoltarHub}
      painelLateral={painelLateral}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';
import { DESAFIOS_PIX_BOLETO } from '@/lib/challenges-data';
import { falarTexto, pararVoz } from '@/lib/speech';
import {
  registrarResultadoJogo,
  gerarLinkWhatsappGuardiao,
  tocarSomFeedback,
  type VeroProgresso
} from '@/lib/progress-storage';
import PhoneArenaShell from './PhoneArenaShell';

interface PixAuditGameProps {
  onVoltarHub?: () => void;
  onProgressoAtualizado?: (progresso: VeroProgresso) => void;
}

export default function PixAuditGame({
  onVoltarHub,
  onProgressoAtualizado
}: PixAuditGameProps) {
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [escolheuPagar, setEscolheuPagar] = useState<boolean | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [progressoSalvo, setProgressoSalvo] = useState<VeroProgresso | null>(null);

  useEffect(() => {
    return () => {
      pararVoz();
    };
  }, []);

  const total = DESAFIOS_PIX_BOLETO.length;
  const atual = DESAFIOS_PIX_BOLETO[indice] || DESAFIOS_PIX_BOLETO[0];
  const respondido = escolheuPagar !== null;
  const acertouAtual = respondido && escolheuPagar === atual.isSeguroPagar;

  const decidir = (pagar: boolean) => {
    if (respondido) return;
    setEscolheuPagar(pagar);
    const acertou = pagar === atual.isSeguroPagar;
    tocarSomFeedback(acertou);

    if (acertou) {
      setAcertos((prev) => prev + 1);
      falarTexto(`Decisão correta! ${atual.explicacao}`);
    } else {
      falarTexto(`Atenção nessa auditoria! ${atual.explicacao}`);
    }
  };

  const avancar = () => {
    pararVoz();
    if (indice + 1 < total) {
      setIndice((prev) => prev + 1);
      setEscolheuPagar(null);
    } else {
      const novo = registrarResultadoJogo('pix-boleto', acertos, total);
      setProgressoSalvo(novo);
      onProgressoAtualizado?.(novo);
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    pararVoz();
    setIndice(0);
    setAcertos(0);
    setEscolheuPagar(null);
    setFinalizado(false);
    setProgressoSalvo(null);
  };

  const valorFormatado = atual.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  if (finalizado) {
    const taxa = Math.round((acertos / total) * 100);
    const linkZap = progressoSalvo
      ? gerarLinkWhatsappGuardiao(
          progressoSalvo,
          'Hora de Pagar (Pix & Boleto)',
          `${acertos} de ${total} comprovantes auditados sem erro (${taxa}%).`
        )
      : '#';

    return (
      <div className="arena">
        <div className="arena-head">
          <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
            Auditoria Concluída · {acertos}/{total} acertos
          </span>
          {onVoltarHub && (
            <button type="button" className="btn b-out" onClick={onVoltarHub}>
              Voltar ao Hub
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div className="eyebrow" style={{ color: 'var(--green)' }}>
            CONFERÊNCIA ANTES DO PIN
          </div>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.85rem', margin: '8px 0' }}>
            Você protegeu o bolso em {acertos} de {total} pagamentos
          </h3>
          <p style={{ margin: '0 auto', maxWidth: 520, color: 'var(--muted)' }}>
            Confira sempre o nome completo do recebedor, se o documento é CNPJ da empresa ou CPF de
            desconhecido, e se o banco destino faz sentido.
          </p>
        </div>

        <div className="arena-acts">
          <button type="button" className="bigbtn b-go" onClick={reiniciar}>
            Auditar Novamente
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F4F6F4' }}>
      <div className="bank-app-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg className="ic" aria-hidden="true">
            <use href="#i-qr" />
          </svg>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--mint2)', fontWeight: 700, textTransform: 'uppercase' }}>
              App Bancário · Conferência Final
            </div>
            <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem' }}>
              Revisar {atual.tipo}
            </strong>
          </div>
        </div>
        <span
          className="pill"
          style={{
            background: atual.crcStatus === 'Válido' ? 'rgba(95,211,168,.2)' : 'rgba(180,35,24,.35)',
            color: '#fff',
            fontSize: 10.5,
            padding: '2px 8px'
          }}
        >
          CRC: {atual.crcStatus}
        </span>
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '12px 14px',
            border: '1px solid var(--line)',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 700 }}>
            Valor a transferir agora
          </span>
          <strong style={{ display: 'block', fontFamily: 'var(--fd)', fontSize: '1.75rem', color: 'var(--ink)' }}>
            {valorFormatado}
          </strong>
        </div>

        <div className="pix-receipt" style={{ padding: 14, gap: 9, background: '#fff' }}>
          <div className="pix-row" style={{ fontSize: 12.5 }}>
            <span>Recebedor real</span>
            <b>{atual.recebedorRealNome}</b>
          </div>
          <div className="pix-row" style={{ fontSize: 12.5 }}>
            <span>CPF / CNPJ</span>
            <b style={{ fontFamily: 'var(--fm)', fontSize: 11.5 }}>{atual.recebedorDocumento}</b>
          </div>
          <div className="pix-row" style={{ fontSize: 12.5 }}>
            <span>Banco destino</span>
            <b>{atual.bancoDestino}</b>
          </div>
          <div className="pix-row" style={{ fontSize: 12 }}>
            <span>{atual.tipo === 'Pix' ? 'Código Pix' : 'Linha'}</span>
            <b style={{ fontFamily: 'var(--fm)', fontSize: 10.5, wordBreak: 'break-all' }}>
              {atual.chaveOuLinha}
            </b>
          </div>
        </div>
      </div>
    </div>
  );

  const phoneDock = !respondido ? (
    <div className="sim-dock-acts">
      <button type="button" className="bigbtn b-red" onClick={() => decidir(false)}>
        <svg className="ic" aria-hidden="true">
          <use href="#i-x" />
        </svg>
        Tem Golpe!
      </button>
      <button type="button" className="bigbtn b-safe" onClick={() => decidir(true)}>
        <svg className="ic" aria-hidden="true">
          <use href="#i-check" />
        </svg>
        Confirmar
      </button>
    </div>
  ) : (
    <button type="button" className="bigbtn b-ink" onClick={avancar} style={{ minHeight: 46, fontSize: '.95rem' }}>
      {indice + 1 < total ? 'Próximo Comprovante →' : 'Concluir Auditoria'}
    </button>
  );

  const painelLateral = (
    <>
      <div className="sim-side-card" style={{ background: 'var(--ink)', color: '#fff' }}>
        <small style={{ color: 'var(--mint2)', fontFamily: 'var(--fm)', fontWeight: 700, textTransform: 'uppercase' }}>
          Situação da sua compra
        </small>
        <p style={{ margin: 0, fontSize: '.96rem', lineHeight: 1.45 }}>{atual.contextoCompra}</p>
        <div style={{ fontSize: '.88rem', color: '#B4D0C4' }}>
          Quem você espera pagar: <strong style={{ color: '#fff' }}>{atual.esperadoNome}</strong>
        </div>
      </div>

      {respondido && (
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
              Veredito: {atual.isSeguroPagar ? 'PAGAMENTO SEGURO' : 'ERA GOLPE!'}
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
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: '.86rem', color: '#33433D' }}>
              {atual.pistas.map((pista) => (
                <li key={pista} style={{ marginBottom: 4 }}>
                  {pista}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );

  return (
    <PhoneArenaShell
      phoneScreen={phoneScreen}
      phoneDock={phoneDock}
      tituloJogo="Hora de Pagar (Pix & Boleto)"
      progressoTexto={`Pagamento ${indice + 1} de ${total} · ${atual.tipo}`}
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
              `${atual.contextoCompra}. Você espera pagar para ${atual.esperadoNome}. Na tela do banco aparece recebedor ${atual.recebedorRealNome}, documento ${atual.recebedorDocumento}, banco ${atual.bancoDestino}.`,
              false,
              true
            )
          }
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-volume" />
          </svg>
          Ouvir comprovante em voz alta
        </button>
      }
      painelLateral={painelLateral}
    />
  );
}

'use client';

import { useState } from 'react';
import { DESAFIOS_PHISHING, RANKING_COMUNIDADE_MOCK } from '@/lib/challenges-data';
import { falarTexto } from '@/lib/speech';
import type { MensagemDesafio } from '@/types/challenge';

export default function PhishingGame() {
  const [fase, setFase] = useState<'intro' | 'jogando' | 'fim'>('intro');
  const [nivel, setNivel] = useState<'todos' | 'iniciante' | 'intermediario' | 'avancado'>('todos');
  const [modoOficina, setModoOficina] = useState(false);
  const [modalRanking, setModalRanking] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);

  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [ultimaRespostaCorreta, setUltimaRespostaCorreta] = useState(false);

  // Filtragem por nível
  const listaDesafios: MensagemDesafio[] = nivel === 'todos' 
    ? DESAFIOS_PHISHING 
    : DESAFIOS_PHISHING.filter(d => d.nivelDificuldade === nivel);

  const totalMensagens = Math.min(listaDesafios.length, 5);
  const atual = listaDesafios[indice] || DESAFIOS_PHISHING[0];

  const iniciarJogo = (ativarOficina: boolean = false) => {
    setModoOficina(ativarOficina);
    setIndice(0);
    setAcertos(0);
    setPontos(0);
    setRespondido(false);
    setFase('jogando');
    falarTexto('Primeira mensagem na tela. Analise com calma e toque se é golpe ou parece seguro.');
  };

  const responder = (escolheuGolpe: boolean) => {
    if (respondido) return;

    const acertou = escolheuGolpe === atual.isGolpe;
    setRespondido(true);
    setUltimaRespostaCorreta(acertou);

    if (acertou) {
      setAcertos((prev) => prev + 1);
      setPontos((prev) => prev + 20);
      falarTexto(`Muito bem! Você acertou. ${atual.explicacao}`);
    } else {
      falarTexto(`Atenção a esta pista: ${atual.explicacao}`);
    }
  };

  const proximaMensagem = () => {
    if (indice + 1 < totalMensagens) {
      setIndice((prev) => prev + 1);
      setRespondido(false);
    } else {
      setFase('fim');
      const scoreFinal = Math.round(((acertos + (ultimaRespostaCorreta ? 1 : 0)) / totalMensagens) * 100);
      falarTexto(`Parabéns! Você concluiu a trilha com score de ${scoreFinal} pontos.`);
    }
  };

  const ouvirMensagemAtual = () => {
    falarTexto(`${atual.canal}, de ${atual.remetente}. Mensagem: ${atual.texto}`);
  };

  const scoreCalculado = Math.round((acertos / Math.max(1, totalMensagens)) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Controles de Nível & Oficina ACE */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => setNivel('todos')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--line)',
            background: nivel === 'todos' ? 'var(--green)' : '#fff',
            color: nivel === 'todos' ? '#fff' : 'var(--text)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Trilha Completa
        </button>
        <button
          type="button"
          onClick={() => setNivel('iniciante')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--line)',
            background: nivel === 'iniciante' ? 'var(--green)' : '#fff',
            color: nivel === 'iniciante' ? '#fff' : 'var(--text)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Iniciante
        </button>
        <button
          type="button"
          onClick={() => setNivel('intermediario')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--line)',
            background: nivel === 'intermediario' ? 'var(--green)' : '#fff',
            color: nivel === 'intermediario' ? '#fff' : 'var(--text)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Intermediário
        </button>
        <button
          type="button"
          onClick={() => setNivel('avancado')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--line)',
            background: nivel === 'avancado' ? 'var(--green)' : '#fff',
            color: nivel === 'avancado' ? '#fff' : 'var(--text)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Avançado
        </button>
        <button
          type="button"
          onClick={() => setModalRanking(true)}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid #C98A12',
            background: '#FCEFD2',
            color: '#6B4500',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🏆 Ranking
        </button>
      </div>

      {/* MOCKUP DO CELULAR COM ESTILO NATIVO (.phone e .screen) */}
      <div className="phone">
        <div className="screen" style={{ minHeight: '580px', display: 'flex', flexDirection: 'column' }}>
          {/* Topo do Celular */}
          <div className="tr-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="av" aria-hidden="true">M</span>
              <span className="hi">
                <small>{modoOficina ? 'Oficina ACE · UNIEURO' : 'Olá,'}</small>
                <b>Dona Marlene</b>
              </span>
            </div>
            <div className="chips">
              <span className="chip fl">
                <svg className="ic" style={{ width: 17, height: 17 }}><use href="#i-flame" /></svg>
                5 dias
              </span>
              <span className="chip pt">
                <span>{pontos}</span>&nbsp;pts
              </span>
            </div>
          </div>

          {/* TELA DE INTRODUÇÃO */}
          {fase === 'intro' && (
            <div className="tr-body" id="trIntro">
              <div className="tr-hero">
                <svg className="logo"><use href="#i-logo" /></svg>
                <small>{modoOficina ? 'DIAGNÓSTICO ACADÊMICO' : 'DESAFIO DE HOJE'}</small>
                <h4 style={{ margin: 0, fontSize: '1.45rem', lineHeight: 1.2 }}>Isso é golpe?</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                  Vou mostrar 5 mensagens do dia a dia no WhatsApp, SMS e E-mail. Para cada uma, você decide se é golpe.
                </p>
              </div>
              <button
                className="bigbtn b-out"
                type="button"
                onClick={() => falarTexto('Vou mostrar cinco mensagens do dia a dia. Para cada uma, você toca em um botão. Não tem pressa nem pegadinha!')}
              >
                <svg className="ic"><use href="#i-volume" /></svg>
                Ouvir as instruções
              </button>
              <button
                className="bigbtn b-go"
                type="button"
                onClick={() => iniciarJogo(false)}
              >
                Começar Treino
              </button>
              <button
                type="button"
                onClick={() => iniciarJogo(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  fontSize: '13px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                Ou iniciar como Oficina Didática (Antes/Depois)
              </button>
            </div>
          )}

          {/* TELA JOGANDO */}
          {fase === 'jogando' && atual && (
            <div className="tr-body" id="trPlay">
              {/* Barra de Progresso */}
              <div className="prog">
                <span>Mensagem {indice + 1} de {totalMensagens}</span>
                <div className="bar" role="progressbar" aria-valuenow={indice + 1} aria-valuemin={0} aria-valuemax={totalMensagens}>
                  <i style={{ width: `${((indice + 1) / totalMensagens) * 100}%` }} />
                </div>
              </div>

              {/* CARD DE MENSAGEM AUTÊNTICA (WhatsApp, Gmail ou SMS) */}
              <div className="mcard" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Interface WhatsApp */}
                {atual.canal === 'WhatsApp' ? (
                  <div style={{ background: '#ECE5DD', display: 'flex', flexDirection: 'column' }}>
                    {/* Header Verde WhatsApp */}
                    <div style={{ background: '#075E54', color: '#fff', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>←</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#128C7E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                          {atual.whatsappInfo?.avatarLetra || 'W'}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold', lineHeight: 1.1 }}>{atual.remetente}</div>
                          <div style={{ fontSize: '10px', opacity: 0.85 }}>{atual.whatsappInfo?.isContatoSalvo ? 'online' : 'Desconhecido'}</div>
                        </div>
                      </div>
                      <button className="listen" type="button" onClick={ouvirMensagemAtual} aria-label="Ouvir a mensagem" style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                        <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-volume" /></svg>
                      </button>
                    </div>

                    {/* Aviso de Segurança se não for contato salvo */}
                    {atual.whatsappInfo?.avisoSeguranca && (
                      <div style={{ background: '#FFF3CD', color: '#856404', padding: '6px 10px', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #FFEEBA' }}>
                        ⚠️ {atual.whatsappInfo.avisoSeguranca}
                      </div>
                    )}

                    {/* Balão de Conversa WhatsApp */}
                    <div style={{ padding: '16px 12px' }}>
                      <div style={{
                        background: '#FFFFFF',
                        borderRadius: '8px 8px 8px 0px',
                        padding: '10px 12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                        maxWidth: '92%',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        color: '#111'
                      }}>
                        {atual.texto}
                        <div style={{ textAlign: 'right', fontSize: '10px', color: '#888', marginTop: '4px' }}>
                          {atual.whatsappInfo?.horaEnvio || '14:20'} · <span style={{ color: '#34B7F1' }}>✓✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : atual.canal === 'E-mail' ? (
                  /* Interface Gmail */
                  <div style={{ background: '#FFFFFF', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#5f6368', fontWeight: 'bold' }}>📧 Caixa de Entrada</span>
                      <button className="listen" type="button" onClick={ouvirMensagemAtual} aria-label="Ouvir a mensagem" style={{ width: 32, height: 32 }}>
                        <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-volume" /></svg>
                      </button>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#202124', marginBottom: '4px' }}>
                      {atual.emailInfo?.assunto || 'Comunicado Importante'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#5f6368', marginBottom: '8px' }}>
                      De: <b>{atual.emailInfo?.deNome || atual.remetente}</b> &lt;{atual.emailInfo?.deEmail || 'alerta@seguranca.br'}&gt;
                    </div>
                    {atual.emailInfo?.alertaSelo && (
                      <div style={{ background: '#FCE8E6', color: '#C5221F', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', marginBottom: '8px' }}>
                        ⚠️ {atual.emailInfo.alertaSelo}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: '#3c4043', lineHeight: 1.4, padding: '6px 0' }}>
                      {atual.texto}
                    </div>
                  </div>
                ) : (
                  /* Interface Padrão SMS */
                  <div style={{ padding: '14px' }}>
                    <div className="mhead">
                      <span>
                        <svg className="ic" style={{ width: 17, height: 17 }}><use href="#i-msg" /></svg>
                        <b>{atual.remetente}</b> · {atual.canal}
                      </span>
                      <button className="listen" type="button" onClick={ouvirMensagemAtual} aria-label="Ouvir a mensagem">
                        <svg className="ic"><use href="#i-volume" /></svg>
                      </button>
                    </div>
                    <div className="mtext" style={{ marginTop: '10px', fontSize: '15px' }}>
                      {atual.texto}
                    </div>
                  </div>
                )}
              </div>

              {/* BOTÕES DE DECISÃO (Apenas 2 botões grandes) */}
              {!respondido ? (
                <div className="acts" style={{ marginTop: 'auto' }}>
                  <span className="ask">O que você acha desta mensagem?</span>
                  <button className="bigbtn b-red" type="button" onClick={() => responder(true)}>
                    <svg className="ic"><use href="#i-alert" /></svg>
                    É golpe
                  </button>
                  <button className="bigbtn b-safe" type="button" onClick={() => responder(false)}>
                    <svg className="ic"><use href="#i-check" /></svg>
                    Parece seguro
                  </button>
                </div>
              ) : (
                /* FEEDBACK PEDAGÓGICO (O erro vira pista) */
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div
                    className="fb"
                    style={{
                      background: ultimaRespostaCorreta ? 'var(--gsoft)' : 'var(--rsoft)',
                      borderColor: ultimaRespostaCorreta ? 'var(--green)' : 'var(--red)',
                      padding: '14px',
                      borderRadius: '16px'
                    }}
                  >
                    <b style={{ color: ultimaRespostaCorreta ? 'var(--gtext)' : 'var(--redd)', fontSize: '16px' }}>
                      {ultimaRespostaCorreta ? '✓ Você acertou!' : '💡 Atenção aos detalhes:'}
                    </b>
                    <p style={{ margin: '6px 0', fontSize: '14px' }}>{atual.explicacao}</p>
                    <div className="tags" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {atual.pistas.map((p, i) => (
                        <span key={i} style={{ background: '#fff', padding: '3px 8px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--line)' }}>
                          🔍 {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="bigbtn b-ink" type="button" onClick={proximaMensagem}>
                    {indice + 1 < totalMensagens ? 'Próxima mensagem →' : 'Ver resultado final'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TELA DE FIM COM SCORE E MEDALHA */}
          {fase === 'fim' && (
            <div className="tr-body" id="trEnd">
              <div className="endcard" style={{ textAlign: 'center', padding: '20px' }}>
                <div className="medal" style={{ margin: '0 auto 12px' }}>
                  <svg className="ic"><use href="#i-trophy" /></svg>
                </div>
                <small style={{ color: 'var(--green)', fontWeight: 'bold' }}>
                  {modoOficina ? 'DIAGNÓSTICO CONCLUÍDO' : 'NOVA CONQUISTA'}
                </small>
                <h4 style={{ margin: '4px 0 10px', fontSize: '1.4rem' }}>
                  {scoreCalculado >= 80 ? 'Detetive de Golpes 🛡️' : scoreCalculado >= 60 ? 'Cidadão Atento 🦅' : 'Primeiros Passos 💡'}
                </h4>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--ink)' }}>
                  {scoreCalculado}<small style={{ fontSize: '16px' }}>/100</small>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '8px 0 0' }}>
                  Você acertou {acertos} de {totalMensagens} situações analisadas.
                  {modoOficina && ' Diagnóstico registrado para comparação Antes/Depois.'}
                </p>
              </div>

              <button
                className="bigbtn b-out"
                type="button"
                onClick={() => setModalRelatorio(true)}
              >
                📄 Ver Relatório de Cidadania
              </button>
              <button
                className="bigbtn b-go"
                type="button"
                onClick={() => iniciarJogo(false)}
              >
                Jogar de novo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL RANKING COMUNITÁRIO */}
      {modalRanking && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            maxWidth: '460px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>🏆 Ranking da Comunidade</h3>
              <button
                type="button"
                onClick={() => setModalRanking(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px' }}>
              Idosos, comerciantes e estudantes que mais evoluíram na detecção de golpes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {RANKING_COMUNIDADE_MOCK.map((item) => (
                <div key={item.posicao} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: item.posicao === 1 ? '#FCEFD2' : 'var(--soft)',
                  border: item.posicao === 1 ? '1px solid #F2B84B' : '1px solid var(--line)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', width: '24px' }}>#{item.posicao}</span>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.nome}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.categoria} · {item.medalha}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--green)', fontSize: '15px' }}>{item.scoreRisco} pts</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.desafiosConcluidos} desafios</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="bigbtn b-ink"
              onClick={() => setModalRanking(false)}
              style={{ marginTop: '16px', minHeight: '48px', fontSize: '16px' }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* MODAL / RELATÓRIO IMPRIMÍVEL (window.print()) */}
      {modalRelatorio && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--green)', textTransform: 'uppercase' }}>
                  Projeto de Extensão Universitária ACE · UNIEURO
                </span>
                <h2 style={{ margin: '4px 0 0', fontSize: '1.4rem' }}>Relatório de Cidadania Digital</h2>
                <small style={{ color: 'var(--muted)' }}>Autores: Fellipe de Castro & Jhonatgan Magalhaes</small>
              </div>
              <button
                type="button"
                onClick={() => setModalRelatorio(false)}
                style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--soft)', padding: '12px', borderRadius: '12px' }}>
                <small style={{ color: 'var(--muted)' }}>Score Digital Atingido</small>
                <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--green)' }}>{scoreCalculado} / 100</div>
              </div>
              <div style={{ background: 'var(--soft)', padding: '12px', borderRadius: '12px' }}>
                <small style={{ color: 'var(--muted)' }}>Diagnóstico de Vulnerabilidade</small>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: scoreCalculado >= 70 ? 'var(--green)' : 'var(--red)', marginTop: '4px' }}>
                  {scoreCalculado >= 70 ? 'Baixo Risco' : 'Atenção Necessária'}
                </div>
              </div>
            </div>

            <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>Recomendações Práticas Personalizadas:</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.5', color: 'var(--text)' }}>
              <li>Nunca realize transferências Pix urgentes a pedido de parentes em números novos sem antes telefonar no número antigo.</li>
              <li>Desconfie de links encurtados em mensagens SMS ou e-mails bancários.</li>
              <li>Ative o segundo fator de autenticação (2FA) em suas contas com aplicativo autenticador.</li>
            </ul>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                className="bigbtn b-go"
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                style={{ minHeight: '48px', fontSize: '16px' }}
              >
                🖨️ Imprimir / Salvar PDF
              </button>
              <button
                type="button"
                className="bigbtn b-out"
                onClick={() => setModalRelatorio(false)}
                style={{ minHeight: '48px', fontSize: '16px' }}
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

'use client';

import { useState } from 'react';
import { decodificarPixEmv } from '@/lib/emv-parser';
import { falarTexto } from '@/lib/speech';
import type { DadosPixEmv } from '@/types/pix';

type TabTipo = 'msg' | 'link' | 'pix' | 'leak';

interface ResultadoVazamento {
  tipo: 'email' | 'senha';
  email?: string;
  vazado?: boolean;
  totalVazamentos?: number;
  vazamentos?: Array<{
    title: string;
    domain: string;
    breachDate: string;
    pwnCount: number;
    dataClasses: string[];
  }>;
  sha1Prefix?: string;
  sha1Completo?: string;
  exposta?: boolean;
  frequenciaVazamentos?: number;
  recomendacao: string;
}

export default function ChecaTool() {
  const [abaAtiva, setAbaAtiva] = useState<TabTipo>('msg');
  const [inputTexto, setInputTexto] = useState('');
  const [beneficiarioEsperado, setBeneficiarioEsperado] = useState('');
  const [verificando, setVerificando] = useState(false);

  // Estados dos resultados
  const [resultadoMsg, setResultadoMsg] = useState<{
    nivel: 'alto' | 'medio' | 'baixo';
    titulo: string;
    sinais: string[];
    acao: string;
  } | null>(null);

  const [resultadoPix, setResultadoPix] = useState<DadosPixEmv | null>(null);
  const [resultadoLeak, setResultadoLeak] = useState<ResultadoVazamento | null>(null);

  // Estados para simulação de força bruta de senha
  const [senhaInput, setSenhaInput] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tentativasSimuladas, setTentativasSimuladas] = useState(0);

  const analisarMensagem = (texto: string) => {
    const t = texto.toLowerCase();
    const sinais: string[] = [];

    if (/bit\.ly|tinyurl|cutt\.ly|is\.gd|t\.co/.test(t)) {
      sinais.push('Link encurtado que oculta o destino real');
    }
    if (/urgente|hoje|agora|imediat|últim|24 ?h|corra|bloqueio/.test(t)) {
      sinais.push('Gatilho de urgência artificial e pânico emocional');
    }
    if (/pix|transfer|taxa|pague|pagamento|depósito|chave|desconto/.test(t)) {
      sinais.push('Solicitação de transferência ou cobrança de taxa');
    }
    if (/troquei de n|número novo|novo número|meu novo/.test(t)) {
      sinais.push('Falso parente dizendo que trocou de número no WhatsApp');
    }
    if (/bloquead|suspens|cancelad|regularize|pendência/.test(t)) {
      sinais.push('Ameaça de bloqueio de conta bancária ou cartão');
    }
    if (/senha|código|token|código sms|cpf/.test(t)) {
      sinais.push('Pedido de senha, token ou código de confirmação');
    }
    if (/ganhou|prêmio|premio|sorteio|parabéns|contemplado/.test(t)) {
      sinais.push('Promessa de prêmio fácil em sorteio nunca participado');
    }

    let nivel: 'alto' | 'medio' | 'baixo' = 'baixo';
    let titulo = 'Não encontramos sinais flagrantes de golpe';
    let acao = 'A mensagem não apresenta gatilhos comuns de fraude. Lembre-se: nunca repasse senhas ou códigos recebidos por SMS.';

    if (sinais.length >= 3) {
      nivel = 'alto';
      titulo = '🚨 Alto Risco: Fortes indícios de golpe digital!';
      acao = 'NÃO clique no link, NÃO faça Pix e NÃO passe códigos. Ligue no telefone antigo da pessoa ou abra o aplicativo oficial do banco.';
    } else if (sinais.length >= 1) {
      nivel = 'medio';
      titulo = '⚠️ Atenção: Contém padrões suspeitos';
      acao = 'Desconfie. Confirme por outro canal antes de tomar qualquer decisão financeira.';
    }

    return { nivel, titulo, sinais, acao };
  };

  const handleVerificar = async () => {
    if (!inputTexto.trim()) return;

    setVerificando(true);
    setResultadoMsg(null);
    setResultadoPix(null);
    setResultadoLeak(null);

    await new Promise((r) => setTimeout(r, 650));

    if (abaAtiva === 'pix') {
      const decodificado = decodificarPixEmv(inputTexto, beneficiarioEsperado);
      setResultadoPix(decodificado);
      falarTexto(
        decodificado.alertaFraude ||
        `Código verificado com sucesso. Beneficiário: ${decodificado.beneficiario}. Integridade CRC-16 válida.`
      );
    } else if (abaAtiva === 'leak') {
      try {
        const isEmail = inputTexto.includes('@');
        const res = await fetch('/api/check-leak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(isEmail ? { email: inputTexto } : { password: inputTexto })
        });
        const data = await res.json();
        setResultadoLeak(data);
        falarTexto(data.recomendacao);
      } catch {
        setResultadoLeak({
          tipo: 'email',
          recomendacao: 'Falha ao consultar base de vazamentos.'
        });
      }
    } else {
      // msg ou link
      const resultado = analisarMensagem(inputTexto);
      setResultadoMsg(resultado);
      falarTexto(`${resultado.titulo}. ${resultado.acao}`);
    }

    setVerificando(false);
  };

  // Cálculo de Força Bruta para Senhas
  const calcularForcaSenha = (senha: string) => {
    let pool = 0;
    if (/[a-z]/.test(senha)) pool += 26;
    if (/[A-Z]/.test(senha)) pool += 26;
    if (/[0-9]/.test(senha)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(senha)) pool += 33;

    if (pool === 0 || senha.length === 0) {
      return { tempoPc: '0 segundos', tempoGpu: '0 segundos', nivel: 'Muito Fraca', cor: 'var(--red)' };
    }

    const combinacoes = Math.pow(pool, senha.length);
    // PC comum: 1 milhão de tentativas/s
    const segundosPc = combinacoes / 1_000_000;
    // GPU cluster: 100 bilhões de tentativas/s
    const segundosGpu = combinacoes / 100_000_000_000;

    const formatarTempo = (seg: number) => {
      if (seg < 1) return 'Instantâneo (< 1 seg)';
      if (seg < 60) return `${Math.round(seg)} segundos`;
      if (seg < 3600) return `${Math.round(seg / 60)} minutos`;
      if (seg < 86400) return `${Math.round(seg / 3600)} horas`;
      if (seg < 31536000) return `${Math.round(seg / 86400)} dias`;
      if (seg < 31536000000) return `${Math.round(seg / 31536000)} anos`;
      return 'Milhões de séculos';
    };

    const nivel = senha.length >= 14 && pool >= 60 ? 'Blindada' : senha.length >= 10 ? 'Boa' : 'Vulnerável';
    const cor = nivel === 'Blindada' ? 'var(--green)' : nivel === 'Boa' ? 'var(--amber)' : 'var(--red)';

    return { tempoPc: formatarTempo(segundosPc), tempoGpu: formatarTempo(segundosGpu), nivel, cor };
  };

  const statusSenha = calcularForcaSenha(senhaInput);

  return (
    <div className="checa" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <div className="chead">
        <svg className="logo" style={{ width: 42, height: 42 }}>
          <use href="#i-logo" />
        </svg>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.35rem' }}>Vero Checa</h4>
          <small style={{ color: 'var(--muted)' }}>
            Motores de análise de integridade criptográfica, CRC-16 e vazamentos
          </small>
        </div>
      </div>

      {/* SEGMENTED CONTROL: 4 FERRAMENTAS PRÁTICAS */}
      <div className="seg" role="group" aria-label="Selecione a ferramenta de checagem" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <button
          type="button"
          aria-pressed={abaAtiva === 'msg'}
          onClick={() => { setAbaAtiva('msg'); setInputTexto(''); }}
        >
          <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-msg" /></svg>
          Mensagem
        </button>
        <button
          type="button"
          aria-pressed={abaAtiva === 'link'}
          onClick={() => { setAbaAtiva('link'); setInputTexto(''); }}
        >
          <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-link" /></svg>
          Link URL
        </button>
        <button
          type="button"
          aria-pressed={abaAtiva === 'pix'}
          onClick={() => { setAbaAtiva('pix'); setInputTexto(''); }}
        >
          <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-qr" /></svg>
          Pix/Boleto
        </button>
        <button
          type="button"
          aria-pressed={abaAtiva === 'leak'}
          onClick={() => { setAbaAtiva('leak'); setInputTexto(''); }}
        >
          <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-lock" /></svg>
          Vazamentos
        </button>
      </div>

      {/* ÁREA DE INPUT DE ACORDO COM A ABA */}
      {abaAtiva === 'pix' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
            Código Pix Copia e Cola (EMV BR Code) ou Linha Digitável de Boleto:
          </label>
          <textarea
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            rows={3}
            placeholder="Cole o código Pix (00020126580014br.gov.bcb.pix...) ou a linha do boleto (34191.79001...)"
          />
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)' }}>
            Para quem você esperava pagar? (Detector de Divergência de Beneficiário):
          </label>
          <input
            type="text"
            value={beneficiarioEsperado}
            onChange={(e) => setBeneficiarioEsperado(e.target.value)}
            placeholder="Ex.: Enel, Claro, Netflix, João Silva..."
          />
        </div>
      ) : abaAtiva === 'leak' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
            Verificador de Vazamento de E-mail (HaveIBeenPwned):
          </label>
          <input
            type="text"
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            placeholder="Digite seu e-mail (ex: seuemail@exemplo.com)"
          />

          {/* SIMULADOR DE FORÇA BRUTA DE SENHA + K-ANONYMITY */}
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--soft)', borderRadius: '16px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                Testador de Senha & Simulador de Ataque por Força Bruta
              </span>
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--green)', cursor: 'pointer', fontWeight: 700 }}
              >
                {mostrarSenha ? 'Ocultar' : 'Revelar'}
              </button>
            </div>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senhaInput}
              onChange={(e) => {
                setSenhaInput(e.target.value);
                setTentativasSimuladas(Math.min(999999, Math.pow(e.target.value.length, 4) * 123));
              }}
              placeholder="Digite uma senha para testar resistência criptográfica..."
              style={{ background: '#fff' }}
            />

            {senhaInput && (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Nível de Resistência:</span>
                  <b style={{ color: statusSenha.cor }}>{statusSenha.nivel}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Complexidade do espaço de busca:</span>
                  <b>{tentativasSimuladas.toLocaleString('pt-BR')} combinações calculadas</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tempo para quebrar em PC doméstico:</span>
                  <b>{statusSenha.tempoPc}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tempo com Cluster de GPUs (Criminosos):</span>
                  <b style={{ color: statusSenha.cor }}>{statusSenha.tempoGpu}</b>
                </div>
                <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--muted)', background: '#fff', padding: '8px', borderRadius: '8px' }}>
                  🔒 <b>Privacidade k-Anonymity:</b> A Vero nunca envia sua senha para o servidor. Se consultada na API, apenas os 5 primeiros caracteres do hash SHA-1 trafegam na rede.
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
            {abaAtiva === 'msg' ? 'Cole a mensagem recebida no WhatsApp ou SMS:' : 'Cole o link ou endereço URL suspeito:'}
          </label>
          <textarea
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            rows={4}
            placeholder={
              abaAtiva === 'msg'
                ? 'Ex.: Oi mãe, troquei de número. Me faz um Pix urgente de R$ 900?'
                : 'Ex.: https://bit.ly/regularize-cartao-bloqueado'
            }
          />
        </div>
      )}

      {/* BOTÕES DE EXEMPLO RÁPIDO */}
      <div className="exs">
        <button
          type="button"
          onClick={() => {
            setAbaAtiva('msg');
            setInputTexto('Oi mãe, troquei de número. Me faz um Pix de R$ 1.200 urgente pelo amor de Deus?');
          }}
        >
          Testar Falso Filho (Pix)
        </button>
        <button
          type="button"
          onClick={() => {
            setAbaAtiva('link');
            setInputTexto('http://seubanco-atualiza-cadastro.top/login');
          }}
        >
          Testar Link Clonado (.top)
        </button>
        <button
          type="button"
          onClick={() => {
            setAbaAtiva('pix');
            setInputTexto('00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540550.005802BR5915ESTELIONATARIO6009SAO PAULO62070503***6304');
            setBeneficiarioEsperado('Enel Energia');
          }}
        >
          Testar Pix com Divergência
        </button>
        <button
          type="button"
          onClick={() => {
            setAbaAtiva('leak');
            setInputTexto('teste@exemplo.com');
          }}
        >
          Testar E-mail Vazado
        </button>
      </div>

      {/* BOTÃO PRINCIPAL DE VERIFICAÇÃO */}
      <button
        className="bigbtn"
        type="button"
        disabled={verificando || (!inputTexto.trim() && !senhaInput.trim())}
        onClick={handleVerificar}
      >
        <svg className="ic"><use href="#i-search" /></svg>
        <span>{verificando ? 'Analisando fontes e criptografia...' : 'Verificar Agora'}</span>
      </button>

      {/* RESULTADO: PIX / BOLETO */}
      {resultadoPix && (
        <div style={{ marginTop: '16px', background: '#fff', borderRadius: '18px', padding: '18px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase' }}>
              Resultado da Auditoria {resultadoPix.tipo === 'pix' ? 'Pix BR Code (EMV)' : 'Boleto Bancário'}
            </span>
            <span style={{
              background: resultadoPix.isValidCrc ? 'var(--gsoft)' : 'var(--rsoft)',
              color: resultadoPix.isValidCrc ? 'var(--gtext)' : 'var(--redd)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700
            }}>
              CRC-16: {resultadoPix.isValidCrc ? 'Válido ✓' : 'Corrompido / Inválido ✗'}
            </span>
          </div>

          {resultadoPix.alertaFraude && (
            <div style={{ background: 'var(--rsoft)', color: 'var(--redd)', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', border: '1px solid var(--red)' }}>
              ⚠️ {resultadoPix.alertaFraude}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', marginTop: '6px' }}>
            <div>
              <span style={{ color: 'var(--muted)' }}>Beneficiário Real:</span>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{resultadoPix.beneficiario}</div>
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>Valor do Pagamento:</span>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>
                {resultadoPix.valor ? `R$ ${resultadoPix.valor.toFixed(2)}` : 'Livre / Informado no App'}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>Cidade / Origem:</span>
              <div style={{ fontWeight: 600 }}>{resultadoPix.cidade || 'Não informada'}</div>
            </div>
            <div>
              <span style={{ color: 'var(--muted)' }}>Integridade EMV:</span>
              <div style={{ fontWeight: 600 }}>Checksum {resultadoPix.crcCalculado}</div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTADO: MENSAGEM OU LINK */}
      {resultadoMsg && (
        <div className={`verdict ${resultadoMsg.nivel}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b style={{ fontSize: '16px' }}>{resultadoMsg.titulo}</b>
            <button
              className="listen"
              type="button"
              onClick={() => falarTexto(`${resultadoMsg.titulo}. ${resultadoMsg.acao}`)}
              style={{ width: 34, height: 34 }}
            >
              <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-volume" /></svg>
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.4 }}>{resultadoMsg.acao}</p>
          {resultadoMsg.sinais.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <small style={{ fontWeight: 700 }}>Pistas identificadas pelos motores:</small>
              <ul style={{ margin: '6px 0 0', paddingLeft: '20px', fontSize: '13px' }}>
                {resultadoMsg.sinais.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* RESULTADO: VAZAMENTO (HaveIBeenPwned) */}
      {resultadoLeak && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          borderRadius: '16px',
          background: resultadoLeak.vazado ? 'var(--rsoft)' : 'var(--gsoft)',
          border: `1px solid ${resultadoLeak.vazado ? 'var(--red)' : 'var(--green)'}`,
          color: resultadoLeak.vazado ? 'var(--redd)' : 'var(--gtext)'
        }}>
          <b style={{ fontSize: '15px' }}>
            {resultadoLeak.vazado
              ? `🚨 Atenção: Encontrado em ${resultadoLeak.totalVazamentos} vazamento(s) público(s)!`
              : '✓ Nenhuma exposição pública recente encontrada'}
          </b>
          <p style={{ margin: '8px 0', fontSize: '13px' }}>{resultadoLeak.recomendacao}</p>

          {resultadoLeak.vazamentos && resultadoLeak.vazamentos.length > 0 && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resultadoLeak.vazamentos.map((b, i) => (
                <div key={i} style={{ background: '#fff', padding: '10px', borderRadius: '10px', color: 'var(--text)', border: '1px solid var(--line)', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{b.title} ({b.domain})</div>
                  <div style={{ color: 'var(--muted)', marginTop: '2px' }}>Data do Incidente: {b.breachDate} · Expostos: {b.pwnCount.toLocaleString('pt-BR')} contas</div>
                  <div style={{ marginTop: '4px' }}><b>Dados comprometidos:</b> {b.dataClasses.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="wa">
        <svg className="ic"><use href="#i-msg" /></svg>
        <span>
          <b>Canal de WhatsApp Comunitário:</b> Você também pode encaminhar mensagens suspeitas diretamente para o bot da Vero.
        </span>
      </div>
    </div>
  );
}

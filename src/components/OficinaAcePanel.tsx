'use client';

import { useState } from 'react';
import {
  adicionarRegistroOficina,
  atualizarLocalOficina,
  exportarOficinaCsv,
  limparOficina,
  type RegistroOficina,
  type VeroProgresso
} from '@/lib/progress-storage';

interface OficinaAcePanelProps {
  progresso: VeroProgresso;
  onProgressoAtualizado: (novo: VeroProgresso) => void;
}

export default function OficinaAcePanel({
  progresso,
  onProgressoAtualizado
}: OficinaAcePanelProps) {
  const [nomeLocal, setNomeLocal] = useState(progresso.oficinaSessao.nomeLocal);
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [perfil, setPerfil] = useState<RegistroOficina['perfil']>('Idoso');
  const [scoreAntes, setScoreAntes] = useState('45');
  const [scoreDepois, setScoreDepois] = useState(String(progresso.scoreCidadania || 80));

  const registros = progresso.oficinaSessao.registros;

  const mediaAntes =
    registros.length > 0
      ? Math.round(registros.reduce((acc, r) => acc + r.scoreAntes, 0) / registros.length)
      : 0;
  const mediaDepois =
    registros.length > 0
      ? Math.round(registros.reduce((acc, r) => acc + r.scoreDepois, 0) / registros.length)
      : 0;
  const evolucaoMedia = mediaDepois - mediaAntes;

  const salvarLocal = () => {
    const atualizado = atualizarLocalOficina(nomeLocal);
    onProgressoAtualizado(atualizado);
  };

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeParticipante.trim()) return;
    const antes = Math.max(0, Math.min(100, Number(scoreAntes) || 0));
    const depois = Math.max(0, Math.min(100, Number(scoreDepois) || 0));
    const atualizado = adicionarRegistroOficina(nomeParticipante, perfil, antes, depois);
    onProgressoAtualizado(atualizado);
    setNomeParticipante('');
  };

  const zerarSessao = () => {
    const atualizado = limparOficina();
    onProgressoAtualizado(atualizado);
  };

  return (
    <div className="arena" style={{ maxWidth: 920 }}>
      <div className="arena-head">
        <div>
          <div className="eyebrow" style={{ color: 'var(--green)' }}>
            MODO FACILITADOR · EXTENSÃO ACE UNIEURO
          </div>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.65rem', margin: '4px 0 0' }}>
            Registro de Impacto em Oficina Presencial
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn b-out"
            onClick={() => exportarOficinaCsv(progresso.oficinaSessao)}
            disabled={registros.length === 0}
          >
            <svg className="ic" aria-hidden="true">
              <use href="#i-down" />
            </svg>
            Exportar CSV ({registros.length})
          </button>
          <button type="button" className="btn b-ink" onClick={() => window.print()}>
            Imprimir Ata
          </button>
        </div>
      </div>

      <p style={{ margin: 0, color: 'var(--muted)' }}>
        Use este painel durante oficinas no SESC, centros de idosos ou associações comerciais para
        comprovar a evolução Antes vs. Depois dos participantes nos minigames Vero e gerar evidências
        mensuráveis para o relatório da disciplina ACE.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={nomeLocal}
          onChange={(e) => setNomeLocal(e.target.value)}
          placeholder="Local da oficina (ex: Centro de Convivência Taguatinga)"
          style={{
            flex: 1,
            minWidth: 240,
            padding: '12px 14px',
            borderRadius: 12,
            border: '1px solid var(--line)',
            fontSize: '.95rem'
          }}
        />
        <button type="button" className="btn b-out" onClick={salvarLocal}>
          Salvar local
        </button>
      </div>

      <div className="hub-stats" style={{ marginBottom: 4 }}>
        <div className="stat-box dark">
          <small>Participantes</small>
          <strong>{registros.length}</strong>
        </div>
        <div className="stat-box">
          <small>Média Antes</small>
          <strong>{mediaAntes}%</strong>
        </div>
        <div className="stat-box">
          <small>Média Depois</small>
          <strong style={{ color: 'var(--green)' }}>{mediaDepois}%</strong>
        </div>
        <div className="stat-box">
          <small>Ganho Médio</small>
          <strong style={{ color: evolucaoMedia >= 0 ? 'var(--green)' : 'var(--red)' }}>
            {evolucaoMedia >= 0 ? `+${evolucaoMedia} pp` : `${evolucaoMedia} pp`}
          </strong>
        </div>
      </div>

      <form
        onSubmit={registrar}
        style={{
          background: 'var(--soft)',
          padding: 18,
          borderRadius: 18,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
          gap: 10,
          alignItems: 'end'
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '.82rem', fontWeight: 700 }}>
          Nome / Apelido do participante
          <input
            type="text"
            required
            value={nomeParticipante}
            onChange={(e) => setNomeParticipante(e.target.value)}
            placeholder="Ex: Dona Maria S."
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '.82rem', fontWeight: 700 }}>
          Perfil
          <select
            value={perfil}
            onChange={(e) => setPerfil(e.target.value as RegistroOficina['perfil'])}
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)', background: '#fff' }}
          >
            <option value="Idoso">Idoso</option>
            <option value="Comerciante">Comerciante</option>
            <option value="Estudante">Estudante</option>
            <option value="Cidadão">Cidadão</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '.82rem', fontWeight: 700 }}>
          Pré-teste (%)
          <input
            type="number"
            min={0}
            max={100}
            value={scoreAntes}
            onChange={(e) => setScoreAntes(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '.82rem', fontWeight: 700 }}>
          Pós-teste (%)
          <input
            type="number"
            min={0}
            max={100}
            value={scoreDepois}
            onChange={(e) => setScoreDepois(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}
          />
        </label>

        <button type="submit" className="btn b-go" style={{ minHeight: 42 }}>
          + Registrar
        </button>
      </form>

      {registros.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--line)', textAlign: 'left', color: 'var(--muted)' }}>
                <th style={{ padding: '10px 8px' }}>Participante</th>
                <th style={{ padding: '10px 8px' }}>Perfil</th>
                <th style={{ padding: '10px 8px' }}>Antes</th>
                <th style={{ padding: '10px 8px' }}>Depois</th>
                <th style={{ padding: '10px 8px' }}>Evolução</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => {
                const diff = r.scoreDepois - r.scoreAntes;
                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--soft)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 700 }}>{r.nomeParticipante}</td>
                    <td style={{ padding: '10px 8px' }}>{r.perfil}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--fm)' }}>{r.scoreAntes}%</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--fm)', color: 'var(--green)', fontWeight: 700 }}>
                      {r.scoreDepois}%
                    </td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--fm)', fontWeight: 700 }}>
                      {diff >= 0 ? `+${diff} pp` : `${diff} pp`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="btn b-out" onClick={zerarSessao} style={{ fontSize: '.82rem' }}>
              Limpar registros da sessão
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '18px 0', color: 'var(--muted)' }}>
          Nenhum participante registrado ainda nesta sessão. Preencha o formulário acima após cada rodada!
        </div>
      )}
    </div>
  );
}


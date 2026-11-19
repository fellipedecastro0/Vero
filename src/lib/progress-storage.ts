import { isVozSilenciada } from './speech';

export type MinigameId = 'caca-golpes' | 'site-clone' | 'pix-boleto' | 'vishing';

export interface RegistroOficina {
  id: string;
  nomeParticipante: string;
  perfil: 'Idoso' | 'Comerciante' | 'Estudante' | 'Cidadão';
  scoreAntes: number; // 0 a 100
  scoreDepois: number; // 0 a 100
  dataHora: string;
}

export interface VeroProgresso {
  pontosTotais: number;
  ofensivaDias: number;
  ultimaDataTreino: string | null;
  scoreCidadania: number; // 0 a 100
  totalRespondidos: number;
  totalAcertos: number;
  jogosConcluidos: Record<MinigameId, { jogadas: number; melhorScore: number }>;
  medalhas: string[];
  oficinaSessao: {
    nomeLocal: string;
    registros: RegistroOficina[];
  };
}

const STORAGE_KEY = 'vero-progress-v1';

export const PROGRESSO_PADRAO: VeroProgresso = {
  pontosTotais: 0,
  ofensivaDias: 1,
  ultimaDataTreino: null,
  scoreCidadania: 50,
  totalRespondidos: 0,
  totalAcertos: 0,
  jogosConcluidos: {
    'caca-golpes': { jogadas: 0, melhorScore: 0 },
    'site-clone': { jogadas: 0, melhorScore: 0 },
    'pix-boleto': { jogadas: 0, melhorScore: 0 },
    vishing: { jogadas: 0, melhorScore: 0 }
  },
  medalhas: [],
  oficinaSessao: {
    nomeLocal: 'Oficina de Extensão ACE · CEUB',
    registros: []
  }
};

function getDataHojeIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isOntem(dataIso: string, hojeIso: string): boolean {
  const d1 = new Date(`${dataIso}T00:00:00`);
  const d2 = new Date(`${hojeIso}T00:00:00`);
  const diffDias = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return diffDias === 1;
}

export function carregarProgresso(): VeroProgresso {
  if (typeof window === 'undefined') return PROGRESSO_PADRAO;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PROGRESSO_PADRAO;
    const parsed = JSON.parse(raw) as Partial<VeroProgresso>;
    return {
      ...PROGRESSO_PADRAO,
      ...parsed,
      jogosConcluidos: {
        ...PROGRESSO_PADRAO.jogosConcluidos,
        ...(parsed.jogosConcluidos || {})
      },
      oficinaSessao: {
        ...PROGRESSO_PADRAO.oficinaSessao,
        ...(parsed.oficinaSessao || {})
      }
    };
  } catch {
    return PROGRESSO_PADRAO;
  }
}

export function salvarProgresso(progresso: VeroProgresso): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
    window.dispatchEvent(new Event('vero-progress-updated'));
  } catch {
    // ignore storage quota errors
  }
}

export function registrarResultadoJogo(
  jogoId: MinigameId,
  acertos: number,
  total: number
): VeroProgresso {
  const atual = carregarProgresso();
  const hoje = getDataHojeIso();

  let novaOfensiva = atual.ofensivaDias;
  if (!atual.ultimaDataTreino) {
    novaOfensiva = 1;
  } else if (atual.ultimaDataTreino !== hoje) {
    novaOfensiva = isOntem(atual.ultimaDataTreino, hoje) ? atual.ofensivaDias + 1 : 1;
  }

  const taxaPartida = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const pontosGanhos = acertos * 25 + (taxaPartida >= 80 ? 20 : 0);

  const novoTotalResp = atual.totalRespondidos + total;
  const novoTotalAcertos = atual.totalAcertos + acertos;

  // Score ponderado entre taxa histórica e bônus de prática (0 a 100)
  const taxaGlobal = novoTotalResp > 0 ? (novoTotalAcertos / novoTotalResp) * 100 : 50;
  const bonusPratica = Math.min(12, novoTotalResp * 0.4);
  const novoScore = Math.max(15, Math.min(100, Math.round(taxaGlobal * 0.88 + bonusPratica)));

  const jogoAnterior = atual.jogosConcluidos[jogoId] || { jogadas: 0, melhorScore: 0 };
  const novosJogos = {
    ...atual.jogosConcluidos,
    [jogoId]: {
      jogadas: jogoAnterior.jogadas + 1,
      melhorScore: Math.max(jogoAnterior.melhorScore, taxaPartida)
    }
  };

  const medalhasSet = new Set(atual.medalhas);
  medalhasSet.add('Primeiro Escudo');
  if (novosJogos['site-clone'].melhorScore >= 80) medalhasSet.add('Olho de Águia');
  if (novosJogos['pix-boleto'].melhorScore >= 80) medalhasSet.add('Auditor do Pix');
  if (novosJogos.vishing.melhorScore >= 80) medalhasSet.add('Imune à Falsa Central');

  const concluiuTodos = Object.values(novosJogos).every((j) => j.jogadas > 0);
  if (concluiuTodos && novoScore >= 80) {
    medalhasSet.add('Guardião Vero');
  }

  const proximo: VeroProgresso = {
    ...atual,
    pontosTotais: atual.pontosTotais + pontosGanhos,
    ofensivaDias: novaOfensiva,
    ultimaDataTreino: hoje,
    scoreCidadania: novoScore,
    totalRespondidos: novoTotalResp,
    totalAcertos: novoTotalAcertos,
    jogosConcluidos: novosJogos,
    medalhas: Array.from(medalhasSet)
  };

  salvarProgresso(proximo);
  return proximo;
}

export function gerarLinkWhatsappGuardiao(
  progresso: VeroProgresso,
  ultimoJogo?: string,
  reforco?: string
): string {
  const resumoJogo = ultimoJogo ? `Acabei de treinar em "${ultimoJogo}". ` : '';
  const dicaReforco = reforco ? `Ponto de atenção: ${reforco}.` : 'Continuo praticando para evitar fraudes!';
  const texto =
    `🛡️ *Resumo Vero Família*\n` +
    `${resumoJogo}` +
    `Meu Score de Cidadania Digital está em *${progresso.scoreCidadania}/100* ` +
    `(${progresso.pontosTotais} pts · ofensiva de ${progresso.ofensivaDias} dia(s)).\n` +
    `${dicaReforco}`;

  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

export function adicionarRegistroOficina(
  nomeParticipante: string,
  perfil: RegistroOficina['perfil'],
  scoreAntes: number,
  scoreDepois: number
): VeroProgresso {
  const atual = carregarProgresso();
  const novoRegistro: RegistroOficina = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    nomeParticipante: nomeParticipante.trim() || 'Participante Anônimo',
    perfil,
    scoreAntes: Math.max(0, Math.min(100, scoreAntes)),
    scoreDepois: Math.max(0, Math.min(100, scoreDepois)),
    dataHora: new Date().toLocaleString('pt-BR')
  };

  const proximo: VeroProgresso = {
    ...atual,
    oficinaSessao: {
      ...atual.oficinaSessao,
      registros: [novoRegistro, ...atual.oficinaSessao.registros]
    }
  };
  salvarProgresso(proximo);
  return proximo;
}

export function atualizarLocalOficina(nomeLocal: string): VeroProgresso {
  const atual = carregarProgresso();
  const proximo: VeroProgresso = {
    ...atual,
    oficinaSessao: {
      ...atual.oficinaSessao,
      nomeLocal
    }
  };
  salvarProgresso(proximo);
  return proximo;
}

export function limparOficina(): VeroProgresso {
  const atual = carregarProgresso();
  const proximo: VeroProgresso = {
    ...atual,
    oficinaSessao: {
      ...atual.oficinaSessao,
      registros: []
    }
  };
  salvarProgresso(proximo);
  return proximo;
}

export function exportarOficinaCsv(sessao: VeroProgresso['oficinaSessao']): void {
  if (typeof window === 'undefined') return;
  const header = 'Oficina;Participante;Perfil;Score_Antes;Score_Depois;Evolucao_Pontos;Data_Hora\n';
  const rows = sessao.registros
    .map((r) => {
      const diff = r.scoreDepois - r.scoreAntes;
      const cleanLocal = sessao.nomeLocal.replace(/;/g, ',');
      const cleanNome = r.nomeParticipante.replace(/;/g, ',');
      return `${cleanLocal};${cleanNome};${r.perfil};${r.scoreAntes};${r.scoreDepois};${diff >= 0 ? '+' : ''}${diff};${r.dataHora}`;
    })
    .join('\n');

  const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio-oficina-vero-${getDataHojeIso()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function resetarProgressoPessoal(): VeroProgresso {
  const atual = carregarProgresso();
  const proximo: VeroProgresso = {
    ...PROGRESSO_PADRAO,
    jogosConcluidos: {
      'caca-golpes': { jogadas: 0, melhorScore: 0 },
      'site-clone': { jogadas: 0, melhorScore: 0 },
      'pix-boleto': { jogadas: 0, melhorScore: 0 },
      vishing: { jogadas: 0, melhorScore: 0 }
    },
    medalhas: [],
    oficinaSessao: atual.oficinaSessao
  };
  salvarProgresso(proximo);
  return proximo;
}

/**
 * Feedback sonoro suave via Web Audio API (respeita o Modo Calmo e mudo global)
 */
export function tocarSomFeedback(acertou: boolean): void {
  if (typeof window === 'undefined') return;
  if (document.documentElement.classList.contains('calm')) return;
  if (isVozSilenciada()) return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (acertou) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // Dó5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // Mi5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.23);
    }
  } catch {
    // ignore audio restriction errors
  }
}


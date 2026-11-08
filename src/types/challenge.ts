export type CanalMensagem = 'WhatsApp' | 'SMS' | 'E-mail';

export interface MensagemDesafio {
  id: string;
  canal: CanalMensagem;
  remetente: string;
  isGolpe: boolean;
  texto: string;
  pistas: string[];
  explicacao: string;
  nivelDificuldade: 'iniciante' | 'intermediario' | 'avancado';
  // Detalhes realistas para interface WhatsApp
  whatsappInfo?: {
    avatarLetra: string;
    numeroOuNome: string;
    isContatoSalvo: boolean;
    horaEnvio: string;
    avisoSeguranca?: string;
  };
  // Detalhes realistas para interface Gmail
  emailInfo?: {
    deNome: string;
    deEmail: string;
    assunto: string;
    dataHora: string;
    temAnexo?: boolean;
    alertaSelo?: string;
  };
}

export interface ItemRankingComunidade {
  posicao: number;
  nome: string;
  categoria: 'Idoso' | 'Comerciante' | 'Estudante' | 'Cidadão';
  scoreRisco: number; // 0 a 100 (quanto maior, mais seguro)
  desafiosConcluidos: number;
  medalha: string;
}

export interface RelatorioScoreDigital {
  nomeUsuario: string;
  dataAvaliacao: string;
  scoreInicialPreTeste: number;
  scoreFinalPosTeste: number;
  evolucaoPercentual: number;
  categoriaRisco: 'Alto Risco' | 'Risco Moderado' | 'Cidadão Seguro';
  acertosPorTipo: {
    whatsappFalsoParente: boolean;
    smsLinkEncurtado: boolean;
    gmailPhishingBancario: boolean;
    boletoPixAdulterado: boolean;
    falsoPremioTaxa: boolean;
  };
  orientacoesPersonalizadas: string[];
}

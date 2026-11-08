export interface DadosPixEmv {
  raw: string;
  tipo: 'pix' | 'boleto';
  beneficiario: string;
  cidade: string;
  chavePix?: string;
  valor?: number;
  txId?: string;
  crcCalculado: string;
  crcOriginal: string;
  isValidCrc: boolean;
  bancoEstimado?: string;
  alertaFraude?: string;
  beneficiarioEsperado?: string;
  divergenciaBeneficiario?: boolean;
  vencimentoBoleto?: string;
  linhaDigitavelFormatada?: string;
}

export interface AnaliseUrlResultado {
  url: string;
  suspeito: boolean;
  motivos: string[];
  nivelRisco: 'baixo' | 'medio' | 'alto';
  acaoRecomendada: string;
  idadeDominioDias?: number;
  dataCriacaoEstimada?: string;
  registrador?: string;
  reputacaoThreatFeed?: 'limpo' | 'suspeito' | 'malicioso';
  isHomografo?: boolean;
  isEncurtador?: boolean;
}

export interface BrechaVazamento {
  titulo: string;
  dominio: string;
  dataVazamento: string;
  contasAfetadas: string;
  dadosComprometidos: string[];
  descricao: string;
}

export interface ResultadoVazamentoEmail {
  email: string;
  totalBrechas: number;
  vazou: boolean;
  brechas: BrechaVazamento[];
  recomendacoes: string[];
}

export interface ResultadoKAnonimatoSenha {
  prefixoHash: string;
  sufixoHash: string;
  hashCompleto: string;
  vezesVazada: number;
  vazada: boolean;
  entropiaBits: number;
  tempoQuebraEstimadoPc: string;
  tempoQuebraEstimadoGpu: string;
}

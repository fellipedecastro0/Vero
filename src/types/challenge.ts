export type CanalMensagem = 'WhatsApp' | 'SMS' | 'E-mail';

export interface MensagemDesafio {
  id: string;
  canal: CanalMensagem;
  remetente: string;
  isGolpe: boolean;
  texto: string;
  /** Trechos exatos do texto ou remetente que devem ser grifados no Raio-X após a resposta */
  trechosSuspeitos?: string[];
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
    anexoNome?: string;
    alertaSelo?: string;
    marcaLogo?: string;
    corMarca?: string;
    corTextoMarca?: string;
    destaqueCard?: string;
    botaoCtaTexto?: string;
    linkCtaPreview?: string;
  };
}

export interface SiteOpcao {
  url: string;
  tituloPagina: string;
  subtitulo: string;
  temCadeadoSsl: boolean;
  isVerdadeiro: boolean;
  destaqueDominio: string;
}

export interface DesafioSiteClone {
  id: string;
  marca: string;
  contexto: string;
  opcoes: [SiteOpcao, SiteOpcao];
  explicacao: string;
  dicaVisual: string;
}

export interface DesafioPixBoleto {
  id: string;
  tipo: 'Pix' | 'Boleto';
  contextoCompra: string;
  esperadoNome: string;
  valor: number;
  recebedorRealNome: string;
  recebedorDocumento: string;
  bancoDestino: string;
  chaveOuLinha: string;
  crcStatus: 'Válido' | 'Adulterado';
  isSeguroPagar: boolean;
  pistas: string[];
  explicacao: string;
}

export interface OpcaoVishing {
  texto: string;
  correta: boolean;
}

export interface DesafioLigacaoVishing {
  id: string;
  chamadorDisplay: string;
  numeroDisplay: string;
  isGolpe: boolean;
  falaScript: string;
  opcoes: [OpcaoVishing, OpcaoVishing];
  pistas: string[];
  explicacao: string;
}

export interface ItemCartilhaGolpe {
  id: string;
  titulo: string;
  apelido: string;
  risco: 'Crítico' | 'Alto';
  imagem?: string;
  comoFunciona: string;
  sinalAlerta: string;
  comoEvitar: string;
}

export interface ProtocoloEmergencia {
  id: 'pix' | 'link' | 'whatsapp' | 'celular';
  titulo: string;
  janelaCritica: string;
  resumo: string;
  passos: {
    titulo: string;
    detalhe: string;
    linkOficialLabel?: string;
    linkOficialUrl?: string;
  }[];
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

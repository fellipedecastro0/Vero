import { MensagemDesafio, ItemRankingComunidade } from '@/types/challenge';

export const DESAFIOS_PHISHING: MensagemDesafio[] = [
  // --- NÍVEL 1: INICIANTE (Golpes clássicos do dia a dia) ---
  {
    id: 'desafio-1',
    canal: 'WhatsApp',
    remetente: 'Número desconhecido (+55 61 98321-9988)',
    isGolpe: true,
    nivelDificuldade: 'iniciante',
    whatsappInfo: {
      avatarLetra: '?',
      numeroOuNome: '+55 61 98321-9988',
      isContatoSalvo: false,
      horaEnvio: '14:23',
      avisoSeguranca: 'Este número não está na sua lista de contatos. Tenha cautela antes de enviar valores.'
    },
    texto: 'Oi mãe, troquei de número, salva esse novo aí! Consegue me fazer um Pix de R$ 980 agora urgente? Preciso pagar o mecânico do carro e meu aplicativo travou.',
    pistas: [
      'Número novo não salvo na agenda telefônica',
      'Pedido imediato de Pix com urgência emocional',
      'Desculpa de aplicativo bloqueado para evitar falar por voz'
    ],
    explicacao: 'Este é o clássico golpe do falso parente no WhatsApp. Nunca faça Pix para alguém que afirma ser seu filho em número novo sem antes telefonar no número ANTIGO ou fazer uma chamada de vídeo para confirmar o rosto.'
  },
  {
    id: 'desafio-2',
    canal: 'WhatsApp',
    remetente: 'Rafael (Filho)',
    isGolpe: false,
    nivelDificuldade: 'iniciante',
    whatsappInfo: {
      avatarLetra: 'R',
      numeroOuNome: 'Rafael (Filho)',
      isContatoSalvo: true,
      horaEnvio: '11:15'
    },
    texto: 'Oi mãe! Almoço de domingo confirmado aí? Vou levar aquela torta de morango que a senhora gosta. Precisa que eu compre pão?',
    pistas: [
      'Contato salvo com histórico de conversa anterior',
      'Não pede dinheiro, Pix nem códigos por SMS',
      'Não contém nenhum link externo'
    ],
    explicacao: 'Mensagem 100% segura e legítima. Conversa de rotina familiar sem qualquer pedido financeiro ou urgência fabricada.'
  },
  {
    id: 'desafio-3',
    canal: 'SMS',
    remetente: 'SEU BANCO',
    isGolpe: true,
    nivelDificuldade: 'iniciante',
    texto: 'BANCO INFORMA: Cartão final 8214 com suspeita de clonagem. Acesso bloqueado. Regularize seus dados em 15 minutos: bit.ly/seguranca-cartao',
    pistas: [
      'Link encurtado (bit.ly) que esconde o endereço real',
      'Senso de pânico artificial ("15 minutos para regularizar")',
      'Bancos nunca enviam link de desbloqueio por SMS'
    ],
    explicacao: 'Golpe de Smishing. Bancos oficiais nunca enviam links em SMS solicitando senhas ou dados para desbloquear cartões. Se estiver em dúvida, abra o aplicativo oficial do banco no celular ou ligue no número impresso no verso do cartão.'
  },

  // --- NÍVEL 2: INTERMEDIÁRIO (Falsas entregas e e-mails de cobrança) ---
  {
    id: 'desafio-4',
    canal: 'E-mail',
    remetente: 'Atendimento Correios',
    isGolpe: true,
    nivelDificuldade: 'intermediario',
    emailInfo: {
      deNome: 'Correios Notificações',
      deEmail: 'rastreio@correios-taxa-alfandega.top',
      assunto: 'URGENTE: Objeto retido na alfândega - Prazo final para liberação',
      dataHora: 'Hoje, 09:42',
      temAnexo: false,
      alertaSelo: 'Remetente não autenticado via SPF/DKIM'
    },
    texto: 'Prezado cliente, sua encomenda vinda do exterior foi retida no centro de triagem. Para liberação imediata sem devolução ao remetente, realize o pagamento da Guia Tributária no valor de R$ 34,90 clicando no link abaixo: http://rastreio-correios-taxa-alfandega.top/pagar',
    pistas: [
      'Domínio do remetente termina em ".top" e não em "@correios.com.br"',
      'Conexão insegura HTTP (sem criptografia SSL)',
      'Taxa surpresa com link de pagamento direto'
    ],
    explicacao: 'Golpe da falsa taxa alfandegária. Os Correios nunca cobram taxas por links em e-mails genéricos; todo desembaraço é feito exclusivamente dentro da plataforma oficial "Minhas Importações" em correios.com.br com login Gov.br.'
  },
  {
    id: 'desafio-5',
    canal: 'SMS',
    remetente: 'Posto de Saúde Central',
    isGolpe: false,
    nivelDificuldade: 'intermediario',
    texto: 'SUS AVISA: Sua consulta com clínico geral está marcada para quinta-feira (12/11) às 08h30 na UBS 04. Responda apenas com a palavra SIM para confirmar sua ida.',
    pistas: [
      'Não contém nenhum link para clicar',
      'Não solicita pagamento de taxas nem dados de cartão',
      'Solicita apenas confirmação simples de presença'
    ],
    explicacao: 'Mensagem institucional legítima de lembrete de atendimento de saúde pública. Sem links maliciosos e sem cobrança.'
  },

  // --- NÍVEL 3: AVANÇADO (Spear Phishing, domínios clonados e QR Code) ---
  {
    id: 'desafio-6',
    canal: 'E-mail',
    remetente: 'Financeiro Nu Pagamentos',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    emailInfo: {
      deNome: 'Nubank Faturas',
      deEmail: 'faturas@nubank-seguranca.com',
      assunto: 'Fatura consolidada com desconto exclusivo de 15% para pagamento via Pix',
      dataHora: 'Ontem, 18:30',
      temAnexo: true,
      alertaSelo: 'Domínio suspeito recém-registrado'
    },
    texto: 'Olá! Sua fatura deste mês já fechou. Clientes especiais que quitarem hoje via Pix Copia e Cola ganham 15% de desconto automático. Copie o código Pix anexo e pague pelo seu internet banking.',
    pistas: [
      'Domínio falso ("nubank-seguranca.com" em vez de "@nubank.com.br")',
      'Oferta de desconto atípica em fatura para pagamento imediato via Pix',
      'QR Code ou Pix anexo direciona para conta de pessoa física (laranja)'
    ],
    explicacao: 'Golpe sofisticado de engenharia social direcionada. Faturas reais são pagas pelo código de barras oficial do banco emissor ou dentro do aplicativo oficial, nunca para chaves Pix aleatórias recebidas por e-mail com promessa de desconto.'
  }
];

export const RANKING_COMUNIDADE_MOCK: ItemRankingComunidade[] = [
  { posicao: 1, nome: 'Dona Marlene S.', categoria: 'Idoso', scoreRisco: 98, desafiosConcluidos: 34, medalha: 'Mestra Antigolpe 🛡️' },
  { posicao: 2, nome: 'Seu Raimundo B.', categoria: 'Idoso', scoreRisco: 95, desafiosConcluidos: 29, medalha: 'Olho Vivo 🦅' },
  { posicao: 3, nome: 'Lucas Mendonça', categoria: 'Estudante', scoreRisco: 92, desafiosConcluidos: 25, medalha: 'Defensor Digital ⚔️' },
  { posicao: 4, nome: 'Clara Mercearia', categoria: 'Comerciante', scoreRisco: 89, desafiosConcluidos: 22, medalha: 'Comércio Seguro 🏪' },
  { posicao: 5, nome: 'Ana Paula G.', categoria: 'Cidadão', scoreRisco: 86, desafiosConcluidos: 20, medalha: 'Alerta Ligado 💡' }
];

import type {
  MensagemDesafio,
  ItemRankingComunidade,
  DesafioSiteClone,
  DesafioPixBoleto,
  DesafioLigacaoVishing,
  ItemCartilhaGolpe,
  ProtocoloEmergencia
} from '@/types/challenge';

export const DESAFIOS_PHISHING: MensagemDesafio[] = [
  // ======================== NÍVEL 1: INICIANTE ========================
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
    trechosSuspeitos: ['troquei de número', 'Pix de R$ 980 agora urgente', 'meu aplicativo travou'],
    pistas: [
      'Número novo não salvo na agenda telefônica',
      'Pedido imediato de Pix com urgência emocional',
      'Desculpa de aplicativo bloqueado para evitar falar por voz'
    ],
    explicacao: 'Clássico golpe do falso parente no WhatsApp. Nunca faça Pix para quem afirma ter trocado de número sem antes ligar para o número ANTIGO ou fazer chamada de vídeo.'
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
      'Contato já salvo na agenda com histórico',
      'Não pede dinheiro, Pix nem códigos por SMS',
      'Não contém nenhum link externo'
    ],
    explicacao: 'Mensagem 100% segura e legítima. Conversa cotidiana de família sem urgência nem pedido financeiro.'
  },
  {
    id: 'desafio-3',
    canal: 'SMS',
    remetente: 'SEU BANCO',
    isGolpe: true,
    nivelDificuldade: 'iniciante',
    texto: 'BANCO INFORMA: Cartão final 8214 com suspeita de clonagem. Acesso bloqueado. Regularize seus dados em 15 minutos: bit.ly/seguranca-cartao',
    trechosSuspeitos: ['Acesso bloqueado', 'em 15 minutos', 'bit.ly/seguranca-cartao'],
    pistas: [
      'Link encurtado (bit.ly) que esconde o site verdadeiro',
      'Pressão psicológica com prazo de 15 minutos',
      'Bancos nunca enviam links por SMS para desbloqueio'
    ],
    explicacao: 'Golpe de Smishing. Bancos oficiais nunca mandam links em SMS para desbloquear cartão. Na dúvida, abra o app oficial do banco.'
  },
  {
    id: 'desafio-4',
    canal: 'SMS',
    remetente: 'Posto de Saúde Central',
    isGolpe: false,
    nivelDificuldade: 'iniciante',
    texto: 'SUS AVISA: Sua consulta com clínico geral está agendada para quinta-feira às 08h30 na UBS 04. Responda apenas SIM para confirmar sua presença.',
    pistas: [
      'Sem links para clicar',
      'Não solicita pagamento nem dados bancários',
      'Apenas confirmação simples de presença'
    ],
    explicacao: 'Lembrete legítimo de atendimento público de saúde. Não pede senha, Pix nem clique em site estranho.'
  },
  {
    id: 'desafio-5',
    canal: 'E-mail',
    remetente: 'Sorteio Prêmio Nacional',
    isGolpe: true,
    nivelDificuldade: 'iniciante',
    emailInfo: {
      deNome: 'Central de Prêmios BR',
      deEmail: 'premios@sorteio-nacional.top',
      assunto: 'PARABÉNS! Você foi contemplada com R$ 5.000,00 no CPF',
      dataHora: 'Hoje, 10:12',
      alertaSelo: 'Remetente não autenticado',
      marcaLogo: 'PRÊMIO NACIONAL 2026',
      corMarca: '#B42318',
      corTextoMarca: '#FFFFFF',
      destaqueCard: 'Prêmio aprovado: R$ 5.000,00 · Taxa de liberação: R$ 49,90',
      botaoCtaTexto: 'PAGAR TAXA E RESGATAR R$ 5.000',
      linkCtaPreview: 'http://sorteio-nacional.top/resgatar-pix'
    },
    texto: 'Seu CPF foi premiado em nossa campanha de aniversário! Para receber o Pix de R$ 5.000,00 hoje mesmo, pague apenas a taxa cartorária de R$ 49,90 via guia.',
    trechosSuspeitos: ['sorteio-nacional.top', 'pague apenas a taxa cartorária de R$ 49,90'],
    pistas: [
      'Prêmio de sorteio no qual você nunca se inscreveu',
      'Cobrança de taxa antecipada para liberar dinheiro',
      'Domínio de e-mail terminado em .top'
    ],
    explicacao: 'Prêmio verdadeiro nunca exige pagamento de taxa prévia. Se pedirem dinheiro para "liberar" um valor maior, é golpe.'
  },
  {
    id: 'desafio-6',
    canal: 'WhatsApp',
    remetente: 'Clínica OdontoVida',
    isGolpe: false,
    nivelDificuldade: 'iniciante',
    whatsappInfo: {
      avatarLetra: 'O',
      numeroOuNome: 'Clínica OdontoVida',
      isContatoSalvo: true,
      horaEnvio: '16:05'
    },
    texto: 'Boa tarde! Lembrando do seu retorno de limpeza amanhã às 14h com a Dra. Camila. Caso precise remarcar, basta responder por aqui mesmo.',
    pistas: [
      'Contato salvo da clínica que você já frequenta',
      'Não cobra taxa antecipada nem pede códigos',
      'Não envia links suspeitos'
    ],
    explicacao: 'Mensagem legítima de confirmação de consulta. Não há pedido de transferência nem envio de código SMS.'
  },

  // ======================== NÍVEL 2: INTERMEDIÁRIO ========================
  {
    id: 'desafio-7',
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
      alertaSelo: 'Remetente não autenticado via SPF/DKIM',
      marcaLogo: 'Correios · Rastreamento Aduaneiro',
      corMarca: '#FFD400',
      corTextoMarca: '#00416B',
      destaqueCard: 'Objeto: NL849201442BR · Status: Aguardando guia de R$ 34,90',
      botaoCtaTexto: 'PAGAR GUIA E LIBERAR OBJETO',
      linkCtaPreview: 'http://rastreio-correios-taxa-alfandega.top/pagar'
    },
    texto: 'Prezado cliente, sua encomenda foi retida na triagem. Para liberação imediata sem devolução, pague a Guia Tributária de R$ 34,90 em: http://rastreio-correios-taxa-alfandega.top/pagar',
    trechosSuspeitos: ['liberação imediata', 'R$ 34,90', 'http://rastreio-correios-taxa-alfandega.top/pagar'],
    pistas: [
      'Domínio terminado em .top (não é correios.com.br)',
      'Site sem cadeado SSL (http://)',
      'Cobrança surpresa por link direto'
    ],
    explicacao: 'Golpe da falsa taxa dos Correios. O despacho oficial acontece somente dentro do site correios.com.br no painel "Minhas Importações".'
  },
  {
    id: 'desafio-8',
    canal: 'WhatsApp',
    remetente: 'Entregador Loggi / Mercado',
    isGolpe: true,
    nivelDificuldade: 'intermediario',
    whatsappInfo: {
      avatarLetra: 'E',
      numeroOuNome: '+55 11 94102-8871',
      isContatoSalvo: false,
      horaEnvio: '15:10',
      avisoSeguranca: 'Número desconhecido fora da plataforma oficial.'
    },
    texto: 'Boa tarde, estou aqui na portaria com sua encomenda! O sistema da empresa pediu para confirmar um código de 6 dígitos que acabou de chegar no seu SMS para liberar a entrega.',
    trechosSuspeitos: ['confirmar um código de 6 dígitos', 'acabou de chegar no seu SMS'],
    pistas: [
      'Pedido do código de 6 dígitos enviado por SMS',
      'Esse código é na verdade a senha de verificação do seu WhatsApp ou banco',
      'Entregador real nunca pede código de SMS de WhatsApp'
    ],
    explicacao: 'Golpe de roubo de conta! O código de 6 dígitos no SMS serve para clonar seu WhatsApp ou invadir seu banco em outro aparelho. Nunca repasse códigos a ninguém.'
  },
  {
    id: 'desafio-9',
    canal: 'WhatsApp',
    remetente: 'Número desconhecido (+55 61 99111-3344)',
    isGolpe: true,
    nivelDificuldade: 'intermediario',
    whatsappInfo: {
      avatarLetra: 'P',
      numeroOuNome: '+55 61 99111-3344',
      isContatoSalvo: false,
      horaEnvio: '13:48',
      avisoSeguranca: 'Número não salvo na agenda.'
    },
    texto: 'Moça, acabei de fazer um Pix de R$ 650 sem querer para o seu celular! Era para pagar o remédio da minha mãe. Por favor devolve nessa outra chave Pix aqui: 891.222.333-00 porque a minha deu erro.',
    trechosSuspeitos: ['Pix de R$ 650 sem querer', 'devolve nessa outra chave Pix aqui'],
    pistas: [
      'Pede devolução para UMA CHAVE DIFERENTE da conta de origem',
      'Pressiona com história emotiva (remédio da mãe)',
      'Usa o mecanismo MED depois para puxar o dinheiro de volta em dobro'
    ],
    explicacao: 'Golpe do Pix Errado! Se alguém realmente transferiu errado para você, use SOMENTE a função oficial "Devolver Pix" dentro do extrato do seu banco — nunca faça um novo Pix para outra chave.'
  },
  {
    id: 'desafio-10',
    canal: 'SMS',
    remetente: 'Gov.br Aviso',
    isGolpe: true,
    nivelDificuldade: 'intermediario',
    texto: 'RECEITA FEDERAL: CPF com pendência no Imposto de Renda. Evite bloqueio do Pix e multa pagando a DARF atualizada em govbr-regulariza.online/cpf',
    trechosSuspeitos: ['bloqueio do Pix', 'govbr-regulariza.online/cpf'],
    pistas: [
      'Site oficial do governo sempre termina em .gov.br (nunca .online)',
      'Ameaça de bloqueio imediato do Pix por SMS',
      'A Receita Federal não envia cobranças por links de SMS'
    ],
    explicacao: 'Golpe usando o nome da Receita Federal. Portais oficiais do Governo Federal usam exclusivamente a terminação ".gov.br".'
  },
  {
    id: 'desafio-11',
    canal: 'E-mail',
    remetente: 'Equipe Mercado Livre',
    isGolpe: false,
    nivelDificuldade: 'intermediario',
    emailInfo: {
      deNome: 'Mercado Livre',
      deEmail: 'nao-responder@mercadolivre.com.br',
      assunto: 'Seu pedido #482910 está em rota de entrega',
      dataHora: 'Hoje, 08:15',
      marcaLogo: 'Mercado Livre · Compra Garantida',
      corMarca: '#FFE600',
      corTextoMarca: '#2D3277',
      destaqueCard: 'Pedido #482910 · Cafeteira Elétrica · Saiu para entrega hoje',
      botaoCtaTexto: 'ABRIR NO APLICATIVO OFICIAL',
      linkCtaPreview: 'https://www.mercadolivre.com.br/compras'
    },
    texto: 'Olá! Sua compra "Cafeteira Elétrica" saiu para entrega hoje. Acompanhe os detalhes abrindo o aplicativo oficial do Mercado Livre na seção Minhas Compras. Não solicitamos códigos por fora do app.',
    pistas: [
      'Domínio oficial (@mercadolivre.com.br)',
      'Orienta o usuário a abrir o aplicativo oficial por conta própria',
      'Não pede pagamento extra nem senha'
    ],
    explicacao: 'E-mail informativo seguro. Observe que ele instrui você a verificar direto no aplicativo oficial e usa o domínio real da empresa.'
  },
  {
    id: 'desafio-12',
    canal: 'WhatsApp',
    remetente: 'Vagas Home Office Brasil',
    isGolpe: true,
    nivelDificuldade: 'intermediario',
    whatsappInfo: {
      avatarLetra: 'V',
      numeroOuNome: '+55 21 97400-1122',
      isContatoSalvo: false,
      horaEnvio: '17:40',
      avisoSeguranca: 'Contato comercial não verificado.'
    },
    texto: 'Olá! Fomos indicados para oferecer renda extra de R$ 350 por dia apenas curtindo vídeos no celular. Para liberar as tarefas VIP, faça um depósito inicial de R$ 50 que já volta dobrado!',
    trechosSuspeitos: ['R$ 350 por dia apenas curtindo vídeos', 'depósito inicial de R$ 50 que já volta dobrado'],
    pistas: [
      'Promessa de ganho fácil incompatível com a realidade',
      'Exige depósito inicial para trabalhar ("golpe da tarefa")',
      'Nenhum emprego legítimo cobra taxa para você receber salário'
    ],
    explicacao: 'Golpe das Tarefas / Renda Fácil. Eles até pagam os primeiros R$ 10 para ganhar confiança, depois pedem depósitos maiores e somem com o dinheiro.'
  },

  // ======================== NÍVEL 3: AVANÇADO ========================
  {
    id: 'desafio-13',
    canal: 'E-mail',
    remetente: 'Financeiro Nu Pagamentos',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    emailInfo: {
      deNome: 'Nubank Faturas',
      deEmail: 'faturas@nubank-seguranca.com',
      assunto: 'Fatura consolidada com desconto exclusivo de 15% via Pix',
      dataHora: 'Ontem, 18:30',
      temAnexo: true,
      anexoNome: 'Pix_Fatura_Desconto15.pdf',
      alertaSelo: 'Domínio suspeito recém-registrado',
      marcaLogo: 'nu · Cartão de Crédito',
      corMarca: '#820AD1',
      corTextoMarca: '#FFFFFF',
      destaqueCard: 'Oferta válida hoje · 15% de desconto quitando via Pix anexo',
      botaoCtaTexto: 'COPIAR PIX COM 15% DE DESCONTO',
      linkCtaPreview: 'https://nubank-seguranca.com/fatura-pix'
    },
    texto: 'Olá! Sua fatura fechou. Clientes selecionados que quitarem hoje via Pix Copia e Cola anexo ganham 15% de desconto automático na hora.',
    trechosSuspeitos: ['nubank-seguranca.com', 'via Pix Copia e Cola anexo ganham 15% de desconto'],
    pistas: [
      'Domínio falso (nubank-seguranca.com em vez de nubank.com.br)',
      'Desconto incomum para forçar pagamento fora do app do banco',
      'Pix anexo direciona dinheiro para conta de laranja'
    ],
    explicacao: 'Spear phishing financeiro. Faturas reais de cartão são pagas dentro do próprio app do banco ou via boleto oficial em seu nome, nunca por desconto via Pix anexo.'
  },
  {
    id: 'desafio-14',
    canal: 'WhatsApp',
    remetente: 'Suporte Caixa Segurança',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    whatsappInfo: {
      avatarLetra: 'C',
      numeroOuNome: '+55 11 4004-0104 (Comercial)',
      isContatoSalvo: false,
      horaEnvio: '10:02',
      avisoSeguranca: 'Conta sem selo oficial azul/verde da instituição.'
    },
    texto: 'Protocolo 99281: Detectamos uma tentativa de compra de R$ 3.800 nas Casas Bahia. Para cancelar e proteger sua conta, baixe agora o aplicativo "Suporte Seguro Team" na loja e informe o número que aparecer na tela.',
    trechosSuspeitos: ['compra de R$ 3.800', 'baixe agora o aplicativo "Suporte Seguro Team"', 'informe o número que aparecer na tela'],
    pistas: [
      'Pede para instalar aplicativo de acesso remoto (Golpe da Mão Fantasma)',
      'Usa número parecido com 4004 mas sem selo oficial verificado',
      'Cria medo com valor alto de compra inexistente'
    ],
    explicacao: 'Golpe da Mão Fantasma! Ao instalar aplicativos de acesso remoto, o golpista assume o controle total da tela do seu celular e limpa sua conta bancária diante dos seus olhos.'
  },
  {
    id: 'desafio-15',
    canal: 'E-mail',
    remetente: 'Banco do Brasil',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    emailInfo: {
      deNome: 'Banco do Brasil Avisos',
      deEmail: 'atendimento@bancodobrasil.com.br.verifica-acesso.xyz',
      assunto: 'Chave Pix desativada por inconsistência cadastral',
      dataHora: 'Hoje, 07:50',
      alertaSelo: 'Subdomínio enganoso detectado',
      marcaLogo: 'Banco do Brasil · Segurança Pix',
      corMarca: '#FCFC30',
      corTextoMarca: '#0038A8',
      destaqueCard: 'Status da Chave Pix CPF: Pausada temporariamente',
      botaoCtaTexto: 'REVALIDAR SENHA DE 8 DÍGITOS',
      linkCtaPreview: 'https://bancodobrasil.com.br.verifica-acesso.xyz'
    },
    texto: 'Prezado correntista, sua chave Pix CPF foi temporariamente pausada. Acesse o portal bancodobrasil.com.br.verifica-acesso.xyz para revalidar sua senha de 8 dígitos.',
    trechosSuspeitos: ['.verifica-acesso.xyz', 'revalidar sua senha de 8 dígitos'],
    pistas: [
      'Truque de subdomínio: o domínio real termina em ".verifica-acesso.xyz", não em ".bb.com.br"',
      'Solicita senha bancária de 8 dígitos em página web externa',
      'Inconsistência falsa de chave Pix'
    ],
    explicacao: 'Phishing com subdomínio enganoso! Sempre leia o endereço de trás para frente até a primeira barra "/": o que vale é o final antes do ".com/.xyz", neste caso "verifica-acesso.xyz".'
  },
  {
    id: 'desafio-16',
    canal: 'E-mail',
    remetente: 'Cartório 2º Ofício (Falsa Intimação)',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    emailInfo: {
      deNome: 'Notificação Extrajudicial',
      deEmail: 'intimacao@cartorio-protesto-df.site',
      assunto: 'Último Aviso: Protesto em Cartório e Bloqueio de Contas em 24h',
      dataHora: 'Hoje, 11:20',
      temAnexo: true,
      anexoNome: 'Certidão_Detalhada.zip',
      alertaSelo: 'Anexo executável bloqueado em potencial',
      marcaLogo: '2º OFÍCIO · NOTIFICAÇÃO DE PROTESTO',
      corMarca: '#1F2937',
      corTextoMarca: '#FFFFFF',
      destaqueCard: 'Título em aberto: R$ 1.420,00 · Prazo: 24 horas antes da penhora',
      botaoCtaTexto: 'BAIXAR CERTIDÃO E BOLETO (.ZIP)',
      linkCtaPreview: 'https://cartorio-protesto-df.site/certidao'
    },
    texto: 'Consta um débito protestado em seu CPF no valor de R$ 1.420,00. Baixe a Certidão_Detalhada.zip em anexo no seu computador ou pague o boleto anexo hoje para evitar penhora.',
    trechosSuspeitos: ['cartorio-protesto-df.site', 'Certidão_Detalhada.zip', 'evitar penhora'],
    pistas: [
      'Ameaça jurídica grave para induzir erro rápido',
      'Anexo compactado (.zip) costuma esconder vírus trojan bancário',
      'Domínio .site não oficial de tabelionato/tribunal'
    ],
    explicacao: 'Golpe da falsa intimação judicial com anexo malicioso. Intimações reais não chegam com arquivo .zip por e-mail genérico; consulte dívidas gratuitamente no Serasa ou Registrato.'
  },
  {
    id: 'desafio-17',
    canal: 'WhatsApp',
    remetente: 'Gerente Banco Itaú (Personalité)',
    isGolpe: false,
    nivelDificuldade: 'avancado',
    whatsappInfo: {
      avatarLetra: 'I',
      numeroOuNome: 'Itaú Atendimento Oficial ✓',
      isContatoSalvo: true,
      horaEnvio: '14:00'
    },
    texto: 'Olá! Aqui é a Camila, sua gerente da agência 0412. Como você solicitou ontem o aumento de limite para sua viagem, já deixei disponível para você aceitar diretamente lá dentro do seu aplicativo Itaú. Qualquer dúvida, me avise!',
    pistas: [
      'Conta verificada oficial da agência que você já conhece',
      'Refere-se a uma solicitação que VOCÊ realmente fez ontem',
      'Não manda link nem pede senha — orienta a entrar no app oficial'
    ],
    explicacao: 'Atendimento legítimo. O gerente apenas informa que o serviço solicitado por você já aparece dentro do aplicativo oficial do banco, sem pedir dados nem enviar links.'
  },
  {
    id: 'desafio-18',
    canal: 'E-mail',
    remetente: 'Fornecedor Energia & Boleto',
    isGolpe: true,
    nivelDificuldade: 'avancado',
    emailInfo: {
      deNome: 'Financeiro Distribuidora',
      deEmail: 'cobranca@enel-faturas-br.com',
      assunto: 'Fatura recalculada — Desconsidere o boleto anterior',
      dataHora: 'Hoje, 09:05',
      temAnexo: true,
      anexoNome: 'Nova_Guia_Recalculada.pdf',
      alertaSelo: 'Troca suspeita de cobrança',
      marcaLogo: 'DISTRIBUIDORA DE ENERGIA · 2ª VIA',
      corMarca: '#006837',
      corTextoMarca: '#FFFFFF',
      destaqueCard: 'Atenção: Desconsidere o boleto anterior · Pagar nova guia até 16h',
      botaoCtaTexto: 'VISUALIZAR NOVA LINHA DIGITÁVEL',
      linkCtaPreview: 'https://enel-faturas-br.com/nova-guia'
    },
    texto: 'Informamos que o boleto anterior da sua empresa foi emitido com erro de alíquota. Por gentileza, desconsidere a guia antiga e realize o pagamento desta nova linha digitável até às 16h.',
    trechosSuspeitos: ['enel-faturas-br.com', 'desconsidere a guia antiga', 'nova linha digitável até às 16h'],
    pistas: [
      'Pedido para ignorar boleto anterior e pagar um novo com urgência',
      'Domínio do remetente não corresponde ao oficial da distribuidora',
      'Golpe clássico contra financeiro de PMEs e residências'
    ],
    explicacao: 'Golpe do boleto substituído! Sempre que alguém pedir por e-mail ou WhatsApp para "desconsiderar o boleto antigo", confira a nova guia diretamente no site oficial ou ligando no 0800 oficial.'
  }
];

export const DESAFIOS_SITE_CLONE: DesafioSiteClone[] = [
  {
    id: 'site-1',
    marca: 'Banco Itaú',
    contexto: 'Você precisa consultar sua fatura pelo navegador do computador. Qual endereço é o verdadeiro?',
    opcoes: [
      {
        url: 'https://www.itau.com.br/atendimento',
        tituloPagina: 'Itaú — Feito com você',
        subtitulo: 'Acesse sua conta com agência e conta',
        temCadeadoSsl: true,
        isVerdadeiro: true,
        destaqueDominio: 'itau.com.br'
      },
      {
        url: 'https://www.itau-seguranca.top/atualizar',
        tituloPagina: 'Itaú — Atualização Obrigatória',
        subtitulo: 'Digite sua senha eletrônica e código SMS',
        temCadeadoSsl: true,
        isVerdadeiro: false,
        destaqueDominio: 'itau-seguranca.top'
      }
    ],
    dicaVisual: 'Cuidado: site falso também pode ter cadeado HTTPS! O segredo está no domínio após a barra.',
    explicacao: 'O site oficial termina sempre em ".itau.com.br". Golpistas compram domínios parecidos como "itau-seguranca.top" e colocam cadeado SSL para enganar quem só olha o cadeado.'
  },
  {
    id: 'site-2',
    marca: 'Gov.br (Governo Federal)',
    contexto: 'Você recebeu uma mensagem sobre valores esquecidos no Banco Central / CPF. Qual portal é oficial?',
    opcoes: [
      {
        url: 'https://valoresareceber-gov.online/consulta',
        tituloPagina: 'Portal Valores a Receber · Brasil',
        subtitulo: 'Pague a taxa de transferência para sacar',
        temCadeadoSsl: true,
        isVerdadeiro: false,
        destaqueDominio: 'valoresareceber-gov.online'
      },
      {
        url: 'https://www.gov.br/bcb/pt-br',
        tituloPagina: 'Banco Central do Brasil · Gov.br',
        subtitulo: 'Sistema de Valores a Receber (SVR) gratuito',
        temCadeadoSsl: true,
        isVerdadeiro: true,
        destaqueDominio: 'gov.br'
      }
    ],
    dicaVisual: 'Sites oficiais do Governo Federal no Brasil terminam exclusivamente em ".gov.br".',
    explicacao: 'O Banco Central nunca cobra taxa nem usa endereços ".online" ou ".com". Se não terminar em ".gov.br" logo antes da primeira barra "/", feche imediatamente.'
  },
  {
    id: 'site-3',
    marca: 'Correios do Brasil',
    contexto: 'Você quer rastrear uma compra que fez pela internet. Em qual site deve clicar?',
    opcoes: [
      {
        url: 'https://rastreamento.correios.com.br',
        tituloPagina: 'Rastreamento Oficial · Correios',
        subtitulo: 'Acompanhe seu objeto pelo código BR',
        temCadeadoSsl: true,
        isVerdadeiro: true,
        destaqueDominio: 'correios.com.br'
      },
      {
        url: 'http://correios.com.br.taxa-alfandega.xyz',
        tituloPagina: 'Correios · Desembaraço Aduaneiro',
        subtitulo: 'Taxa pendente de R$ 28,90 via Pix',
        temCadeadoSsl: false,
        isVerdadeiro: false,
        destaqueDominio: 'taxa-alfandega.xyz'
      }
    ],
    dicaVisual: 'Atenção ao truque do ponto: "correios.com.br" no começo engana, mas o final é ".taxa-alfandega.xyz"!',
    explicacao: 'Golpistas colocam o nome da empresa na frente como subdomínio ("correios.com.br.SITEFALSO.xyz"). Sempre olhe o que vem imediatamente antes da primeira barra "/".'
  },
  {
    id: 'site-4',
    marca: 'Banco do Brasil',
    contexto: 'Você abriu uma busca para entrar no internet banking do BB. Qual deles é autêntico?',
    opcoes: [
      {
        url: 'https://www.bb.com.br/pbb/pagina-inicial',
        tituloPagina: 'Banco do Brasil · Para Você',
        subtitulo: 'Acesse sua conta com segurança',
        temCadeadoSsl: true,
        isVerdadeiro: true,
        destaqueDominio: 'bb.com.br'
      },
      {
        url: 'https://www.bb-atendimentodigital.com/login',
        tituloPagina: 'BB Atendimento Digital',
        subtitulo: 'Desbloqueie sua chave de segurança',
        temCadeadoSsl: true,
        isVerdadeiro: false,
        destaqueDominio: 'bb-atendimentodigital.com'
      }
    ],
    dicaVisual: 'Desconfie de palavras extras com hífen como "-atendimentodigital" ou "-atualiza".',
    explicacao: 'O endereço oficial do Banco do Brasil é curto e direto: "bb.com.br". Bancos não criam sites separados com hífens longos para pedir atualização cadastral.'
  },
  {
    id: 'site-5',
    marca: 'Mercado Livre',
    contexto: 'Alguém mandou um link de uma promoção de geladeira pela metade do preço. Qual é a loja oficial?',
    opcoes: [
      {
        url: 'https://mercadolivre.ofertas-relampago.shop',
        tituloPagina: 'Super Queima Mercado Livre 70% OFF',
        subtitulo: 'Últimas unidades somente no Pix!',
        temCadeadoSsl: true,
        isVerdadeiro: false,
        destaqueDominio: 'ofertas-relampago.shop'
      },
      {
        url: 'https://www.mercadolivre.com.br/ofertas',
        tituloPagina: 'Ofertas do Dia · Mercado Livre Brasil',
        subtitulo: 'Compra Garantida pelo Mercado Pago',
        temCadeadoSsl: true,
        isVerdadeiro: true,
        destaqueDominio: 'mercadolivre.com.br'
      }
    ],
    dicaVisual: 'Lojas clonadas usam domínios ".shop" ou ".site" com descontos irreais aceitando só Pix.',
    explicacao: 'O site real é "mercadolivre.com.br". Se o endereço mudar para "ofertas-relampago.shop", é uma página falsa criada para roubar o Pix ou os dados do cartão.'
  }
];

export const DESAFIOS_PIX_BOLETO: DesafioPixBoleto[] = [
  {
    id: 'pix-1',
    tipo: 'Pix',
    contextoCompra: 'Você está pagando a conta de energia elétrica da sua casa (Enel Distribuição).',
    esperadoNome: 'Enel Distribuição S.A.',
    valor: 184.50,
    recebedorRealNome: 'LUCAS FERREIRA DE SOUZA (CPF ***.481.902-**)',
    recebedorDocumento: 'Pessoa Física · CPF',
    bancoDestino: 'Banco Digital PagFácil',
    chaveOuLinha: '00020126580014br.gov.bcb.pix...5913LUCAS FERREIRA...6304A81F',
    crcStatus: 'Válido',
    isSeguroPagar: false,
    pistas: [
      'Você esperava pagar a ENEL, mas o dinheiro vai para "LUCAS FERREIRA"',
      'Documento do recebedor é CPF de pessoa física, não o CNPJ da companhia de luz',
      'Mesmo com CRC-16 válido, o destinatário foi trocado para conta de laranja'
    ],
    explicacao: 'NUNCA confirme o Pix! O QR Code foi adulterado para enviar o pagamento da conta de luz para a conta pessoal de um golpista. Sempre leia o "Nome do Recebedor" na tela final do banco.'
  },
  {
    id: 'pix-2',
    tipo: 'Pix',
    contextoCompra: 'Você pediu um botijão de gás na distribuidora oficial do seu bairro (Supergás Bairro).',
    esperadoNome: 'Supergás Bairro Comércio Ltda',
    valor: 110.00,
    recebedorRealNome: 'SUPERGAS BAIRRO COMERCIO DE GAS LTDA',
    recebedorDocumento: 'CNPJ 14.222.888/0001-90',
    bancoDestino: 'Banco do Brasil S.A.',
    chaveOuLinha: '00020126580014br.gov.bcb.pix...5915SUPERGAS BAIRRO...6304F41C',
    crcStatus: 'Válido',
    isSeguroPagar: true,
    pistas: [
      'Nome do recebedor bate exatamente com a distribuidora esperada',
      'CNPJ empresarial compatível com o estabelecimento',
      'Integridade matemática CRC-16 válida'
    ],
    explicacao: 'Pagamento seguro! O beneficiário, o CNPJ e o valor na tela do banco conferem com a empresa onde você realmente comprou o produto.'
  },
  {
    id: 'pix-3',
    tipo: 'Boleto',
    contextoCompra: 'Você recebeu por WhatsApp o boleto de R$ 420 da mensalidade escolar / faculdade.',
    esperadoNome: 'Centro Universitário UNIEURO / Escola',
    valor: 420.00,
    recebedorRealNome: 'BOLETO AVULSO · MARCOS A. LIMA ME',
    recebedorDocumento: 'CNPJ Desconhecido · Banco 336 (C6)',
    bancoDestino: 'Banco C6 S.A. (Código 336)',
    chaveOuLinha: '33690.11204 55102.990123 44012.880019 1 99120000042000',
    crcStatus: 'Adulterado',
    isSeguroPagar: false,
    pistas: [
      'O beneficiário exibido no app do banco não é a instituição de ensino',
      'Os 3 primeiros dígitos (336) apontam para uma conta avulsa diferente do banco habitual da escola',
      'Enviado fora do portal oficial do aluno'
    ],
    explicacao: 'Boleto adulterado! Golpistas interceptam mensagens ou criam boletos falsos com o mesmo valor. Sempre gere a segunda via direto no portal oficial da escola/faculdade.'
  },
  {
    id: 'pix-4',
    tipo: 'Pix',
    contextoCompra: 'Você viu um anúncio no Instagram de uma fritadeira AirFryer que custa R$ 450 na loja, mas está por R$ 89,90 "só hoje no Pix".',
    esperadoNome: 'Magazine Luiza S.A.',
    valor: 89.90,
    recebedorRealNome: 'INTERMEDIACAO DIGITAL BRASIL LTDA',
    recebedorDocumento: 'CNPJ recém-aberto (12 dias)',
    bancoDestino: 'Instituição de Pagamento Genérica',
    chaveOuLinha: '00020126580014br.gov.bcb.pix...5919INTERMEDIACAO BR...63049B01',
    crcStatus: 'Válido',
    isSeguroPagar: false,
    pistas: [
      'Preço muito abaixo do mercado (R$ 89,90 por item de R$ 450)',
      'Promessa usando o nome da Magazine Luiza, mas o recebedor é "INTERMEDIACAO DIGITAL"',
      'Empresa intermediadora fantasma criada há poucos dias'
    ],
    explicacao: 'Golpe de loja falsa em rede social! Grandes varejistas sempre recebem em sua própria razão social (ex: Magazine Luiza S.A.), nunca em nomes genéricos de "intermediação".'
  },
  {
    id: 'pix-5',
    tipo: 'Boleto',
    contextoCompra: 'Você baixou diretamente do aplicativo oficial da operadora Vivo a conta mensal do seu celular.',
    esperadoNome: 'Telefônica Brasil S.A. (Vivo)',
    valor: 64.90,
    recebedorRealNome: 'TELEFONICA BRASIL S.A.',
    recebedorDocumento: 'CNPJ 02.558.157/0001-62',
    bancoDestino: 'Itaú Unibanco S.A. (Código 341)',
    chaveOuLinha: '34191.79001 01043.510047 91020.150008 8 98760000006490',
    crcStatus: 'Válido',
    isSeguroPagar: true,
    pistas: [
      'Fatura baixada diretamente de dentro do aplicativo oficial da operadora',
      'Razão social oficial (Telefônica Brasil S.A.) confirmada no leitor do banco',
      'Valor exato da sua fatura mensal'
    ],
    explicacao: 'Tudo certo! Quando você gera o código dentro do aplicativo oficial e confirma que a razão social é a da própria operadora, o pagamento é seguro.'
  }
];

export const DESAFIOS_VISHING: DesafioLigacaoVishing[] = [
  {
    id: 'vish-1',
    chamadorDisplay: 'Central Antifraude Bancária',
    numeroDisplay: '0800 729 0011 (Ligação Recebida)',
    isGolpe: true,
    falaScript:
      'Alô, Dona Marlene? Aqui é da Central Antifraude do seu banco. Acabamos de bloquear uma tentativa de Pix de três mil e quinhentos reais na sua conta. Para cancelar definitivamente e proteger seu saldo, a senhora precisa baixar agora o aplicativo de suporte remoto na loja do celular e ler o código que aparecer na tela.',
    opcoes: [
      { texto: 'Desligar imediatamente e abrir o app oficial do banco (ou ligar no verso do cartão)', correta: true },
      { texto: 'Instalar o aplicativo de suporte enquanto fica na linha para evitar perder o dinheiro', correta: false }
    ],
    pistas: [
      'Banco NUNCA liga pedindo para instalar aplicativo de acesso remoto no celular',
      'Uso de susto com valor alto (R$ 3.500) para fazer a pessoa obedecer sem pensar',
      'Número 0800 pode ser mascarado (spoofing) por criminosos'
    ],
    explicacao: 'Esse é o perigoso golpe da Falsa Central + Mão Fantasma. Desligue na hora! Se quiser ter certeza, use outro telefone ou aguarde 5 minutos e ligue você mesmo para o telefone atrás do seu cartão físico.'
  },
  {
    id: 'vish-2',
    chamadorDisplay: 'Suporte Técnico WhatsApp / Correios',
    numeroDisplay: '+55 11 98821-4409',
    isGolpe: true,
    falaScript:
      'Oi, boa tarde! Estamos atualizando o cadastro das entregas aqui na sua região e seu endereço deu erro no sistema. Acabei de enviar um código de 6 números por SMS no seu celular para confirmar sua residência. Pode me falar esses 6 números agora para o entregador não voltar com o pacote?',
    opcoes: [
      { texto: 'Recusar informar qualquer código recebido por SMS e encerrar a chamada', correta: true },
      { texto: 'Ler o código de 6 números rapidamente para não perder a entrega', correta: false }
    ],
    pistas: [
      'Pedido explícito do código de 6 dígitos enviado via SMS',
      'Nenhum entregador precisa de código de verificação por SMS do WhatsApp',
      'Com esse código, o golpista assume sua conta em outro celular'
    ],
    explicacao: 'Nunca leia códigos recebidos por SMS em voz alta ao telefone! Esse código é a chave mestra para clonar seu WhatsApp e pedir dinheiro para seus amigos e familiares.'
  },
  {
    id: 'vish-3',
    chamadorDisplay: 'Recepção Clínica Santa Clara',
    numeroDisplay: '(61) 3322-4500',
    isGolpe: false,
    falaScript:
      'Bom dia! Aqui é da recepção da Clínica Santa Clara, onde a senhora agendou exame de sangue para amanhã às sete e meia da manhã. Estamos ligando apenas para lembrar que é necessário jejum de oito horas e levar documento com foto. Não precisa confirmar nenhum código nem fazer pagamento por telefone, tá bom? Tenha um ótimo dia!',
    opcoes: [
      { texto: 'Desligar achando que é clonagem de cartão', correta: false },
      { texto: 'Agradecer o lembrete da consulta que eu realmente agendei', correta: true }
    ],
    pistas: [
      'Refere-se a um exame real que a própria pessoa marcou',
      'Não solicita senhas, instalação de apps, códigos SMS nem Pix',
      'Apenas passa orientação médica simples'
    ],
    explicacao: 'Ligação totalmente segura! Ela não pede nenhum dado confidencial, senha, código ou transferência financeira.'
  },
  {
    id: 'vish-4',
    chamadorDisplay: 'Gerente de Conta — Segurança Preventiva',
    numeroDisplay: '(11) 4004-9900',
    isGolpe: true,
    falaScript:
      'Senhor, seu aplicativo bancário foi invadido por hackers neste momento! Para salvar o seu dinheiro antes que transfiram tudo, entre no seu banco agora e faça um Pix de todo o seu saldo para a nossa "Conta Segura de Custódia do Banco Central" que eu vou ditar a chave.',
    opcoes: [
      { texto: 'Desligar na hora — banco nunca pede para transferir saldo para "conta segura"', correta: true },
      { texto: 'Fazer o Pix rápido para proteger o dinheiro dos invasores', correta: false }
    ],
    pistas: [
      'Não existe "conta segura de custódia" onde o cliente precisa transferir o dinheiro',
      'Senso de pânico extremo ("hackers invadiram agora")',
      'O golpista está ditando a chave Pix da conta dele próprio'
    ],
    explicacao: 'Golpe da "Conta Segura"! Bancos têm sistemas próprios para bloquear contas sem que você precise fazer transferência nenhuma. Se mandarem transferir para "proteger" o saldo, é 100% fraude.'
  }
];

export const CARTILHA_GOLPES: ItemCartilhaGolpe[] = [
  {
    id: 'cart-parente',
    titulo: 'Falso Parente (Número Novo)',
    apelido: 'Golpe do WhatsApp',
    risco: 'Crítico',
    imagem: '/images/golpes/falso-parente.jpg',
    comoFunciona: 'O golpista coloca a foto do seu filho ou neto em um chip novo, manda mensagem dizendo que trocou de telefone e pede um Pix urgente para pagar uma conta.',
    sinalAlerta: 'Número desconhecido pedindo transferência na hora e dando desculpa de que o áudio ou câmera não funcionam.',
    comoEvitar: 'Ligue sempre para o número ANTIGO da pessoa ou exija uma chamada de vídeo vendo o rosto antes de transferir qualquer centavo.'
  },
  {
    id: 'cart-mao-fantasma',
    titulo: 'Falsa Central & Mão Fantasma',
    apelido: 'Ligação 0800 Falsa',
    risco: 'Crítico',
    imagem: '/images/golpes/falsa-central.jpg',
    comoFunciona: 'Fingem ser da segurança do banco avisando de compra suspeita e convencem você a instalar um app de acesso remoto para "cancelar". Assim, controlam seu celular à distância.',
    sinalAlerta: 'Pedir para baixar qualquer aplicativo de suporte/acesso remoto ou pedir transferência para "conta segura".',
    comoEvitar: 'Desligue imediatamente. Bancos nunca pedem acesso ao seu aparelho nem senha por telefone.'
  },
  {
    id: 'cart-pix-errado',
    titulo: 'Golpe do Pix Errado (MED)',
    apelido: 'Devolução em outra chave',
    risco: 'Alto',
    imagem: '/images/golpes/pix-errado.jpg',
    comoFunciona: 'Alguém faz um Pix "sem querer" para você, chora pedindo devolução em OUTRA chave e depois aciona o banco alegando fraude para puxar o dinheiro original de volta.',
    sinalAlerta: 'Pedido para devolver o dinheiro fazendo um novo Pix para um CPF/chave diferente da conta que enviou.',
    comoEvitar: 'Use exclusivamente o botão "Devolver Pix" dentro do extrato daquela transação específica no seu aplicativo do banco.'
  },
  {
    id: 'cart-correios',
    titulo: 'Falsa Taxa de Encomenda / Gov.br',
    apelido: 'Smishing por SMS/E-mail',
    risco: 'Alto',
    imagem: '/images/golpes/taxa-encomenda.jpg',
    comoFunciona: 'SMS ou e-mail afirma que sua encomenda foi barrada na alfândega ou seu CPF está irregular, cobrando taxa pequena (R$ 19 a R$ 49) num link falso.',
    sinalAlerta: 'Endereços que não terminam em "correios.com.br" ou ".gov.br" (como .top, .online, .xyz).',
    comoEvitar: 'Nunca clique em links de SMS. Abra você mesmo o site oficial digitando no navegador ou use o Vero Checa.'
  },
  {
    id: 'cart-boleto',
    titulo: 'Boleto / QR Code Adulterado',
    apelido: 'Troca de Beneficiário',
    risco: 'Alto',
    imagem: '/images/golpes/boleto-adulterado.jpg',
    comoFunciona: 'Boleto falso ou QR Code trocado que mantém o valor igual, mas direciona o pagamento para a conta de um laranja.',
    sinalAlerta: 'Na tela final do banco antes da senha, o Nome do Recebedor ou CNPJ não bate com a loja/empresa.',
    comoEvitar: 'Sempre leia em voz alta quem vai receber na tela de confirmação do banco e audite códigos no Vero Checa.'
  },
  {
    id: 'cart-codigo-sms',
    titulo: 'Roubo de Código SMS (6 dígitos)',
    apelido: 'Clonagem de WhatsApp',
    risco: 'Crítico',
    imagem: '/images/golpes/codigo-sms.jpg',
    comoFunciona: 'Falsos entregadores, promoções ou pesquisas pedem para você repassar um código numérico que chegou por mensagem SMS.',
    sinalAlerta: 'Qualquer pessoa pedindo código de 6 dígitos que acabou de chegar no seu celular.',
    comoEvitar: 'Ative a "Confirmação em duas etapas" com PIN nas configurações do seu WhatsApp e nunca compartilhe códigos SMS.'
  }
];

export const PROTOCOLOS_EMERGENCIA: ProtocoloEmergencia[] = [
  {
    id: 'pix',
    titulo: 'Fiz um Pix para golpista',
    janelaCritica: 'AJA NOS PRIMEIROS 30 MINUTOS (Mecanismo MED)',
    resumo: 'Quanto mais rápido você avisar o seu banco, maior a chance de bloquear o dinheiro na conta do golpista antes dele sacar.',
    passos: [
      {
        titulo: '1. Acione o MED imediatamente no seu banco',
        detalhe: 'Abra o app do banco ou ligue no SAC/Ouvidoria e diga: "Fui vítima de fraude e quero solicitar o MED — Mecanismo Especial de Devolução do Pix". O banco bloqueia cautelarmente a conta destino por até 72h.'
      },
      {
        titulo: '2. Guarde todas as provas (não apague a conversa)',
        detalhe: 'Tire prints das mensagens, anote o comprovante do Pix (ID E2E), a chave Pix e o nome/CPF do recebedor exibido no comprovante.'
      },
      {
        titulo: '3. Registre o Boletim de Ocorrência (B.O.)',
        detalhe: 'Faça o B.O. online na Delegacia Virtual do seu estado selecionando "Estelionato / Fraude Eletrônica" e envie o número do B.O. para o protocolo do banco.'
      }
    ]
  },
  {
    id: 'link',
    titulo: 'Cliquei em link e digitei senha/cartão',
    janelaCritica: 'AÇÃO IMEDIATA — BLOQUEIO PREVENTIVO',
    resumo: 'Se você preencheu dados em site falso ou instalou app desconhecido, assuma que a senha e o cartão já estão expostos.',
    passos: [
      {
        titulo: '1. Desligue a internet do celular se instalou app suspeito',
        detalhe: 'Coloque o aparelho em Modo Avião imediatamente (especialmente em suspeita de "Mão Fantasma") para interromper o controle remoto e desinstale aplicativos recentes desconhecidos.'
      },
      {
        titulo: '2. Bloqueie o cartão e troque as senhas de OUTRO aparelho',
        detalhe: 'Use o celular de um familiar ou outro computador limpo para bloquear o cartão no app do banco e alterar a senha do banco, do e-mail principal e do Gov.br.'
      },
      {
        titulo: '3. Confira se abriram contas ou empréstimos no seu CPF',
        detalhe: 'Consulte gratuitamente o sistema Registrato do Banco Central para ver todas as contas bancárias, chaves Pix e empréstimos abertos no seu nome.',
        linkOficialLabel: 'Acessar Registrato (Banco Central)',
        linkOficialUrl: 'https://www.bcb.gov.br/meubc/registrato'
      }
    ]
  },
  {
    id: 'whatsapp',
    titulo: 'Clonaram meu WhatsApp',
    janelaCritica: 'AVISE SEUS CONTATOS IMEDIATAMENTE',
    resumo: 'Criminosos usam o WhatsApp clonado para pedir Pix aos seus familiares e amigos fingindo ser você.',
    passos: [
      {
        titulo: '1. Avise amigos e familiares por ligação ou outra rede',
        detalhe: 'Peça para um parente postar aviso no grupo da família: "Meu WhatsApp foi clonado, NÃO façam Pix nenhum pedido pelo meu número".'
      },
      {
        titulo: '2. Tente recuperar o acesso reinstalando o WhatsApp',
        detalhe: 'Desinstale e instale o WhatsApp oficial, digite seu número e aguarde o novo código SMS. Se pedir o PIN de 2 etapas que o golpista criou, será necessário aguardar o prazo de segurança de 7 dias com a conta travada.'
      },
      {
        titulo: '3. Envie e-mail de bloqueio para support@whatsapp.com',
        detalhe: 'Envie um e-mail com o assunto "Perdido/Roubado: Por favor, desative minha conta" e no texto coloque seu número completo com +55 e DDD (ex: +55 61 99999-9999).'
      }
    ]
  },
  {
    id: 'celular',
    titulo: 'Celular roubado ou perdido desbloqueado',
    janelaCritica: 'BLOQUEIO CENTRALIZADO EM MINUTOS',
    resumo: 'Hoje existe uma ferramenta oficial do Governo Federal que bloqueia chip, aparelho e aplicativos bancários de uma só vez.',
    passos: [
      {
        titulo: '1. Acione o programa Celular Seguro (Gov.br)',
        detalhe: 'De qualquer computador ou celular de confiança, entre no site ou app Celular Seguro usando sua conta Gov.br e clique em "Registrar Ocorrência" (ou peça para sua pessoa de confiança cadastrada acionar).',
        linkOficialLabel: 'Abrir Celular Seguro (Gov.br)',
        linkOficialUrl: 'https://celularseguro.mj.gov.br/'
      },
      {
        titulo: '2. Bloqueie a linha telefônica na operadora',
        detalhe: 'Ligue para sua operadora (Vivo, Claro, Tim) para suspender o chip e impedir que recebam códigos de recuperação de senha via SMS.'
      },
      {
        titulo: '3. Altere a senha do seu e-mail principal e faça o B.O.',
        detalhe: 'Troque a senha do Gmail/iCloud (pois quem controla seu e-mail principal consegue resetar quase todas as outras senhas) e registre o B.O. com o número do IMEI.'
      }
    ]
  }
];

export const RANKING_COMUNIDADE_MOCK: ItemRankingComunidade[] = [
  { posicao: 1, nome: 'Dona Marlene S.', categoria: 'Idoso', scoreRisco: 98, desafiosConcluidos: 34, medalha: 'Mestra Antigolpe 🛡️' },
  { posicao: 2, nome: 'Seu Raimundo B.', categoria: 'Idoso', scoreRisco: 95, desafiosConcluidos: 29, medalha: 'Olho Vivo 🦅' },
  { posicao: 3, nome: 'Lucas Mendonça', categoria: 'Estudante', scoreRisco: 92, desafiosConcluidos: 25, medalha: 'Defensor Digital ⚔️' },
  { posicao: 4, nome: 'Clara Mercearia', categoria: 'Comerciante', scoreRisco: 89, desafiosConcluidos: 22, medalha: 'Comércio Seguro 🏪' },
  { posicao: 5, nome: 'Ana Paula G.', categoria: 'Cidadão', scoreRisco: 86, desafiosConcluidos: 20, medalha: 'Alerta Ligado 💡' }
];

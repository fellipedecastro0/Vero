import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body.url || '';

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL não fornecida' },
        { status: 400 }
      );
    }

    const clean = url.trim().toLowerCase();
    const motivos: string[] = [];

    // Checagens heurísticas
    if (/bit\.ly|tinyurl|is\.gd|cutt\.ly|t\.co|ow\.ly/.test(clean)) {
      motivos.push('Uso de serviço encurtador de links para ocultar o domínio de destino real');
    }
    if (/atualiza|recadastro|bloqueio|seguranca-|banco-|itau-|bradesco-|caixa-|govbr-|auxilio-|nubank-/.test(clean)) {
      motivos.push('Termos de phishing, falsificação bancária e engenharia social identificados no endereço');
    }
    if (/\.top\b|\.xyz\b|\.click\b|\.online\b|\.vip\b|\.site\b|\.shop\b/.test(clean)) {
      motivos.push('Domínio registrado com terminação (TLD) de baixo custo, frequentemente utilizada em campanhas fraudulentas');
    }
    if (/^http:\/\//.test(clean)) {
      motivos.push('Conexão sem criptografia SSL (HTTP inseguro, suscetível a interceptação)');
    }
    if (/@/.test(clean)) {
      motivos.push('Presença do caractere "@" na URL (truque de redirecionamento que ignora o texto anterior)');
    }
    if (/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(clean)) {
      motivos.push('Uso direto de endereço IP em vez de nome de domínio registrado');
    }

    const suspeito = motivos.length > 0;
    const nivelRisco = motivos.length >= 2 ? 'alto' : motivos.length === 1 ? 'medio' : 'baixo';

    return NextResponse.json({
      url,
      suspeito,
      motivos,
      nivelRisco,
      acaoRecomendada: suspeito
        ? 'Evite clicar neste link ou digitar qualquer senha. Acesse o site oficial pelo navegador digitando o endereço diretamente.'
        : 'O link não apresenta padrões flagrantes de phishing conhecidos, mas sempre verifique o cadeado no navegador.'
    });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao analisar URL' },
      { status: 500 }
    );
  }
}

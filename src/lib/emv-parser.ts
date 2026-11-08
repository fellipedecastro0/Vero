import type { DadosPixEmv } from '@/types/pix';

/**
 * Calcula o CRC-16 CCITT (polinômio 0x1021, valor inicial 0xFFFF)
 * Utilizado oficialmente pela especificação EMVCo e pelo Banco Central do Brasil no Pix BR Code.
 */
export function calcularCrc16(payloadSemCrc: string): string {
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < payloadSemCrc.length; i++) {
    const code = payloadSemCrc.charCodeAt(i);
    crc ^= (code << 8);

    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const BANCOS_FEBRABAN: Record<string, string> = {
  '001': 'Banco do Brasil S.A.',
  '033': 'Banco Santander (Brasil) S.A.',
  '104': 'Caixa Econômica Federal',
  '237': 'Banco Bradesco S.A.',
  '260': 'Nu Pagamentos S.A. (Nubank)',
  '341': 'Itaú Unibanco S.A.',
  '077': 'Banco Inter S.A.',
  '290': 'PagBank (PagSeguro)',
  '336': 'Banco C6 S.A.',
  '380': 'PicPay Instituição de Pagamento'
};

/**
 * Validador e decodificador de linha digitável de boleto bancário (FEBRABAN)
 */
function decodificarBoletoBancario(rawDigits: string, beneficiarioEsperado?: string): DadosPixEmv {
  const digits = rawDigits.replace(/[\s.-]/g, '');
  const codigoBanco = digits.substring(0, 3);
  const bancoEstimado = BANCOS_FEBRABAN[codigoBanco] || `Banco Código ${codigoBanco}`;

  // Extrair fator de vencimento e valor se for boleto tradicional (47 dígitos)
  let valor: number | undefined;
  let vencimentoBoleto: string | undefined;

  if (digits.length === 47) {
    const valorStr = digits.substring(37);
    const valorCentavos = parseInt(valorStr, 10);
    if (!isNaN(valorCentavos) && valorCentavos > 0) {
      valor = valorCentavos / 100;
    }
    const fatorVenc = parseInt(digits.substring(33, 37), 10);
    if (!isNaN(fatorVenc) && fatorVenc > 1000) {
      const dataBase = new Date(1997, 9, 7);
      dataBase.setDate(dataBase.getDate() + fatorVenc);
      vencimentoBoleto = dataBase.toLocaleDateString('pt-BR');
    }
  }

  let divergenciaBeneficiario = false;
  let alertaFraude: string | undefined;

  if (beneficiarioEsperado && beneficiarioEsperado.trim()) {
    const esp = beneficiarioEsperado.toLowerCase().trim();
    const ben = bancoEstimado.toLowerCase();
    if (!ben.includes(esp) && !esp.includes(codigoBanco)) {
      divergenciaBeneficiario = true;
      alertaFraude = `ALERTA DE BOLETO ADULTERADO: Você esperava pagar "${beneficiarioEsperado}", mas o código compensatório deste boleto direciona o dinheiro para "${bancoEstimado}". Golpe de substituição de código de barras!`;
    }
  }

  return {
    raw: rawDigits,
    tipo: 'boleto',
    beneficiario: bancoEstimado,
    cidade: 'BRASIL (Compensação Nacional)',
    valor,
    bancoEstimado,
    crcCalculado: 'N/A (Módulo 10/11)',
    crcOriginal: 'N/A',
    isValidCrc: digits.length === 47 || digits.length === 48,
    alertaFraude,
    beneficiarioEsperado,
    divergenciaBeneficiario,
    vencimentoBoleto,
    linhaDigitavelFormatada: digits
  };
}

/**
 * Decodifica uma string Pix Copia e Cola / BR Code (padrão EMVCo) ou Boleto
 */
export function decodificarPixEmv(rawInput: string, beneficiarioEsperado?: string): DadosPixEmv {
  const cleanInput = rawInput.trim();

  // Verifica se é boleto bancário (somente dígitos, pontos e traços)
  const onlyDigits = cleanInput.replace(/[\s.-]/g, '');
  if (/^\d{44,48}$/.test(onlyDigits)) {
    return decodificarBoletoBancario(cleanInput, beneficiarioEsperado);
  }

  let index = 0;
  const tags: Record<string, string> = {};

  while (index < cleanInput.length) {
    if (index + 4 > cleanInput.length) break;

    const id = cleanInput.substring(index, index + 2);
    const lengthStr = cleanInput.substring(index + 2, index + 4);
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length < 0) break;

    const valueStart = index + 4;
    const valueEnd = valueStart + length;

    if (valueEnd > cleanInput.length) break;

    tags[id] = cleanInput.substring(valueStart, valueEnd);
    index = valueEnd;
  }

  // A tag 63 contém o CRC de 4 caracteres
  const crcOriginal = tags['63'] || '';
  const payloadParaCalculo = cleanInput.includes('6304') 
    ? cleanInput.substring(0, cleanInput.lastIndexOf('6304') + 4)
    : cleanInput;

  const crcCalculado = calcularCrc16(payloadParaCalculo);
  const isValidCrc = crcOriginal !== '' && crcOriginal.toUpperCase() === crcCalculado.toUpperCase();

  const beneficiario = tags['59'] || 'Desconhecido';
  const cidade = tags['60'] || 'Não informada';
  const valorStr = tags['54'];
  const valor = valorStr ? parseFloat(valorStr) : undefined;

  let divergenciaBeneficiario = false;
  let alertaFraude: string | undefined;

  // Detecção de divergência de beneficiário
  if (beneficiarioEsperado && beneficiarioEsperado.trim()) {
    const esp = beneficiarioEsperado.toLowerCase().trim();
    const ben = beneficiario.toLowerCase().trim();
    if (!ben.includes(esp) && !esp.includes(ben)) {
      divergenciaBeneficiario = true;
      alertaFraude = `ALERTA DE DIVERGÊNCIA: Você esperava pagar para "${beneficiarioEsperado}", mas este Pix será enviado para "${beneficiario}". Possível conta de "laranja" ou estelionato!`;
    }
  }

  if (!isValidCrc && crcOriginal !== '') {
    alertaFraude = `CÓDIGO ADULTERADO: O checksum de segurança (CRC-16) é inválido. Esperado: ${crcCalculado}, recebido: ${crcOriginal}. O código foi manipulado.`;
  }

  return {
    raw: rawInput,
    tipo: 'pix',
    beneficiario,
    cidade,
    valor,
    crcCalculado,
    crcOriginal,
    isValidCrc,
    alertaFraude,
    beneficiarioEsperado,
    divergenciaBeneficiario
  };
}

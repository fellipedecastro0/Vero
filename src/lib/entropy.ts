export interface InfoForcaSenha {
  senha: string;
  tamanho: number;
  entropiaBits: number;
  tempoPcComum: string;
  tempoClusterGpu: string;
  nivel: 'fraca' | 'media' | 'boa' | 'forte';
  dicas: string[];
}

export function analisarForcaSenha(senha: string): InfoForcaSenha {
  if (!senha) {
    return {
      senha: '',
      tamanho: 0,
      entropiaBits: 0,
      tempoPcComum: 'Instantâneo',
      tempoClusterGpu: 'Instantâneo',
      nivel: 'fraca',
      dicas: ['Digite pelo menos 8 caracteres misturando letras e números.']
    };
  }

  let poolSize = 0;
  if (/[a-z]/.test(senha)) poolSize += 26;
  if (/[A-Z]/.test(senha)) poolSize += 26;
  if (/[0-9]/.test(senha)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(senha)) poolSize += 33;

  poolSize = Math.max(poolSize, 10);
  const L = senha.length;
  // Entropia em bits = L * log2(poolSize)
  const entropiaBits = Math.round(L * (Math.log(poolSize) / Math.LN2));

  // Estimativa de combinações totais = poolSize ^ L
  const combinacoes = Math.pow(poolSize, L);

  // Computador doméstico: ~10^6 tentativas/segundo (1 milhão)
  // Cluster de GPU para quebra: ~10^11 tentativas/segundo (100 bilhões)
  const segundosPc = combinacoes / 1e6;
  const segundosGpu = combinacoes / 1e11;

  const formatarTempo = (s: number) => {
    if (s < 0.001) return 'Instantâneo (< 1 milissegundo)';
    if (s < 1) return '< 1 segundo';
    if (s < 60) return `${Math.round(s)} segundos`;
    if (s < 3600) return `${Math.round(s / 60)} minutos`;
    if (s < 86400) return `${Math.round(s / 3600)} horas`;
    if (s < 86400 * 365) return `${Math.round(s / 86400)} dias`;
    if (s < 86400 * 365 * 100) return `${Math.round(s / (86400 * 365))} anos`;
    if (s < 86400 * 365 * 1e6) return `${Math.round(s / (86400 * 365 * 1000))} milênios`;
    return 'Centenas de milhares de anos';
  };

  let nivel: 'fraca' | 'media' | 'boa' | 'forte' = 'fraca';
  if (entropiaBits >= 75) nivel = 'forte';
  else if (entropiaBits >= 55) nivel = 'boa';
  else if (entropiaBits >= 35) nivel = 'media';

  const dicas: string[] = [];
  if (L < 10) dicas.push('Aumente para pelo menos 12 caracteres.');
  if (!/[0-9]/.test(senha)) dicas.push('Adicione números (0-9).');
  if (!/[^a-zA-Z0-9]/.test(senha)) dicas.push('Adicione símbolos especiais (@, #, $, !).');
  if (!/[A-Z]/.test(senha)) dicas.push('Misture letras maiúsculas e minúsculas.');

  return {
    senha,
    tamanho: L,
    entropiaBits,
    tempoPcComum: formatarTempo(segundosPc),
    tempoClusterGpu: formatarTempo(segundosGpu),
    nivel,
    dicas: dicas.length ? dicas : ['Ótima senha! Complexidade excelente contra ataques de dicionário e força bruta.']
  };
}


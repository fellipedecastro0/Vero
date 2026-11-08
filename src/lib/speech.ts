/**
 * Wrapper para a Web Speech API (Nativa do Navegador)
 * Permite leitura de texto em voz alta no Modo Calmo para idosos e pessoas com deficiência visual.
 */
export function falarTexto(texto: string, isModoCalmo: boolean = false) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Para áudios anteriores
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'pt-BR';
    // No modo calmo a fala é mais compassada e clara
    u.rate = isModoCalmo ? 0.85 : 0.95;
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('Erro ao reproduzir voz:', e);
  }
}

export function pararVoz() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}


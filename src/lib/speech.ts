const VOICE_MUTE_KEY = 'vero-voz-silenciada';

export function isVozSilenciada(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(VOICE_MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setVozSilenciada(silenciada: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VOICE_MUTE_KEY, silenciada ? '1' : '0');
    if (silenciada) {
      pararVoz();
    }
    window.dispatchEvent(new Event('vero-voice-updated'));
  } catch {
    // ignore storage errors
  }
}

/**
 * Wrapper para a Web Speech API (Nativa do Navegador)
 * Permite leitura de texto em voz alta no Modo Calmo para idosos e pessoas com deficiência visual.
 */
export function falarTexto(
  texto: string,
  isModoCalmo: boolean = false,
  forcarManual: boolean = false
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  if (!forcarManual && isVozSilenciada()) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Para áudios anteriores
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'pt-BR';
    // No modo calmo a fala é mais compassada e clara
    const calmActive =
      isModoCalmo || document.documentElement.classList.contains('calm');
    u.rate = calmActive ? 0.85 : 0.95;
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


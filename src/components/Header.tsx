'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [modoCalmo, setModoCalmo] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vero-calm');
      if (saved === '1') {
        setTimeout(() => {
          setModoCalmo(true);
          document.documentElement.classList.add('calm');
        }, 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleModoCalmo = () => {
    const next = !modoCalmo;
    setModoCalmo(next);
    document.documentElement.classList.toggle('calm', next);
    try {
      localStorage.setItem('vero-calm', next ? '1' : '0');
    } catch {
      // ignore
    }
  };

  const ouvirCabecalho = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(
        'Vero: Ecossistema de proteção digital. Segurança digital que a sua mãe entende e que o seu time de desenvolvedores respeita.'
      );
      u.lang = 'pt-BR';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <header className="top">
      <div className="wrap topin">
        <Link className="brand" href="/" aria-label="Vero, início">
          <svg className="logo">
            <use href="#i-logo" />
          </svg>
          <span>vero</span>
        </Link>
        <nav className="nav" aria-label="Principal">
          <Link href="/#ecossistema">Ecossistema</Link>
          <Link href="/#produtos">Produtos</Link>
          <Link href="/#motor">Como funciona</Link>
          <Link href="/#pessoas">Para quem</Link>
          <Link href="/#stack">Stack</Link>
          <Link href="/#roadmap">Roadmap</Link>
        </nav>
        <div className="topact">
          <button
            className="iconbtn"
            id="listen"
            type="button"
            onClick={ouvirCabecalho}
            aria-label="Ouvir o início da página"
            title="Ouvir texto em voz alta"
          >
            <svg className="ic">
              <use href="#i-volume" />
            </svg>
          </button>
          <button
            className="calmsw"
            id="calm"
            type="button"
            role="switch"
            aria-checked={modoCalmo}
            onClick={toggleModoCalmo}
            title="Modo Calmo: letras maiores, alto contraste e sem animações bruscas"
          >
            <span className="sw" aria-hidden="true">
              <span />
            </span>
            <span className="lbl">Modo calmo</span>
            <span className="sr">: letras maiores, sem animações</span>
          </button>
          <Link className="btn btn-mint" href="/#produtos">
            Experimentar
          </Link>
        </div>
      </div>
    </header>
  );
}

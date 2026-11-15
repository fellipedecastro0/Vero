'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { falarTexto, isVozSilenciada, setVozSilenciada } from '@/lib/speech';

export default function Header() {
  const pathname = usePathname();
  const [modoCalmo, setModoCalmo] = useState(false);
  const [vozMuda, setVozMuda] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vero-calm');
      const muted = isVozSilenciada();
      setTimeout(() => {
        if (saved === '1') {
          setModoCalmo(true);
          document.documentElement.classList.add('calm');
        }
        setVozMuda(muted);
      }, 0);
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

  const toggleVozMuda = () => {
    const next = !vozMuda;
    setVozMuda(next);
    setVozSilenciada(next);
  };

  const ouvirCabecalho = () => {
    falarTexto(
      'Vero: Proteção digital contra golpes. Use o menu para acessar os Minigames de treino, o Vero Checa para conferir mensagens e Pix, ou o Guia de Emergência.',
      modoCalmo,
      true
    );
  };

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/treino', label: 'Minigames' },
    { href: '/checa', label: 'Vero Checa' },
    { href: '/emergencia', label: 'Emergência' },
    { href: '/sobre', label: 'Sobre a ACE' }
  ];

  return (
    <header className="top">
      <div className="wrap topin">
        <Link className="brand" href="/" aria-label="Vero, início" onClick={() => setMenuAberto(false)}>
          <svg className="logo">
            <use href="#i-logo" />
          </svg>
          <span>vero</span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={isActive ? 'active' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="topact">
          <button
            className="iconbtn"
            id="listen"
            type="button"
            onClick={ouvirCabecalho}
            aria-label="Ouvir orientação de navegação"
            title="Ouvir orientação em voz alta"
          >
            <svg className="ic">
              <use href="#i-volume" />
            </svg>
          </button>
          <button
            className="iconbtn"
            id="mute-voice"
            type="button"
            aria-pressed={vozMuda}
            onClick={toggleVozMuda}
            aria-label={vozMuda ? 'Ativar leitura automática por voz' : 'Silenciar voz automática'}
            title={vozMuda ? 'Voz automática silenciada (clique para ativar)' : 'Silenciar voz e sons automáticos'}
            style={{
              width: 'auto',
              padding: '0 12px',
              gap: 6,
              fontSize: '.82rem',
              fontWeight: 700,
              ...(vozMuda
                ? { borderColor: '#E15249', color: '#FCA5A5', background: 'rgba(180,35,24,.18)' }
                : {})
            }}
          >
            <svg className="ic" style={{ width: 17, height: 17 }} aria-hidden="true">
              <use href={vozMuda ? '#i-volume-off' : '#i-bell'} />
            </svg>
            <span className="lbl">{vozMuda ? 'Sem voz' : 'Silenciar'}</span>
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
          <Link className="btn btn-mint" href="/treino">
            Jogar agora
          </Link>
          <button
            className="mobbtn"
            type="button"
            aria-expanded={menuAberto}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuAberto((v) => !v)}
          >
            <svg className="ic">
              <use href={menuAberto ? '#i-x' : '#i-menu'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <nav className={`mobnav ${menuAberto ? 'open' : ''}`} aria-label="Menu móvel">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? 'active' : undefined}
              onClick={() => setMenuAberto(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

import type { ReactNode } from 'react';

interface FooterProps {
  leftContent: ReactNode;
  rightText: string;
}

export default function Footer({ leftContent, rightText }: FooterProps) {
  return (
    <footer>
      <div className="wrap" style={{ alignItems: 'center' }}>
        <span>{leftContent}</span>
        <div className="foot-right">
          <span>{rightText}</span>
          <a
            href="https://github.com/fellipedecastro0/Vero"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-pill"
            aria-label="Abrir repositório do projeto Vero no GitHub"
          >
            <svg className="ic" aria-hidden="true">
              <use href="#i-github" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

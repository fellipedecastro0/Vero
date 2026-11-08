'use client';

import { useState, useEffect } from 'react';

interface FeedItem {
  id: number;
  ch: string;
  from: string;
  text: string;
  v: 'golpe' | 'seguro';
  tags: string[];
}

const FEED_DATA = [
  {
    ch: 'WhatsApp',
    from: 'Número desconhecido',
    text: 'Oi mãe, troquei de número. Me faz um Pix urgente? Depois te explico.',
    v: 'golpe' as const,
    tags: ['Número novo', 'Pede Pix', 'Urgência']
  },
  {
    ch: 'WhatsApp',
    from: 'Rafael',
    text: 'Chego às 19h pro jantar. Levo o pão!',
    v: 'seguro' as const,
    tags: ['Contato salvo', 'Sem link', 'Sem pedido']
  },
  {
    ch: 'SMS',
    from: 'SEU BANCO',
    text: 'Seu cartão foi bloqueado. Regularize agora: bit.ly/desbloq-cartao',
    v: 'golpe' as const,
    tags: ['Link encurtado', 'Ameaça de bloqueio']
  },
  {
    ch: 'SMS',
    from: 'Entregas Express',
    text: 'Sua encomenda está retida. Pague R$ 3,90 de reentrega no link.',
    v: 'golpe' as const,
    tags: ['Taxa inesperada', 'Link de pagamento']
  },
  {
    ch: 'SMS',
    from: 'Posto de Saúde',
    text: 'Lembrete: sua consulta é quinta, às 9h. Responda SIM para confirmar.',
    v: 'seguro' as const,
    tags: ['Sem link', 'Sem dinheiro']
  },
  {
    ch: 'E-mail',
    from: 'premios@sorteio-br.top',
    text: 'Parabéns! Você ganhou R$ 5.000. Pague a taxa de liberação de R$ 49,90.',
    v: 'golpe' as const,
    tags: ['Prêmio não pedido', 'Taxa', 'Domínio estranho']
  }
];

export default function HeroPhone() {
  const [items, setItems] = useState<FeedItem[]>(() => [
    { id: 1, ...FEED_DATA[0] },
    { id: 2, ...FEED_DATA[1] }
  ]);

  useEffect(() => {
    let currentIndex = 2;
    const interval = setInterval(() => {
      const nextData = FEED_DATA[currentIndex % FEED_DATA.length];
      currentIndex++;
      const nextItem: FeedItem = { id: Date.now(), ...nextData };

      setItems((prev) => {
        const updated = [...prev, nextItem];
        if (updated.length > 3) {
          return updated.slice(updated.length - 3);
        }
        return updated;
      });
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="herophone reveal vis">
      <div className="glow decor" aria-hidden="true" />
      <div
        className="phone"
        role="img"
        aria-label="Celular mostrando o Vero analisando mensagens recebidas e marcando quais são golpe"
      >
        <div className="screen dark-screen">
          <div className="pbar">
            <svg className="logo sm">
              <use href="#i-logo" />
            </svg>
            Vero está de olho
            <span className="live">AO VIVO</span>
          </div>
          <div className="feed" id="feed">
            {items.map((m) => (
              <div key={m.id} className="fmsg in done">
                <div className="fmeta">
                  <svg className="ic">
                    <use href="#i-msg" />
                  </svg>
                  {m.ch} · {m.from}
                </div>
                <div className="fbubble">{m.text}</div>
                <div className="fscan" />
                <div className={`fverdict ${m.v}`}>
                  <svg className="ic">
                    <use href={m.v === 'golpe' ? '#i-alert' : '#i-shieldok'} />
                  </svg>
                  <b>{m.v === 'golpe' ? 'Golpe provável' : 'Parece seguro'}</b>
                  <span>{m.tags.join(' · ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="floattag t1 decor" aria-hidden="true">
        1 denúncia protege todo mundo
      </div>
      <div className="floattag t2 decor" aria-hidden="true">
        Explica o porquê
      </div>
    </div>
  );
}

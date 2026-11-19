import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroPhone from '@/components/HeroPhone';
import HomeScoreBanner from '@/components/HomeScoreBanner';

export const metadata = {
  title: 'Vero — Cidadania Digital & Defesa contra Golpes',
  description:
    'Plataforma prática contra golpes no Brasil: 4 minigames interativos, Vero Checa (Pix, links e senhas) e guia de emergência.'
};

export default function Home() {
  return (
    <>
      <Header />

      <main id="conteudo">
        {/* 1. HERO DIRETO E ACIONÁVEL */}
        <section className="hero" id="inicio">
          <div className="grid-bg decor" aria-hidden="true" />
          <div className="grain decor" aria-hidden="true" />
          <div className="wrap heroin">
            <div className="reveal vis">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Vero Cidadania Digital · ACE 4º Semestre CEUB
              </span>
              <h1 className="display" id="heroTitle">
                Segurança digital que <em>todo mundo</em> entende. Proteção real para qualquer{' '}
                <em>idade</em>.
              </h1>
              <p className="lead" id="heroLead">
                Treine em 4 minigames práticos de 3 minutos, confira qualquer link ou Pix suspeito na
                hora e saiba exatamente o que fazer se alguém da família cair num golpe.
              </p>
              <div className="ctas">
                <Link href="/treino" className="btn btn-lg btn-mint">
                  Jogar os 4 Minigames Agora
                </Link>
                <Link href="/checa" className="btn btn-lg btn-ghost-d">
                  Checar Pix ou Link Suspeito
                </Link>
              </div>
              <ul className="herofacts" aria-label="Diferenciais">
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  4 Minigames em layout de celular
                </li>
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  Modo calmo com voz em português
                </li>
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  Auditor Pix EMV &amp; CRC-16 ao vivo
                </li>
              </ul>
              <div className="calmnote" role="status">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-shieldok" />
                </svg>
                Modo calmo ligado: letras maiores, alto contraste, sem animações bruscas.
              </div>
            </div>

            <HeroPhone />
          </div>

          <div className="ticker" aria-hidden="true">
            <div className="track">
              <span>Falso parente com número novo</span>
              <span>Falso entregador</span>
              <span>Boleto adulterado</span>
              <span>Falsa central do banco</span>
              <span>Prêmio com taxa</span>
              <span>QR code trocado</span>
              <span>Site clone com cadeado</span>
              <span>Loja falsa em anúncio</span>
              <span>Falso parente com número novo</span>
              <span>Falso entregador</span>
              <span>Boleto adulterado</span>
              <span>Falsa central do banco</span>
              <span>Prêmio com taxa</span>
              <span>QR code trocado</span>
            </div>
          </div>
        </section>

        {/* 2. ATALHOS PRINCIPAIS DO APP */}
        <section className="sec" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <div className="wrap">
            <div style={{ maxWidth: 680 }}>
              <span className="kicker">Comece em 1 toque</span>
              <h2 className="h2 display" style={{ margin: '8px 0' }}>
                O que você quer fazer agora?
              </h2>
              <p className="sub">
                Separamos o Vero por objetivo para ninguém se perder em texto longo: treinar nos
                jogos, checar algo suspeito, agir numa emergência ou ver o projeto acadêmico.
              </p>
            </div>

            <div className="quick-grid">
              <Link href="/treino" className="qcard">
                <div className="qc-ico" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-trophy" />
                  </svg>
                </div>
                <h3>1. Arena de Minigames</h3>
                <p>
                  Caça-Golpes, Sites Falsos, Hora de Pagar (Pix) e Ligação Suspeita em telas amplas e
                  sem distrações.
                </p>
                <span style={{ marginTop: 'auto', color: 'var(--green)', fontWeight: 700 }}>
                  Abrir 4 Minigames →
                </span>
              </Link>

              <Link href="/checa" className="qcard">
                <div className="qc-ico" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-search" />
                  </svg>
                </div>
                <h3>2. Vero Checa</h3>
                <p>
                  Cole um link estranho, código Copia e Cola do Pix ou verifique se sua senha e
                  e-mail já vazaram.
                </p>
                <span style={{ marginTop: 'auto', color: 'var(--green)', fontWeight: 700 }}>
                  Analisar Agora →
                </span>
              </Link>

              <Link href="/emergencia" className="qcard urg">
                <div className="qc-ico" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-lifebuoy" />
                  </svg>
                </div>
                <h3>3. Caí num Golpe!</h3>
                <p>
                  Passo a passo de urgência: Mecanismo de Devolução (MED), WhatsApp clonado, B.O. e
                  Cartilha de golpes.
                </p>
                <span style={{ marginTop: 'auto', color: 'var(--red)', fontWeight: 700 }}>
                  Ver Socorro Imediato →
                </span>
              </Link>

              <Link href="/sobre" className="qcard">
                <div className="qc-ico" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-code" />
                  </svg>
                </div>
                <h3>4. Projeto ACE &amp; API</h3>
                <p>
                  Arquitetura das 7 camadas, motor open source em Java/Spring e plano de oficinas na
                  comunidade.
                </p>
                <span style={{ marginTop: 'auto', color: 'var(--green)', fontWeight: 700 }}>
                  Ver Documentação →
                </span>
              </Link>
            </div>

            <HomeScoreBanner />
          </div>
        </section>

        {/* 3. VITRINE DAS 4 ARENAS DE TREINO */}
        <section className="sec alt" style={{ paddingTop: 56, paddingBottom: 72 }}>
          <div className="wrap">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 16,
                marginBottom: 24
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <span className="kicker">Educação na Prática</span>
                <h2 className="h2 display" style={{ margin: '8px 0 0' }}>
                  4 jeitos reais de treinar contra golpistas
                </h2>
              </div>
              <Link href="/treino" className="btn b-ink">
                Entrar na Arena Completa →
              </Link>
            </div>

            <div className="hub-grid">
              <Link href="/treino?jogo=caca-golpes" className="game-card" style={{ textDecoration: 'none' }}>
                <div className="game-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/games/caca-golpes.jpg" alt="Ilustração Caça-Golpes" loading="lazy" />
                </div>
                <div className="gc-top">
                  <div className="gc-ico" aria-hidden="true">
                    <svg className="ic">
                      <use href="#i-msg" />
                    </svg>
                  </div>
                  <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
                    WhatsApp · SMS · Gmail
                  </span>
                </div>
                <h3>Caça-Golpes com Raio-X</h3>
                <p>
                  18 mensagens inspiradas em golpes reais com grifo automático das frases suspeitas e
                  leitura por voz.
                </p>
              </Link>

              <Link href="/treino?jogo=site-clone" className="game-card" style={{ textDecoration: 'none' }}>
                <div className="game-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/games/site-clone.jpg" alt="Ilustração Qual é o Site Verdadeiro" loading="lazy" />
                </div>
                <div className="gc-top">
                  <div className="gc-ico" aria-hidden="true">
                    <svg className="ic">
                      <use href="#i-browser" />
                    </svg>
                  </div>
                  <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
                    Domínios Clones
                  </span>
                </div>
                <h3>Qual é o Site Verdadeiro?</h3>
                <p>
                  Compare dois sites lado a lado (Gov.br, Correios, Receita, Bancos) e descubra como o
                  cadeado HTTPS engana.
                </p>
              </Link>

              <Link href="/treino?jogo=pix-boleto" className="game-card" style={{ textDecoration: 'none' }}>
                <div className="game-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/games/pix-boleto.jpg" alt="Ilustração Hora de Pagar Pix e Boleto" loading="lazy" />
                </div>
                <div className="gc-top">
                  <div className="gc-ico" aria-hidden="true">
                    <svg className="ic">
                      <use href="#i-qr" />
                    </svg>
                  </div>
                  <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
                    Pix &amp; Boletos
                  </span>
                </div>
                <h3>Hora de Pagar</h3>
                <p>
                  Treine o hábito de conferir nome completo, CPF/CNPJ e instituição antes de confirmar a
                  senha no app do banco.
                </p>
              </Link>

              <Link href="/treino?jogo=vishing" className="game-card" style={{ textDecoration: 'none' }}>
                <div className="game-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/games/vishing.jpg" alt="Ilustração Ligação Suspeita Vishing" loading="lazy" />
                </div>
                <div className="gc-top">
                  <div className="gc-ico" aria-hidden="true">
                    <svg className="ic">
                      <use href="#i-phone" />
                    </svg>
                  </div>
                  <span className="pill" style={{ background: 'var(--gsoft)', color: 'var(--gtext)' }}>
                    Áudio Simulado
                  </span>
                </div>
                <h3>Ligação Suspeita (Vishing)</h3>
                <p>
                  Ouça a simulação da falsa central do banco ou suporte de aplicativo e escolha a reação
                  segura na hora.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        leftContent="Vero · Cidadania Digital (ACE - 4º Semestre) · Fellipe de Castro & Jhonatgan Magalhaes · CEUB"
        rightText="Motor educativo aberto para famílias, comércios e desenvolvedores"
      />
    </>
  );
}

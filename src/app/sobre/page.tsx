'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroPhone from '@/components/HeroPhone';
import PhishingGame from '@/components/PhishingGame';
import ChecaTool from '@/components/ChecaTool';

type TabId = 'treino' | 'familia' | 'checa' | 'escudo' | 'dev' | 'empresas';
type DevLang = 'java' | 'ts' | 'curl';

const DEV_SNIPPETS: Record<DevLang, string> = {
  java: `// build.gradle: implementation("dev.vero:vero-java:1.0.0")

var vero = Vero.client(System.getenv("VERO_API_KEY"));

var verdict = vero.links()
    .check("https://bit.ly/regulariza-conta");

if (verdict.risk() == Risk.HIGH) {
    log.warn("Link bloqueado: {}", verdict.reasons());
    return Response.blocked(verdict.explainPtBr());
}`,
  ts: `import { Vero } from "@vero/sdk";

const vero = new Vero(process.env.VERO_API_KEY);

const verdict = await vero.links.check(
  "https://bit.ly/regulariza-conta"
);

if (verdict.risk === "high") {
  return block(verdict.explainPtBr);
}`,
  curl: `curl https://api.vero.dev/v1/links/check \\
  -H "Authorization: Bearer $VERO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "url": "https://bit.ly/regulariza-conta" }'`
};

export default function SobrePage() {
  const [activeTab, setActiveTab] = useState<TabId>('treino');
  const [openLayers, setOpenLayers] = useState<Record<number, boolean>>({ 0: true, 2: true });

  // Escudo interativo
  const [escudoEstado, setEscudoEstado] = useState<'normal' | 'bloqueado'>('normal');

  // Dev tab
  const [devLang, setDevLang] = useState<DevLang>('java');
  const [devRunning, setDevRunning] = useState(false);
  const [devResponse, setDevResponse] = useState<string | null>(null);

  // Família
  const [famAlertaAtivo, setFamAlertaAtivo] = useState(false);

  // Empresas
  const [emSimulando, setEmSimulando] = useState(false);
  const [emConcluido, setEmConcluido] = useState(false);

  const irParaTab = (id: TabId) => {
    setActiveTab(id);
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLayer = (index: number) => {
    setOpenLayers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const executarDevDemo = async () => {
    setDevRunning(true);
    setDevResponse(null);
    await new Promise((r) => setTimeout(r, 600));
    setDevResponse(JSON.stringify({
      status: "blocked",
      risk: "HIGH",
      score: 94,
      reasons: ["url_shortener", "brand_impersonation", "untrusted_tld"],
      explanation_pt_br: "Este link encurtado redireciona para um domínio não oficial simulando um banco.",
      latency_ms: 38
    }, null, 2));
    setDevRunning(false);
  };

  const dispararSimulacaoEmpresas = async () => {
    if (emSimulando) return;
    setEmSimulando(true);
    await new Promise((r) => setTimeout(r, 1200));
    setEmSimulando(false);
    setEmConcluido(true);
  };

  return (
    <>
      <Header />

      <main id="conteudo">
        {/* 1. HERO SECTION */}
        <section className="hero" id="inicio">
          <div className="grid-bg decor" aria-hidden="true" />
          <div className="grain decor" aria-hidden="true" />
          <div className="wrap heroin">
            <div className="reveal vis">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Ecossistema de proteção digital · ACE 4º Semestre
              </span>
              <h1 className="display" id="heroTitle">
                Segurança digital que <em>todo mundo</em> entende. Proteção real para qualquer{' '}
                <em>idade</em>.
              </h1>
              <p className="lead" id="heroLead">
                Uma plataforma educativa e gratuita para proteger pessoas de todas as idades, famílias e comércios contra golpes no celular e na internet.
              </p>
              <div className="proof">
                <b>28 milhões</b> de brasileiros foram vítimas de golpes digitais em 2025. <b>1 denúncia</b> ajuda a proteger a comunidade inteira.
              </div>
              <div className="ctas">
                <button
                  type="button"
                  className="btn btn-lg btn-mint"
                  onClick={() => irParaTab('treino')}
                >
                  Experimentar o Treino
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-ghost-d"
                  onClick={() => irParaTab('checa')}
                >
                  Checar mensagem ou Pix
                </button>
              </div>
              <ul className="herofacts" aria-label="Diferenciais">
                <li>
                  <svg className="ic"><use href="#i-check" /></svg>
                  Sem vergonha de errar: vira pista
                </li>
                <li>
                  <svg className="ic"><use href="#i-check" /></svg>
                  Modo calmo com voz para idosos
                </li>
                <li>
                  <svg className="ic"><use href="#i-check" /></svg>
                  Validador de Pix EMV &amp; CRC-16
                </li>
              </ul>
              <div className="calmnote" role="status">
                <svg className="ic"><use href="#i-shieldok" /></svg>
                Modo calmo ligado: letras maiores, alto contraste, sem animações bruscas.
              </div>
            </div>

            {/* CELULAR HERO AO VIVO */}
            <HeroPhone />
          </div>

          {/* FITA CONTÍNUA DE GOLPES (TICKER) */}
          <div className="ticker" aria-hidden="true">
            <div className="track">
              <span>Falso parente com número novo</span>
              <span>Falso entregador</span>
              <span>Boleto adulterado</span>
              <span>Falsa central do banco</span>
              <span>Prêmio com taxa</span>
              <span>QR code trocado</span>
              <span>Falso suporte técnico</span>
              <span>Loja clonada</span>
              <span>Falso parente com número novo</span>
              <span>Falso entregador</span>
              <span>Boleto adulterado</span>
              <span>Falsa central do banco</span>
              <span>Prêmio com taxa</span>
              <span>QR code trocado</span>
              <span>Falso suporte técnico</span>
              <span>Loja clonada</span>
            </div>
          </div>
        </section>

        {/* 2. ECOSSISTEMA COM DIAGRAMA DE ÓRBITA */}
        <section className="sec" id="ecossistema">
          <div className="wrap">
            <div className="reveal vis">
              <span className="kicker">O ecossistema</span>
              <h2 className="h2 display">Seis portas. Um motor que aprende com todas.</h2>
              <p className="sub">
                Cada produto atende uma pessoa diferente, mas todos falam com o mesmo Vero Core. O golpe que a Dona Marlene denuncia de manhã vira bloqueio na extensão e na API à tarde.
              </p>
            </div>
            <div className="eco">
              {/* ÓRBITA SVG INTERATIVA */}
              <div className="orbit reveal vis">
                <svg className="rings" viewBox="0 0 560 560" aria-hidden="true">
                  <g className="spin">
                    <circle cx="280" cy="280" r="200" fill="none" stroke="#C9D3C9" strokeWidth="1.5" strokeDasharray="2 8" />
                  </g>
                  <circle cx="280" cy="280" r="262" fill="none" stroke="#DDE4DA" strokeWidth="1" />
                  <line className="flow" x1="280" y1="80" x2="280" y2="280" />
                  <line className="flow" x1="453.2" y1="180" x2="280" y2="280" />
                  <line className="flow" x1="453.2" y1="380" x2="280" y2="280" />
                  <line className="flow" x1="280" y1="480" x2="280" y2="280" />
                  <line className="flow" x1="106.8" y1="380" x2="280" y2="280" />
                  <line className="flow" x1="106.8" y1="180" x2="280" y2="280" />
                </svg>
                <div className="core">
                  <svg className="logo"><use href="#i-logo" /></svg>
                  <b>VERO CORE</b>
                  <small>motor de risco</small>
                </div>
                <button
                  className="node"
                  style={{ left: '50%', top: '14.3%' }}
                  type="button"
                  onClick={() => irParaTab('treino')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-trophy" /></svg></span>
                  <b>Treino</b>
                  <span className="ph">MVP</span>
                </button>
                <button
                  className="node"
                  style={{ left: '80.9%', top: '32.1%' }}
                  type="button"
                  onClick={() => irParaTab('familia')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-users" /></svg></span>
                  <b>Família</b>
                  <span className="ph">MVP</span>
                </button>
                <button
                  className="node"
                  style={{ left: '80.9%', top: '67.9%' }}
                  type="button"
                  onClick={() => irParaTab('checa')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-search" /></svg></span>
                  <b>Checa</b>
                  <span className="ph">MVP</span>
                </button>
                <button
                  className="node"
                  style={{ left: '50%', top: '85.7%' }}
                  type="button"
                  onClick={() => irParaTab('escudo')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-browser" /></svg></span>
                  <b>Escudo</b>
                  <span className="ph">FASE 2</span>
                </button>
                <button
                  className="node"
                  style={{ left: '19.1%', top: '67.9%' }}
                  type="button"
                  onClick={() => irParaTab('dev')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-code" /></svg></span>
                  <b>Dev</b>
                  <span className="ph">FASE 3</span>
                </button>
                <button
                  className="node"
                  style={{ left: '19.1%', top: '32.1%' }}
                  type="button"
                  onClick={() => irParaTab('empresas')}
                >
                  <span className="bub"><svg className="ic"><use href="#i-building" /></svg></span>
                  <b>Empresas</b>
                  <span className="ph">FASE 3</span>
                </button>
              </div>

              {/* LISTA DE CAPACIDADES DO CORE */}
              <div className="corelist">
                <div className="corei reveal vis">
                  <span className="bub"><svg className="ic"><use href="#i-key" /></svg></span>
                  <div>
                    <h3>Uma conta para tudo</h3>
                    <p>A mesma identidade no Treino, na Família, no Checa e no console de dev. Login com passkey, sem senha para esquecer.</p>
                  </div>
                </div>
                <div className="corei reveal vis">
                  <span className="bub"><svg className="ic"><use href="#i-cpu" /></svg></span>
                  <div>
                    <h3>Motor de risco</h3>
                    <p>Regras, modelo leve e várias fontes consultadas em paralelo. Decide rápido e sempre explica as pistas.</p>
                  </div>
                </div>
                <div className="corei reveal vis">
                  <span className="bub"><svg className="ic"><use href="#i-radar" /></svg></span>
                  <div>
                    <h3>Inteligência compartilhada</h3>
                    <p>Denúncias da comunidade, listas de phishing e sinais das empresas alimentam uma base única de ameaças.</p>
                  </div>
                </div>
                <div className="corei reveal vis">
                  <span className="bub"><svg className="ic"><use href="#i-shieldok" /></svg></span>
                  <div>
                    <h3>Score de Cidadania Digital</h3>
                    <p>Uma nota de 0 a 100 que sobe com treino e boas decisões. Motivação para a pessoa, termômetro para a família.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRODUTOS (TABS E DEMOS AO VIVO) */}
        <section className="sec prod" id="produtos">
          <div className="wrap">
            <div className="reveal vis">
              <span className="kicker">Produtos</span>
              <h2 className="h2 display">Não leia sobre o Vero. Experimente.</h2>
              <p className="sub">
                Todas as demonstrações abaixo funcionam de verdade aqui na página. Os golpes são simulados para fins pedagógicos.
              </p>
            </div>

            {/* TAB BUTTONS */}
            <div className="ptabs" role="tablist" aria-label="Navegar entre produtos do Vero">
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'treino'}
                onClick={() => setActiveTab('treino')}
              >
                <svg className="ic"><use href="#i-trophy" /></svg>Treino
              </button>
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'familia'}
                onClick={() => setActiveTab('familia')}
              >
                <svg className="ic"><use href="#i-users" /></svg>Família
              </button>
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'checa'}
                onClick={() => setActiveTab('checa')}
              >
                <svg className="ic"><use href="#i-search" /></svg>Checa
              </button>
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'escudo'}
                onClick={() => setActiveTab('escudo')}
              >
                <svg className="ic"><use href="#i-browser" /></svg>Escudo
              </button>
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'dev'}
                onClick={() => setActiveTab('dev')}
              >
                <svg className="ic"><use href="#i-code" /></svg>Dev
              </button>
              <button
                className="ptab"
                role="tab"
                type="button"
                aria-selected={activeTab === 'empresas'}
                onClick={() => setActiveTab('empresas')}
              >
                <svg className="ic"><use href="#i-building" /></svg>Empresas
              </button>
            </div>

            {/* PAINEL 1: TREINO */}
            {activeTab === 'treino' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase mvp">MVP</span>
                  <h3 className="display">Vero Treino</h3>
                  <p className="plead">
                    Um joguinho de cinco minutos por dia: chega uma mensagem, a pessoa decide se é golpe. Sem pressa, sem vergonha e com voz.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Dois botões gigantes por tela.</b> Nada de menus escondidos.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Errou? Vira pista.</b> O Vero nunca diz “você errou”, mostra o que olhar da próxima vez.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Ofensiva, pontos e medalhas</b> para criar hábito saudável de segurança.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Golpes reais do momento</b>, curados a partir das denúncias comunitárias.</span>
                    </li>
                  </ul>
                  <div className="who">
                    <b>Para</b>
                    <span>Idosos</span>
                    <span>Leigos</span>
                    <span>Estudantes</span>
                  </div>
                </div>
                <div className="pdemo" style={{ flexDirection: 'column' }}>
                  <PhishingGame compact />
                  <p className="democap">
                    <svg className="ic"><use href="#i-play" /></svg>
                    Demonstração compacta ·{' '}
                    <Link href="/treino" style={{ fontWeight: 700, textDecoration: 'underline' }}>
                      Abrir Arena Completa de Minigames ➔
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* PAINEL 2: FAMÍLIA */}
            {activeTab === 'familia' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase mvp">MVP</span>
                  <h3 className="display">Vero Família</h3>
                  <p className="plead">
                    Quem ensina a mãe a usar o celular vira “guardião”. Acompanha a evolução, manda desafios e é avisado na hora do perigo.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Alerta em tempo real</b> quando a pessoa checa algo de alto risco.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Desafios sob medida</b> com os golpes que mais enganam aquela pessoa.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Consentimento primeiro.</b> Ela autoriza, ela vê o que é compartilhado, ela remove quando quiser.</span>
                    </li>
                  </ul>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => setFamAlertaAtivo(true)}
                    >
                      <svg className="ic"><use href="#i-bell" /></svg>Simular alerta de golpe
                    </button>
                  </div>
                  <div className="who">
                    <b>Para</b>
                    <span>Filhos e netos</span>
                    <span>Cuidadores</span>
                  </div>
                </div>
                <div className="pdemo">
                  <div className="phone">
                    <div className="screen" style={{ minHeight: '520px' }}>
                      <div className="fam-top">
                        <div>
                          <small>Modo guardião · Rafael</small>
                          <h4 style={{ margin: 0 }}>Minha família</h4>
                        </div>
                        <span className="bell" aria-hidden="true">
                          <svg className="ic"><use href="#i-bell" /></svg>
                          <i />
                        </span>
                      </div>
                      <div className="fam-body">
                        {famAlertaAtivo && (
                          <div style={{
                            background: 'var(--rsoft)',
                            border: '1px solid var(--red)',
                            color: 'var(--redd)',
                            padding: '10px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span>⚠️ Dona Marlene acabou de receber um link de alto risco no WhatsApp. O Vero orientou a não clicar.</span>
                            <button
                              type="button"
                              onClick={() => setFamAlertaAtivo(false)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        <div className="scorecard">
                          <svg className="ring" viewBox="0 0 100 100" role="img" aria-label="Score de Cidadania Digital: 68 de 100">
                            <circle className="bg" cx="50" cy="50" r="42" />
                            <circle
                              className="fg"
                              cx="50"
                              cy="50"
                              r="42"
                              strokeDasharray="264"
                              strokeDashoffset={264 - (264 * 68) / 100}
                            />
                            <text x="50" y="59" textAnchor="middle">68</text>
                          </svg>
                          <div>
                            <b>Dona Marlene</b>
                            <small>Score de Cidadania Digital</small>
                            <em>+12 em 2 semanas</em>
                          </div>
                        </div>
                        <div className="wcard">
                          <div className="h">
                            <b>Desafios na semana</b>
                            <span style={{ color: 'var(--muted)' }}>5 de 7 dias</span>
                          </div>
                          <div className="wbars" role="img" aria-label="Desafios feitos por dia na semana">
                            <div><i style={{ height: '100%' }} /><span>S</span></div>
                            <div><i style={{ height: '100%' }} /><span>T</span></div>
                            <div><i style={{ height: '60%' }} /><span>Q</span></div>
                            <div><i className="z" style={{ height: '6%' }} /><span>Q</span></div>
                            <div><i style={{ height: '100%' }} /><span>S</span></div>
                            <div><i style={{ height: '80%' }} /><span>S</span></div>
                            <div><i className="z" style={{ height: '6%' }} /><span>D</span></div>
                          </div>
                          <div>
                            <small style={{ color: 'var(--muted)', fontSize: 13 }}>Precisa de reforço em</small>
                            <div className="pills" style={{ marginTop: 4 }}>
                              <span className="pill a">Links encurtados</span>
                              <span className="pill a">Boleto falso</span>
                            </div>
                          </div>
                        </div>
                        <div className="wcard">
                          <b style={{ fontSize: 14 }}>Circulando esta semana</b>
                          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                            Golpe da falsa taxa dos Correios aumentou 42% no DF.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAINEL 3: CHECA */}
            {activeTab === 'checa' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase mvp">MVP</span>
                  <h3 className="display">Vero Checa</h3>
                  <p className="plead">
                    Recebeu algo estranho? Cole aqui. Em segundos, um semáforo, as pistas e o que fazer agora, em português claro.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Mensagem, link, Pix ou boleto</b> na mesma tela de checagem.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Várias fontes em paralelo:</b> integridade CRC-16, denúncias e análise de engenharia social.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Também no WhatsApp:</b> encaminhou para o Vero, recebeu o veredito.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Denunciar protege os outros.</b> Cada denúncia alimenta a rede de segurança.</span>
                    </li>
                  </ul>
                  <div className="who">
                    <b>Para</b>
                    <span>Todo mundo</span>
                  </div>
                </div>
                <div className="pdemo">
                  <ChecaTool />
                </div>
              </div>
            )}

            {/* PAINEL 4: ESCUDO */}
            {activeTab === 'escudo' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase f2">FASE 2</span>
                  <h3 className="display">Vero Escudo</h3>
                  <p className="plead">
                    Uma extensão de navegador que segura a mão da pessoa antes do clique errado. Página falsa de banco não chega a abrir.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Decide no próprio navegador</b> com uma lista local de domínios suspeitos atualizada pelo motor.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Detecta imitação</b> de bancos, lojas e órgãos públicos.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>No modo calmo</b>, nem existe o botão “continuar mesmo assim”.</span>
                    </li>
                  </ul>
                  <div className="who">
                    <b>Para</b>
                    <span>Navegação do dia a dia</span>
                    <span>Computadores da família</span>
                  </div>
                </div>
                <div className="pdemo" style={{ flexDirection: 'column' }}>
                  <div className="browser">
                    <div className="bchrome">
                      <div className="bdots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className={`baddr ${escudoEstado === 'bloqueado' ? 'bad' : ''}`}>
                        <svg className="ic">
                          <use href={escudoEstado === 'bloqueado' ? '#i-unlock' : '#i-lock'} />
                        </svg>
                        <span>
                          {escudoEstado === 'bloqueado'
                            ? 'seubanco-atualiza-br.top/login'
                            : 'mail.exemplo.com.br/caixa-de-entrada'}
                        </span>
                        <span className="vbadge">
                          <svg className="logo"><use href="#i-logo" /></svg>
                          Escudo ativo
                        </span>
                      </div>
                    </div>
                    <div className="bview" style={{ position: 'relative' }}>
                      {escudoEstado === 'normal' ? (
                        <div className="mail">
                          <div className="from">
                            <i aria-hidden="true">SB</i>
                            <div>
                              <b>Seu Banco</b>
                              <br />
                              <small style={{ color: 'var(--muted)' }}>atendimento@seubanco-atualiza-br.top</small>
                            </div>
                          </div>
                          <h5 style={{ margin: '10px 0 6px' }}>Atualização cadastral obrigatória</h5>
                          <p style={{ margin: 0, fontSize: '13px' }}>
                            Prezado cliente, identificamos uma pendência no seu cadastro. Atualize seus dados em até 24 horas para evitar o bloqueio da sua conta.
                          </p>
                          <button
                            className="cta"
                            type="button"
                            onClick={() => setEscudoEstado('bloqueado')}
                          >
                            Atualizar meus dados
                          </button>
                          <span className="hint">
                            <svg className="ic"><use href="#i-info" /></svg>
                            Clique no botão para simular a tentativa de golpe.
                          </span>
                        </div>
                      ) : (
                        <div className="shield" role="alertdialog" aria-label="Vero Escudo bloqueou esta página">
                          <div className="st">
                            <svg className="logo"><use href="#i-logo" /></svg>
                            <b style={{ color: 'var(--mint2)' }}>Vero Escudo</b>
                            <span className="ms">decidido em 38 ms · demo</span>
                          </div>
                          <h5>Pare. Esta página está fingindo ser o seu banco.</h5>
                          <ul>
                            <li>
                              <svg className="ic"><use href="#i-x" /></svg>
                              O endereço não é do seu banco: termina em “.top”
                            </li>
                            <li>
                              <svg className="ic"><use href="#i-x" /></svg>
                              Pede senha logo na primeira tela de acesso
                            </li>
                            <li>
                              <svg className="ic"><use href="#i-x" /></svg>
                              Veio de um e-mail com ameaça de bloqueio em 24h
                            </li>
                          </ul>
                          <div className="row">
                            <button
                              className="btn btn-mint"
                              type="button"
                              onClick={() => setEscudoEstado('normal')}
                            >
                              <svg className="ic"><use href="#i-shieldok" /></svg>
                              Voltar para a segurança
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="democap">
                    <svg className="ic"><use href="#i-play" /></svg>Interativo. O e-mail e o banco são fictícios.
                  </p>
                </div>
              </div>
            )}

            {/* PAINEL 5: DEV */}
            {activeTab === 'dev' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase f3">FASE 3</span>
                  <h3 className="display">Vero Dev</h3>
                  <p className="plead">
                    O mesmo motor que protege a Dona Marlene, numa API. Uma chamada para checar links, mensagens, pagamentos e senhas vazadas dentro de qualquer sistema.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>SDKs Java, TypeScript e Python</b>, webhooks e CLI para desenvolvedores.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Sandbox grátis</b> e chave de API para integração acadêmica e empresarial.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Senhas por k-anonimato:</b> a senha nunca trafega completa na rede.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Explicação em pt-BR</b> pronta para exibir ao seu usuário final.</span>
                    </li>
                  </ul>
                  <div className="who">
                    <b>Para</b>
                    <span>Devs</span>
                    <span>Fintechs</span>
                    <span>E-commerces</span>
                  </div>
                </div>
                <div className="pdemo">
                  <div className="devgrid" style={{ width: '100%' }}>
                    <div className="win">
                      <div className="wtabs" role="tablist">
                        <button
                          role="tab"
                          type="button"
                          aria-selected={devLang === 'java'}
                          onClick={() => setDevLang('java')}
                        >
                          Java
                        </button>
                        <button
                          role="tab"
                          type="button"
                          aria-selected={devLang === 'ts'}
                          onClick={() => setDevLang('ts')}
                        >
                          TypeScript
                        </button>
                        <button
                          role="tab"
                          type="button"
                          aria-selected={devLang === 'curl'}
                          onClick={() => setDevLang('curl')}
                        >
                          cURL
                        </button>
                        <button
                          className="run"
                          type="button"
                          onClick={executarDevDemo}
                        >
                          <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-play" /></svg>
                          {devRunning ? 'Executando…' : 'Executar'}
                        </button>
                      </div>
                      <pre style={{ margin: 0, padding: '16px', background: '#0B1310', color: '#E2ECE7', fontSize: '13px', lineHeight: 1.5, overflowX: 'auto' }}>
                        <code>{DEV_SNIPPETS[devLang]}</code>
                      </pre>
                      <div className="out">
                        <div className="outh">
                          <span>Resposta da API</span>
                          <b>{devRunning ? 'Processando…' : devResponse ? '200 OK · 38ms' : 'Aguardando execução'}</b>
                        </div>
                        <pre style={{ margin: 0, padding: '12px', background: '#111D19', color: '#8FE3C2', fontSize: '12px', overflowX: 'auto' }}>
                          <code>{devResponse || '// Clique em Executar para testar a chamada ao vivo'}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAINEL 6: EMPRESAS */}
            {activeTab === 'empresas' && (
              <div className="panel" role="tabpanel">
                <div className="pinfo">
                  <span className="phase f3">FASE 3</span>
                  <h3 className="display">Vero Empresas</h3>
                  <p className="plead">
                    Simulações de phishing para a equipe e um placar de risco humano por área. Quem cai recebe um treino de dois minutos, não uma bronca.
                  </p>
                  <ul className="feat">
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Golpes reais do momento</b> como modelo de simulação por e-mail, SMS ou WhatsApp.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Métrica que importa:</b> quantos denunciaram, não apenas quantos clicaram.</span>
                    </li>
                    <li>
                      <svg className="ic"><use href="#i-check" /></svg>
                      <span><b>Ninguém é exposto.</b> Relatórios agregados por departamento; o individual fica com a própria pessoa.</span>
                    </li>
                  </ul>
                  <div className="who">
                    <b>Para</b>
                    <span>PMEs</span>
                    <span>Clínicas</span>
                    <span>Escolas</span>
                  </div>
                </div>
                <div className="pdemo">
                  <div className="dash" style={{ width: '100%' }}>
                    <div className="dhead">
                      <div>
                        <b>Risco humano institucional</b>
                        <small>Oficina ACE · UNIEURO (Simulação Didática)</small>
                      </div>
                      <button
                        className="btn btn-green"
                        type="button"
                        onClick={dispararSimulacaoEmpresas}
                        disabled={emSimulando}
                      >
                        <svg className="ic"><use href="#i-flag" /></svg>
                        {emSimulando ? 'Disparando…' : 'Disparar simulação'}
                      </button>
                    </div>
                    <div className="kpis">
                      <div className="kpi dk">
                        <small>Índice de risco</small>
                        <b>{emConcluido ? '29' : '34'}</b>
                        <em>menor é melhor</em>
                      </div>
                      <div className="kpi">
                        <small>Clicaram</small>
                        <b>{emConcluido ? '20%' : '–'}</b>
                        <em>{emConcluido ? 'eram 47% no teste anterior' : 'aguardando'}</em>
                      </div>
                      <div className="kpi">
                        <small>Denunciaram</small>
                        <b>{emConcluido ? '57%' : '–'}</b>
                        <em>{emConcluido ? 'a métrica que protege' : 'aguardando'}</em>
                      </div>
                    </div>
                    <div className="funnel" aria-live="polite">
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem' }}>
                        <b>Campanha: boleto de fornecedor alterado</b>
                        <span className="note">{emSimulando ? 'enviando…' : emConcluido ? 'concluída' : 'não iniciada'}</span>
                      </div>
                      <div className="fr">
                        <span>Enviados</span>
                        <span className="tr"><i style={{ background: 'var(--text)', width: emConcluido ? '100%' : '0%' }} /></span>
                        <b>{emConcluido ? '40' : '0'}</b>
                      </div>
                      <div className="fr">
                        <span>Abriram</span>
                        <span className="tr"><i style={{ background: '#5A6D66', width: emConcluido ? '72%' : '0%' }} /></span>
                        <b>{emConcluido ? '29' : '0'}</b>
                      </div>
                      <div className="fr">
                        <span>Clicaram</span>
                        <span className="tr"><i style={{ background: 'var(--red)', width: emConcluido ? '20%' : '0%' }} /></span>
                        <b>{emConcluido ? '8' : '0'}</b>
                      </div>
                      <div className="fr">
                        <span>Denunciaram</span>
                        <span className="tr"><i style={{ background: 'var(--green)', width: emConcluido ? '57%' : '0%' }} /></span>
                        <b>{emConcluido ? '23' : '0'}</b>
                      </div>
                    </div>
                    <table className="areas">
                      <thead>
                        <tr>
                          <th scope="col">Área</th>
                          <th scope="col">Risco</th>
                          <th scope="col">Golpe que mais engana</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><b>Financeiro</b></td>
                          <td><span className="pill r">Alto</span></td>
                          <td>Boleto de fornecedor alterado</td>
                        </tr>
                        <tr>
                          <td><b>Recepção</b></td>
                          <td><span className="pill a">Médio</span></td>
                          <td>WhatsApp do falso dono pedindo Pix</td>
                        </tr>
                        <tr>
                          <td><b>Gestão</b></td>
                          <td><span className="pill g">Baixo</span></td>
                          <td>Login falso do e-mail institucional</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. COMO O MOTOR APRENDE (EFEITO REDE) */}
        <section className="sec dark" id="motor">
          <div className="grid-bg decor" aria-hidden="true" style={{ opacity: 0.6 }} />
          <div className="wrap" style={{ position: 'relative' }}>
            <div className="reveal vis">
              <span className="kicker">Como o motor aprende</span>
              <h2 className="h2 display">Quanto mais gente usa, mais todo mundo fica protegido.</h2>
              <p className="sub">
                É o efeito rede aplicado à segurança: o Vero transforma cada pessoa treinada em um sensor ativo de proteção coletiva.
              </p>
            </div>
            <div className="loop">
              <div className="step reveal vis">
                <span className="n"><svg className="ic"><use href="#i-flag" /></svg></span>
                <small>01 · Treino ou Checa</small>
                <h3>Alguém denuncia</h3>
                <p>A Dona Marlene marca uma mensagem como golpe ou alguém cola um código Pix no Checa.</p>
              </div>
              <div className="step reveal vis">
                <span className="n"><svg className="ic"><use href="#i-cpu" /></svg></span>
                <small>02 · Vero Core</small>
                <h3>O motor confirma</h3>
                <p>Regras heurísticas, checksum CRC-16 e feeds externos cruzam o sinal.</p>
              </div>
              <div className="step reveal vis">
                <span className="n"><svg className="ic"><use href="#i-browser" /></svg></span>
                <small>03 · Escudo e API</small>
                <h3>A ameaça é publicada</h3>
                <p>O domínio entra na lista local do Escudo e na resposta da API em milissegundos.</p>
              </div>
              <div className="step reveal vis">
                <span className="n"><svg className="ic"><use href="#i-shieldok" /></svg></span>
                <small>04 · Todo mundo</small>
                <h3>Ninguém mais cai</h3>
                <p>A próxima pessoa que recebe a mesma mensagem já é avisada antes do clique errado.</p>
              </div>
            </div>
            <div className="events reveal vis" aria-label="Eventos do sistema">
              <span>threat.reported</span>
              <span>link.checked</span>
              <span>challenge.completed</span>
              <span>guardian.alerted</span>
              <span>campaign.clicked</span>
              <span>score.updated</span>
            </div>
          </div>
        </section>

        {/* 5. PERSONAS (PARA QUEM) */}
        <section className="sec" id="pessoas">
          <div className="wrap">
            <div className="reveal vis">
              <span className="kicker">Para quem</span>
              <h2 className="h2 display">A mesma proteção, em quatro velocidades.</h2>
              <p className="sub">O motor é um só. O jeito de falar muda para cada pessoa.</p>
            </div>
            <div className="ppl">
              <article className="pc reveal vis">
                <span className="mode">MODO CALMO</span>
                <h3>Dona Marlene, 72</h3>
                <p>Letra grande, dois botões, tudo pode ser ouvido por voz. Aprende com o neto e treina sozinha.</p>
                <blockquote>
                  “Calma, Dona Marlene. Essa mensagem tem 3 pistas de golpe. Quer que eu chame o Rafael?”
                </blockquote>
              </article>
              <article className="pc reveal vis">
                <span className="mode">MODO GUARDIÃO</span>
                <h3>Rafael, filho</h3>
                <p>Vê a evolução da mãe e é avisado quando algo perigoso aparece, sem invadir a privacidade dela.</p>
                <blockquote>
                  “Sua mãe acertou 4 de 5 hoje. Ela ainda se confunde com links encurtados.”
                </blockquote>
              </article>
              <article className="pc reveal vis">
                <span className="mode">MODO DEV</span>
                <h3>Ana, backend</h3>
                <p>Precisa barrar links falsos no chat do app. Quer documentação boa, SDK Java e latência baixa.</p>
                <blockquote className="code">
                  &#123; &quot;risk&quot;: &quot;high&quot;, &quot;reasons&quot;: [&quot;url_shortener&quot;] &#125;
                </blockquote>
              </article>
              <article className="pc reveal vis">
                <span className="mode">MODO GESTOR</span>
                <h3>Gestora de PME</h3>
                <p>Tem 40 funcionários e um financeiro que recebe boleto todo dia. Quer saber onde está o risco.</p>
                <blockquote>
                  “O setor Financeiro saiu de risco alto para médio em dois meses de treino.”
                </blockquote>
              </article>
            </div>
          </div>
        </section>

        {/* 6. ARQUITETURA TÉCNICA & STACK */}
        <section className="sec" id="stack" style={{ background: '#fff' }}>
          <div className="wrap">
            <div className="reveal vis">
              <span className="kicker">Arquitetura · Engenharia de Software</span>
              <h2 className="h2 display">Java no coração, rápido na borda, simples para começar.</h2>
              <p className="sub">
                Uma base modular que um time acadêmico opera com excelência e que aguenta escalar em produção.
              </p>
            </div>
            <div className="appr">
              <div className="ap rec reveal vis">
                <span className="tag">RECOMENDADO</span>
                <h3>A · Monólito modular</h3>
                <p>
                  Deploy com Spring Modulith / Next.js. Cada módulo possui fronteira estrita verificada em testes automatizados.
                </p>
                <span className="cost">Vantagem: simplicidade operacional máxima e consistência de dados.</span>
              </div>
              <div className="ap reveal vis">
                <h3>B · Microsserviços</h3>
                <p>Deploy e escala independentes por domínio funcional.</p>
                <span className="cost">Custo: complexidade de rede e sobrecarga de infraestrutura desnecessária no MVP.</span>
              </div>
              <div className="ap reveal vis">
                <h3>C · Serverless</h3>
                <p>Execução sob demanda para webhooks e bot de mensagens.</p>
                <span className="cost">Custo: latência de cold-start e maior complexidade de estado no simulador.</span>
              </div>
            </div>

            {/* ACCORDION DE 7 CAMADAS */}
            <div className="layers" id="layers">
              {[
                { k: '01 CLIENTES', t: 'Next.js App Router, extensão MV3, bot e SDKs', c: 'Next.js 16 (React 19) no front-end, Web Speech API nativa para acessibilidade em pt-BR e extensão de navegador.' },
                { k: '02 BORDA', t: 'Cloudflare, API Gateway e autenticação Passkey', c: 'WAF de borda, rate limit por IP e autenticação OIDC moderna para proteção contra ataques de negação de serviço.' },
                { k: '03 VERO CORE', t: 'Java 25 LTS · Spring Boot 4.x / Next.js API Routes', c: 'Validador de CRC-16 CCITT em tempo real, parser de payload EMVCo e heurística de engenharia social.' },
                { k: '04 INTELIGÊNCIA', t: 'Regras heurísticas, listas de ameaças e IA explicativa', c: 'A decisão crítica é tomada por regras matemáticas auditáveis (< 30ms); IA é usada exclusivamente para gerar explicações acessíveis.' },
                { k: '05 DADOS', t: 'PostgreSQL, cache em memória e conformidade LGPD', c: 'Armazenamento com isolamento de dados pessoais (k-anonymity), zero log de senhas e auditoria estrita.' },
                { k: '06 PLATAFORMA', t: 'Deploy moderno com observabilidade ponta a ponta', c: 'Pipeline de CI/CD automatizado com GitHub Actions, verificação estática de tipos TypeScript e testes de regressão.' },
                { k: '07 QUALIDADE', t: 'Testes unitários, de carga e de acessibilidade WCAG', c: 'Testes de integridade de código de barras e QR Code Pix, verificando checksums oficiais do Banco Central.' }
              ].map((layer, idx) => (
                <div key={idx} className={`layer ${idx === 2 ? 'core-l' : ''} reveal vis`}>
                  <button
                    className="lbtn"
                    type="button"
                    aria-expanded={Boolean(openLayers[idx])}
                    onClick={() => toggleLayer(idx)}
                  >
                    <span className="lk">{layer.k}</span>
                    <span className="lt">{layer.t}</span>
                    <svg className="ic"><use href="#i-down" /></svg>
                  </button>
                  {openLayers[idx] && (
                    <div className="lbody">
                      <div>
                        <div className="lin">
                          <p>{layer.c}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CÓDIGO JAVA EXEMPLO & METAS */}
            <div className="stackx">
              <div className="win reveal vis">
                <div className="wtabs" role="tablist">
                  <button role="tab" type="button" aria-selected="true" tabIndex={-1}>
                    LinkRiskService.java
                  </button>
                </div>
                <pre style={{ margin: 0, padding: '16px', background: '#0B1310', color: '#E2ECE7', fontSize: '13px', lineHeight: 1.5, overflowX: 'auto' }}>
                  <code>{`@Service
class LinkRiskService {
  private final List<ThreatFeed> feeds;
  private final VerdictCache cache;

  LinkRiskService(List<ThreatFeed> feeds, VerdictCache cache) {
    this.feeds = feeds;
    this.cache = cache;
  }

  Verdict check(URI url) throws InterruptedException {
    var cached = cache.find(url);
    if (cached.isPresent()) return cached.get(); // ~1ms

    try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
      var tasks = feeds.stream()
          .<Callable<Signal>>map(f -> () -> f.lookup(url)).toList();
      var verdict = Verdict.combine(exec.invokeAll(tasks, 250, MILLISECONDS));
      cache.put(url, verdict);
      return verdict;
    }
  }
}`}</code>
                </pre>
              </div>
              <div className="metas">
                <div className="meta reveal vis">
                  <b>p95 &lt; 300 ms</b>
                  <span>checagem com feeds e análise heurística em paralelo</span>
                </div>
                <div className="meta reveal vis">
                  <b>&lt; 50 ms</b>
                  <span>decisão do Escudo no navegador com filtro local</span>
                </div>
                <div className="meta reveal vis">
                  <b>99,9%</b>
                  <span>disponibilidade alvo do Core e das ferramentas de auditoria</span>
                </div>
                <span className="note reveal vis">
                  Metas de engenharia com validação por testes de carga.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ROADMAP & PRINCÍPIOS */}
        <section className="sec" id="roadmap">
          <div className="wrap">
            <div className="reveal vis">
              <span className="kicker">Roadmap</span>
              <h2 className="h2 display">Começa pequeno. Pensa grande.</h2>
            </div>
            <div className="road">
              <div className="rm now reveal vis">
                <span className="when">MVP · ESCOPO DA ACE</span>
                <h3>Proteger quem mais cai</h3>
                <ul>
                  <li>Vero Treino (PWA gamificado)</li>
                  <li>Vero Família (painel do guardião)</li>
                  <li>Vero Checa (Pix, links e vazamentos)</li>
                  <li>Vero Core + Score de Cidadania</li>
                </ul>
              </div>
              <div className="rm reveal vis">
                <span className="when">FASE 2</span>
                <h3>Estar onde o golpe chega</h3>
                <ul>
                  <li>Vero Escudo (extensão de navegador)</li>
                  <li>Bot comunitário de WhatsApp</li>
                  <li>Aplicativo nativo mobile</li>
                </ul>
              </div>
              <div className="rm reveal vis">
                <span className="when">FASE 3</span>
                <h3>Virar infraestrutura</h3>
                <ul>
                  <li>Vero Dev: API pública + SDKs</li>
                  <li>Vero Empresas (treinamento corporativo)</li>
                  <li>Feed aberto de inteligência de ameaças</li>
                </ul>
              </div>
            </div>
            <div className="principles">
              <div className="pr reveal vis">
                <b>Uma decisão por tela</b>
                <span>para quem tem receio ou ansiedade com tecnologia.</span>
              </div>
              <div className="pr reveal vis">
                <b>Sempre o porquê</b>
                <span>todo alerta exibe com clareza as pistas encontradas.</span>
              </div>
              <div className="pr reveal vis">
                <b>Nunca culpar a vítima</b>
                <span>o erro é transformado imediatamente em aprendizado e pista.</span>
              </div>
              <div className="pr reveal vis">
                <b>Acessível de verdade</b>
                <span>fontes com hiperlegibilidade, alto contraste e narração por voz nativa.</span>
              </div>
              <div className="pr reveal vis">
                <b>Tudo é API</b>
                <span>o aplicativo do idoso e os clientes corporativos consom o mesmo motor.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CHAMADA FINAL (FINAL CTA) */}
        <section className="sec final">
          <div className="grid-bg decor" aria-hidden="true" />
          <div className="wrap reveal vis" style={{ position: 'relative' }}>
            <span className="kicker">Vero</span>
            <h2 className="h2 display">Golpista não tira férias. A proteção também não.</h2>
            <p className="sub">
              Comece pelo treino de hoje. São cinco mensagens e cinco minutos para blindar sua família.
            </p>
            <div className="ctas">
              <button
                type="button"
                className="btn btn-mint btn-lg"
                onClick={() => irParaTab('treino')}
              >
                <svg className="ic"><use href="#i-play" /></svg>
                Jogar agora
              </button>
              <button
                type="button"
                className="btn btn-ghost-d btn-lg"
                onClick={() => irParaTab('checa')}
              >
                Checar uma mensagem ou Pix
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ ACADÊMICO OFICIAL */}
      <footer>
        <div className="wrap">
          <span>
            Vero · Projeto de Extensão Universitária (ACE - 4º Semestre) · <b>Fellipe de Castro &amp; Jhonatgan Magalhaes</b> · UNIEURO
          </span>
          <span>
            Todas as mensagens, marcas e bancos nos simuladores didáticos são fictícios para fins de conscientização social.
          </span>
        </div>
      </footer>
    </>
  );
}

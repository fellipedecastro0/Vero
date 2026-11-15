import Header from '@/components/Header';
import MinigamesHub from '@/components/MinigamesHub';
import Link from 'next/link';

export const metadata = {
  title: 'Vero Minigames — Arena Interativa contra Golpes Digitais',
  description:
    'Treine em 4 minigames práticos: Caça-Golpes no WhatsApp/SMS/E-mail, Sites Falsos, Auditoria de Pix e Ligações Suspeitas.'
};

export default function TreinoPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="sec" style={{ paddingTop: 36, paddingBottom: 80 }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, marginBottom: 28 }}>
            <span className="kicker">Arena de Treinamento · 4 Minigames Práticos</span>
            <h1 className="h2 display" style={{ margin: '8px 0' }}>
              Escolha um desafio para treinar agora
            </h1>
            <p className="sub" style={{ margin: '0 auto' }}>
              Cada minigame dura menos de 3 minutos, explica os sinais reais do golpe sem termos
              difíceis e salva sua evolução automaticamente neste aparelho.
            </p>
          </div>

          <MinigamesHub />

          {/* Destaque direto para Vero Checa e Guia de Emergência */}
          <section
            style={{
              width: '100%',
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: 16
            }}
            aria-label="Ferramentas práticas e socorro"
          >
            <div
              style={{
                background: 'var(--ink)',
                color: '#fff',
                borderRadius: 24,
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
                boxShadow: '0 22px 45px -28px rgba(11,19,16,.55)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  className="pill"
                  style={{
                    alignSelf: 'flex-start',
                    background: 'rgba(95,211,168,.18)',
                    color: 'var(--mint2)',
                    fontSize: '.76rem'
                  }}
                >
                  FERRAMENTA AO VIVO
                </span>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', margin: 0 }}>
                  Recebeu um Pix, link ou boleto suspeito agora?
                </h2>
                <p style={{ margin: 0, color: '#B8CFC4', fontSize: '.95rem', lineHeight: 1.5 }}>
                  Não arrisque! Cole o link, o código Copia e Cola do Pix ou verifique vazamentos no
                  Vero Checa antes de clicar ou pagar.
                </p>
              </div>
              <Link href="/checa" className="btn btn-mint" style={{ alignSelf: 'flex-start' }}>
                <svg className="ic" aria-hidden="true">
                  <use href="#i-search" />
                </svg>
                Checar Pix ou Link no Vero Checa →
              </Link>
            </div>

            <div
              style={{
                background: 'var(--rsoft)',
                color: 'var(--redd)',
                border: '2px solid var(--red)',
                borderRadius: 24,
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  className="pill"
                  style={{
                    alignSelf: 'flex-start',
                    background: 'var(--red)',
                    color: '#fff',
                    fontSize: '.76rem'
                  }}
                >
                  SOCORRO IMEDIATO
                </span>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', margin: 0, color: '#6E120B' }}>
                  Já caiu num golpe ou clicou onde não devia?
                </h2>
                <p style={{ margin: 0, color: '#6E120B', fontSize: '.95rem', lineHeight: 1.5 }}>
                  Veja o passo a passo urgente para pedir bloqueio do Pix (MED), recuperar seu
                  WhatsApp e registrar o Boletim de Ocorrência.
                </p>
              </div>
              <Link href="/emergencia" className="btn" style={{ alignSelf: 'flex-start', background: 'var(--red)', color: '#fff' }}>
                <svg className="ic" aria-hidden="true">
                  <use href="#i-lifebuoy" />
                </svg>
                Abrir Guia de Emergência →
              </Link>
            </div>
          </section>

          <div
            style={{
              marginTop: 28,
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--muted)'
            }}
          >
            <p style={{ margin: 0 }}>
              Projeto de Extensão Universitária (ACE · 4º Semestre) · <b>Autores:</b> Fellipe de
              Castro &amp; Jhonatgan Magalhaes · UNIEURO
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>Vero · Projeto de Extensão Universitária (ACE - 4º Semestre) · UNIEURO</span>
          <span>Todas as mensagens, sites e ligações simuladas são educativas.</span>
        </div>
      </footer>
    </>
  );
}

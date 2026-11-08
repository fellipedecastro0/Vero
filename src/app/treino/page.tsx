import Header from '@/components/Header';
import PhishingGame from '@/components/PhishingGame';
import Link from 'next/link';

export const metadata = {
  title: 'Vero Treino — Simulador de Golpes Digitais',
  description: 'Treine seu discernimento contra fraudes reais no WhatsApp, SMS e E-mail de forma gamificada e acessível.',
};

export default function TreinoPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="sec" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Banner do Treino */}
          <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '28px' }}>
            <span className="kicker">Frente Educacional Gamificada</span>
            <h1 className="h2 display" style={{ margin: '8px 0' }}>Vero Treino</h1>
            <p className="sub" style={{ margin: '0 auto' }}>
              Um jogo de cinco minutos por dia: chegam mensagens do dia a dia e você decide se é golpe. Sem vergonha de errar e com explicações práticas para proteger sua família.
            </p>
          </div>

          {/* O Celular com o Jogo */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PhishingGame />
          </div>

          {/* Rodapé explicativo da extensão */}
          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '13px', color: 'var(--muted)', maxWidth: '480px' }}>
            <p style={{ margin: 0 }}>
              Projeto de Extensão Universitária (ACE · 4º Semestre)
              <br />
              <b>Autores:</b> Fellipe de Castro &amp; Jhonatgan Magalhaes · UNIEURO
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link href="/checa" style={{ color: 'var(--green)', fontWeight: 700, textDecoration: 'underline' }}>
                Precisa checar uma mensagem ou Pix agora? Abra o Vero Checa ➔
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>Vero · Projeto de Extensão Universitária (ACE - 4º Semestre) · UNIEURO</span>
          <span>Todas as mensagens e simulações didáticas são fictícias.</span>
        </div>
      </footer>
    </>
  );
}

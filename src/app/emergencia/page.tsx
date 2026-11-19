import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyGuide from '@/components/EmergencyGuide';
import Link from 'next/link';

export const metadata = {
  title: 'Emergência & Cartilha — Vero Cidadania Digital',
  description:
    'Caí num golpe agora, e aí? Protocolo urgente de Mecanismo Especial de Devolução (MED), Boletim de Ocorrência e Cartilha dos Golpes.'
};

export default function EmergenciaPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="sec" style={{ paddingTop: 36, paddingBottom: 80 }}>
        <div className="wrap">
          <div style={{ maxWidth: 740, marginBottom: 24 }}>
            <span className="kicker" style={{ color: 'var(--red)' }}>
              SOCORRO DIGITAL IMEDIATO
            </span>
            <h1 className="h2 display" style={{ margin: '8px 0' }}>
              Caiu num golpe ou clicou onde não devia?
            </h1>
            <p className="sub">
              Não sinta vergonha e não apague as conversas. Os primeiros minutos são os mais
              importantes para bloquear o dinheiro ou recuperar sua conta. Escolha sua situação abaixo.
            </p>
          </div>

          <EmergencyGuide />

          <div
            style={{
              marginTop: 52,
              padding: 24,
              background: 'var(--ink)',
              color: '#fff',
              borderRadius: 24,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div>
              <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.35rem', display: 'block' }}>
                Depois de resolver a urgência, treine para não cair de novo
              </strong>
              <span style={{ color: '#B4D0C4' }}>
                Experimente os 4 minigames gratuitos do Vero ou verifique links no Vero Checa.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/treino" className="btn b-go">
                Abrir Minigames
              </Link>
              <Link href="/checa" className="btn b-out" style={{ color: '#fff', borderColor: '#2E453C' }}>
                Vero Checa
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer
        leftContent="Vero · Projeto de Extensão Universitária (ACE - 4º Semestre) · CEUB"
        rightText="Em emergências policiais, ligue 190 ou procure a Delegacia Eletrônica"
      />
    </>
  );
}


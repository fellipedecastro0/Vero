import Header from '@/components/Header';
import ChecaTool from '@/components/ChecaTool';
import Link from 'next/link';

export const metadata = {
  title: 'Vero Checa — Validador de Pix, Links, Boletos e Vazamentos',
  description: 'Verifique se um Pix, boleto, link ou mensagem é golpe digital com validação de CRC-16 EMV e consulta a vazamentos.',
};

export default function ChecaPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="sec" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Banner do Checa */}
          <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '28px' }}>
            <span className="kicker">Frente de Verificação Prática</span>
            <h1 className="h2 display" style={{ margin: '8px 0' }}>Vero Checa</h1>
            <p className="sub" style={{ margin: '0 auto' }}>
              Recebeu uma mensagem estranha, um link suspeito, um código Pix ou boleto? Cole aqui para analisar o beneficiário real, calcular a integridade matemática do CRC-16 e checar vazamentos públicos.
            </p>
          </div>

          {/* Ferramenta Checa */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ChecaTool />
          </div>

          {/* Dica da extensão */}
          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '13px', color: 'var(--muted)', maxWidth: '480px' }}>
            <p style={{ margin: 0 }}>
              O motor do Vero analisa padrões matemáticos de integridade (CRC-16 CCITT) e reputação heurística para proteger cidadãos e comerciantes.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link href="/treino" style={{ color: 'var(--green)', fontWeight: 700, textDecoration: 'underline' }}>
                Quer praticar sua atenção contra fraudes? Jogue o Vero Treino ➔
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>Vero · Projeto de Extensão Universitária (ACE - 4º Semestre) · UNIEURO</span>
          <span>Todas as ferramentas operam com privacidade por design (k-anonymity).</span>
        </div>
      </footer>
    </>
  );
}

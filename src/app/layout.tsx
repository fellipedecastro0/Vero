import type { Metadata } from "next";
import "./globals.css";
import SvgSprite from "@/components/SvgSprite";

export const metadata: Metadata = {
  title: "Vero — Ecossistema de proteção digital",
  description:
    "Vero: um motor de risco e seis produtos para proteger idosos, famílias, desenvolvedores e empresas contra golpes digitais. Projeto de Extensão Universitária — ACE 4º Semestre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SvgSprite />
        {children}
      </body>
    </html>
  );
}

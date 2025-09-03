import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rocket Lab Marketing',
  description: 'Gestão de redes sociais, criação de sites e automações inteligentes para empresas que querem escalar com previsibilidade.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

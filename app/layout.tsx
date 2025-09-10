import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rocket Lab Marketing - Gestão de Redes Sociais e Automações',
  description: 'Gestão de redes sociais, criação de sites e automações inteligentes para empresas que querem escalar com previsibilidade. Especialistas em marketing digital em Portugal.',
  keywords: ['marketing digital', 'gestão redes sociais', 'automações', 'sites', 'Portugal', 'rocket lab'],
  authors: [{ name: 'Rocket Lab Marketing' }],
  creator: 'Rocket Lab Marketing',
  publisher: 'Rocket Lab Marketing',
  robots: 'index, follow',
  metadataBase: new URL('https://ai.3d-rocket.pt'),
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://ai.3d-rocket.pt',
    title: 'Rocket Lab Marketing - Gestão de Redes Sociais e Automações',
    description: 'Gestão de redes sociais, criação de sites e automações inteligentes para empresas que querem escalar com previsibilidade.',
    siteName: 'Rocket Lab Marketing',
    images: [
      {
        url: 'https://ai.3d-rocket.pt/3drocket.png',
        width: 1200,
        height: 630,
        alt: 'Rocket Lab Marketing - Agência de Marketing Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocket Lab Marketing - Gestão de Redes Sociais e Automações',
    description: 'Gestão de redes sociais, criação de sites e automações inteligentes para empresas que querem escalar com previsibilidade.',
    images: ['https://ai.3d-rocket.pt/3drocket.png'],
  },
  verification: {
    google: 'OPIWLBmB2ik03Cera9Vch9bP9e4h2sgpSHIe9RlE680',
  },
  other: {
    'google-site-verification': 'OPIWLBmB2ik03Cera9Vch9bP9e4h2sgpSHIe9RlE680',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T368CJ36');`}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GJL8CY9QXP"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T368CJ36"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        {children}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GJL8CY9QXP');
          `}
        </Script>
      </body>
    </html>
  )
}
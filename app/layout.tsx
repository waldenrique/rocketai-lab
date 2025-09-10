import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script';

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

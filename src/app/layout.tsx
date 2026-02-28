import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'TeensUp - Educação Financeira para Jovens',
  description: 'Aprenda sobre finanças, cooperativismo e os produtos da Sicoob Credisul de forma divertida.',
  manifest: '/manifest.json',
  icons: {
    icon: '/Tela%20-%20Robo%20com%20olho.svg',
    shortcut: '/Tela%20-%20Robo%20com%20olho.svg',
    apple: '/Tela%20-%20Robo%20com%20olho.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TeensUp',
  },
}

export const viewport: Viewport = {
  themeColor: '#EE6A29',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  )
}




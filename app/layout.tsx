import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Disnake Extension Hub',
  description: 'The unofficial official hub for disnake extension developers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ nunito.className }>{ children }</body>
    </html>
  )
}

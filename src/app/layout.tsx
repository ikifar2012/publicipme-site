import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PublicIP.me - Your Public IP Address',
  description: 'No frills, just your public IP address.',
  authors: [{ name: 'Matheson Steplock', url: 'https://mathesonsteplock.ca'}],
}
export const viewport: Viewport = {
  themeColor: 'rgb(15 23 42)',
}

import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavigationMenu } from '@/components/nav'
import { ResultsProvider } from './lookup/context/results-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-purple-900 via-slate-950 to-blue-950 transition-all duration-1000 ease-in-out">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ResultsProvider>
          <SiteNavigationMenu />
          {children}
          </ResultsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

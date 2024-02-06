import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PublicIP.me - Your Public IP Address',
  description: 'No frills, just your public IP address.',
}

import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavigationMenu } from '@/components/nav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteNavigationMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

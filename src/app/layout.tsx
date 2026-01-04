import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WalletFix - Secure Non-Custodial Crypto Wallet',
  description: 'Generate and manage crypto wallets securely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="fixed inset-0 bg-mesh-purple opacity-30 pointer-events-none" />
        {children}
      </body>
    </html>
  )
}

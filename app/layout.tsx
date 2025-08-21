import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CheckoutConfigProvider } from "@/contexts/checkout-config-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Event Platform",
  description: "Platform for managing and selling event tickets",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CheckoutConfigProvider>{children}</CheckoutConfigProvider>
      </body>
    </html>
  )
}

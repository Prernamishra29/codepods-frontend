import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'CodePods',
  description: 'Collaborative skill-swap platform for developers',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">{children}</body>
    </html>
  )
}

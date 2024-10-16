import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './_mainComponent/navbar'
import { NextAuthProvider } from './_mainComponent/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FYP App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
        <body className={`${inter.className} bg-gray-900 text-slate-200 mx-auto scrollbar-none`}>
            <NextAuthProvider>
            <Navbar />
            {children}
            </NextAuthProvider>
        </body>
    </html>
  )
}
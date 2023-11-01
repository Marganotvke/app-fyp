import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar'
import { NextAuthProvider } from './NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'FYP App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${inter.className} bg-gray-900 text-slate-200 mx-auto`}>
            <NextAuthProvider>
            <Navbar />
            {children}
            </NextAuthProvider>
        </body>
    </html>
  )
}
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './_mainComponent/navbar'
import { NextAuthProvider } from './_mainComponent/NextAuthProvider'
import {NextUIProvider} from "@nextui-org/react";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FYP App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
        <body className={`${inter.className} bg-gray-900 text-slate-200 mx-auto scrollbar-none h-full`}>
          <NextUIProvider>
          <NextAuthProvider>
          <Navbar />
          {children}
          </NextAuthProvider>
          </NextUIProvider>
        </body>
    </html>
  )
}
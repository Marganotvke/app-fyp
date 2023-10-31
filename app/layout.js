import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FYP App',
}

export default function RootLayout({ children, user }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-slate-200 mx-auto`}>
        <nav className='sticky top-0 z-10 flex items-center justify-between bg-slate-400 flex-wrap p-2 backdrop-blur-sm bg-opacity-30'>
          <div className='flex items-center flex-shrink-0 mr-6 text-3xl p-1'>
            <Link href=".">FYP</Link>
          </div>
          <div className='flex flex-row gap-5 items-center text-xl justify-center'>
            <Link href="/catalog" className='hover:border-b'>Catalog</Link>
            <Link href="/chat" className='hover:border-b'>Chat</Link>
          </div>
          <Link href="/login" className='block border rounded border-gray-400 px-3 py-2 hover:bg-gray-400 hover:text-gray-600'>
            Start Planning
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
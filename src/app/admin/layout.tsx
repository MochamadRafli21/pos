import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import AuthCheck from '@/components/Auth/AuthCheck'
import Sidebar from '@/components/sidebar'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Admin',
  description: '| Lets Grow Together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCheck />
        <div className='md:flex overflow-y-clip pb-32 md:pb-0'>
          <Navbar />
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}

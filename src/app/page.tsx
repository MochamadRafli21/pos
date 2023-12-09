import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <p>go to dashboard
    <Link href="/dashboard">
      Dashboard
    </Link>
    </p>
    </main>
  )
}

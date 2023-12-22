"use client"
import Link from "next/link"

export default function error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <main className="min-h-[100vh] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="text-center grid gap-1">
          <h2 className="text-orange-400 font-semibold">Sepertinya Terjadi Kesalahan</h2>
          <h1 className="text-4xl font-bold">{error.message || "Contact Admin For Support"}</h1>
          <p className="text-gray-600"> Mohon Coba Lagi Nanti, atau Hubungi Admin</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-orange-400 font-semibold text-white w-fit rounded-xl px-4 py-2 flex justify-between" onClick={reset}>Reset</button>
          <Link href={'/'} className="border-2 border-orange-400 w-fit rounded-xl px-4 py-2 flex justify-between ">
            <h1 className="font-semibold text-orange-400">Kembali Ke Beranda</h1>
          </Link>
        </div>
      </div>
    </main>
  )
}

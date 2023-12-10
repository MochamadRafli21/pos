"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
type ItemHistory = {
  change: number
  id: string
  item:{
    name: string
  }
}
export default function ItemHistory() {
  const [items, setitems] = useState([])
  useEffect(() => {
    const getHistory = async () => {
      const res = await fetch('/api/items/history')
      const box = await res.json()
      setitems(box.data.map((item: ItemHistory) => {
        return {
          id: item.id,
          name: item.item.name,
          change: item.change
        }
      }))
    }
    getHistory()
  }, [])

  return (
    <main className="min-h-screen w-full md:p-2">
    <div className="w-full p-4 bg-white">
    <div className='flex gap-4'>
    <Link href="/admin/history/product">
    <h1 className="font-bold text-gray-400 mb-2">Transactions</h1>
    </Link>
    <Link href="/admin/history">
    <h1 className="font-bold text-xl text-orange-400 mb-2">Product</h1>
    </Link>
    </div>
    <Link href={'/admin/dashboard'} className="bg-orange-400 w-fit rounded-xl px-4 py-2 flex justify-between ">
    <h1 className="text-white font-bold">Add Transaction +</h1>
    </Link>
    </div>
    {items.map((item: any) => (
    <div className="w-full p-4 bg-white rounded-xl mb-4" key={item.id}>
    <div className="grid grid-cols-2">
    <div>
    <h1 className="text-xl font-semibold text-orange-400  mb-2 elipsis break-all">{item.name}</h1>
    <p>{item.price}</p>
    </div>
    <div className='w-full flex justify-end'>
    <h2>{item.change}</h2>
    </div>
    </div>
    </div>
    ))}
    
    </main>
  )
}

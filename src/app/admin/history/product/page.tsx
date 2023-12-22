"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ItemHistory } from '@/libs/types'
import { ProductInvalidRequest } from '@/libs/exceptions'

export default function ItemHistory() {
  const [items, setitems] = useState([])
  useEffect(() => {
    const getHistory = async () => {
      let box = []
      try {
        const res = await fetch('/api/items/history')
        box = await res.json()
      } catch (error) {
        throw new ProductInvalidRequest()
      }
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
          <Link href="/admin/history">
            <h1 className="font-bold text-gray-400 mb-2">Transactions</h1>
          </Link>
          <Link href="/admin/history/product">
            <h1 className="font-bold text-xl text-orange-400 mb-2">Product</h1>
          </Link>
        </div>
        <Link href={'/admin/dashboard'} className="bg-orange-400 w-fit rounded-xl px-4 py-2 flex justify-between ">
          <h1 className="text-white font-bold">Add Transaction +</h1>
        </Link>
      </div>
      <div className="w-full px-4 mt-4" >
        <div className="grid grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-400  mb-2 elipsis break-all">Item Name</h3>
          </div>
          <div className='w-full flex justify-start'>
            <h3 className="font-semibold text-gray-400  mb-2 elipsis break-all">Change</h3>
          </div>
        </div>
      </div>
      {items.map((item: ItemHistory) => (
        <div className="w-full p-4 bg-white rounded-xl  my-2" key={item.id}>
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-xl font-semibold text-orange-400  mb-2 elipsis break-all">{item.name}</h1>
              <p>{item.price}</p>
            </div>
            <div className='w-full flex justify-start'>
              <h2>{item.change}</h2>
            </div>
          </div>
        </div>
      ))}

    </main>
  )
}

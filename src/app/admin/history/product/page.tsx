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
          change: item.change,
          date: item.date,
          item: {
            name: item.item.name,
            price: item.item.price,
            stock: item.item.stock
          }
        }
      }))
    }
    getHistory()
  }, [])

  return (
    <main className="min-h-screen w-full md:p-2">
      <div className="w-full p-4 bg-white rounded-xl">
        <div className='flex gap-4'>
          <Link href="/admin/history">
            <h1 className="font-bold text-gray-400 hover:text-orange-300 mb-2">Transactions</h1>
          </Link>
          <Link href="/admin/history/product">
            <h1 className="font-bold text-orange-400 mb-2">Product</h1>
          </Link>
        </div>
        <Link href={'/admin/dashboard'} className="bg-orange-400 w-fit rounded-xl px-4 py-2 flex justify-between ">
          <h1 className="text-white font-bold">Add Transaction +</h1>
        </Link>
      </div>
      <div className="w-full px-4 mt-4" >
        <div className="grid grid-cols-3">
          <div>
            <h3 className="font-semibold text-gray-400  mb-2 elipsis break-all">Item Name</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h3 className="font-semibold text-gray-400  mb-2 elipsis break-all">Change</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h3 className="font-semibold text-gray-400  mb-2 elipsis break-all">Final Amount</h3>
          </div>
        </div>
      </div>
      {items.map((item: ItemHistory) => (
        <div className="w-full px-4 py-2 bg-white rounded-xl my-2" key={item.id}>
          <div className="grid grid-cols-3">
            <div>
              <h1 className="text-xl font-semibold text-orange-400  mb-2 elipsis break-all">{item.item.name}</h1>
              <p className="text-gray-400 text-sm elipsis break-all">Updated on {item.date}</p>
            </div>
            <div className='w-full flex justify-center'>
              <h2>{item.change}</h2>
            </div>
            <div className='w-full flex justify-center'>
              <h2>{item.item.stock}</h2>
            </div>
          </div>
        </div>
      ))}

    </main>
  )
}

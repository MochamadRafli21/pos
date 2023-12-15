"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type OrderDetail = {
  id: string
  unique_id: string
  date: string
  order_items: {
    id: string
    name: string
    quantity: number
  }[]
}

export default function DeleteOrder({
  id,
  className
}: { id: string, className?: string }) {
  const router = useRouter()
  const [shown, setDisplay] = useState(false)
  const [data, setDisplayData] = useState({} as OrderDetail)

  const executeFn = () => {
    const handleExecute = async () => {
      const res = await fetch(`/api/order/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setDisplay(false)
        router.push("/admin/history")
        router.refresh()
      }
    }
    handleExecute()
  }
  useEffect(() => {
    const getDataFromId = async () => {
      const res = await fetch(`/api/order/${id}`)
      const box: { data: OrderDetail } = await res.json()
      setDisplayData(box.data ? box.data : {} as OrderDetail)
    }
    getDataFromId()
  }, [])
  return (
    <>
      <button onClick={() => setDisplay(true)} className={className + ' w-fit bg-red-400 rounded-xl px-4 py-2 font-semibold text-white'}>
        Delete
      </button>
      <div
        onClick={() => setDisplay(false)}
        className={!shown ? "hidden" : "flex justify-center items-center w-screen h-full bg-gray-800 opacity-30 z-50 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  fixed"}
      >
      </div>
      <div>
        <div className={!shown ? "hidden" : "bg-white w-full h-full md:w-1/3 md:h-fit md:rounded-xl p-4 md:flex flex-col z-[60] fixed transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2"}>
          <h1 className="font-bold text-2xl text-orange-400 mb-2">Apakah Anda Yakin Ingin menghapus transaksi ini?</h1>
          <div className='flex flex-col z-10 bg-gray-100 p-4 rounded-l'>
            <div className='flex justify-between border-b-1 border-b border-gray-800'>
              <h1 className="font-bold text-orange-400 mb-2">{data?.unique_id}</h1>
            </div>
            <div className='flex justify-between mt-2'>
              <h1 className="font-semibold text-gray-400 mb-2">Item</h1>
              <span>qty</span>
            </div>
            <div className='min-h-[100px]'>
              {data.order_items?.map(
                (item) => (
                  <div key={item.id} className='flex justify-between'>
                    <h1 className="font-semibold text-xl text-gray-400 mb-2">{item.name}</h1>
                    <span>x{item.quantity}</span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className='flex z-10 mt-4 gap-2 justify-end'>
            <button onClick={() => setDisplay(false)} className='w-fit rounded-xl px-4 py-2 font-semibold text-gray-400 border-2 border-gray-400'>
              Cancel
            </button>
            <button onClick={() => executeFn()} className='w-fit bg-red-400 rounded-xl px-4 py-2 font-semibold text-white'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

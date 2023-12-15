import Link from 'next/link'
import DeleteOrder from '@/components/Modal/deleteOrder';
import { getOrderData } from '@/app/api/order/route';
type Order = {
  id: string
  unique_id: string
  date: string
}

export default async function History() {
  async function getOrder() {
    try {
      const res = await getOrderData('')
      if (!res) return
      const items = res.map((item) => {
        return {
          id: item.id,
          unique_id: item.unique_id,
          date: item.date.toDateString()
        }
      })
      return items
    } catch (error) {
      console.log(error)
    }
  }

  const orders = await getOrder()
  return (
    <main className="min-h-screen w-full md:p-2">
      <div className="w-full p-4 bg-white">
        <div className='flex gap-4'>
          <Link href="/admin/history">
            <h1 className="font-bold text-xl text-orange-400 mb-2">Transactions</h1>
          </Link>
          <Link href="/admin/history/product">
            <h1 className="font-bold text-gray-400 mb-2">Product</h1>
          </Link>
        </div>
        <Link href={'/admin/dashboard'} className="bg-orange-400 w-fit rounded-xl px-4 py-2 flex justify-between ">
          <h1 className="text-white font-bold">Add Transaction +</h1>
        </Link>
      </div>
      <div className="w-full p-4">
        <div className='flex justify-between md:grid grid-cols-2'>
          <h4 className="font-bold text-xl text-orange-400 mb-2">Transactions ID</h4>
        </div>
        {orders ? orders.map((order: Order) => (
          <div className="w-full p-4 bg-white rounded-xl mb-4" key={order.id}>
            <div className="grid grid-cols-2">
              <div>
                < Link href={'/admin/history/' + order.id} className={''}>
                  <h1 className="text-xl font-semibold text-orange-400  mb-2 elipsis break-all">{order.unique_id}</h1>
                  <p>{order.date}</p>
                </Link>
              </div>
              <div className='w-full flex justify-end'>
                <DeleteOrder id={order.id} />
              </div>
            </div>
          </div>
        ))
          : <></>
        }
      </div>
    </main>
  )
}

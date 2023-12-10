import Link from 'next/link'

type Order = {
  id: string
  unique_id: string
  date: string
}

export default async function History() {
  async function getOrder() {
  try{
    const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + '/api/order')
    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }
    const item = await res.json()
    return item.data
  }catch(error){
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
    {orders.map((order: Order) => (
    <div className="w-full p-4 bg-white rounded-xl mb-4" key={order.id}>
    <div className="grid grid-cols-2">
    <div>
    < Link href={'/admin/history/' + order.id} className={''}>
    <h1 className="text-xl font-semibold text-orange-400  mb-2 elipsis break-all">{order.unique_id}</h1>
    <p>{order.date}</p>
    </Link>
    </div>
    <div className='w-full flex justify-end'>
    <button className='bg-red-400 w-fit rounded-xl px-4 py-2 text-white'>
      Delete
    </button>

    </div>
    </div>
    </div>
    ))}
    </div>
    </main>
  )
}

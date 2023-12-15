import React, { useEffect, useState } from 'react'
import { Product } from '@/types/product'

export default function ProductEdit({
  data,
  shown,
  setDisplay,
  setIsProductUptodate
}: {
  data: Product,
  shown: boolean,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  setIsProductUptodate: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [createProductPayload, setCreateProductPayload] = useState(data)
  useEffect(() => {
    setCreateProductPayload(data)
  }, [data])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreateProductPayload({
      ...createProductPayload,
      [e.target.name]: e.target.value
    })
  }

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/items/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createProductPayload)
    })
    if (res.ok) {
      setDisplay(false)
      setIsProductUptodate(false)
      setCreateProductPayload(data)
    }
  }
  return (
    <>
      <div
        onClick={() => setDisplay(false)}
        className={!shown ? "hidden" : "flex justify-center items-center w-screen h-full bg-gray-800 opacity-30 z-50 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  absolute"}
      >
      </div>
      <div>
        <div className={!shown ? "hidden" : "bg-white w-full h-full md:w-1/3 md:h-fit md:rounded-xl p-4 md:flex gap-4 z-[60] absolute md:transform md:translate-x-[-50%] md:translate-y-[-50%] top-0 md:top-1/2 md:left-1/2"}>
          <div className='flex justify-between'>
            <h1 className="font-bold text-2xl text-orange-400 mb-2">Product</h1>
            <span onClick={() => setDisplay(false)} className="md:hidden cursor-pointer font-bold text-red-400">x</span>
          </div>
          <form className="w-full flex flex-col gap-2" onSubmit={(e) => createProduct(e)}>
            <label htmlFor="name">Product Name</label>
            <input
              onChange={(e) => handleChange(e)}
              className="w-full border-gray border-2 h-10 rounded-xl p-2" name="name" placeholder="Product Name..."
              value={createProductPayload.name} />
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => handleChange(e)}
              value={createProductPayload.price}
              className="w-full border-gray border-2 h-10 rounded-xl p-2" type="number" name="price" min="0" placeholder="Product Price..." />
            <label htmlFor="stock">Stock</label>
            <input
              onChange={(e) => handleChange(e)}
              value={createProductPayload.stock}
              className="w-full border-gray border-2 h-10 rounded-xl p-2" type='number' name="stock" min="0" placeholder="Product Stock..." />
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => handleChange(e)}
              value={createProductPayload.description}
              className="w-full border-gray border-2 h-30 rounded-xl p-2 resize-y" rows={3} name="description" placeholder="Product Description..." />
            <button className="bg-orange-400 rounded-xl px-4 py-2 flex justify-between ">
              <h1 className="text-white w-full font-bold">Update Product</h1>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

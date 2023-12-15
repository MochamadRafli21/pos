"use client"
import React from 'react'

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className='mb-2 bg-white w-full rounded-xl px-4 py-2 flex justify-between border-2 border-orange-400 text-orange-400 '>
      <h1 className="font-bold mx-auto">Print</h1>
    </button>
  )
}

"use client"
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { useCookies } from 'next-client-cookies'
export default function Logout() {
  const router = useRouter()
  const cookies = useCookies()
  const [shown, setDisplay] = useState(false)

  const executeFn = () => {
    const handleExecute = async () => {
      cookies.remove('access_at')
      setDisplay(false)
      router.push('/')
    }
    handleExecute()
  }
  return (
    <>
    <button onClick={()=> setDisplay(true)} className='text-xs font-bold bg-red-400 fill-white rounded-xl border-2 border-red-400 w-16 h-16 text-white flex flex-col items-center justify-center p-2'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z"/></svg>
      <p>Logout</p>
    </button>
    <div
    onClick={()=> setDisplay(false)}
    className={!shown ? "hidden" : "flex justify-center items-center w-screen h-full bg-gray-800 opacity-30 z-50 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  fixed"} 
    >
    </div>
    <div>
    <div className={!shown ? "hidden" : "bg-white w-full h-full md:w-1/3 md:h-fit md:rounded-xl p-4 md:flex flex-col z-[60] fixed transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2"}>
    <h1 className="font-bold text-2xl text-orange-400 mb-2">Apakah Anda Yakin Ingin Keluar?</h1>
    <div className='flex z-10 mt-4 gap-2 justify-end'>
      <button onClick={() => setDisplay(false)} className='w-fit rounded-xl px-4 py-2 font-semibold text-gray-400 border-2 border-gray-400'>
        Cancel
      </button>
      <button onClick={() => executeFn()} className='w-fit bg-red-400 rounded-xl px-4 py-2 font-semibold text-white'>
        Logout
      </button>
    </div>
    </div>
    </div>
    </>
  )
}

import React from 'react'

export default function Confirmation({
  title,
  shown, 
  setDisplay,
  executeFn
}: {title: string,shown: boolean, setDisplay: React.Dispatch<React.SetStateAction<boolean>>, executeFn: () => void}) {
  return (
    <>
    <div
    onClick={()=> setDisplay(false)}
    className={!shown ? "hidden" : "flex justify-center items-center w-screen h-full bg-gray-800 opacity-30 z-50 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  absolute"} 
    >
    </div>
    <div>
    <div className={!shown ? "hidden" : "bg-white w-full h-full md:w-1/3 md:h-fit md:rounded-xl p-4 md:flex flex-col z-[60] absolute md:transform md:translate-x-[-50%] md:translate-y-[-50%] top-0 md:top-1/2 md:left-1/2"}>
    <h1 className="font-bold text-2xl text-orange-400 mb-2">{title}</h1>
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

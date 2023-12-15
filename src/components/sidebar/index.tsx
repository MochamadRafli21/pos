"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logout from '../Modal/Logout'
export default function Sidebar() {
  const pathname = usePathname()
  const menu = [
    {
      link: '/admin/dashboard',
      svg: <svg
        clipRule="evenodd"
        fillRule="evenodd" strokeLinejoin="round"
        strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-3 9.5v4c0 .276-.224.5-.5.5h-4c-.276 0-.5-.224-.5-.5v-4c0-.276.224-.5.5-.5h4c.276 0 .5.224.5.5zm-10.061 1.99-1.218-1.218c-.281-.281-.282-.779 0-1.061s.78-.281 1.061 0l1.218 1.218 1.218-1.218c.281-.281.779-.282 1.061 0s.281.78 0 1.061l-1.218 1.218 1.218 1.218c.281.281.282.779 0 1.061s-.78.281-1.061 0l-1.218-1.218-1.218 1.218c-.281.281-.779.282-1.061 0s-.281-.78 0-1.061zm8.561-.99h-2v2h2zm-7.5-8.5c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm9 5.25c0 .399-.353.75-.75.75-1.153 0-2.347 0-3.5 0-.397 0-.75-.351-.75-.75s.353-.75.75-.75h3.5c.397 0 .75.351.75.75zm-9-3.75c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 1.5c0 .399-.353.75-.75.75-1.153 0-2.347 0-3.5 0-.397 0-.75-.351-.75-.75s.353-.75.75-.75h3.5c.397 0 .75.351.75.75zm0-2.25c0 .399-.353.75-.75.75-1.153 0-2.347 0-3.5 0-.397 0-.75-.351-.75-.75s.353-.75.75-.75h3.5c.397 0 .75.351.75.75z" fillRule="nonzero" /></svg>,
      text: 'Menu'
    },
    {
      link: '/admin/history',
      text: 'History',
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.706c-2.938-1.83-7.416-2.566-12-2.706v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.876-12 2.706zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.504-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704zm-2-10.214c-2.086.312-4.451 1.023-6 1.672v-1.064c1.668-.622 3.881-1.315 6-1.626v1.018zm0 3.055c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0 6.093c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm-16-6.104c2.119.311 4.332 1.004 6 1.626v1.064c-1.549-.649-3.914-1.361-6-1.672v-1.018zm0 5.09c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.316-6-1.626v1.017zm0 6.093c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017z" /></svg>
    }
  ]
  return (
    <div className='hidden no-print md:block h-screen w-24 z-50'>
      <div className='flex flex-col justify-between pt-16 pb-16 p-2 items-center h-screen w-30 bg-white fixed'>
        <div className='flex flex-col gap-6'>
          {menu.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <div className=
                  {`${pathname.includes(item.link)
                    ? 'text-xs bg-orange-50 fill-orange-400 rounded-xl border-2 border-orange-400 w-16 h-16 text-orange-400 flex flex-col items-center justify-center p-2'
                    : 'text-xs hover:bg-orange-50 fill-gray-400 rounded-xl border-2 border-gray-400 w-16 h-16 text-gray-400 flex flex-col items-center justify-center p-2'
                    }`}
                >
                  {item.svg}
                  <p>{item.text}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='flex flex-col justify-end'>
          <Logout />
        </div>
      </div>
    </div>
  )
}

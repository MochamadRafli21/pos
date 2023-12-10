"use client"
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheck() {
  const cookies = useCookies()
  const router = useRouter()
  
  const deleteToken = ()=>{
    cookies.remove('access_at')
    router.push('/')
    router.refresh()
  }


  const tokenChecker = async () => {
    if(cookies.get('access_at')) {
      const res =  await fetch(`/api/auth/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${cookies.get('access_at')}`,
        },
      })
      if(!res.ok){
            console.log("check")
            deleteToken()
        }
    }else{
      deleteToken()
    }
  }

  useEffect(() => {
    tokenChecker()
  }, [])

  return (
    <></>
  )
}


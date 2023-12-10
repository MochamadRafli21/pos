"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies'
export default function Home() {
  const cookie = useCookies()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setError('')
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setError('')
  }
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const login = async () => {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if(response.ok){
        cookie.set('access_at', data.token)
        router.push('/admin/dashboard')
      }else{
        console.log(data)
        setError(data.message)
      }
    }

    login()
  }
  useEffect(() => {
    const token = cookie.get('access_at')
    if (token) {
      const verify = async () => {
        const response = await fetch('http://localhost:3000/api/auth/check', {
          method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        })
        if(!response.ok){
          cookie.remove('access_at')
        }else{
          router.push('/admin/dashboard')
        }
      }
      verify()
    }
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='w-full md:w-1/3 h-full md:h-full flex flex-col p-4 justify-center bg-white'>
    <h1 className='font-bold text-xl'>Login</h1>
    {error?
      <div className='text-red-500 w-full md:w-fit'>
        <p>{error}</p>
      </div>
        : <></>}
    <form onSubmit={handleLogin} className='flex flex-col gap-2'>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your password"
        className='border-2 border-gray-400 p-2 rounded'
        value={username}
        onChange={handleUsernameChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        className='border-2 border-gray-400 p-2 rounded'
        onChange={handlePasswordChange}
      />
      <button className='bg-orange-400 rounded-xl px-4 py-2 mt-2 font-semibold text-white' type="submit">Login</button>
    </form>

    </div>
    </main>
  )
}

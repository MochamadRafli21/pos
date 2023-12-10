import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function POST(request: NextRequest) {
  const {username, password} = await request.json()
  const admin_username = process.env.ADMIN_USERNAME || 'admin'
  const admin_password = process.env.ADMIN_PASSWORD || 'admin'
  if(!username){
    return NextResponse.json({message: 'Username Cant be Empty'}, {status: 401}) 
  }
  if(!password){
    return NextResponse.json({message: 'Password Cant be Empty'}, {status: 401}) 
  }

  if(username !== admin_username || password !== admin_password){
    return NextResponse.json({message: 'Invalid username or password'}, {status: 401}) 
  }
  const token = await argon2.hash(username+password)
  return NextResponse.json({token})
}

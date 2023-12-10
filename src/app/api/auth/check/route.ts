import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function GET(request: NextRequest) {
  const access_at = request.headers.get("Authorization")
  const admin_username = process.env.ADMIN_USERNAME || 'admin'
  const admin_password = process.env.ADMIN_PASSWORD || 'admin'
  if(!access_at){
    return new Response("Token Cant be empty!", {status:401})
  }
  const token = access_at.split(" ")[1]
  try {
    await argon2.verify(token, admin_username+admin_password)
  } catch (error) {
    return new Response("Invalid Token", {status: 401})
  }

  return NextResponse.json({token})
}

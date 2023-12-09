import prisma from "../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  const product = await prisma.item.findMany(
     {
        where: {
          name: {
            contains: search ? search : '',
            mode: "insensitive",
          },
          is_deleted: false
        },
      }
  )
  return NextResponse.json({ data: product });
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  if(!res.name){
    return new Response("Item Name Cant be empty!", {status:400})
  }
  const exist = await prisma.item.findFirst({where:{name:res.name,is_deleted:false}})
  if(exist){
    return new Response("Item Name is already exist", {status: 400}) 
  }
  const data = await prisma.item.create({
    data:{
      name: res.name,
      description: res.description?res.description:"",
      price: parseInt(res.price) ? parseInt(res.price) : 0,
      stock: res.stock?parseInt(res.stock):0,
      item_history: {
        create: {
          change: parseInt(res.stock),
          date: new Date().toISOString(),
        }
      }
    }
  })
  return NextResponse.json({ data });
}


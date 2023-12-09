import prisma from "../../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest,{params}:{params:{id:string}}) {
  const id = params.id
  const data = await prisma.order.findFirst({
    where: {
      id
    }
  }) 
  return NextResponse.json({ data });
}

export async function DELETE(_: NextRequest,{params}:{params:{id:string}}) {
  const id = params.id
  const data = await prisma.order.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}

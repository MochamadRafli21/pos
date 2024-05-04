import prisma from "../../../../../prisma/prismaClient";
import { NextResponse } from 'next/server';

export async function GET() {
  const history = await prisma.stockHistory
    .findMany({
      select: {
        id: true,
        date: true,
        change: true,
        item: {
          select: {
            name: true,
            price: true,
            stock: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

  const finalHistory = history.map((item) => {
    return {
      ...item,
      date: item.date.toDateString()
    }
  })
  return NextResponse.json({ data: finalHistory });
}

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
          name: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    }
  })
  return NextResponse.json({ data: history });
}

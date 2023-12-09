import prisma from "../../../../../prisma/prismaClient";
import { NextResponse } from 'next/server';

export async function GET() {
  const history = await prisma.stockHistory.findMany()
  return NextResponse.json({ data: history });
}

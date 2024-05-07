import prisma from "../../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await prisma.item.update({
    where: {
      id
    },
    data: {
      is_deleted: true
    }
  })
  return NextResponse.json({ data });
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await prisma.item.findFirst({
    where: {
      id,
      is_deleted: false
    }
  })
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const current_data = await prisma.item.findFirst({
    where: {
      id,
      is_deleted: false
    }
  })
  if (!current_data) {
    throw new Error("Item not found")
  }
  const res = await request.json()
  const req = await prisma.item.update({
    data: {
      name: res.name,
      description: res.description,
      price: parseInt(res.price),
      stock: parseInt(res.stock),
      item_history: {
        create: {
          change: current_data.stock - parseInt(res.stock),
          date: new Date().toISOString(),
        }
      }
    },
    where: {
      id,
      is_deleted: false
    }
  })
  return NextResponse.json({ data: req });
}


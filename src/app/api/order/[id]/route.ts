import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from 'next/server';
import { getOrderDataDetail } from "@/libs/service/prisma/index";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await getOrderDataDetail(id)
  revalidatePath(`/admin/history/${id}`)
  revalidatePath(`/admin/history`)
  return NextResponse.json({ data });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await prisma.order.update({
    data: {
      is_deleted: true
    },
    where: {
      id
    }
  })
  return NextResponse.json({ data });
}

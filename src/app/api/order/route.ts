import { revalidatePath } from "next/cache";
import prisma from "../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from 'next/server';
import { getOrderData } from "@/libs/service/prisma/index";

type OrderPayload = {
  discount: number
  order_items: {
    id: string
    quantity: number
  }[]
}

type OrderItem = {
  name: string
  price: number
  quantity: number
}


export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  const order = await getOrderData(search ? search : '')
  return NextResponse.json({ data: order });
}

export async function POST(request: NextRequest) {
  const res: OrderPayload = await request.json()
  if (res.order_items.length === 0) {
    return new Response("Order Items Cant be empty!", { status: 400 })
  }
  let sums = 0
  try {
    const items:
      OrderItem[] = await Promise.all(res.order_items.map(async (item) => {
        const item_detail = await prisma.item.findFirst({
          where: {
            id: item.id
          }
        })

        if (!item_detail) {
          throw new Error("Item not found")
        }

        if (item_detail.stock < item.quantity) {
          throw new Error("Stock not enough")
        } else {
          await prisma.item.update({
            where: {
              id: item.id
            },
            data: {
              stock: item_detail.stock - item.quantity,
              item_history: {
                create: {
                  change: -item.quantity,
                  date: new Date().toISOString(),
                }
              }
            }
          })
        }

        sums += item_detail.price * item.quantity

        return {
          name: item_detail.name,
          price: item_detail.price,
          quantity: item.quantity
        }
      }))
    sums -= res.discount
    if (sums < 0) {
      return new Response("Invalid Order", { status: 400 })
    }

    const data = await prisma.order.create({
      data: {
        unique_id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        order_items: {
          create: items
        },
        total: sums,
        discount: res.discount,
        date: new Date().toISOString(),
      },
      include: {
        order_items: true
      }
    })

    revalidatePath('/admin/history')
    return NextResponse.json({ data });

  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 400 })
  }
}


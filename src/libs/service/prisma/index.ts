import prisma from "../../../../prisma/prismaClient"

export async function getOrderDataDetail(id: string) {
  return await prisma.order.findFirst({
    where: {
      id,
      is_deleted: false
    },
    include: {
      order_items: true
    }
  })
}

export const getOrderData = async (search: string) => {
  return await prisma.order.findMany({
    where: {
      unique_id: {
        contains: search ? search : '',
        mode: "insensitive",
      },
      is_deleted: false
    },
    include: {
      order_items: true
    },
    orderBy: {
      id: 'desc'
    }
  })
}

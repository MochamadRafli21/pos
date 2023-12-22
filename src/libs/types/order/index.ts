export type OrderDetail = {
  id: string
  unique_id: string
  date: string
  order_items: {
    id: string
    name: string
    quantity: number
  }[]
}

export type Order = {
  id: string;
  unique_id: string;
  date: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type ItemHistory = {
  change: number
  price: number;
  name: string
  id: string
  item: {
    name: string
  }
}

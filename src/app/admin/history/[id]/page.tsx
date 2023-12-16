import Link from 'next/link'
import { getOrderDataDetail } from '../../../service/index';
import { formatCurrency } from '@/helper';
import DeleteOrder from '@/components/Modal/deleteOrder';
import PrintButton from '@/components/Button/print';

export default async function TransactionDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  async function getOrder() {
    try {
      const res = await getOrderDataDetail(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const orders = await getOrder();
  const beforeDiscount = orders?.order_items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <main className="min-h-screen w-full md:p-2 flex justify-center overflow-x-hidden">
      <div className="relative w-full min-h-screen mb-8 md:w-1/3 bg-white">
        <div className="flex justify-between items-center text-orange-400 p-4 text-xl fill-orange-400 font-bold">
          <Link href={"/admin/history"} prefetch={true}>
            <svg
              className="w-8 fill-orange-400"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m22 12.002c0-5.517-4.48-9.997-9.998-9.997-5.517 0-9.997 4.48-9.997 9.997 0 5.518 4.48 9.998 9.997 9.998 5.518 0 9.998-4.48 9.998-9.998zm-8.211-4.843c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591z"
                fill-rule="nonzero"
              />
            </svg>
          </Link>
          <h1 className="break-all">{orders?.unique_id}</h1>
        </div>

        <div className="mt-2 p-4">
          <h1 className="font-bold text-xl">Detail Item</h1>
          <div className="relative bg-gray-100 mt-2 rounded-xl w-full min-h-[200px] p-4">
            {orders?.order_items?.map((item) => (
              <div className="flex justify-between">
                <h1>
                  {item.name} x {item.quantity}
                </h1>
                <h1>{formatCurrency(item.price * item.quantity)}</h1>
              </div>
            ))}
            <div className="absolute py-4 px-2 border-t-2 border-gray-400 w-full bottom-0 right-0">
              <div className="w-full flex justify-between">
                <p>Total Harga Barang:</p>
                <p>{formatCurrency(beforeDiscount || 0)}</p>
              </div>
              <div className="w-full flex justify-between">
                <p>Diskon:</p>
                <p>- {formatCurrency(orders?.discount || 0)}</p>
              </div>
              <div className="w-full font-bold flex justify-between">
                <h1>Total:</h1>
                <h1>{formatCurrency(orders?.total || 0)}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 absolute bottom-0 right-0 no-print">
          <Link
            href={"/admin/dashboard"}
            className="mb-2 bg-orange-400 w-full rounded-xl px-4 py-2 flex justify-between"
          >
            <h1 className="text-white font-bold mx-auto">
              + Buat Transaksi Baru
            </h1>
          </Link>
          <PrintButton />
          <DeleteOrder className="!w-full" id={id} />
        </div>
      </div>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductAdd from "@/components/Forms/addProduct";
import ProductEdit from "@/components/Forms/editProduct";
import Confirmation from "@/components/Modal/confirmation";

import { Product, OrderItem, Message } from "@/libs/types";
import { formatCurrency } from "@/libs/utils";
import { ProductInvalidRequest } from "@/libs/exceptions";
import MessageToast from "@/components/Toast/message";


export default function Dashboard() {
  const [addProductShown, setaddProductShown] = useState(false);
  const [editProductShown, setEditProductShown] = useState(false);
  const [deleteProductShown, setDeleteProductShown] = useState(false);
  const [isProductUptodate, setIsProductUptodate] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedItem, setSelectedItem] = useState([] as OrderItem[]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([] as Message[]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [displayMobileItems, setDisplayMobileItems] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    const checkout = async () => {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_items: selectedItem,
          discount: discount,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDisplayMobileItems(false);
        setSelectedItem([]);
        setDiscount(0);
        setTotal(0);
        if (!data) return;
        setMessages([
          ...messages,
          {
            type: 'SUCCESS',
            message: "Checkout Berhasil",
            name: 'Order Submitted',
          }])
        router.push("/admin/history/" + data.data.id);
      } else {
        setMessages([
          ...messages,
          {
            type: 'ERROR',
            message: data.message || "Gagal Checkout",
            name: 'Order Submit Failed',
          }])
      }
    };
    checkout();
  };

  const handleGetTotal = () => {
    let total = 0;
    selectedItem.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total - discount);
  };

  useEffect(() => {
    handleGetTotal();
  }, [selectedItem, discount]);

  const openDeleteModal = (product: Product) => {
    setEditedProduct(product);
    setDeleteProductShown(true);
  };

  const openEditProduct = (product: Product) => {
    setEditedProduct(product);
    setEditProductShown(true);
  };

  const handleDeleteProduct = () => {
    const deleteProduct = async (payload: Product) => {
      try {
        const res = await fetch(`/api/items/${payload.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setDeleteProductShown(false);
          setIsProductUptodate(false);
          setEditedProduct({});
        }
      } catch (error: any) {
        setMessages([
          ...messages,
          {
            type: 'ERROR',
            message: error.message || "Gagal Menghapus Data",
            name: 'Product Fetch Failed',
          }
        ]);
      }
    };
    deleteProduct(editedProduct as Product);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/items");
      if (!res.ok) throw new ProductInvalidRequest();
      const items = await res.json();
      setProducts(items.data);
      setIsProductUptodate(true);
      setSelectedItem([]);
    };
    if (isProductUptodate) return;
    getProducts();
  }, [isProductUptodate]);

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getProducts = async () => {
      try {
        const res = await fetch("/api/items?search=" + e.target.value);
        const items = await res.json();
        setProducts(items.data);
      } catch (error: any) {
        setMessages([
          ...messages,
          {
            type: 'ERROR',
            message: error.message || "Gagal Memuat Data",
            name: 'Product Fetch Failed',
          }
        ]);
      }
    };
    getProducts();
  };

  return (
    <main className="md:grid grid-cols-3 min-h-screen w-full md:p-2">
      <div className="w-full min-h-screen col-span-2 pr-2">
        <div className="bg-white w-full rounded-xl p-4 flex justify-between mb-4 items-end">
          <div>
            <h1 className="font-bold text-2xl text-orange-400 mb-2">
              Daftar Produk
            </h1>
            <button
              onClick={() => setaddProductShown(true)}
              className="bg-orange-400 rounded-xl px-4 py-2 flex justify-between "
            >
              <h1 className="text-white font-bold">Add Product +</h1>
            </button>
          </div>
          <input
            className="w-1/3 border-gray border-2 h-10 rounded-xl p-2"
            onChange={handleSearchProduct}
            placeholder="Cari Produk..."
          />
        </div>

        <div className="w-full relative p-2 md:p-0  gap-4 grid grid-cols-1 md:grid-cols-2">
          {products ? (
            products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white w-full h-[250px] mb-4 md:mb-0 justify-around rounded-xl p-4"
              >
                <div
                  className="hover:bg-orange-50 hover:cursor-pointer rounded-xl p-4"
                  onClick={() => {
                    const selectedItemsId = selectedItem.map((item) => item.id);
                    if (selectedItemsId.includes(product.id)) return;
                    setSelectedItem([
                      ...selectedItem,
                      {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      },
                    ]);
                  }}
                >
                  <h1 className="font-bold text-2xl text-orange-400 mb-2">
                    {product.name}
                  </h1>
                  <div>
                    <p>Price: {formatCurrency(product.price)}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full z-10 mt-2">
                  <button
                    onClick={() => openEditProduct(product)}
                    className="w-full bg-orange-400 rounded px-4 py-1 font-semibold text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="w-full bg-red-400 rounded px-4 py-1 mt-2 font-semibold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={
          !displayMobileItems
            ? "rounded-xl shadow-xl fixed z-10 md:static md:z-0 w-full min-h-[160px] md:h-fit md:max-h-[400px] overflow-y-auto bg-white col-span-1 p-2 bottom-10 ease-in-out delay-100 transform translate-y-[50px] md:translate-y-0"
            : "rounded-xl shadow-xl fixed z-10 md:static md:z-0 w-full h-full md:h-fit min-h-[200px] bg-white col-span-1 p-2 top-0 ease-in-out delay-100"
        }
      >
        <div
          onClick={() => setDisplayMobileItems(!displayMobileItems)}
        >
          <div className="flex md:hidden w-full justify-center">
            <div className="bg-orange-300 rounded-xl w-28 h-2"></div>
          </div>
          <div
            className="flex justify-between">
            <h1 className="text-orange-400 font-bold text-2xl my-2">
              Pesanan Baru
            </h1>
            <p className={"md:hidden text-gray-400 font-bold text-xl my-2"}>
              Total: {total}
            </p>
          </div>
        </div>
        {selectedItem.map((item) => (
          <div
            key={item.id}
            className={
              !displayMobileItems
                ? "hidden md:block text-xs bg-white w-full rounded-xl p-2"
                : "text-xs bg-white w-full rounded-xl p-2"
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-semibold text-xl">{item.name}</h1>
                <p>{formatCurrency(item.price)}/pcs</p>
              </div>
              <div className="flex gap-2 items-center text-[16px]">
                <button
                  className="bg-white border-2 border-orange-400 rounded px-4 py-1 font-semibold text-orange-400"
                  onClick={() => {
                    let items = selectedItem;
                    if (item.quantity === 1) {
                      items = items.filter((i: OrderItem) => i.id !== item.id);
                      setSelectedItem(items);
                    } else {
                      items = items.map((i: OrderItem) => {
                        if (i.id === item.id) {
                          const updatedQty = i.quantity - 1;
                          return {
                            ...i,
                            quantity: updatedQty,
                          };
                        }
                        return i;
                      });
                      setSelectedItem(items);
                    }
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="bg-orange-400 rounded px-4 py-1 font-semibold text-white"
                  onClick={() => {
                    let items = selectedItem;
                    items = items.map((i: OrderItem) => {
                      if (i.id === item.id) {
                        return {
                          ...i,
                          quantity: i.quantity + 1,
                        };
                      }
                      return i;
                    });
                    setSelectedItem(items);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <div
          className={
            displayMobileItems
              ? "flex flex-col gap-2 text-xs bg-white w-full rounded-xl p-2 mb-[100px] md:mb-0"
              : "hidden md:flex flex-col gap-2 text-xs bg-white w-full rounded-xl p-2 mb-[100px] md:mb-0"
          }
        >
          <div className="flex w-full justify-between items-center">
            <h1 className="font-semibold">Discount</h1>
            <input
              placeholder="0"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value ? parseInt(e.target.value) : 0)
              }
              className="w-1/3 border-1 border-orange-400 rounded px-4 py-1 font-semibold text-orange-400"
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <h1 className="font-semibold">Total</h1>
            <input
              placeholder="0"
              value={formatCurrency(total)}
              disabled
              className="w-1/3 border-1 border-orange-400 rounded px-4 py-1 font-semibold text-orange-400"
            />
          </div>
          <button
            className="w-full bg-white-400 border-2 border-orange-400 rounded px-4 py-2 font-semibold text-orange-400"
            onClick={() => {
              setDisplayMobileItems(false);
              setSelectedItem([]);
              setDiscount(0);
              setTotal(0);
            }}
          >
            X Reset
          </button>
          <button
            className="w-full bg-orange-400 rounded px-4 py-2 font-semibold text-white"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
      <ProductAdd
        shown={addProductShown}
        setDisplay={setaddProductShown}
        setIsProductUptodate={setIsProductUptodate}
        errorHandler={(error) => {
          setMessages([
            ...messages,
            {
              type: 'ERROR',
              message: error.message || 'Gagal Menambahkan Produk',
              name: 'Gagal Menambahkan Produk'
            }
          ])
        }}
      />
      <ProductEdit
        shown={editProductShown}
        setDisplay={setEditProductShown}
        data={editedProduct as Product}
        setIsProductUptodate={setIsProductUptodate}
      />
      <Confirmation
        shown={deleteProductShown}
        setDisplay={setDeleteProductShown}
        title="Apakah Anda Yakin Menghapus Produk Ini?"
        executeFn={handleDeleteProduct}
      />
      <MessageToast
        setMessages={setMessages}
        messages={messages}
      />
    </main>
  );
}

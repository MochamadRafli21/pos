export class OrderNotFound extends Error {
  constructor(
    message = "Pesanan Tidak Ditemukan"
  ) {
    super(message);
    this.name = "OrderNotFound";
  }
}

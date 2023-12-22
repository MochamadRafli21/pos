export class OrderInvalidRequest extends Error {
  constructor(
    message = "Gagal Mendapatkan Pesanan"
  ) {
    super(message);
    this.name = "OrderInvalidRequest";
  }
}
